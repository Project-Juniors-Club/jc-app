import { Pair } from './Pair';

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

  return (
    <div>
      <p className='mt-4 text-center'> Draw lines between the pictures and the words that best go together.</p>
      {/* <div id="game">
                <div className="items-left">
                <button> 
                    {{pair.leftpart}}
                </button>
                </div>

                <div className="items-right">
                <button> 
                    {{pair.rightpart}}
                </button>
                </div>
            </div> */}
    </div>
  );
};

export default MatchingGame;
