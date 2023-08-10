// App.js
import React, { useState } from 'react';
import './App.css';
import Card from './card.js';

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const App = () => {
  const [cards, setCards] = useState(generateCards());

  function generateCards() {
    const shuffledValues = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
    const selectedValues = shuffledValues.slice(0, 15);
    return selectedValues.map((value, index) => ({ id: index, value, isFlipped: false }));
  }
  

  function handleCardClick(clickedCard) {
    const updatedCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    setCards(updatedCards);
  }

  return (
    <div className="App">
      <div className="container text-center">
        <div className='row justify-content-center align-items-center'>
          {cards.map(card => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
