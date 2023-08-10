// Card.js
import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div className={`col-md-2 card ${card.isFlipped ? 'card--flipped' : ''}`} onClick={() => onClick(card)}>
      <div className="card__content">
        {card.isFlipped ? card.value : ' '}
      </div>
    </div>
  );
};

export default Card;