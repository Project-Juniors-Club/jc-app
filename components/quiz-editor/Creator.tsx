import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Button, VStack, Checkbox } from '@chakra-ui/react';
import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form';
import { EditorSerializedQuizQuestion, Question } from './Question';
import { SerializedQuizQuestion } from '../../lib/server/quiz';
import { EditorSerializedQuizOption } from './Option';

type QuizCreatorProp = {
  useFormReturns: UseFormReturn<any>;
};

const MIN_NUM_QUESTION = 1;

export const constructDefaultQuestion = (questionNumber: number): EditorSerializedQuizQuestion => {
  return {
    questionNumber: questionNumber,
    isMultipleResponse: false,
    text: '',
    image: null,
    options: [
      {
        isCorrect: true,
        type: 'text',
        text: null,
        image: null,
      },
      {
        isCorrect: false,
        type: 'text',
        text: null,
        image: null,
      },
    ],
  };
};

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

const QuizCreator = ({ useFormReturns }: QuizCreatorProp) => {
  const {
    watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    control,
    unregister,
  } = useFormReturns as UseFormReturn<{ quizGame: { questions: EditorSerializedQuizQuestion[] } }>;
  const {
    fields: questions,
    remove,
    append,
  } = useFieldArray({
    name: 'quizGame.questions',
    control: control,
    shouldUnregister: true,
  });
  const handleOnQuestionDelete = (idx: number) => () => {
    remove(idx);
    clearErrors();
  };
  return (
    <>
      <Box fontSize={14} fontFamily='Open Sans' fontWeight={400} px='3rem' bg='#E6E6E6' borderRadius={16} width='100%' py={8}>
        <Text fontWeight={700} mb={5}>
          Quiz Questions
        </Text>
        <VStack w='100%'>
          {questions.map((question, idx) => (
            <Question
              useFormReturns={useFormReturns}
              key={question.id}
              question={question}
              registerLabel={`quizGame.questions.${idx}`}
              onDelete={handleOnQuestionDelete(idx)}
              isDeletable={questions.length > MIN_NUM_QUESTION}
              errors={errors?.quizGame?.questions?.[idx]}
            />
          ))}
        </VStack>
        <AddQuestionButton
          onClick={() => {
            append(constructDefaultQuestion(questions.length + 1));
            clearErrors();
          }}
        />
      </Box>
    </>
  );
};

export default QuizCreator;
