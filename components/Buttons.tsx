import { Center, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { Component, ReactNode } from 'react';
import { JsxElement } from 'typescript';

type Props = {
  text?: String;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => any;
  icon: ReactNode;
  variant: 'green-solid' | 'green-outline' | 'black-solid' | 'black-outline';
};

export const CustomButton = ({ variant, text, isDisabled = false, isLoading = false, onClick = () => {}, icon = null }: Props) => {
  let toShow;
  if (isLoading) {
    toShow = <Spinner />;
  } else {
    toShow = (
      <HStack>
        <Text>{text}</Text>
        {icon != null && icon}
      </HStack>
    );
  }

  let component: JSX.Element;
  switch (variant) {
    case 'green-solid':
      component = (
        <button
          className='bg-[#A9D357] font-normal w-[120px] h-[48px] rounded-lg border-[#7FB519] border-[1px] hover:bg-[#7FB519] disabled:opacity-50 disabled:pointer-events-none text-lg leading-[22px] font-sans'
          disabled={isDisabled}
          onClick={onClick}
        >
          <Center>{toShow}</Center>
        </button>
      );
      break;
    case 'green-outline':
      component = (
        <button
          className='bg-[#FFFFFF] font-normal w-[120px] h-[48px] rounded-lg border-[#7FB519] border-[1px] hover:bg-[#EBF8D3] disabled:opacity-50 disabled:pointer-events-none text-lg leading-[22px] font-sans'
          disabled={isDisabled}
          onClick={onClick}
        >
          <Center>{toShow}</Center>
        </button>
      );
      break;
    case 'black-solid':
      toShow = isLoading ? (
        (toShow = <Spinner color='#FFFFFF' />)
      ) : (
        <HStack>
          <Text color='#FFFFFF'>{text}</Text>
          {icon != null && icon}
        </HStack>
      );
      component = (
        <button
          className='bg-[#4D4D4D] font-normal w-[120px] h-[48px] rounded-lg border-[#2D2D2D] border-[1px] hover:bg-[#2D2D2D] disabled:opacity-50 disabled:pointer-events-none text-lg leading-[22px] font-sans'
          disabled={isDisabled}
          onClick={onClick}
        >
          <Center>{toShow}</Center>
        </button>
      );
      break;
    case 'black-outline':
      component = (
        <button
          className='bg-[#FFFFFF] font-normal w-[120px] h-[48px] rounded-lg border-[#131313] border-[1px] hover:bg-[#B5B5B5] disabled:opacity-50 disabled:pointer-events-none text-lg leading-[22px] font-sans'
          disabled={isDisabled}
          onClick={onClick}
        >
          <Center>{toShow}</Center>
        </button>
      );
      break;
  }
  return component;
};
