import { v4 as uuidv4 } from 'uuid';
import { KonvaEventObject } from 'konva/lib/Node';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layer, Stage } from 'react-konva';
import { useRecoilState } from 'recoil';
import { diffBoxesInfoState } from '../../../atoms/atoms';
import UploadImageButtonWithPreview from '../../UploadImageButtonWithPreview';
import DifferenceBox from './DifferenceBox';
import { Text } from '@chakra-ui/react';
import Button from '../../Button';
import { IMAGE_HEIGHT, IMAGE_WIDTH, LEFT_IMAGE_LABEL, RIGHT_IMAGE_LABEL } from './constants';

export default function SetUp() {
  const [diffBoxes, setDiffBoxes] = useRecoilState(diffBoxesInfoState);
  const [selectedDiffBoxId, setSelectedDiffBoxId] = useState<string | null>();

  const image = new Image();
  image.onload = () => {
    image.src = './a.png';
  };

  const addDiffBox = () => {
    const uuid = uuidv4();
    const newDiffBox = { id: uuid, x: 10, y: 10, width: 50, height: 50 };
    const newDiffBoxes = [...diffBoxes];
    newDiffBoxes.push(newDiffBox);
    setDiffBoxes(newDiffBoxes);
  };

  const checkDeselect = (e: KonvaEventObject<MouseEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedDiffBoxId(null);
    }
  };

  const leftImageUseForm = useForm({});
  const rightImageUseForm = useForm({});
  const { getValues: getLeftImageValues } = leftImageUseForm;
  const { getValues: getRightImageValues } = rightImageUseForm;

  console.log(diffBoxes);

  const deleteDiffBox = () => {
    setSelectedDiffBoxId(null);
    setDiffBoxes(diffBoxes => {
      const newBoxes = diffBoxes.filter(diffBox => diffBox.id !== selectedDiffBoxId);
      return newBoxes;
    });
  };

  const isLeftImageUploaded = () => {
    const leftImageKeyValue = getLeftImageValues();
    if (Object.keys(leftImageKeyValue).length == 0) {
      return false;
    }
    if (!leftImageKeyValue[LEFT_IMAGE_LABEL] || !leftImageKeyValue[LEFT_IMAGE_LABEL].length) {
      return false;
    }

    return true;
  };

  const isRightImageUploaded = () => {
    const rightImageKeyValue = getRightImageValues();
    if (Object.keys(rightImageKeyValue).length === 0) {
      return false;
    }
    if (!rightImageKeyValue[RIGHT_IMAGE_LABEL] || !rightImageKeyValue[RIGHT_IMAGE_LABEL].length) {
      return false;
    }

    return true;
  };

  return (
    <div className='rounded-xl bg-gray-300 py-10 px-6'>
      <Text size='sm' as='b' className='mb-2 block'>
        Spot the Difference
      </Text>
      <div className='flex flex-col'>
        <div className='mb-4 flex flex-col justify-start rounded-md bg-white py-4 px-6'>
          <Text size='sm' as='b' className='mb-2'>
            Left Image *
          </Text>
          <div className='relative flex justify-start'>
            <div className='relative'>
              <UploadImageButtonWithPreview
                registerLabel={LEFT_IMAGE_LABEL}
                imageHeight={`${IMAGE_HEIGHT}px`}
                imageWidth={`${IMAGE_WIDTH}px`}
                imagePadding={0}
                useFormReturns={leftImageUseForm}
              />
            </div>
            {diffBoxes.length > 0 && (
              <Stage width={IMAGE_WIDTH} height={IMAGE_HEIGHT} onMouseDown={checkDeselect} className='absolute top-0 left-0 z-[2]'>
                <Layer>
                  {diffBoxes.map(diffBox => {
                    return (
                      <DifferenceBox
                        key={diffBox.id}
                        id={diffBox.id}
                        onSelect={() => {
                          setSelectedDiffBoxId(diffBox.id);
                        }}
                        isSelected={selectedDiffBoxId === diffBox.id}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-start rounded-md bg-white py-4 px-6'>
          <Text size='sm' as='b' className='mb-2'>
            Right Image *
          </Text>
          <div className='relative flex flex-col items-start  '>
            <div className='relative'>
              <UploadImageButtonWithPreview
                registerLabel={RIGHT_IMAGE_LABEL}
                imageHeight={`${IMAGE_HEIGHT}px`}
                imageWidth={`${IMAGE_WIDTH}px`}
                imagePadding={0}
                useFormReturns={rightImageUseForm}
              />
            </div>
            {diffBoxes.length > 0 && (
              <Stage width={IMAGE_WIDTH} height={IMAGE_HEIGHT} onMouseDown={checkDeselect} className='absolute top-0 left-0 z-[2]'>
                <Layer>
                  {diffBoxes.map(diffBox => {
                    return (
                      <DifferenceBox
                        key={diffBox.id}
                        id={diffBox.id}
                        onSelect={() => {
                          setSelectedDiffBoxId(diffBox.id);
                        }}
                        isSelected={selectedDiffBoxId === diffBox.id}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            )}
            {isLeftImageUploaded() && isRightImageUploaded() && (
              <div className='mt-4 flex'>
                <Button variant='green-solid' className='mr-4' onClick={addDiffBox}>
                  Add Difference
                </Button>
                <Button variant='black-outline' onClick={deleteDiffBox}>
                  Delete Difference
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
