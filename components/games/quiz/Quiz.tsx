import React, { useState } from 'react';
import { QuizType } from './QuizGame';
import QuizOption from './QuizOption';
const Quiz = ({
  quiz: { text: title, choices, answer },
  handleSubmitQuiz,
  buttons,
  triggerNext,
}: {
  quiz: QuizType;
  handleSubmitQuiz: (correct: boolean) => void;
  buttons: React.ReactNode;
  triggerNext: boolean;
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const handleForm = e => {
    e.preventDefault();
    const selected = choices.filter(choice => e.target[choice]?.checked);
    if (selected.length === 0) {
      setErrorMessage('Please select at least one option');
      return;
    }
    setErrorMessage('');
    const correct = choices.reduce((acc, choice) => {
      if (!acc) return false;
      const input = e.target[choice];
      if (input) {
        return e.target[choice].checked === answer.includes(choice);
      } else {
        return !answer.includes(choice);
      }
    }, true);
    handleSubmitQuiz(correct);
  };
  return (
    <div>
      <h1 className='mx-auto mt-24 h-48 w-2/3 text-6xl font-bold'>{title}</h1>
      <form onSubmit={handleForm}>
        <div className='flex h-96 flex-col items-center justify-around'>
          {choices.map(choice => {
            const correct = triggerNext && answer.includes(choice);
            return (
              <QuizOption key={choice} choice={choice} correct={correct} triggerNext={triggerNext}>
                {choice}
              </QuizOption>
            );
          })}
        </div>
        {buttons}
        {errorMessage && <p className='text-center text-red-500'>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Quiz;
