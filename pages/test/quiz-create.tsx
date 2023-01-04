import React from 'react';
import { Box, Flex, Text, Button, VStack, Checkbox } from '@chakra-ui/react';
import QuizCreator from '../../components/quiz-editor/creator';
import { UseFormReturn, useForm, useWatch } from 'react-hook-form';
import { Question } from '../../components/quiz-editor/Question';

const QuizPage = () => {
  // TODO: retrieve from db
  const questions = [
    {
      text: 'Are you kidding me?',
      type: 'mcq',
      options: [
        {
          isCorrect: true,
          type: 'text',
          text: 'Yes',
        },
        {
          isCorrect: false,
          type: 'text',
          text: 'No',
        },
      ],
    },
  ] as Question[];
  const useFormReturns = useForm({
    defaultValues: {
      questions,
    },
  }) as UseFormReturn<any>;
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormReturns;
  const questionsWatch = useWatch({ name: 'questions', control: control }) as Question[];
  return (
    <form onSubmit={handleSubmit(x => console.log(x))}>
      <QuizCreator useFormReturns={useFormReturns} questions={questionsWatch} />
      <Button type='submit'>Console log recorded value</Button>
      <Button onClick={() => console.log(errors)}>Console log errors</Button>
    </form>
  );
};

export default QuizPage;
