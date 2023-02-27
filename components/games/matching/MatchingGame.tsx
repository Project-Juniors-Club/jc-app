import { Pair } from './Pair';
import LeftBox from './LeftBox';
import RightBox from './RightBox';
import { HtmlHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';

const NUM_OF_PAIRS = 5;

const pairs: Pair[] = [
  { id: 1, leftpart: 'hand', rightpart: 'touch' },
  { id: 2, leftpart: 'nose', rightpart: 'smell' },
  { id: 3, leftpart: 'tongue', rightpart: 'taste' },
  { id: 4, leftpart: 'ear', rightpart: 'hear' },
  { id: 5, leftpart: 'eyes', rightpart: 'see' },
];

// const MARGIN_LEFT_OFFSET = 1500;
const MARGIN_TOP_OFFSET = 72;

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 900;

const MatchingGame = () => {
  const canvasStyle = {
    width: 'fit-content',
    margin: 'auto',
  };

  const [marginLeft, setMarginLeft] = useState(0);
  const ref = useRef<HTMLCanvasElement>(null);
  const [solved, setSolved] = useState(0);
  const [leftSelected, setLeftSelected] = useState(0);
  const [leftCoordinates, setLeftCoordinates] = useState<{ x: number; y: number }>();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (ref == null || ref.current == null) return;
    const ctx = ref.current.getContext('2d');
    setContext(ctx);
  }, []);

  const retrieveMargin = (elm: Element | null) => {
    if (elm != null) {
      let styles = window.getComputedStyle(elm);
      let ml = styles.getPropertyValue('margin-left');
      setMarginLeft(Number.parseInt(ml.replace('px', '')));
    }
  };

  // to prevent double counting
  const [solvedIds, setSolvedIds] = useState<number[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (e.target.dataset.column === 'left') {
      if (context == null) return;
      if (e.target.dataset.id == null) return;
      setLeftSelected(parseInt(e.target.dataset.id));

      if (marginLeft == null) return;
      setLeftCoordinates({ x: e.clientX - marginLeft, y: e.clientY - MARGIN_TOP_OFFSET });
      context.save();
    } else if (e.target.dataset.column === 'right') {
      if (e.target.dataset.id == null) return;
      checkPair(e, parseInt(e.target.dataset.id));
      setLeftSelected(-1);
    }
  };

  // CHECK IF PAIR IS SOLVED
  const checkPair = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    const rightChosen = id;
    if (leftSelected === rightChosen && !solvedIds.includes(leftSelected)) {
      setSolved(solved + 1);
      setSolvedIds([...solvedIds, leftSelected]);
      setLeftSelected(0);
      context.beginPath();
      context.moveTo(leftCoordinates.x, leftCoordinates.y);
      context.lineTo(e.clientX - marginLeft, e.clientY - MARGIN_TOP_OFFSET);
      context.stroke();
    } else {
      if (context == null) return;
      context.restore();
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
        <h1 className='bold text-center text-2xl'>Correct: {solved}</h1>
        <p className='mt-4 text-center'> Draw lines between the pictures and the words that best go together.</p>
        <div className='relative m-auto flex flex-row' style={canvasStyle} ref={retrieveMargin} onClick={e => handleClick(e)}>
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
