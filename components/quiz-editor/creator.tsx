import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Button, VStack, Checkbox } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { Question } from './Question';

type QuizCreatorProp = {
  useFormReturns: UseFormReturn;
  questions: Question[];
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

const QuizCreator = ({ useFormReturns, questions }: QuizCreatorProp) => {
  const { watch, setValue, handleSubmit, getValues } = useFormReturns;
  return (
    <>
      <Box fontSize={14} fontFamily='Open Sans' fontWeight={400} px='3rem' bg='#E6E6E6' borderRadius={16} width='660px' py={8}>
        <Text fontWeight={700}>Quiz Questions</Text>
        <form onSubmit={handleSubmit(x => console.log(x))}>
          <VStack gap={5} w='100%'>
            {questions.map((question, idx) => (
              <Question useFormReturns={useFormReturns} key={idx} question={question} registerLabel={`questions.${idx}`} />
            ))}
          </VStack>
          <AddQuestionButton
            onClick={() =>
              setValue('questions', [
                ...questions,
                {
                  text: null,
                  type: 'mcq',
                  previewImageUrl: null,
                  options: [],
                },
              ])
            }
          />
        </form>
      </Box>
      <Button onClick={() => console.log(getValues())}>Console log recorded value</Button>
    </>
  );
};

export default QuizCreator;
