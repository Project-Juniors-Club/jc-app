import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Button, VStack, Checkbox, Input, Textarea } from '@chakra-ui/react';
import { FieldValues, UseFormReturn, useWatch } from 'react-hook-form';
import { Bucket } from './Bucket';

export type SortingGame = {
  text: string;
  buckets: Bucket[];
};

type EditorSortingGameBucket = {
  name: string;
  bucketItems: EditorSortingGameBucketItem[];
};

type EditorSortingGameBucketItem = {
  text: string;
  image?: {
    assetId: string;
    _uploadedFile?: File;
  };
};

export type EditorSerializedSortingGame = Omit<SortingGame, 'buckets'> & {
  text: string;
  buckets: EditorSortingGameBucket[];
  duration: number;
};

type SortingGameCreatorProp = {
  useFormReturns: UseFormReturn<any>;
};

const MIN_NUM_BUCKET = 2;
const MAX_NUM_BUCKET = 3;

const DEFAULT_BUCKET: Bucket = {
  text: null,
  items: [{ type: 'text', text: null }],
};

const AddBucketButton = ({ onClick }) => {
  return (
    <Flex as={Button} onClick={onClick} bg='white' justifyContent='flex-start' p={0} w='100%'>
      <AddIcon color='#9E9E9E' ml={5} />
      <Text textColor='#9E9E9E' ml={3} fontSize={14}>
        Add Bucket
      </Text>
    </Flex>
  );
};

const SortingGameCreator = ({ useFormReturns }: SortingGameCreatorProp) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    control,
  } = useFormReturns as UseFormReturn<{ sortingGame: SortingGame }>;
  const sortingGame = useWatch({ name: 'sortingGame', control: control });
  const buckets = sortingGame?.buckets || [];
  const handleOnBucketDelete = (idx: number) => () => {
    buckets.splice(idx, 1);
    setValue('sortingGame.buckets', buckets);
    clearErrors();
  };
  return (
    <>
      <Flex
        flexDir='column'
        gap={2}
        fontSize={14}
        fontFamily='Open Sans'
        fontWeight={400}
        px='3rem'
        bg='#E6E6E6'
        borderRadius={16}
        width='660px'
        py={8}
      >
        <Text fontWeight={700} mb={5}>
          Sorting Game
        </Text>

        <Textarea
          fontSize={14}
          w='100%'
          placeholder='Bucket'
          {...register('sortingGame.text', { required: true })}
          defaultValue={sortingGame.text}
          borderColor='#9E9E9E'
          isInvalid={!!errors?.sortingGame?.text}
          bg='white'
        />

        <VStack w='100%'>
          {buckets.map((bucket, idx) => (
            <Bucket
              useFormReturns={useFormReturns}
              key={idx}
              bucket={bucket}
              registerLabel={`sortingGame.buckets.${idx}`}
              onDelete={handleOnBucketDelete(idx)}
              isDeletable={buckets.length > MIN_NUM_BUCKET}
              errors={errors?.sortingGame?.buckets?.[idx]}
            />
          ))}
        </VStack>
        {buckets.length < MAX_NUM_BUCKET && (
          <AddBucketButton
            onClick={() => {
              setValue('sortingGame.buckets', [...buckets, DEFAULT_BUCKET]);
              clearErrors();
            }}
          />
        )}
      </Flex>
    </>
  );
};

export default SortingGameCreator;
