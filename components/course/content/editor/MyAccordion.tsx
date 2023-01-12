import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Center, Divider } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Text } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import MyTable from './MyTable';
import Link from 'next/link';
import { useRouter } from 'next/router';

type AccordionProps = {
  isChapterSelected: boolean;
  selectedId: string;
};

const MyAccordion = ({ isChapterSelected, selectedId }: AccordionProps) => {
  const router = useRouter();
  const [chapters, setChapters] = useState([
    {
      uuid: '123',
      title: 'Chapter 1',
    },
    {
      uuid: '456',
      title: 'Chapter 2',
    },
  ]);

  // TODO: do backend call
  const addAccordion = () => {
    const newItem = {
      uuid: uuidv4(),
      title: 'New Chapter',
    };
    setChapters([...chapters, newItem]);
  };

  return (
    <Accordion defaultIndex={[0]}>
      {chapters.map(chapter => {
        const bgColor = isChapterSelected && chapter.uuid === selectedId ? '#EBF8D3' : '#F2F2F2';

        return (
          <AccordionItem key={chapter.uuid} borderTop='0px'>
            <Box display='flex' border='1px solid #C7C7C7'>
              <Button
                rounded='0'
                w='100%'
                bg={bgColor}
                display='flex'
                justifyContent='flex-start'
                onClick={e => {
                  e.preventDefault();
                  router.push(`../chapter/${chapter.uuid}`);
                }}
              >
                <Text fontWeight={600}>{chapter.title}</Text>
              </Button>
              <AccordionButton w='min-content' bg={bgColor} borderLeft='solid #C7C7C7 1px'>
                <AccordionIcon />
              </AccordionButton>
            </Box>
            <AccordionPanel p={0}>
              <MyTable isPageSelected={!isChapterSelected} selectedId={selectedId} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
      <AccordionItem border='dashed #C7C7C7 1px' borderTop='0'>
        <AccordionButton onClick={addAccordion}>+ Add Chapter</AccordionButton>
      </AccordionItem>
    </Accordion>
  );
};

export default MyAccordion;
