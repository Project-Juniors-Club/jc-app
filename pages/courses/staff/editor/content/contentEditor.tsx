import React from 'react';
import Layout from '../../../../../components/Layout';
import Footer from '../../../../../components/Footer';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box, Button, Heading } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { SimpleGrid, Center, Input, Select, Spacer, Flex, Stack, HStack, VStack } from '@chakra-ui/react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import MyAccordion from './MyAccordion';

const EditorPnumber = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return <Layout title='Edit Course Content'>
    <Heading as='h2' size='xl'>Edit Course Content</Heading>
    <SimpleGrid minChildWidth='200px' spacing='20px'>
      <Box height='600px'>
        <VStack spacing='24px'>
          <Center height='600px'>
            <Box mt={4}>

              <MyAccordion/>

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
              <Box mt={4}>
                <label htmlFor="title">Page Title:</label>
                <Input placeholder='Page Title Here' />
              </Box>
              
              <Box mt={4}>
                <label htmlFor="duration">Page Duration:</label>
                <Input placeholder='Page Duration Here' />
              </Box>

              <Box mt={4}>
                <label htmlFor="category">Category:</label>
                <Select placeholder='Select a category'>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                </Select>
              </Box>

              <Box mt={4}>
                <HStack>
                  <Button colorScheme='green'>Save Page</Button>
                  <Button variant='outline'>Cancel</Button>
                  <Button colorScheme='blackAlpha'>Delete Page</Button>
                </HStack>
              </Box>
            </form>
          </Center>
        </VStack>


      </Box>
    </SimpleGrid>
  </Layout>
  
};

export default EditorPnumber;