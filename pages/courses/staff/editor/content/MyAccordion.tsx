import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Center } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Text } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import MyTable from './MyTable';
import Link from 'next/link';

const MyAccordion = props => {
  const [items, setItems] = useState([
    {
      uuid: uuidv4(),
      title: <Link href={'../chapter/' + uuidv4()}>Chapter 1</Link>,
      content: <MyTable />,
    },
  ]);

  const addAccordion = () => {
    const newItem = {
      uuid: uuidv4(),
      title: <Link href={'../chapter/' + uuidv4()}>New Chapter</Link>,
      content: <MyTable />,
    };
    setItems([...items, newItem]);
  };

  const deleteAccordion = uuid => {
    setItems(items.filter(item => item.uuid !== uuid));
  };

  return (
    <Accordion defaultIndex={[0]}>
      {items.map(item => (
        <AccordionItem key={item.uuid}>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              <b>{item.title}</b>
            </Box>
            <Text onClick={() => deleteAccordion(item.uuid)}>x</Text>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <div>{item.content}</div>
          </AccordionPanel>
        </AccordionItem>
      ))}
      <AccordionItem>
        <AccordionButton onClick={addAccordion}>+ Add Chapter</AccordionButton>
      </AccordionItem>
    </Accordion>
  );
};

export default MyAccordion;
