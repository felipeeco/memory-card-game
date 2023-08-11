// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './card.js';

const App = () => {

  const [cards, setCards] = useState([]);
  const [success, setSuccess] = useState(0);
  const [fail, setFail] = useState(0);

  useEffect(()=> {
    fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=5')
    .then(response => response.json())
    .then(data => {
      const shuffledValues = [...data?.entries, ...data?.entries].sort(() => Math.random() - 0.5);
      const filteredValues = shuffledValues.map((value, index) => ({ 
        id: index, 
        value, 
        isFlipped: false, 
        isEqual: false, 
      }));
      setCards(filteredValues);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []); 

  function handleCardClick(clickedCard) {
    //define parameters
    let updatedCards = [];
    let countIsFlippedCards = 0;

    updatedCards = cards.map(card =>
      card?.id === clickedCard?.id ? { ...card, isFlipped: true } : card
    )

    updatedCards.forEach((currentValue) => {
      if (currentValue.isFlipped && !currentValue.isEqual) {
        countIsFlippedCards++;
      }
    });
    
    if(countIsFlippedCards === 2) {
      const isFlippedCard = updatedCards.filter((card) => {
        return card.isFlipped && !card.isEqual
      });
  
      if(isFlippedCard[0].value?.meta?.name === isFlippedCard[1].value?.meta?.name){
        countIsFlippedCards = 0;
        updatedCards = updatedCards.map((card) => {

          if(card.isEqual) {
            return { ...card, isEqual: true }
          }

          if(card?.value?.meta?.name === isFlippedCard[0].value?.meta?.name){
            return { ...card, isEqual: true }
          }
          
          return { ...card, isEqual: false }
        });
        setSuccess((value) => value + 1);
      }else{
          updatedCards = cards.map((card) => {
            if(card.isEqual === true){
              return { ...card, isFlipped: true }
            }else {
              return { ...card, isFlipped: false }
            }
          });
          setFail((value) => value + 1);
      }
    }

    setCards(updatedCards);
  }

  return (
    <div className="App">
      <div className="container text-center">
        <div className='row justify-content-center align-items-center'>
          <h3>Aciertos: {success} - Errores: {fail}</h3>
          {cards && cards.map(card => (
            <Card key={card?.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
