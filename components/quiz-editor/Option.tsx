import { UseFormReturn, useWatch } from 'react-hook-form';
import UploadImageButtonWithPreview from './UploadImageButtonWithPreview';
import { Checkbox, CloseButton, Flex, Input, Radio } from '@chakra-ui/react';
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
};

export const Option = ({
  registerLabel,
  useFormReturns,
  useFormReturns: { watch, control, register },
  option,
  questionType,
  onDelete,
  onSelectCorrect,
}: OptionProp) => {
  const optionTypeLabel = `${registerLabel}.type`;
  const optionType = useWatch({ name: optionTypeLabel, defaultValue: option.type, control: control }) as 'text' | 'image';
  return (
    <Flex gap={4}>
      {questionType == 'mcq' ? (
        <Radio
          isChecked={option.isCorrect}
          onClick={() => {
            onSelectCorrect();
          }}
        />
      ) : (
        <Checkbox
          isChecked={option.isCorrect}
          onChange={() => {
            onSelectCorrect();
          }}
        />
      )}

      <OptionTypeSelect registerLabel={optionTypeLabel} useFormReturns={useFormReturns} />
      {optionType === 'text' ? (
        <Input
          {...register(`${registerLabel}.text`, { value: option.text })}
          fontSize={14}
          placeholder='Option'
          defaultValue={option.text}
        />
      ) : (
        <UploadImageButtonWithPreview registerLabel={`${registerLabel}.image`} useFormReturns={useFormReturns} />
      )}
      <CloseButton onClick={onDelete} />
    </Flex>
  );
};
