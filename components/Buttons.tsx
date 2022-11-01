import { Center, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { Component, ReactNode } from 'react';
import { JsxElement } from 'typescript';

type Props = {
  text?: String;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler;
  variant?: 'green-solid' | 'green-outline' | 'black-solid' | 'black-outline';
  children?: ReactNode;
};
const CustomButton = ({ variant = 'green-solid', isDisabled = false, isLoading = false, onClick = () => {}, children = null }: Props) => {
  let toShow;
  if (isLoading) {
    if (variant == 'black-solid') {
      toShow = <Spinner color='#FFFFFF' />;
    } else {
      toShow = <Spinner />;
    }
  } else {
    toShow = children;
  }
  const styling = getConfig(variant);
  console.log(styling);
  return (
    <button className={styling} disabled={isDisabled} onClick={onClick}>
      <Center>{toShow}</Center>
    </button>
  );
};

const getConfig = (variant: string) => {
  let colourConfig = '';
  const config =
    'font-normal w-[120px] h-[48px] rounded-lg border-[1px] disabled:opacity-50 disabled:pointer-events-none text-lg leading-[22px] font-sans';
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
