import React, { useState } from 'react';
import { QuizType } from './QuizGame';
const Quiz = ({ quiz: { title, choices, answer }, handleNextQuiz }: { quiz: QuizType; handleNextQuiz: (correct: boolean) => void }) => {
  const [userChoices, setUserChoices] = useState([]);
  const handleSubmit = () => {
    const correct = userChoices.length === answer.length && userChoices.every(c => answer.includes(c));
    handleNextQuiz(correct);
  };
  return (
    <div>
      <h1 className='mx-auto mt-24 h-48 w-2/3 text-6xl font-bold'>{title}</h1>
      <div className='flex h-96 flex-col items-center justify-around'>
        {choices.map(choice => {
          return (
            <button
              className={`w-1/3 border border-solid border-black py-6 ${
                userChoices.includes(choice) ? 'outline outline-4 outline-green-400' : ''
              }`}
              key={choice}
              onClick={() => setUserChoices(prev => (prev.includes(choice) ? prev.filter(c => c !== choice) : [...prev, choice]))}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <div className='flex justify-center'>
        <button className='w-1/3 border border-solid border-black bg-blue-500 py-4' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;
