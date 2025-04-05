import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cardApi } from '../../api/cards';
import { CardList } from '../../components/game/Card/cards';
import { Card, CardState } from '../../types/cards';

export const GamePage: React.FC = () => {
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(true);
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
        
        if (e?.response?.status === 401) {
          alert('请先登录')
          navigate('/login')
          return
        }
        setError(e?.message || '初始化游戏失败')
      } finally {
        setLoading(false);
      }
    };
    initGame();
  }, [gameId, navigate]);

  // 打出卡牌
  const handlePlayCard = async (card: Card) => {
    setLoading(true);
    try {
      await cardApi.playCard(gameId, card.id);
      const newState = await cardApi.getCardState(gameId);
      setCardState(newState);
    } catch (e: any) {
      console.error('出牌失败:', e)
      if (e?.response?.status === 401) {
        alert('请先登录')
        navigate('/login')
        return
      }
      setError(e?.message || '出牌失败')
    } finally {
      setLoading(false);
    }
  };

  // 结束回合
  const handleEndTurn = async () => {
    setLoading(true);
    try {
      await cardApi.endTurn(gameId);
      const newState = await cardApi.getCardState(gameId);
      setCardState(newState);
    } catch (e: any) {
      console.error('结束回合失败:', e)
      if (e?.response?.status === 401) {
        alert('请先登录')
        navigate('/login')
        return
      }
      setError(e?.message || '结束回合失败') 
    } finally {
      setLoading(false);
    }
  };

  // 如果正加载或者还没拿到 cardState，就显示 Loading
  if (loading && !cardState && !error) {
    return <div>Loading...</div>
  }

  // 如果出错了，可以显示错误信息
  if (error) {
    return <div style={{ color: 'red' }}>出错了：{error}</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>对战页面</h1>
      {loading && <p style={{ color: 'green' }}>操作处理中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <h3>对手信息</h3>
        <p>对手手牌数量: {cardState!.opponent.handCounts.basic + cardState!.opponent.handCounts.skill}</p>
        <p>对手牌库余量: {cardState!.opponent.deckCounts.basic + cardState!.opponent.deckCounts.skill}</p>
      </div>

      <div>
        <h3>我的手牌</h3>
        <CardList cards={cardState!.self.handCards} onCardClick={handlePlayCard} />
        <p>我的牌库余量: {cardState!.self.deckCounts.basic + cardState!.self.deckCounts.skill}</p>
        <p>我的弃牌堆: 基础 {cardState!.self.discardCounts.basic} / 功能 {cardState!.self.discardCounts.skill}</p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleEndTurn}>结束回合</button>
      </div>
    </div>
  );
};

export default GamePage;