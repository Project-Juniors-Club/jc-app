import { UseFormReturn, useWatch } from 'react-hook-form';
import UploadImageButtonWithPreview from '../UploadImageButtonWithPreview';
import { Checkbox, CloseButton, Flex, Input, Radio, VStack, Text, Box } from '@chakra-ui/react';
import OptionTypeSelect from './OptionTypeSelect';

// TODO: update with image
export type Option = {
  isCorrect: boolean;
  type: 'text' | 'image';
  text: string | null;
};

type OptionProp = {
  registerLabel: string;
  option: Option;
  useFormReturns: UseFormReturn;
  questionType: 'mcq' | 'mrq';
  onDelete: () => void;
  onSelectCorrect: () => void;
  isDeletable: boolean;
  errors: any;
};

export const Option = ({
  registerLabel,
  useFormReturns,
  useFormReturns: { watch, control, register },
  option,
  questionType,
  onDelete,
  onSelectCorrect,
  isDeletable,
  errors,
}: OptionProp) => {
  const optionTypeLabel = `${registerLabel}.type`;
  const optionType = useWatch({ name: optionTypeLabel, defaultValue: option.type, control: control }) as 'text' | 'image' | 'both';
  return (
    <Flex gap={4}>
      <Box py={3}>
        {questionType == 'mcq' ? (
          <Radio isChecked={option.isCorrect} onClick={onSelectCorrect} />
        ) : (
          <Checkbox isChecked={option.isCorrect} onChange={onSelectCorrect} />
        )}
      </Box>

      <OptionTypeSelect registerLabel={optionTypeLabel} useFormReturns={useFormReturns} />
      <VStack gap={0.5} alignItems='start' w='100%'>
        {['text', 'both'].includes(optionType) && (
          <Input
            {...register(`${registerLabel}.text`, { value: option.text, required: optionType === 'text' })}
            fontSize={14}
            placeholder='Option'
            defaultValue={option.text}
            isInvalid={!!errors?.text}
            borderColor='#9E9E9E'
          />
        )}

        {['image', 'both'].includes(optionType) && (
          <UploadImageButtonWithPreview
            registerLabel={`${registerLabel}.image`}
            useFormReturns={useFormReturns}
            registerOptions={{ required: optionType === 'image' }}
          />
        )}
      </VStack>
      <CloseButton onClick={onDelete} isDisabled={!isDeletable} />
    </Flex>
  );
};
