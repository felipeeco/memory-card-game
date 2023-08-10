// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './card.js';

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const App = () => {
  const [cards, setCards] = useState(generateCards());


  useEffect(()=> {
    fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=8')
    .then(response => response.json())
    .then(data => {
      const shuffledValues = [...data?.entries, ...data?.entries].sort(() => Math.random() - 0.5);
      const selectedValues = shuffledValues.slice(0, 15);
      console.log(selectedValues);
      return selectedValues.map((value, index) => ({ id: index, value, isFlipped: false }));
    })
    .catch(error => {
      
      console.error("Error fetching data:", error);
    });
  }, []); 

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
          <h3>Aciertos: 3 - Errores: 2</h3>
          {cards.map(card => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
