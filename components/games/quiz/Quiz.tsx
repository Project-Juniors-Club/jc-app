import { Switch } from '@headlessui/react';
import React, { useState } from 'react';
import { QuizType } from './QuizGame';
const Quiz = ({
  quiz: { text, type, choices, answer },
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
  const [selectedChoices, setSelectedChoices] = useState([]);
  const handleForm = e => {
    e.preventDefault();
    if (selectedChoices.length === 0) {
      setErrorMessage('Please select at least one option');
      return;
    }
    setErrorMessage('');
    const correct = selectedChoices.length === answer.length && selectedChoices.every(choice => answer.includes(choice));
    handleSubmitQuiz(correct);
  };
  const handleClick = e => {
    if (triggerNext) return;
    setSelectedChoices(selected => {
      if (type === 'mcq') return [e.target.textContent];
      if (e.target.ariaChecked === 'false') {
        return [...selected, e.target.textContent];
      } else {
        return selected.filter(choice => choice !== e.target.textContent);
      }
    });
  };
  return (
    <div>
      <h1 className='mx-auto mt-24 h-48 w-2/3 text-6xl font-bold'>{text}</h1>
      <form onSubmit={handleForm}>
        <div className='flex h-96 flex-col items-center justify-around'>
          {choices.map(choice => {
            const correct = triggerNext && answer.includes(choice);
            const selected = selectedChoices.includes(choice);
            return (
              <Switch
                key={choice}
                onClick={handleClick}
                className={`w-1/3 border border-solid border-black py-6 ${selected ? 'outline outline-4 outline-green-400' : ''}  ${
                  correct ? 'bg-lime-300' : ''
                } ${triggerNext ? 'cursor-not-allowed' : ''}`}
                name={choice}
              >
                {choice}
              </Switch>
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
