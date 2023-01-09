import React from 'react';
import Layout from '../../../../../../components/Layout';
import Footer from '../../../../../../components/Footer';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box, Button, Heading } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { SimpleGrid, Center, Input, Select, Spacer, Flex, Stack, HStack, VStack, Textarea, FormLabel, FormControl } from '@chakra-ui/react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MyAccordion from '../../../../../../components/course/content/editor/MyAccordion';
import { useForm } from 'react-hook-form';

const EditorPnumber = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <Layout title='Edit Course Content'>
      <Heading as='h2' size='xl'>
        Edit Course Content
      </Heading>
      <SimpleGrid minChildWidth='200px' spacing='20px'>
        <Box height='600px'>
          <VStack spacing='24px'>
            <Center height='600px'>
              <Box mt={4}>
                <MyAccordion />

                <Box mt={4}>
                  <HStack>
                    <Button colorScheme='green'>Save Course Content & Exit</Button>
                    <Button variant='outline'>Cancel</Button>
                  </HStack>
                </Box>
              </Box>
            </Center>
          </VStack>
        </Box>

        <Box height='600px'>
          <VStack spacing='24px'>
            <Center height='600px'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id='chapter'>
                  <Box mt={4}>
                    <FormLabel htmlFor='title'>Chapter Title:</FormLabel>
                    <Input placeholder='Chapter Title Here' {...register('title')} />
                  </Box>

                  <Box mt={4}>
                    <FormLabel htmlFor='duration'>Chapter Description:</FormLabel>
                    <Textarea placeholder='Chapter Description Here' size='sm' resize='vertical' {...register('description')} />
                  </Box>

                  <Box mt={4}>
                    <HStack>
                      <Button colorScheme='green' type='submit' isLoading={isSubmitting}>
                        Save Chapter
                      </Button>
                      <Button variant='outline'>Cancel</Button>
                      <Button colorScheme='blackAlpha'>Delete Chapter</Button>
                    </HStack>
                  </Box>
                </FormControl>
              </form>
            </Center>
          </VStack>
        </Box>
      </SimpleGrid>
    </Layout>
  );
};

export default EditorPnumber;
