import { UseFormReturn, useWatch } from 'react-hook-form';
import UploadImageButtonWithPreview from '../UploadImageButtonWithPreview';
import { Checkbox, CloseButton, Flex, Input, Radio, VStack, Text, Box } from '@chakra-ui/react';
import ItemTypeSelect from './ItemTypeSelect';

// TODO: update with image
export type Item = {
  type: 'text' | 'image';
  text: string | null;
};

type ItemProp = {
  registerLabel: string;
  item: Item;
  useFormReturns: UseFormReturn;
  onDelete: () => void;
  isDeletable: boolean;
  errors: any;
};

export const Item = ({
  registerLabel,
  useFormReturns,
  useFormReturns: { control, register },
  item,
  onDelete,
  isDeletable,
  errors,
}: ItemProp) => {
  const itemTypeLabel = `${registerLabel}.type`;
  const itemType: 'text' | 'image' = useWatch({ name: itemTypeLabel, defaultValue: item.type, control: control });
  const itemText = item.text ?? '';

  return (
    <Flex gap={4}>
      <ItemTypeSelect registerLabel={itemTypeLabel} useFormReturns={useFormReturns} />
      <VStack gap={0.5} alignItems='start' w='100%'>
        {itemType === 'text' && (
          <Input
            {...register(`${registerLabel}.text`, { value: itemText, required: itemType === 'text' })}
            fontSize={14}
            placeholder='Item'
            defaultValue={itemText}
            isInvalid={!!errors?.text}
            borderColor='#9E9E9E'
          />
        )}

        {itemType === 'image' && (
          <UploadImageButtonWithPreview
            registerLabel={`${registerLabel}.image`}
            useFormReturns={useFormReturns}
            registerOptions={{ required: itemType === 'image' }}
          />
        )}
      </VStack>
      <CloseButton onClick={onDelete} isDisabled={!isDeletable} />
    </Flex>
  );
};
