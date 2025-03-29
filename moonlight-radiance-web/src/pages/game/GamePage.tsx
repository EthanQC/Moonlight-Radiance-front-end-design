import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cardApi } from '../../api/cards';
import { CardList } from '../../components/game/Card/cards';
import { Card, CardState } from '../../types/cards';

export const GamePage: React.FC = () => {
  // 从路由参数获取gameId，如果没有则生成一个新的
  const { gameId: routeGameId } = useParams<{ gameId: string }>();
  const [gameId] = useState<number>(() => {
    if (routeGameId) {
      return parseInt(routeGameId, 10);
    }
    // 如果没有gameId，生成一个临时的
    return Math.floor(Math.random() * 1000000);
  });
  const [cardState, setCardState] = useState<CardState | null>(null);
  const [error, setError] = useState<string>('')

  // 初始化
  useEffect(() => {
    const initGame = async () => {
      try {
        await cardApi.initializeDeck(gameId);
        await cardApi.drawInitialCards(gameId);
        const state = await cardApi.getCardState(gameId);
        setCardState(state);
      } catch (e: any) {
        console.error('初始化游戏失败:', e)
        setError(e?.message || '初始化游戏出错')
      }
      
    };
    initGame();
  }, [gameId]);

  // 打出卡牌
  const handlePlayCard = async (card: Card) => {
    try {
      await cardApi.playCard(gameId, card.id);
      const newState = await cardApi.getCardState(gameId);
      setCardState(newState);
    } catch (e: any) {
      console.error('出牌失败:', e)
      setError(e?.message || '出牌失败')
      // 添加错误提示
    }
  };

  // 结束回合
  const handleEndTurn = async () => {
    try {
      await cardApi.endTurn(gameId);
      const newState = await cardApi.getCardState(gameId);
      setCardState(newState);
    } catch (e: any) {
      console.error('结束回合失败:', e)
      setError(e?.message || '结束回合失败')
      // 添加错误提示
    }
  };

  if (!cardState) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>对战页面</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <h3>对手信息</h3>
        <p>对手手牌数量: {cardState.opponent.handCounts.basic + cardState.opponent.handCounts.skill}</p>
        <p>对手牌库余量: {cardState.opponent.deckCounts.basic + cardState.opponent.deckCounts.skill}</p>
      </div>

      <div>
        <h3>我的手牌</h3>
        <CardList cards={cardState.self.handCards} onCardClick={handlePlayCard} />
        <p>我的牌库余量: {cardState.self.deckCounts.basic + cardState.self.deckCounts.skill}</p>
        <p>我的弃牌堆: 基础 {cardState.self.discardCounts.basic} / 功能 {cardState.self.discardCounts.skill}</p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleEndTurn}>结束回合</button>
      </div>
    </div>
  );
};

export default GamePage;