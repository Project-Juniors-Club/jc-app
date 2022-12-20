import { useState } from 'react';
import Head from 'next/head';
import { Box, Flex, Text, Checkbox } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

import Layout from '../../components/Layout';
import styles from './ViewCart.module.css';
import CustomButton from '../../components/Button';

const ViewCart = () => {
  const courses = [
    {
      title: 'Food Sourcing',
      description:
        'Lorem ipsum dolor sit amet consectetur landitiis illum dolor. Am inventore natus, eos rerum om inventore natus, eos rerum. Tempore, sint at. Doloribus, odio eaque. Am inventore natus, eos rerum. Am inventore natus, eos rerum.',
      duration: '10 hrs, 14 mins',
      creator: 'Food Bank',
      objective: 'This is one thing you could learn from this course.',
      price: 2.95,
      tags: ['#agriculture'],
      category: 'Food Cycle',
    },
  ];

  const [checkedItems, setCheckedItems] = useState(courses.map(() => false));
  const allChecked = checkedItems.every(Boolean);

  return (
    <Layout>
      <Head>
        <title>View Cart</title>
        <meta name='description' />
      </Head>
      <Box>
        <Text className={styles.header} pb='55px' pt='35px' pl='110px'>
          My Cart
        </Text>
      </Box>
      <TableContainer display='flex' maxW='60%' marginInline='20%'>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Course Name</Th>
              <Th>Price</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course, index) => (
              <Tr key={course.title}>
                <Td>
                  <Checkbox
                    colorScheme='green'
                    isChecked={checkedItems[index]}
                    onChange={e => setCheckedItems([...checkedItems.slice(0, index), e.target.checked, ...checkedItems.slice(index + 1)])}
                  />
                </Td>
                <Td>{course.title}</Td>
                <Td>{course.price}</Td>
                <Td>Remove</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ViewCart;
