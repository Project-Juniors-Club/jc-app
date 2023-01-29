import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Center, Divider } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Text } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import MyTable from './MyTable';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CourseStructure } from '../../../../lib/server/course';
import axios from 'axios';
import useSnackbar from '../../../../hooks/useSnackbar';
import { useSession } from 'next-auth/react';

type AccordionProps = {
  isChapterSelected: boolean;
  selectedId: string;
  courseStructure: CourseStructure;
};

const MyAccordion = ({ isChapterSelected, selectedId, courseStructure: { id, chapters } }: AccordionProps) => {
  const router = useRouter();
  const sess = useSession();

  const addChapter = async () => {
    const {
      data: {
        data: { id: newChapterId },
      },
    } = await axios.post('/api/courses/chapters', {
      name: 'New Chapter',
      description: '',
      courseId: id,
      chapterNumber: chapters.length + 1,
      userId: sess.data.user.id,
    });
    router.push(`/courses/staff/editor/content/chapter/${newChapterId}`);
  };

  return (
    <Accordion
      defaultIndex={[
        isChapterSelected
          ? chapters.findIndex(chapter => chapter.id === selectedId)
          : chapters.findIndex(chapter => chapter.pages.find(page => page.id === selectedId)),
      ]}
      allowMultiple
    >
      {chapters.map((chapter, idx) => {
        const bgColor = isChapterSelected && chapter.id === selectedId ? '#EBF8D3' : '#F2F2F2';

        return (
          <AccordionItem key={chapter.id} borderTop='0px'>
            <Box display='flex' border='1px solid #C7C7C7' borderTop={idx > 0 ? '0' : ''}>
              <Button
                rounded='0'
                w='100%'
                bg={bgColor}
                display='flex'
                justifyContent='flex-start'
                onClick={e => {
                  e.preventDefault();
                  router.push(`/courses/staff/editor/content/chapter/${chapter.id}`);
                }}
              >
                <Text fontWeight={600}>{chapter.name}</Text>
              </Button>
              <AccordionButton w='min-content' bg={bgColor} borderLeft='solid #C7C7C7 1px'>
                <AccordionIcon />
              </AccordionButton>
            </Box>
            <AccordionPanel p={0}>
              <MyTable isPageSelected={!isChapterSelected} selectedId={selectedId} courseId={id} chapter={chapter} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
      <AccordionItem border='dashed #C7C7C7 1px' borderTop={chapters.length > 0 && '0'}>
        <AccordionButton onClick={addChapter} fontWeight={600} color='#606060'>
          + Add Chapter
        </AccordionButton>
      </AccordionItem>
    </Accordion>
  );
};

export default MyAccordion;
