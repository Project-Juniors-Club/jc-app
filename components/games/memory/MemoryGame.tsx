import cards from './Cards';
import Grid from './Grid';
import { useEffect, useState } from 'react';
import Score from './Score';
import Card from './Card';

export interface CardObj {
  id: number;
  name: string;
  flipped: boolean;
  found: boolean;
}

const MemoryGame = () => {
  const [randomCards, setRandomCards] = useState<CardObj[] | null>(null);
  const [score, setScore] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<CardObj[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const randomiseCards = ({ cards }: { cards }) => {
    let randomOrderArr = [];
    let cardsArr = cards;
    for (let i = cardsArr.length; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * i);
      randomOrderArr.push(cardsArr[randomIndex]);
      cardsArr = [...cardsArr.slice(0, randomIndex), ...cardsArr.slice(randomIndex + 1)];
    }
    return randomOrderArr;
  };

  useEffect(() => {
    // compare selected cards
    if (selectedCards.length === 2) {
      if (randomCards) {
        setTurns(turns + 1);

        let newState: CardObj[] = [];
        // matching pair found
        if (selectedCards[0].name === selectedCards[1].name) {
          setScore(score + 1);
          newState = randomCards.map(card => {
            if (card.name === selectedCards[0].name) {
              return { ...card, found: true, flipped: false };
            }
            return card;
          });
        } else {
          // not matching
          newState = randomCards.map(card => {
            if (card.name === selectedCards[0].name || card.name === selectedCards[1].name) {
              return { ...card, flipped: false };
            }
            return card;
          });
        }
        setTimeout(() => {
          setRandomCards(newState);
          setSelectedCards([]);
        }, 1000);
      }
    }
  }, [selectedCards]);

  const handleClick = (cardIndex: number, card: CardObj) => {
    if (isPlaying && selectedCards.length < 2) {
      setFlippedStatus(cardIndex);
      updateSelectedCards(card);
    }
  };

  const setFlippedStatus = (cardIndex: number) => {
    if (randomCards) {
      if (randomCards[cardIndex].flipped === true || randomCards[cardIndex].found === true) {
        return;
      }

      const newState = randomCards.map((card, index) => {
        if (index === cardIndex) {
          return { ...card, flipped: true };
        }
        return card;
      });
      setRandomCards(newState);
    }
  };

  const updateSelectedCards = (card: CardObj) => {
    if (card.flipped === true) {
      return;
    }
    if (card.found === true) {
      return;
    }
    setSelectedCards([...selectedCards, card]);
  };

  const startGame = () => {
    const newState = randomiseCards({ cards });
    setRandomCards(newState);
    setIsPlaying(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <button className='m-2 rounded bg-blue-500 py-2 px-4 font-bold text-white' onClick={startGame}>
        Start
      </button>
      <Grid randomCards={randomCards} handleClick={handleClick} />
      <Score turns={turns} score={score} />
    </div>
  );
};

export default MemoryGame;
