// api/card.ts
import axios from 'axios';
import { CardState } from '../types/cards';

const BASE_URL = 'http://localhost:8080/api/card';

export const cardApi = {
  // 初始化牌组
  initializeDeck: async (gameId: number) => {
    const response = await axios.post(`${BASE_URL}/init`, {
      game_id: gameId
    });
    return response.data;
  },

  // 获取卡牌状态
  getCardState: async (gameId: number) => {
    const response = await axios.get<CardState>(`${BASE_URL}/state`, {
      params: { game_id: gameId }
    });
    return response.data;
  },

  // 抽初始手牌
  drawInitialCards: async (gameId: number) => {
    const response = await axios.post(`${BASE_URL}/draw`, {
      game_id: gameId
    });
    return response.data;
  },

  // 打出一张牌
  playCard: async (gameId: number, cardId: number) => {
    const response = await axios.post(`${BASE_URL}/play`, {
      game_id: gameId,
      card_id: cardId
    });
    return response.data;
  },

  // 结束回合
  endTurn: async (gameId: number) => {
    const response = await axios.post(`${BASE_URL}/endTurn`, {
      game_id: gameId
    });
    return response.data;
  }
};