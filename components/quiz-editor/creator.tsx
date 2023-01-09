import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Button, VStack, Checkbox } from '@chakra-ui/react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Question } from './Question';

type QuizCreatorProp = {
  useFormReturns: UseFormReturn;
  questions: Question[];
};

const MIN_NUM_QUESTION = 1;

const DEFAULT_QUESTION = {
  text: null,
  type: 'mcq',
  previewImageUrl: null,
  options: [
    { isCorrect: true, type: 'text', text: null },
    { isCorrect: false, type: 'text', text: null },
  ],
} as Question;

const AddQuestionButton = ({ onClick }) => {
  return (
    <Flex as={Button} onClick={onClick} bg='white' justifyContent='flex-start' p={0} w='100%' mt={5}>
      <AddIcon color='#9E9E9E' ml={5} />
      <Text textColor='#9E9E9E' ml={3} fontSize={14}>
        Add Question
      </Text>
    </Flex>
  );
};

const QuizCreator = ({ useFormReturns, questions: initialQuestions = [] }: QuizCreatorProp) => {
  const {
    watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    control,
  } = useFormReturns;
  const handleOnQuestionDelete = (idx: number) => () => {
    questions.splice(idx, 1);
    setValue('questions', questions);
    clearErrors();
  };
  const questions = useWatch({ name: 'questions', defaultValue: initialQuestions, control: control });
  return (
    <>
      <Box fontSize={14} fontFamily='Open Sans' fontWeight={400} px='3rem' bg='#E6E6E6' borderRadius={16} width='660px' py={8}>
        <Text fontWeight={700} mb={5}>
          Quiz Questions
        </Text>
        <VStack w='100%'>
          {questions.map((question, idx) => (
            <Question
              useFormReturns={useFormReturns}
              key={idx}
              question={question}
              registerLabel={`questions.${idx}`}
              onDelete={handleOnQuestionDelete(idx)}
              isDeletable={questions.length > MIN_NUM_QUESTION}
              errors={errors?.questions?.[idx]}
            />
          ))}
        </VStack>
        <AddQuestionButton
          onClick={() => {
            setValue('questions', [...questions, DEFAULT_QUESTION]);
            clearErrors();
          }}
        />
      </Box>
    </>
  );
};

export default QuizCreator;
