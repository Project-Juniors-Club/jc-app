import { Button, Flex, Textarea, VStack, Text, Radio, Checkbox, CloseButton, FormControl } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { AddIcon } from '@chakra-ui/icons';
import { Item } from './Item';

const MIN_NUM_ITEM = 1;
const MAX_NUM_ITEM = 5;

const AddItemButton = ({ onClick }) => {
  // the decorative radio/checkbox is still focusable not sure why
  return (
    <Flex as={Button} onClick={onClick} bg='white' justifyContent='flex-start' p={0} mt={3.5}>
      <AddIcon color='#9E9E9E' ml={5} />
      <Text textColor='#9E9E9E' ml={3} fontSize={14}>
        Add Item
      </Text>
    </Flex>
  );
};

// TODO: update with image
export type Bucket = {
  text: string;
  items: Item[];
};

type BucketProp = {
  registerLabel: string;
  useFormReturns: UseFormReturn;
  bucket: Bucket;
  onDelete: () => void;
  isDeletable: boolean;
  errors: any;
};

export const Bucket = ({
  registerLabel,
  bucket,
  useFormReturns,
  useFormReturns: { register, watch, setValue, clearErrors },
  onDelete,
  isDeletable,
  errors,
}: BucketProp) => {
  const items = watch(`${registerLabel}.items`, bucket.items) as Item[];
  const handleOnItemDelete = (idx: number) => () => {
    items.splice(idx, 1);
    setValue(`${registerLabel}.items`, items);
    clearErrors();
  };
  return (
    <Flex bg='white' borderRadius={8} px={8} flexDir='column' w='100%' pb={2}>
      <Flex justifyContent='right'>
        <CloseButton onClick={onDelete} my={2} isDisabled={!isDeletable} />
      </Flex>
      <Flex columnGap={3}>
        <Textarea
          fontSize={14}
          w='100%'
          placeholder='Bucket'
          {...register(`${registerLabel}.text`, { required: true })}
          defaultValue={bucket.text}
          borderColor='#9E9E9E'
          isInvalid={!!errors?.text}
        />
      </Flex>
      <VStack align='stretch' mt={2}>
        {items.map((item, idx) => (
          <Item
            key={idx}
            registerLabel={`${registerLabel}.items.${idx}`}
            useFormReturns={useFormReturns}
            item={item}
            onDelete={handleOnItemDelete(idx)}
            isDeletable={items.length > MIN_NUM_ITEM}
            errors={errors?.items?.[idx]}
          />
        ))}
      </VStack>
      {items.length < MAX_NUM_ITEM && (
        <AddItemButton
          onClick={() => {
            setValue(`${registerLabel}.items`, [...items, { type: 'text', text: null } as Item]);
          }}
        />
      )}
    </Flex>
  );
};
