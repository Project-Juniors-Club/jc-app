import React, { useCallback, useMemo, useState } from 'react';
import Quiz from './Quiz';

export interface QuizType {
  text: string;
  choices: string[];
  answer: string[];
}
const quizes: QuizType[] = [
  { text: 'first quiz', choices: ['apple', 'orange', 'banana', 'brocolli'], answer: ['apple', 'orange', 'banana'] },
  { text: 'who is sus', choices: ['you', 'me', 'him'], answer: ['you', 'me'] },
  { text: 'yeet', choices: ['dab', 'yote'], answer: ['dab'] },
];
const QuizGame = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [triggerNext, setTriggerNext] = useState(false);
  const [endOfQuiz, setEndOfQuiz] = useState(false);
  const handleSubmitQuiz = useCallback(
    (correct: boolean) => {
      if (correct) setScore(score + 1);
      if (index === quizes.length - 1) {
        setEndOfQuiz(true);
      }
      setTriggerNext(true);
    },
    [index, score],
  );
  const handleNextQuiz = useCallback(() => {
    setTriggerNext(false);
    setIndex(index + 1);
  }, [index]);
  const handleReset = useCallback(() => {
    setIndex(0);
    setEndOfQuiz(false);
    setScore(0);
    setTriggerNext(false);
  }, []);
  const buttons = useMemo(
    () => (
      <div className='flex justify-center'>
        {!triggerNext && !endOfQuiz && (
          <button className='w-1/3 border border-solid border-black bg-blue-500 py-4' type='submit'>
            Submit
          </button>
        )}
        {triggerNext && !endOfQuiz && (
          <button className='w-1/3 border border-solid border-black bg-lime-500 py-4' onClick={handleNextQuiz} type='button'>
            Next
          </button>
        )}
        {endOfQuiz && (
          <button
            type='button'
            onClick={handleReset}
            className='mx-auto mt-4 block w-1/3 border border-solid border-black bg-blue-500 py-4'
          >
            Play again
          </button>
        )}
      </div>
    ),
    [endOfQuiz, handleNextQuiz, handleReset, triggerNext],
  );
  return (
    <div>
      <Quiz key={quizes[index].text} quiz={quizes[index]} handleSubmitQuiz={handleSubmitQuiz} buttons={buttons} triggerNext={triggerNext} />
      <div>
        {endOfQuiz && (
          <p className='text-center text-6xl'>
            Your score is {score} / {quizes.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
