import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import prisma from '../../lib/prisma';
import { Box, Table, Text } from '@chakra-ui/react';

import styles from './ApplyVouchers.module.css';
import Layout from '../../components/Layout';
import NavBarCart from '../../components/navbar/NavBarCart';
import Button from '../../components/Button';

const ApplyVouchers = ({ courses }) => {
  const router = useRouter();
  const [cartCourses, setCartCourses] = useState([]);

  useEffect(() => {
    const courseList = JSON.parse(localStorage.getItem('Cart'));
    // dummy data
    // const courses = await prisma.course.findMany({
    //   where: {
    //     id: {
    //       in: courseList.map(course => course.id),
    //     }
    //   }
    // });

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

    setCartCourses(courses);
  }, []);

  const handleBack = () => {
    router.push('/view-cart');
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <Layout title='Apply Vouchers'>
      <NavBarCart />
      <Box>
        <Text className={styles.header} pb='25px' pt='35px' pl='160px'>
          Apply Vouchers
        </Text>
        <Text pl='160px'>Apply voucher codes, if any</Text>
      </Box>
      <VoucherTable cartCourses={cartCourses} />
      <TotalSummaryBox cartCourses={cartCourses} handleBack={handleBack} handleCheckout={handleCheckout} />
    </Layout>
  );
};

const VoucherTable = ({ cartCourses }) => {
  return (
    <Box marginInline='15%' marginTop='40px' marginBottom='20px' paddingBlock='5px' paddingInline='20px' className={styles.tablebody}>
      <Table variant='simple'>
        <tbody>
          {cartCourses.map((course, index) => (
            <VoucherEntry course={course} key={index} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

const VoucherEntry = ({ course }) => {
  const [text, setText] = useState('');
  const [voucherSaving, setVoucherSaving] = useState(0);

  const handleApply = () => {
    // use prisma to fetch voucher discount, then update the price
    // const voucher = await prisma.voucher.findUnique({
    //   where: {
    //     code: text,
    //   }
    // });
    // if (voucher) {
    //   setVoucherSaving(voucher.discount);
    // }
    setVoucherSaving(1); // for testing
    course.price -= voucherSaving;
  };

  return (
    <tr style={{ borderTop: '15px solid transparent' }}>
      <td>
        <Text fontSize='md'>{course.name}</Text>
      </td>
      <td style={{ borderRight: '25px solid transparent' }}>
        <Text fontSize='md'>${course.price.toFixed(2) - voucherSaving}</Text>
      </td>
      <td>
        <input
          type='text'
          placeholder='Code'
          style={{
            borderRadius: '6px',
            width: '120px',
            height: '48px',
            color: 'gray',
            fontSize: '14px',
          }}
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </td>
      <td>
        <Box display='flex' flexDir='row'>
          <Button variant='green-solid' onClick={handleApply} isDisabled={voucherSaving > 0}>
            Apply
          </Button>
          <Text fontSize='sm' color='green' marginLeft='10px'>
            Voucher applied!
            <br />
            (You saved ${voucherSaving.toFixed(2)})
          </Text>
        </Box>
      </td>
    </tr>
  );
};

const TotalSummaryBox = ({ cartCourses, handleBack, handleCheckout }) => {
  return (
    <Box
      maxW='50%'
      marginInline='25%'
      marginTop='40px'
      marginBottom='20px'
      border='1px solid #B8DD72'
      paddingBlock='5px'
      paddingInline='80px'
      display='flex'
      flexDir={['column', 'column', 'row']}
      justifyContent='space-between'
      alignItems='center'
      className={styles.tablebody}
    >
      <Box>
        <Text fontSize='sm'>
          Total ({cartCourses.length} {cartCourses.length > 1 ? 'courses' : 'course'})
        </Text>
        <Text fontWeight='700' fontSize='28px'>
          ${cartCourses.reduce((acc, course) => acc + course.price, 0).toFixed(2)}
        </Text>
      </Box>
      <Box display='flex' flexDir='row'>
        <Button variant='black-solid' style={{ marginRight: '10px' }} onClick={handleBack}>
          Back
        </Button>
        <Button variant='green-solid' onClick={handleCheckout}>
          Check Out
        </Button>
      </Box>
    </Box>
  );
};

export default ApplyVouchers;
