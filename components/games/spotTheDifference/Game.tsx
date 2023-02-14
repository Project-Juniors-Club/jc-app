import { CheckIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { DifferenceBoxInfo } from './DifferenceBox';
import DifferenceImage from './DifferenceImage';
import styles from './Game.module.css';

interface GameProps {
  diffBoxes: DifferenceBoxInfo[];
  leftImageSrc: string;
  rightImageSrc: string;
}
const Game = ({ diffBoxes, leftImageSrc, rightImageSrc }: GameProps) => {
  const defaultShowCoordinates = new Array(diffBoxes.length).fill(false);

  const [isShowDiffBoxes, setIsShowDiffBoxes] = useState(defaultShowCoordinates);

  const updateVisibility = (id: number) => {
    const newIsShowDiffBoxes = [...isShowDiffBoxes];
    newIsShowDiffBoxes[id] = true;
    setIsShowDiffBoxes(newIsShowDiffBoxes);
  };

  return (
    <>
      <Text fontSize='3xl' as='b'>
        Spot The Difference
      </Text>
      <div className='flex'>
        <DifferenceImage
          src={leftImageSrc}
          alt='leftImage'
          showCoordinates={isShowDiffBoxes}
          updateCoordinateVisibility={updateVisibility}
          coordinates={diffBoxes}
        />
        <DifferenceImage
          src={rightImageSrc}
          alt='rightImage'
          showCoordinates={isShowDiffBoxes}
          updateCoordinateVisibility={updateVisibility}
          coordinates={diffBoxes}
        />
      </div>
      <Text fontSize='2xl' as='b'>
        {`Find ${diffBoxes.length} differences:`}
      </Text>
      <div className='flex'>
        {isShowDiffBoxes.map((isShow, i) => {
          return (
            <div
              key={i}
              className={`mx-2 flex h-5 w-5 items-center justify-center ${isShow ? `${styles.animate} bg-[#A9D357]` : 'border-2'}`}
            >
              {isShow && <CheckIcon color='white' />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Game;
