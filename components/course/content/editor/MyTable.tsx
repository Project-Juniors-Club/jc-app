import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Center, Text } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { AssetType, Page } from '@prisma/client';

type TableProps = {
  isPageSelected: boolean;
  selectedId: string;
  courseId: string;
  chapter: {
    id: string;
    name: string;
    pages: {
      id: string;
      name: string;
    }[];
  };
};

const MyTable = ({ isPageSelected, selectedId, courseId, chapter }: TableProps) => {
  const router = useRouter();
  const sess = useSession();

  const addPage = async () => {
    const {
      data: {
        data: { id: newPageId },
      },
    } = await axios.post('/api/courses/pages', {
      chapterId: chapter.id,
      name: 'New Page',
      pageNumber: chapter.pages.length + 1,
      description: '',
      duration: 0, // TODO: sus
      assetType: AssetType.article,
      userId: sess.data.user.id,
      courseId,
    });
    router.push(`/courses/staff/editor/content/page/${newPageId}`);
  };

  return (
    <TableContainer id='myTable'>
      <Table size='sm' w='100%'>
        <Tbody>
          {chapter.pages.map(page => {
            const bgColor = isPageSelected && page.id === selectedId ? '#EBF8D3' : '#FFFFFF';
            return (
              <Tr key={page.id}>
                <Td w='100%' border='solid #C7C7C7 1px' borderTop='0' p={0}>
                  <Button
                    display='flex'
                    onClick={e => {
                      e.preventDefault();
                      router.push(`../page/${page.id}`);
                    }}
                    bg={bgColor}
                    rounded={0}
                    h='100%'
                    w='100%'
                    justifyContent={'flex-start'}
                    fontWeight={400}
                    fontSize='14px'
                    py={2}
                    pl={7}
                    color='#606060'
                  >
                    {page.name}
                  </Button>
                </Td>
              </Tr>
            );
          })}
          <Tr>
            <Td w='100%' border='dashed #C7C7C7 1px' borderTop='0' p={0}>
              <Button
                display='flex'
                onClick={addPage}
                bg='white'
                rounded={0}
                h='100%'
                w='100%'
                justifyContent={'flex-start'}
                fontWeight={400}
                fontSize='14px'
                py={2}
                pl={7}
                color='#606060'
              >
                + Add Page
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
