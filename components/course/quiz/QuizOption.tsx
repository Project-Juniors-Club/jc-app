import { Spinner } from '@chakra-ui/react';
import React, { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Variants = 'green-solid' | 'green-outline' | 'black-solid' | 'black-outline';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isShow?: boolean;
  children?: ReactNode;
}

export const QuizOption = ({ className = '', isSelected = false, isCorrect = false, isShow = false, children = null, ...rest }: Props) => {
  let color = '#D9D9D9';
  if (isSelected && !isShow) {
    color = '#A5A6F6';
  } else if (isSelected && isShow) {
    if (isCorrect) {
      color = '#A9D357';
    } else {
      color = '#C90707';
    }
  }

  const backgroundStyle: CSSProperties = {
    backgroundColor: `${color}`,
  };
  return (
    <div className='flex' style={backgroundStyle}>
      <input className='' type='radio' checked={isSelected} />
      {children}
    </div>
  );
};
