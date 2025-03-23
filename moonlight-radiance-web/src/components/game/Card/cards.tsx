import React from 'react';
import { Card as CardType } from '../../../types/cards';

interface CardProps {
    card: CardType;
    onClick?: () => void;
}
  
export const Card: React.FC<CardProps> = ({ card, onClick }) => {
    return (
      <div 
        className="card" 
        onClick={onClick}
      >
        <h3>{card.name}</h3>
        <p>{card.description}</p>
        <div className="card-cost">{card.cost}</div>
      </div>
    );
};
  
interface CardListProps {
    cards: CardType[];
    onCardClick: (card: CardType) => void;
}
  
export const CardList: React.FC<CardListProps> = ({ cards, onCardClick }) => {
    return (
      <div className="card-list">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    );
};