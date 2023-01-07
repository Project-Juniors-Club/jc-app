import React from 'react';
import { Box, Flex, Text, Button, VStack, Checkbox } from '@chakra-ui/react';
import { UseFormReturn, useForm, useWatch } from 'react-hook-form';
import SortingGameCreator, { SortingGame } from '../../components/sorting-game-editor/Creator';

const SortingGameEditorPage = () => {
  // TODO: retrieve from db
  const sortingGame: SortingGame = {
    text: 'Which is real?',
    buckets: [
      {
        text: 'Real',
        items: [
          {
            type: 'text',
            text: 'Meaninglessness of life',
          },
        ],
      },
      {
        text: 'Fake',
        items: [
          {
            type: 'text',
            text: 'Love',
          },
        ],
      },
    ],
  };
  const useFormReturns = useForm({
    defaultValues: {
      sortingGame,
    },
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormReturns;
  return (
    <form onSubmit={handleSubmit(x => console.log(x))}>
      <SortingGameCreator useFormReturns={useFormReturns} />
      <Button type='submit'>Console log recorded value</Button>
      <Button onClick={() => console.log(errors)}>Console log errors</Button>
    </form>
  );
};

export default SortingGameEditorPage;
