export enum CardType {
    Basic = 1,
    Skill = 2
  }
  
export interface Card {
    id: number;
    name: string;
    type: CardType;
    cost: number;
    description: string;
  }
  
export interface CardState {
    self: {
      handCards: Card[];
      deckCounts: {
        basic: number;
        skill: number;
      };
      discardCounts: {
        basic: number;
        skill: number;
      };
    };
    opponent: {
      handCounts: {
        basic: number;
        skill: number;
      };
      deckCounts: {
        basic: number;
        skill: number;
      };
      discardCounts: {
        basic: number;
        skill: number;
      };
    };
    stage: number;
  }