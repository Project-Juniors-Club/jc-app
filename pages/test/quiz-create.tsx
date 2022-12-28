import React from 'react';
import QuizCreator from '../../components/quiz-editor/creator';
import { useForm, useWatch } from 'react-hook-form';
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
  });
  const { control } = useFormReturns;
  const questionsWatch = useWatch({ name: 'questions', control: control }) as Question[];
  return <QuizCreator useFormReturns={useFormReturns} questions={questionsWatch} />;
};

export default QuizPage;
