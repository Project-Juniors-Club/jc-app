import { useState, useEffect } from 'react';
import { Box, Text, Checkbox } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import styles from './ViewCart.module.css';
import Button from '../../components/Button';
import { Course } from '../../interfaces/index';

const ViewCart = () => {
  const router = useRouter();

  const [cartCourses, setCartCourses] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const allChecked = checkedItems.every(Boolean);

  useEffect(() => {
    // dummy data
    const courses = [
      {
        id: '1',
        name: 'Food Sourcing',
        description: 'Learn how to source food',
        stars: 5,
        adminId: '1',
        price: 4.95,
      },
      {
        id: '2',
        name: 'Food Sourcing but Longer and Pricier',
        description: 'Learn how to source food but Longer and Pricier',
        stars: 4,
        adminId: '2',
        price: 10.0,
      },
    ];
    setCartCourses(JSON.parse(localStorage.getItem('Cart')) || courses);
    setCheckedItems(cartCourses.map(() => false));
  }, []);

  const handleRemove = index => {
    setCartCourses(cartCourses.filter((course, i) => i !== index));
    setCheckedItems(checkedItems.filter((item, i) => i !== index));
  };

  const handleProceed = () => {
    localStorage.setItem('Cart', JSON.stringify(cartCourses.filter((course, index: number) => checkedItems[index])));
    router.push('/apply-vouchers');
  };

  const handleCancel = () => {
    localStorage.setItem('Cart', JSON.stringify(cartCourses.filter((course, index: number) => checkedItems[index])));
    router.push('/');
  };

  return (
    <Layout title='View Cart'>
      <Box>
        <Text className={styles.header} pb='55px' pt='35px' pl='160px'>
          My Cart
        </Text>
      </Box>
      {cartCourses.length > 0 ? (
        <>
          <CartTable cartCourses={cartCourses} checkedItems={checkedItems} setCheckedItems={setCheckedItems} handleRemove={handleRemove} />
          <TotalSummaryBox
            cartCourses={cartCourses}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            allChecked={allChecked}
            handleProceed={handleProceed}
            handleCancel={handleCancel}
          />
        </>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  );
};

const CartTable = ({ cartCourses, checkedItems, setCheckedItems, handleRemove }) => {
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
          {cartCourses.map((course, index: number) => (
            <Tr key={course.id} className={styles.tablebody}>
              <Td width='10%'>
                <Checkbox
                  colorScheme='green'
                  isChecked={checkedItems[index]}
                  onChange={e => setCheckedItems([...checkedItems.slice(0, index), e.target.checked, ...checkedItems.slice(index + 1)])}
                />
              </Td>
              <Td width='70%'>{course.name}</Td>
              <Td width='10%'>${course.price.toFixed(2)}</Td>
              <Td width='10%'>
                <Text
                  fontSize='xs'
                  color='red'
                  onClick={() => handleRemove(index)}
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

const TotalSummaryBox = ({ cartCourses, checkedItems, setCheckedItems, allChecked, handleProceed, handleCancel }) => {
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
      <Checkbox isChecked={allChecked} onChange={e => setCheckedItems(checkedItems.map(() => e.target.checked))} colorScheme='green'>
        Select All ({cartCourses.length})
      </Checkbox>
      <Box>
        <Text fontSize='sm'>
          Total ({checkedItems.filter(Boolean).length} course{checkedItems.filter(Boolean).length == 1 ? '' : 's'}):
        </Text>
        <Text fontWeight='700' fontSize='28px'>
          $
          {cartCourses
            .map((course, index: number) => (checkedItems[index] ? course.price : 0))
            .reduce((a: number, b: number) => a + b, 0)
            .toFixed(2)}
        </Text>
      </Box>
      <Box display='flex' flexDir='row'>
        <Button variant='black-solid' style={{ marginRight: '10px' }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant='green-solid' onClick={handleProceed}>
          Proceed
        </Button>
      </Box>
    </Box>
  );
};

const EmptyCart = () => {
  return <>Your cart is empty.</>;
};

export default ViewCart;
