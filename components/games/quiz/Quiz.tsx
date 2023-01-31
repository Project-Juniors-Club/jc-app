import { Switch } from '@headlessui/react';
import React, { useState } from 'react';
import { QuizType } from './QuizGame';
import styles from './Quiz.module.css';
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
  const [selectedChoices, setSelectedChoices] = useState<(string | null)[]>([]);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedChoices.length === 0) {
      setErrorMessage('Please select at least one option');
      return;
    }
    setErrorMessage('');
    const correct = selectedChoices.length === answer.length && selectedChoices.every(choice => choice && answer.includes(choice));
    handleSubmitQuiz(correct);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (triggerNext) return;
    setSelectedChoices(selected => {
      const currentTarget = e.currentTarget;
      if (type === 'mcq') return [currentTarget.textContent];
      // getNamedItem returns null if the attribute is not found
      const ariaChecked = currentTarget.attributes.getNamedItem('aria-checked');
      if (ariaChecked && ariaChecked.value === 'false') {
        return [...selected, currentTarget.textContent];
      } else {
        return selected.filter(choice => choice !== currentTarget.textContent);
      }
    });
  };

  return (
    <div>
      <h1 className='mx-auto mt-24 h-48 w-2/3 text-6xl font-bold'>
        {text}, ({type})
      </h1>
      <form onSubmit={handleForm}>
        <div className='flex h-96 flex-col items-center justify-around'>
          {choices.map(choice => {
            const selected = selectedChoices.includes(choice);
            const correct = triggerNext && answer.includes(choice);
            const incorrect = triggerNext && selected && !answer.includes(choice);
            return (
              <Switch
                key={choice}
                onClick={handleClick}
                className={`w-1/3 border border-solid border-black py-6 ${selected ? 'outline outline-4 outline-green-400' : ''}  ${
                  correct ? 'bg-lime-300' : ''
                } ${incorrect ? styles.shake : ''}
                 ${triggerNext ? 'cursor-not-allowed' : ''}`}
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
