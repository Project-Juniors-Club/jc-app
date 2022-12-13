import React, { useState } from 'react';
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
  const [endOfQuiz, setEndOfQuiz] = useState(false);
  const handleNextQuiz = (correct: boolean) => {
    if (endOfQuiz) return;
    if (correct) setScore(score + 1);
    if (index === quizes.length - 1) {
      setEndOfQuiz(true);
      return;
    }
    setIndex(index + 1);
  };
  return (
    <div>
      <Quiz key={quizes[index].title} quiz={quizes[index]} handleNextQuiz={handleNextQuiz} />
      {endOfQuiz && (
        <div>
          <button
            onClick={() => {
              setIndex(0);
              setEndOfQuiz(false);
              setScore(0);
            }}
            className='mx-auto mt-4 block w-1/3 border border-solid border-black bg-blue-500 py-4'
          >
            Play again
          </button>
          <p className='text-center text-6xl'>
            Your score is {score} / {quizes.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
