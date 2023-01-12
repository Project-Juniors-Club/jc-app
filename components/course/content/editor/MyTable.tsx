import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Center, Text } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

type TableProps = {
  isPageSelected: boolean;
  selectedId: string;
};

const MyTable = ({ isPageSelected, selectedId }: TableProps) => {
  const router = useRouter();
  const [data, setData] = useState([
    { uuid: '123', name: 'Page 1' },
    { uuid: '456', name: 'Page 2' },
  ]);

  const addRow = () => {
    setData([...data, { uuid: uuidv4(), name: 'Page3' }]);
  };

  const deleteRow = uuid => {
    setData(data.filter(row => row.uuid !== uuid));
  };

  return (
    <TableContainer id='myTable'>
      <Table size='sm' w='100%'>
        <Tbody>
          {data.map(page => {
            const bgColor = isPageSelected && page.uuid === selectedId ? '#EBF8D3' : '#FFFFFF';
            return (
              <Tr key={page.uuid}>
                <Td
                  w='100%'
                  bg={bgColor}
                  border='solid #C7C7C7 1px'
                  borderTop='0'
                  onClick={e => {
                    e.preventDefault();
                    router.push(`../page/${page.uuid}`);
                  }}
                >
                  {page.name}
                </Td>
              </Tr>
            );
          })}
          <Tr>
            <Td border='dashed #C7C7C7 1px' borderTop='0'>
              <Text onClick={addRow}>+ Add Page</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
