import { Button, Flex, Textarea, VStack, Text, Radio, Checkbox, CloseButton, FormControl } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import QuestionTypeSelect from './QuestionTypeSelect';
import { Option } from './Option';
import UploadImageButtonWithPreview from '../UploadImageButtonWithPreview';
import { AddIcon } from '@chakra-ui/icons';

const MIN_NUM_OPTION = 2;
const MAX_NUM_OPTION = 5;

const AddOptionButton = ({ onClick, questionType }: { onClick: React.MouseEventHandler<HTMLDivElement>; questionType: string }) => {
  // the decorative radio/checkbox is still focusable not sure why
  return (
    <Flex as={Button} onClick={onClick} bg='white' justifyContent='flex-start' p={0} mt={3.5}>
      {questionType == 'mcq' ? (
        <Radio
          isReadOnly
          isFocusable={false}
          onClick={e => {
            e.stopPropagation();
          }}
        />
      ) : (
        <Checkbox
          isReadOnly
          isFocusable={false}
          onClick={e => {
            e.stopPropagation();
          }}
        />
      )}
      <AddIcon color='#9E9E9E' ml={5} />
      <Text textColor='#9E9E9E' ml={3} fontSize={14}>
        Add Option
      </Text>
    </Flex>
  );
};

// TODO: update with image
export type Question = {
  text: string;
  type: 'mcq' | 'mrq';
  options: Option[];
};

type QuestionProp = {
  registerLabel: string;
  useFormReturns: UseFormReturn;
  question: Question;
  onDelete: () => void;
  isDeletable: boolean;
  errors: any;
};

export const Question = ({
  registerLabel,
  question,
  useFormReturns,
  useFormReturns: { register, watch, setValue, clearErrors },
  onDelete,
  isDeletable,
  errors,
}: QuestionProp) => {
  const options = watch(`${registerLabel}.options`, question.options) as Option[];
  const watchQuestionType = watch(`${registerLabel}.type`, question.type) as 'mcq' | 'mrq';
  const handleOnQuestionTypeChanged = () => {
    setValue(
      `${registerLabel}.options`,
      options.map(option => ({
        ...option,
        isCorrect: false,
      })),
    );
  };
  const handleOnOptionDelete = (idx: number) => () => {
    options.splice(idx, 1);
    setValue(`${registerLabel}.options`, options);
    clearErrors();
  };
  const handleOnSelectCorrect = (idx: number) => () => {
    if (watchQuestionType == 'mcq') {
      setValue(
        `${registerLabel}.options`,
        options.map((option, _idx) => ({ ...option, isCorrect: _idx == idx })),
      );
    }
    if (watchQuestionType == 'mrq') {
      setValue(
        `${registerLabel}.options`,
        options.map((option, _idx) => ({ ...option, isCorrect: idx == _idx ? !option.isCorrect : option.isCorrect })),
      );
    }
  };
  return (
    <Flex bg='white' borderRadius={8} px={8} flexDir='column' w='100%' pb={2}>
      <Flex justifyContent='right'>
        <CloseButton onClick={onDelete} my={2} isDisabled={!isDeletable} />
      </Flex>
      <Flex columnGap={3}>
        <Textarea
          fontSize={14}
          w='50%'
          placeholder='Question'
          {...register(`${registerLabel}.text`, { required: true })}
          defaultValue={question.text}
          borderColor='#9E9E9E'
          isInvalid={!!errors?.text}
        />
        <Flex w='50%' gap={2} flexDir='column'>
          <QuestionTypeSelect
            registerLabel={`${registerLabel}.type`}
            defaultType={question.type}
            useFormReturns={useFormReturns}
            onChange={handleOnQuestionTypeChanged}
          />
          <UploadImageButtonWithPreview useFormReturns={useFormReturns} registerLabel={`${registerLabel}.coverImage`} />
        </Flex>
      </Flex>
      <VStack align='stretch' mt={2}>
        {options.map((option, idx) => (
          <Option
            key={idx}
            registerLabel={`${registerLabel}.options.${idx}`}
            useFormReturns={useFormReturns}
            option={option}
            questionType={watchQuestionType}
            onSelectCorrect={handleOnSelectCorrect(idx)}
            onDelete={handleOnOptionDelete(idx)}
            isDeletable={options.length > MIN_NUM_OPTION}
            errors={errors?.options?.[idx]}
          />
        ))}
      </VStack>
      {options.length < MAX_NUM_OPTION && (
        <AddOptionButton
          onClick={() => {
            setValue(`${registerLabel}.options`, [
              ...options,
              { isCorrect: false, type: 'text', text: null, previewImageUrl: null } as Option,
            ]);
          }}
          questionType={watchQuestionType}
        />
      )}
      {/* <Text>{JSON.stringify(errors) + '123'}</Text> */}
    </Flex>
  );
};
