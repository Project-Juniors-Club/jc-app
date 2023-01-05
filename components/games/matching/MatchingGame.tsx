import { Pair } from './Pair';
import Box from './Box';

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

  let leftChosen = 0;
  let rightChosen = 0;

  for (let i = 0; i < senses.length; i++) {
    unsolvedPairs.push(senses[i]);
  }

  let solved = 'Solved:';
  const setClicked = (id, position) => {
    if (position == 'left') {
      leftChosen = id;
    } else if (position == 'right') {
      rightChosen = id;
    }
    console.log(leftChosen + ' ' + rightChosen);
    if (leftChosen == rightChosen) {
      solved += '\n' + id.toString();
      for (let i = 0; i < unsolvedPairs.length; i++) {
        if (unsolvedPairs[i].id == id) {
          solvedPairs.push(unsolvedPairs[i]);
          unsolvedPairs.splice(i, 1);
        }
      }
    }
  };

  const leftRandom = unsolvedPairs.map(pair => (
    // LEFT SIDE
    <li key={pair.id}>
      <Box name={pair.leftpart} isClicked={() => setClicked(pair.id, 'left')}>
        {' '}
      </Box>
    </li>
  ));

  const rightRandom = unsolvedPairs.map(pair => (
    // RIGHT SIDE
    <li key={pair.id}>
      <Box name={pair.rightpart} id={pair.id} isClicked={() => setClicked(pair.id, 'right')}>
        {' '}
      </Box>
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
