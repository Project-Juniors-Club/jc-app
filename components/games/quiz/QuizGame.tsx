import React, { useCallback, useMemo, useState } from 'react';
import Quiz from './Quiz';

export interface QuizType {
  title: string;
  choices: string[];
  answer: string[];
}
const quizes: QuizType[] = [
  { title: 'first quiz', choices: ['apple', 'orange', 'banana', 'brocolli'], answer: ['apple', 'orange', 'banana'] },
  { title: 'who is sus', choices: ['you', 'me', 'him'], answer: ['you', 'me'] },
  { title: 'yeet', choices: ['dab', 'yote'], answer: ['dab'] },
];
const QuizGame = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [triggerNext, setTriggerNext] = useState(false);
  const [endOfQuiz, setEndOfQuiz] = useState(false);
  const handleSubmitQuiz = (correct: boolean) => {
    if (correct) setScore(score + 1);
    if (index === quizes.length - 1) {
      setEndOfQuiz(true);
    }
    setTriggerNext(true);
  };
  const handleNextQuiz = useCallback(() => {
    setTriggerNext(false);
    setIndex(index + 1);
  }, [index]);
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
            onClick={() => {
              setIndex(0);
              setEndOfQuiz(false);
              setScore(0);
              setTriggerNext(false);
            }}
            className='mx-auto mt-4 block w-1/3 border border-solid border-black bg-blue-500 py-4'
          >
            Play again
          </button>
        )}
      </div>
    ),
    [endOfQuiz, handleNextQuiz, triggerNext],
  );

  return (
    <div>
      <Quiz
        key={quizes[index].title}
        quiz={quizes[index]}
        handleSubmitQuiz={handleSubmitQuiz}
        buttons={buttons}
        triggerNext={triggerNext}
      />
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
