import { Pair } from './Pair';
import LeftBox from './LeftBox';
import RightBox from './RightBox';
import { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';

const NUM_OF_PAIRS = 5;

const pairs: Pair[] = [
  { id: 1, leftpart: 'hand', rightpart: 'touch' },
  { id: 2, leftpart: 'nose', rightpart: 'smell' },
  { id: 3, leftpart: 'tongue', rightpart: 'taste' },
  { id: 4, leftpart: 'ear', rightpart: 'hear' },
  { id: 5, leftpart: 'eyes', rightpart: 'see' },
];

const MARGIN_LEFT_OFFSET = 400;
const MARGIN_TOP_OFFSET = 40;

const CANVAS_WIDTH = 520;
const CANVAS_HEIGHT = 900;

const MatchingGame = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [solved, setSolved] = useState(0);
  const [leftSelected, setLeftSelected] = useState(0);
  const [leftCoordinates, setLeftCoordinates] = useState<{ x: number; y: number }>();

  // to prevent double counting
  const [solvedIds, setSolvedIds] = useState<number[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (e.target.dataset.column === 'left') {
      if (e.target.dataset.id == null) return;
      setLeftSelected(parseInt(e.target.dataset.id));
      setLeftCoordinates({ x: e.clientX - MARGIN_LEFT_OFFSET, y: e.clientY - MARGIN_TOP_OFFSET });
    } else if (e.target.dataset.column === 'right') {
      if (e.target.dataset.id == null) return;
      checkPair(e, parseInt(e.target.dataset.id));
      setLeftSelected(-1);
    }
  };
  const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (leftSelected === -1) return;
    if (ref == null || ref.current == null) return;
    const ctx = ref.current.getContext('2d');
    if (ctx == null) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.beginPath();
    if (leftCoordinates == null) return;
    ctx.moveTo(leftCoordinates.x, leftCoordinates.y);
    ctx.lineTo(e.clientX - MARGIN_LEFT_OFFSET, e.clientY - MARGIN_TOP_OFFSET);
    ctx.stroke();
  };

  // CHECK IF PAIR IS SOLVED
  const checkPair = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    const rightChosen = id;
    if (leftSelected == rightChosen && !solvedIds.includes(leftSelected)) {
      setSolved(solved + 1);
      setSolvedIds([...solvedIds, leftSelected]);
    }
  };

  // TO RANDOMISE THE RIGHT SIDE
  const [randomArray, setRandomArray] = useState<Pair[]>([]);
  useEffect(() => {
    const randomizeArray: Pair[] = [...pairs].sort(() => 0.5 - Math.random());
    setRandomArray(randomizeArray.slice(0, NUM_OF_PAIRS));
  }, []);

  const leftRandom = pairs.map(pair => (
    // LEFT SIDE
    <li key={pair.id}>
      <LeftBox id={pair.id} name={pair.leftpart} selected={leftSelected} />
    </li>
  ));

  const rightRandom = randomArray.map(pair => (
    // RIGHT SIDE
    <li key={pair.id}>
      <RightBox id={pair.id} name={pair.rightpart} />
    </li>
  ));

  return (
    <>
      <div>
        <p className='mt-4 text-center'> Draw lines between the pictures and the words that best go together.</p>
        <div className='relative ml-[400px] flex flex-row' onClick={e => handleClick(e)} onMouseMove={e => handleMove(e)}>
          <canvas ref={ref} width={520} height={900} className='absolute -z-10 '></canvas>
          <ul>{leftRandom} </ul>
          <ul>{rightRandom} </ul>
        </div>
      </div>
      <p className='mt-4 text-center'>{solved} solved</p>
    </>
  );
};

export default MatchingGame;
