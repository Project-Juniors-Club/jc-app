import { Pair } from './Pair';
import LeftBox from './LeftBox';
import RightBox from './RightBox';

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

  let leftChosen = 0;
  let rightChosen = 0;

  for (let i = 0; i < senses.length; i++) {
    unsolvedPairs.push(senses[i]);
  }

  let solved = 'Solved:';

  // CHECK IF PAIR IS SOLVED
  const checkPair = id => {
    rightChosen = id;
    if (leftChosen == rightChosen) {
      solved += '\n' + id.toString();
      alert(solved);
      for (let i = 0; i < unsolvedPairs.length; i++) {
        if (unsolvedPairs[i].id == id) {
          solvedPairs.push(unsolvedPairs[i]);
          unsolvedPairs.splice(i, 1);
        }
      }
    }
  };

  // ADD LEFT VALUE
  const addPair = id => {
    leftChosen = id;
  };

  const leftRandom = unsolvedPairs.map(pair => (
    // LEFT SIDE
    <li key={pair.id}>
      <LeftBox name={pair.leftpart} handleMouseDown={() => addPair(pair.id)}>
        {' '}
      </LeftBox>
    </li>
  ));

  const rightRandom = unsolvedPairs.map(pair => (
    // RIGHT SIDE
    <li key={pair.id}>
      <RightBox name={pair.rightpart} id={pair.id} handleMouseUp={() => checkPair(pair.id)}>
        {' '}
      </RightBox>
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
