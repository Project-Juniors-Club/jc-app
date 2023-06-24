import { useState, useEffect, useMemo } from 'react';
import { Box, Text, Checkbox } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './ViewCart.module.css';
import Button from '../../components/Button';
import NavBarCart from '../../components/navbar/NavBarCart';
import prisma from '../../lib/prisma';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { Course } from '@prisma/client';
import axios from 'axios';

const ViewCart = ({ courses }) => {
  const session = useSession();
  const router = useRouter();

  const [cartCourses, setCartCourses] = useState<Course[]>([]);

  useEffect(() => {
    const coursesObj = JSON.parse(courses);
    const coursesObjWithPrice = coursesObj.map(course => {
      course.price = parseFloat(course.price);
      return course;
    });
    setCartCourses(coursesObjWithPrice);
  }, [courses]);
  const [checkedItems, setCheckedItems] = useState([]);
  const allChecked = useMemo(() => (checkedItems.length > 0 ? checkedItems.every(Boolean) : false), [checkedItems]);
  const handleRemove = async index => {
    await axios.delete(`/api/cart/${cartCourses[index].id}`, {
      data: {
        userId: session?.data?.user?.id,
      },
    });
    setCartCourses(cartCourses.filter((course, i) => i !== index));
    setCheckedItems(checkedItems.filter((item, i) => i !== index));
  };

  const handleProceed = () => {
    localStorage.setItem('Cart', JSON.stringify(cartCourses.map((course, i) => ({ id: course.id, selected: checkedItems[i] }))));
    router.push('/apply-vouchers');
  };

  const handleCancel = () => {
    localStorage.setItem('Cart', JSON.stringify(cartCourses.map((course, i) => ({ id: course.id, selected: checkedItems[i] }))));
    router.push('/');
  };

  return (
    <>
      <NavBarCart />
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
    </>
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
              <Td width='70%'>{course.title}</Td>
              <Td width='10%'>${parseInt(course.price).toFixed(2)}</Td>
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
  const router = useRouter();
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Image src={'/icons/Cart.svg'} alt='Empty Cart Icon' width={206} height={205} />
      <Text marginBlock='40px' fontSize='xl'>
        Your cart is currently empty.
      </Text>
      <Button variant='green-solid' style={{ marginBottom: '40px' }} onClick={() => router.push('/')}>
        Browse Courses
      </Button>
    </Box>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const user = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    include: { coursesInCart: true },
  });

  console.log(user.coursesInCart);

  return { props: { courses: JSON.stringify(user.coursesInCart) } };
}

export default ViewCart;
