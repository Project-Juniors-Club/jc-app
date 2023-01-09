import { Pair } from './Pair';
import LeftBox from './LeftBox';
import RightBox from './RightBox';
import { useEffect, useState } from 'react';

const MatchingGame = () => {
  const NUM_OF_PAIRS = 5;
  const senses: Pair[] = [
    { id: 1, leftpart: 'hand', rightpart: 'touch' },
    { id: 2, leftpart: 'nose', rightpart: 'smell' },
    { id: 3, leftpart: 'tongue', rightpart: 'taste' },
    { id: 4, leftpart: 'ear', rightpart: 'hear' },
    { id: 5, leftpart: 'eyes', rightpart: 'see' },
  ];
  let solvedPairs: Pair[] = [];
  let unsolvedPairs: Pair[] = [];

  let leftChosen = 0;
  let rightChosen = 0;

  for (let i = 0; i < senses.length; i++) {
    unsolvedPairs.push(senses[i]);
  }

  // CHECK IF PAIR IS SOLVED
  const checkPair = id => {
    rightChosen = id;
    if (leftChosen == rightChosen) {
      console.log(id + ' is solved!');
      for (let i = 0; i < unsolvedPairs.length; i++) {
        if (unsolvedPairs[i].id == id) {
          solvedPairs.push(unsolvedPairs[i]);
          unsolvedPairs.splice(i, 1);
        }
      }
    } else {
      console.log('Incorrect');
    }
    if (unsolvedPairs.length == 0) {
      console.log('All are solved!');
    }
  };

  // ADD LEFT VALUE
  const addPair = id => {
    leftChosen = id;
  };

  // TO RANDOMISE THE RIGHT SIDE
  const [randomArray, setRandomArray] = useState([]);
  useEffect(() => {
    const randomizeArray = [...unsolvedPairs].sort(() => 0.5 - Math.random());
    setRandomArray(randomizeArray.slice(0, NUM_OF_PAIRS));
  }, []);

  const leftRandom = unsolvedPairs.map(pair => (
    // LEFT SIDE
    <li key={pair.id}>
      <LeftBox name={pair.leftpart} handleMouseDown={() => addPair(pair.id)} />
    </li>
  ));

  const rightRandom = randomArray.map(pair => (
    // RIGHT SIDE
    <li key={pair.id}>
      <RightBox name={pair.rightpart} handleMouseUp={() => checkPair(pair.id)} />
    </li>
  ));

  return (
    <div>
      <p className='mt-4 text-center'> Draw lines between the pictures and the words that best go together.</p>
      <div className='flex flex-row justify-center'>
        <ul>{leftRandom} </ul>
        <ul>{rightRandom} </ul>
      </div>
    </div>
  );
};

export default MatchingGame;
