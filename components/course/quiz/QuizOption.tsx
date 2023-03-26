import { Spinner } from '@chakra-ui/react';
import React, { CSSProperties, Dispatch, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Variants = 'green-solid' | 'green-outline' | 'black-solid' | 'black-outline';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isShow?: boolean;
  currentSelected?: number;
  name?: string;
  index?: number;
  children?: ReactNode;
  setSelected?: Dispatch<any>;
}

export const QuizOption = ({
  className = '',
  name = '',
  index = 0,
  currentSelected = 1,
  isCorrect = false,
  isShow = false,
  setSelected = null,
  children = null,
  ...rest
}: Props) => {
  let color = '#D9D9D9';
  let isSelected = currentSelected == index;
  console.log(isSelected, index);
  if (isSelected && !isShow) {
    color = '#A5A6F6'; // Purple
  } else if (isSelected && isShow) {
    if (isCorrect) {
      color = '#A9D357'; // Green
    } else {
      color = '#C90707'; //red
    }
  }

  const backgroundStyle: CSSProperties = {
    backgroundColor: `${color}`,
  };
  return (
    <div className='m-2 flex w-10/12 rounded-md p-2 align-middle' style={backgroundStyle}>
      <div className='mr-2 flex flex-col justify-center text-center align-middle'>
        <input className='translate-y-[-0.125rem]' type='radio' name={name} disabled={isShow} onChange={() => setSelected(index)} />
      </div>
      {children}
    </div>
  );
};
