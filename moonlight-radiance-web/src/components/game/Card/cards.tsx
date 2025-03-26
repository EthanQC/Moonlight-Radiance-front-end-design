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
        style={{
          border: '1px solid #999',
          padding: '1rem',
          margin: '0.5rem',
          display: 'inline-block',
          cursor: 'pointer',
          width: '120px'
        }}
        onClick={onClick}
      >
        <h3>{card.name}</h3>
        <p>{card.description}</p>
        <div className="card-cost">{card.cost}</div>
        <p style={{ fontSize: '0.9em' }}>{card.description}</p>
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