import { Switch } from '@headlessui/react';
import React, { useState } from 'react';

const QuizOption = ({
  choice,
  children,
  correct,
  triggerNext,
}: {
  choice: string;
  children: React.ReactNode;
  correct: boolean;
  triggerNext: boolean;
}) => {
  const [enabled, setEnabled] = useState(false);
  const handleClick = () => {
    if (triggerNext) return;
    setEnabled(!enabled);
  };
  return (
    <Switch
      onChange={handleClick}
      className={`w-1/3 border border-solid border-black py-6 ${enabled ? 'outline outline-4 outline-green-400' : ''}  ${
        correct ? 'bg-lime-300' : ''
      } ${triggerNext ? 'cursor-not-allowed' : ''}`}
      name={choice}
      checked={enabled}
    >
      {children}
    </Switch>
  );
};

export default QuizOption;
