import { Pair } from './Pair';
import Box from './Box';
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { StraightLine } from 'react-drawline';

const MatchingGame = () => {
  const senses: Pair[] = [
    { id: 1, leftpart: 'hand', rightpart: 'touch' },
    { id: 2, leftpart: 'nose', rightpart: 'smell' },
    { id: 3, leftpart: 'tongue', rightpart: 'taste' },
    { id: 4, leftpart: 'ear', rightpart: 'hear' },
    { id: 5, leftpart: 'eyes', rightpart: 'see' },
  ];
  let solvedPairs: Pair[] = [];
  let unsolvedPairs: Pair[] = [];
  let pairs: Pair[];

  for (let i = 0; i < senses.length; i++) {
    unsolvedPairs.push(senses[i]);
  }

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

  const items = unsolvedPairs.map(pair => (
    <li key={pair.id}>
      <Box ref={box1Ref} name={pair.leftpart}>
        {' '}
      </Box>
      <Box ref={box2Ref} name={pair.rightpart}>
        {' '}
      </Box>
      <StraightLine
        startingElement={{
          ref: box1Ref,
          x: 'left',
          y: 'mid',
        }}
        endingElement={{
          ref: box2Ref,
          x: 'center',
          y: 'top',
        }}
        style={{ backgroundColor: 'red' }}
        className='beautiful-class-name'
      />
    </li>
  ));

  return (
    <div>
      <p className='mt-4 text-center'> Draw lines between the pictures and the words that best go together.</p>
      <div className='flex flex-row justify-center'>
        <ul>{items} </ul>
      </div>
    </div>
  );
};

export default MatchingGame;
