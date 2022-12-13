import React from 'react';
import { QuizType } from './QuizGame';
import QuizOption from './QuizOption';
const Quiz = ({ quiz: { title, choices, answer }, handleNextQuiz }: { quiz: QuizType; handleNextQuiz: (correct: boolean) => void }) => {
  const handleForm = e => {
    e.preventDefault();
    const correct = choices.reduce((acc, choice) => {
      if (!acc) return false;
      const input = e.target[choice];
      if (input) {
        return e.target[choice].checked === answer.includes(choice);
      } else {
        return !answer.includes(choice);
      }
    }, true);
    handleNextQuiz(correct);
  };
  return (
    <div>
      <h1 className='mx-auto mt-24 h-48 w-2/3 text-6xl font-bold'>{title}</h1>
      <form onSubmit={handleForm}>
        <div className='flex h-96 flex-col items-center justify-around'>
          {choices.map(choice => {
            return (
              <QuizOption key={choice} choice={choice}>
                {choice}
              </QuizOption>
            );
          })}
        </div>
        <div className='flex justify-center'>
          <button className='w-1/3 border border-solid border-black bg-blue-500 py-4' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
