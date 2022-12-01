import { Center, Spinner } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Variants = 'green-solid' | 'green-outline' | 'black-solid' | 'black-outline';

type Props = {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler;
  variant?: Variants;
  children?: ReactNode;
};

const CustomButton = ({
  className = '',
  variant = 'green-solid',
  isDisabled = false,
  isLoading = false,
  onClick = () => {},
  children = null,
}: Props) => {
  let toShow;
  if (isLoading) {
    if (variant === 'black-solid') {
      toShow = <Spinner color='#FFFFFF' />;
    } else {
      toShow = <Spinner />;
    }
  } else {
    toShow = children;
  }
  const styling = getConfig(variant) + className;
  return (
    <button className={styling} disabled={isDisabled} onClick={onClick}>
      <Center>{toShow}</Center>
    </button>
  );
};

const getConfig = (variant: string) => {
  let colourConfig = '';
  const config =
    'font-normal w-[120px] h-[48px] rounded-lg border-[1px] disabled:opacity-50 disabled:pointer-events-none text-lg leading-[22px] font-sans ';
  switch (variant) {
    case 'green-solid':
      colourConfig = 'bg-[#A9D357] border-[#7FB519] hover:bg-[#7FB519] ';
      break;
    case 'green-outline':
      colourConfig = 'bg-[#FFFFFF] border-[#7FB519] hover:bg-[#EBF8D3] ';
      break;
    case 'black-solid':
      colourConfig = 'bg-[#4D4D4D] border-[#2D2D2D] hover:bg-[#2D2D2D] ';
      break;
    case 'black-outline':
      colourConfig = 'bg-[#FFFFFF] border-[#131313] hover:bg-[#B5B5B5] ';
      break;
  }

  return colourConfig + config;
};

export default CustomButton;
