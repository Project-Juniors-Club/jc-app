import { UseFormReturn, useWatch } from 'react-hook-form';
import UploadImageButtonWithPreview, { ImageWithUploadableFile } from '../UploadImageButtonWithPreview';
import { Checkbox, CloseButton, Flex, Input, Radio, VStack, Text, Box } from '@chakra-ui/react';
import OptionTypeSelect from './OptionTypeSelect';
import { SerializedQuizOption } from '../../lib/server/quiz';
import { QuizGameOption, QuizGameOptionType } from '@prisma/client';

export type EditorSerializedQuizOption = Omit<SerializedQuizOption, 'image'> & { image: ImageWithUploadableFile };

type OptionProp = {
  registerLabel: string;
  option: EditorSerializedQuizOption;
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
  questionType,
  onDelete,
  onSelectCorrect,
  isDeletable,
  errors,
}: OptionProp) => {
  const option: EditorSerializedQuizOption = useWatch({ name: registerLabel, control: control });
  const optionTypeLabel = `${registerLabel}.type`;
  const optionType: QuizGameOptionType = useWatch({ name: optionTypeLabel, defaultValue: option.type, control: control });
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
        {['text', 'textAndImage'].includes(optionType) && (
          <Input
            {...register(`${registerLabel}.text`, { value: option.text, required: optionType === 'text' || optionType === 'textAndImage' })}
            fontSize={14}
            placeholder='Option'
            defaultValue={option.text}
            isInvalid={!!errors?.text}
            borderColor='#9E9E9E'
          />
        )}

        {['image', 'textAndImage'].includes(optionType) && (
          <UploadImageButtonWithPreview
            registerLabel={`${registerLabel}.image`}
            useFormReturns={useFormReturns}
            registerOptions={{ required: (optionType === 'image' || optionType === 'textAndImage') && !option?.image?.assetId }}
            image={option.image}
          />
        )}
      </VStack>
      <CloseButton onClick={onDelete} isDisabled={!isDeletable} />
    </Flex>
  );
};
