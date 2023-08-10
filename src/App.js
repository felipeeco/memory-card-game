// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './card.js';

const App = () => {
  const [cards, setCards] = useState([]);


  useEffect(()=> {
    fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=8')
    .then(response => response.json())
    .then(data => {
      const shuffledValues = [...data?.entries, ...data?.entries].sort(() => Math.random() - 0.5);
      const selectedValues = shuffledValues.slice(0, 15);
      const filteredValues = selectedValues.map((value, index) => ({ id: index, value, isFlipped: false }));
      setCards(filteredValues);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []); 
  
  function handleCardClick(clickedCard) {
    const updatedCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    setCards(updatedCards);
  }

  console.log(cards);
  return (
    <div className="App">
      <div className="container text-center">
        <div className='row justify-content-center align-items-center'>
          <h3>Aciertos: 3 - Errores: 2</h3>
          {cards && cards.map(card => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
