import React from 'react';
import { QuizType } from './QuizGame';
import QuizOption from './QuizOption';
const Quiz = ({
  quiz: { title, choices, answer },
  handleSubmitQuiz,
  buttons,
  triggerNext,
}: {
  quiz: QuizType;
  handleSubmitQuiz: (correct: boolean) => void;
  buttons: JSX.Element;
  triggerNext: boolean;
}) => {
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
              <QuizOption key={choice} choice={choice} correct={correct}>
                {choice}
              </QuizOption>
            );
          })}
        </div>
        {buttons}
      </form>
    </div>
  );
};

export default Quiz;
