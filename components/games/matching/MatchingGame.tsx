import { Pair } from './Pair';
import Box from './Box';

const MatchingGame = () => {
  const senses: Pair[] = [
    { id: 1, leftpart: 'hand', rightpart: 'taste' },
    { id: 2, leftpart: 'nose', rightpart: 'touch' },
    { id: 3, leftpart: 'tongue', rightpart: 'see' },
    { id: 4, leftpart: 'ear', rightpart: 'smell' },
    { id: 5, leftpart: 'eyes', rightpart: 'hear' },
  ];
  let solvedPairs: Pair[] = [];
  let unsolvedPairs: Pair[] = [];
  let pairs: Pair[];

  for (let i = 0; i < senses.length; i++) {
    unsolvedPairs.push(senses[i]);
  }

  const items = unsolvedPairs.map(pair => (
    <li key={pair.id}>
      <Box name={pair.leftpart}> </Box>
      <Box name={pair.rightpart}> </Box>
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
