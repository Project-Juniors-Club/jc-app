import { AddIcon } from '@chakra-ui/icons';
import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { SerializedMatchingGame } from '../../lib/server/matchingGame';
import UploadImageButtonWithPreview, { ImageWithUploadableFile } from '../UploadImageButtonWithPreview';

type MatchingGameCreatorProp = {
  useFormReturns: UseFormReturn<any>;
};

export type EditorSerializedMatchingGame = Omit<SerializedMatchingGame, 'images'> & {
  images: ImageWithUploadableFile[];
};

export const NUM_MATCHING_IMAGES = 6;

const MatchingGameCreator = ({ useFormReturns }: MatchingGameCreatorProp) => {
  const {
    register,
    formState: { errors },
  } = useFormReturns as UseFormReturn<{ matchingGame: { images: ImageWithUploadableFile[]; duration: number } }>;
  return (
    <Flex flexDir='column' gap={2} fontSize={14} fontFamily='Open Sans' fontWeight={400} px='3rem' bg='#E6E6E6' borderRadius={16} py={8}>
      <Text fontWeight={700} mb={5}>
        Matching Game
      </Text>
      <div className='rounded-lg bg-white p-8'>
        <div className={`grid grid-flow-row grid-cols-2 items-start gap-4`}>
          {Array.from({ length: NUM_MATCHING_IMAGES }, (_, index) => (
            <div key={index}>
              <Flex>
                <Text fontWeight={700} mb={2}>
                  {`Image ${index + 1}`}
                </Text>
                <Text>&nbsp;*</Text>
              </Flex>
              <div className='flex justify-start'>
                <UploadImageButtonWithPreview
                  registerLabel={`matchingGame.images.${index}`}
                  useFormReturns={useFormReturns}
                  isCroppable={true}
                  imageHeight='300'
                  imageWidth='300'
                />
              </div>
            </div>
          ))}
        </div>
        <div className='mt-4'>
          <FormControl isInvalid={!!errors?.matchingGame?.duration}>
            <FormLabel htmlFor='duration'>
              <Text as='b'>Duration (that cards will be shown face up) *</Text>
            </FormLabel>
            <Input
              type='number'
              placeholder='Page Duration Here'
              {...register('matchingGame.duration', {
                required: { value: true, message: 'Enter Page Duration' },
                valueAsNumber: true,
              })}
            />
          </FormControl>
        </div>
      </div>
    </Flex>
  );
};

export default MatchingGameCreator;
