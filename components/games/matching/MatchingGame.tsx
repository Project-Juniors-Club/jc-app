import { Pair } from './Pair';
import LeftBox from './LeftBox';
import RightBox from './RightBox';
import { HtmlHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { createTextChangeRange } from 'typescript';

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
  const [leftSelected, setLeftSelected] = useState('');
  const [leftCoordinates, setLeftCoordinates] = useState<{ x: number; y: number }>();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (ref == null || ref.current == null) return;
    const ctx = ref.current.getContext('2d');
    setContext(ctx);
  }, []);

  const handleClick = e => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (e.target.dataset.column === 'left') {
      if (context == null) return;
      setLeftSelected(e.target.dataset.id);
      setLeftCoordinates({ x: e.clientX - MARGIN_LEFT_OFFSET, y: e.clientY - MARGIN_TOP_OFFSET });
      context.save();
    } else if (e.target.dataset.column === 'right') {
      checkPair(e, e.target.dataset.id);
    }
  };
  const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (leftSelected === '') return;
    if (context == null) return;
    context.restore();
    context.save();
    context.beginPath();
    context.moveTo(leftCoordinates.x, leftCoordinates.y);
    context.lineTo(e.clientX - MARGIN_LEFT_OFFSET, e.clientY - MARGIN_TOP_OFFSET);
    context.stroke();
  };

  // CHECK IF PAIR IS SOLVED
  const checkPair = (e, id) => {
    const rightChosen = id;
    if (leftSelected === rightChosen.toString()) {
      setSolved(solved + 1);
      setLeftSelected('');
    } else {
      if (context == null) return;
      context.restore();
    }
  };

  // TO RANDOMISE THE RIGHT SIDE
  const [randomArray, setRandomArray] = useState([]);
  useEffect(() => {
    const randomizeArray = [...pairs].sort(() => 0.5 - Math.random());
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
