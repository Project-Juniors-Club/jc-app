import { useState } from 'react';
import { Box, Text, Checkbox } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

import Layout from '../../components/Layout';
import styles from './ViewCart.module.css';
import Button from '../../components/Button';

const ViewCart = () => {
  const courses = [
    {
      title: 'Food Sourcing',
      price: 4.95,
    },
    {
      title: 'Food Sourcing but Longer and Pricier',
      price: 10.0,
    },
  ];

  const [checkedItems, setCheckedItems] = useState(courses.map(() => false));
  const allChecked = checkedItems.every(Boolean);

  const handleRemove = course => {
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    setCheckedItems([...checkedItems.slice(0, index), ...checkedItems.slice(index + 1)]);
  };

  return (
    <Layout title='View Cart'>
      <Box>
        <Text className={styles.header} pb='55px' pt='35px' pl='160px'>
          My Cart
        </Text>
      </Box>
      <CartTable courses={courses} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleRemove={handleRemove} />
      <TotalSummaryBox courses={courses} checkedItems={checkedItems} setCheckedItems={setCheckedItems} allChecked={allChecked} />
    </Layout>
  );
};

const CartTable = ({ courses, checkedItems, setCheckedItems, handleRemove }) => {
  return (
    <TableContainer display='flex' maxW='60%' marginInline='20%' border='1px solid #B8DD72' borderRadius='lg'>
      <Table variant='simple'>
        <Thead bgColor='#EBF8D3'>
          <Tr>
            <Th></Th>
            <Th>Course Name</Th>
            <Th>Price</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map((course, index) => (
            <Tr key={course.title} className={styles.tablebody}>
              <Td width='10%'>
                <Checkbox
                  colorScheme='green'
                  isChecked={checkedItems[index]}
                  onChange={e => setCheckedItems([...checkedItems.slice(0, index), e.target.checked, ...checkedItems.slice(index + 1)])}
                />
              </Td>
              <Td width='70%'>{course.title}</Td>
              <Td width='10%'>${course.price.toFixed(2)}</Td>
              <Td width='10%'>
                <Text
                  fontSize='xs'
                  color='red'
                  onClick={() => handleRemove(course)}
                  _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Remove
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const TotalSummaryBox = ({ courses, checkedItems, setCheckedItems, allChecked }) => {
  return (
    <Box
      maxW='62%'
      marginInline='19%'
      marginTop='40px'
      marginBottom='20px'
      border='1px solid #B8DD72'
      paddingBlock='5px'
      paddingInline='20px'
      display='flex'
      flexDir={['column', 'column', 'row']}
      justifyContent='space-between'
      alignItems='center'
      className={styles.tablebody}
    >
      <Checkbox isChecked={allChecked} onChange={e => setCheckedItems(courses.map(() => e.target.checked))} colorScheme='green'>
        Select All ({checkedItems.length})
      </Checkbox>
      <Box>
        <Text fontSize='sm'>
          Total ({checkedItems.filter(Boolean).length} course{checkedItems.filter(Boolean).length == 1 ? '' : 's'}):
        </Text>
        <Text fontWeight='700' fontSize='28px'>
          $
          {courses
            .map((course, index) => (checkedItems[index] ? course.price : 0))
            .reduce((a, b) => a + b, 0)
            .toFixed(2)}
        </Text>
      </Box>
      <Box display='flex' flexDir='row'>
        <Button variant='black-solid' style={{ marginRight: '10px' }}>
          Cancel
        </Button>
        <Button variant='green-solid'>Proceed</Button>
      </Box>
    </Box>
  );
};

export default ViewCart;
