import { Switch } from '@headlessui/react';
import React, { useState } from 'react';

const QuizOption = ({ choice, children, correct }: { choice: string; children: React.ReactNode; correct: boolean }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      onChange={setEnabled}
      className={`w-1/3 border border-solid border-black py-6 ${enabled ? 'outline outline-4 outline-green-400' : ''}  ${
        correct ? 'bg-lime-300' : ''
      }`}
      name={choice}
      checked={enabled}
    >
      {children}
    </Switch>
  );
};

export default QuizOption;
