// Card.js
import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div className={`col-md-2 card ${card?.isFlipped || card?.isClicked ? 'card--flipped' : 'card--Noflipped'}`} onClick={() => onClick(card)}>
      <div className="card__content">
        {card?.isFlipped ? <img src={card?.value?.fields?.image?.url} alt="Flipped Card" /> : '?'}
      </div>
    </div>
  );
};

export default Card;