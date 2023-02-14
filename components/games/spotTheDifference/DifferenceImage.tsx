import { Box, Image } from '@chakra-ui/react';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from './constants';
import { DifferenceBoxInfo } from './DifferenceBox';
import styles from './Game.module.css';

interface DifferenceImageProps {
  alt: string;
  src: string;
  coordinates: DifferenceBoxInfo[];
  updateCoordinateVisibility: (id: number) => void;
  showCoordinates: boolean[];
}

const DifferenceImage = ({ alt, src, coordinates, updateCoordinateVisibility, showCoordinates }: DifferenceImageProps) => {
  return (
    <div className='relative m-5 min-w-fit'>
      {coordinates.map((coord, id) => {
        return (
          <Box
            onClick={() => updateCoordinateVisibility(id)}
            key={id}
            w={`${coord.width}px`}
            h={`${coord.height}px`}
            position='absolute'
            left={`${coord.x}px`}
            top={`${coord.y}px`}
            zIndex={2}
            className={showCoordinates[id] ? `${styles.animate} rounded-md border-[3px] border-red-500` : ''}
          />
        );
      })}
      <Image src={src} alt={alt} height={IMAGE_HEIGHT} width={IMAGE_WIDTH} className='relative' />
    </div>
  );
};

export default DifferenceImage;
