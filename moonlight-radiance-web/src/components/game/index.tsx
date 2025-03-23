import React, { useEffect, useState } from 'react';
import { cardApi } from '../../api/cards';
import { CardList } from './Card/cards';
import { Card, CardState } from '../../types/cards';

export const GamePage: React.FC = () => {
  const [gameId] = useState<number>(1); // 实际应该从路由或props获取
  const [cardState, setCardState] = useState<CardState | null>(null);

  // 初始化
  useEffect(() => {
    const initGame = async () => {
      await cardApi.initializeDeck(gameId);
      await cardApi.drawInitialCards(gameId);
      const state = await cardApi.getCardState(gameId);
      setCardState(state);
    };
    initGame();
  }, [gameId]);

  // 打出卡牌
  const handleCardPlay = async (card: Card) => {
    try {
      await cardApi.playCard(gameId, card.id);
      const newState = await cardApi.getCardState(gameId);
      setCardState(newState);
    } catch (error) {
      console.error('出牌失败:', error);
      // 添加错误提示
    }
  };

  // 结束回合
  const handleEndTurn = async () => {
    try {
      await cardApi.endTurn(gameId);
      const newState = await cardApi.getCardState(gameId);
      setCardState(newState);
    } catch (error) {
      console.error('结束回合失败:', error);
      // 添加错误提示
    }
  };

  if (!cardState) return <div>Loading...</div>;

  return (
    <div className="game-page">
      <div className="opponent-info">
        <p>对手手牌: {cardState.opponent.handCounts.basic + cardState.opponent.handCounts.skill}</p>
        <p>对手牌库: {cardState.opponent.deckCounts.basic + cardState.opponent.deckCounts.skill}</p>
      </div>
      
      <div className="player-area">
        <CardList 
          cards={cardState.self.handCards} 
          onCardClick={handleCardPlay}
        />
        <button onClick={handleEndTurn}>结束回合</button>
      </div>
    </div>
  );
};

export default GamePage;