import { Button, Flex, Textarea, VStack, Text, Radio, Checkbox, CloseButton, FormControl } from '@chakra-ui/react';
import { Image } from '@prisma/client';
import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form';
import QuestionTypeSelect from './QuestionTypeSelect';
import { EditorSerializedQuizOption, Option } from './Option';
import UploadImageButtonWithPreview, { ImageWithUploadableFile } from '../UploadImageButtonWithPreview';
import { AddIcon } from '@chakra-ui/icons';
import { SerializedQuizOption, SerializedQuizQuestion } from '../../lib/server/quiz';

const MIN_NUM_OPTION = 2;
const MAX_NUM_OPTION = 5;

const AddOptionButton = ({ onClick, questionType }) => {
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

export type EditorSerializedQuizQuestion = Omit<SerializedQuizQuestion, 'image' | 'options'> & {
  image: ImageWithUploadableFile;
  options: EditorSerializedQuizOption[];
};

type QuestionProp = {
  registerLabel: `quizGame.questions.${number}`;
  useFormReturns: UseFormReturn<any>;
  question: EditorSerializedQuizQuestion;
  onDelete: () => void;
  isDeletable: boolean;
  errors: any;
};

export const Question = ({ registerLabel, question, useFormReturns, onDelete, isDeletable, errors }: QuestionProp) => {
  const { register, watch, setValue, handleSubmit, getValues, clearErrors, control, unregister } = useFormReturns as UseFormReturn<{
    quizGame: { questions: EditorSerializedQuizQuestion[] };
  }>;
  const { fields: options, append, remove } = useFieldArray({ name: `${registerLabel}.options`, shouldUnregister: true, control });
  const isMultipleResponse: boolean = useWatch({ name: `${registerLabel}.isMultipleResponse`, control: control });

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
    remove(idx);
    clearErrors();
  };
  const handleOnSelectCorrect = (idx: number) => () => {
    if (!isMultipleResponse) {
      setValue(
        `${registerLabel}.options`,
        options.map((option, _idx) => ({ ...option, isCorrect: _idx == idx })),
      );
    }
    if (isMultipleResponse) {
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
            registerLabel={`${registerLabel}.isMultipleResponse`}
            defaultType={isMultipleResponse ? 'mrq' : 'mcq'}
            useFormReturns={useFormReturns}
            onChange={handleOnQuestionTypeChanged}
          />
          <UploadImageButtonWithPreview useFormReturns={useFormReturns} registerLabel={`${registerLabel}.image`} image={question.image} />
        </Flex>
      </Flex>
      <VStack align='stretch' mt={2}>
        {options.map((option, idx) => (
          <Option
            key={idx}
            registerLabel={`${registerLabel}.options.${idx}`}
            useFormReturns={useFormReturns}
            option={option}
            questionType={isMultipleResponse ? 'mrq' : 'mcq'}
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
            append({ isCorrect: false, type: 'text', text: null, image: null });
            clearErrors();
          }}
          questionType={isMultipleResponse ? 'mrq' : 'mcq'}
        />
      )}
    </Flex>
  );
};
