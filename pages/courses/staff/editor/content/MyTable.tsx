import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Center, Text } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

const MyTable = () => {
  const [data, setData] = useState([{ uuid: uuidv4(), name: <Link href={'../page/' + uuidv4()}>Page 1</Link> }]);

  const addRow = () => {
    setData([...data, { uuid: uuidv4(), name: <Link href={'../page/' + uuidv4()}>New Page</Link> }]);
  };

  const deleteRow = uuid => {
    setData(data.filter(row => row.uuid !== uuid));
  };

  return (
    <TableContainer id='myTable'>
      <Table maxW='sm' variant='striped' colorScheme='green' size='sm'>
        <Tbody>
          {data.map(row => (
            <Tr key={row.uuid}>
              <Td>
                <b>{row.name}</b>
              </Td>
              <Td>
                <Text align='right' onClick={() => deleteRow(row.uuid)}>
                  x
                </Text>
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td>
              <Text onClick={addRow}>+ Add Page</Text>
            </Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
