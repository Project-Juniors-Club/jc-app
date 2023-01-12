import { useState } from 'react';
import Head from 'next/head';
import {
  Text,
  Box,
  Container,
  Flex,
  Spacer,
  VStack,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Tfoot,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import React from 'react';

import Layout from '../../components/Layout';
import styles from './Payment.module.css';
import CustomButton from '../../components/Button';
import StripeCheckoutForm from './StripeCheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51MOi34Aiw9D5AdICpzHtMTM5DFck7YVTGxSeJ0yx2E6XJ8NT5gTyGRWywWqS8EmdXiBk5RpW76bQolO3kGUJPdXr00c7zbejp3',
);

const Payment = () => {
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
  const subtotal = 10.96;
  const discountApplied = 0.0;
  const total = 10.96;

  const [cartCourses, setCartCourses] = useState(courses);

  // Stripe stuff

  // const [clientSecret, setClientSecret] = React.useState('');

  // React.useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch('/api/stripe', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
  //   })
  //     .then(res => res.json())
  //     .then(data => setClientSecret(data.clientSecret));
  // }, []);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  return (
    <Layout title='Check out'>
      <Box>
        <Text className={styles.header} pb='55px' pt='35px' pl='160px'>
          Check Out
        </Text>
      </Box>

      {/* <div className='App'>
        {clientSecret && (
          <Elements stripe={stripePromise}>
            <StripeCheckoutForm />
          </Elements>
        )}
      </div> */}

      <Container maxW='container.xl'>
        <Flex py={20}>
          <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start' border='1px' borderRadius='8px' borderColor='#7FB519'>
            <Heading fontSize={24}>Courses Ordered</Heading>
            <TableContainer w='full'>
              <Table variant='simple'>
                <Thead bg='#EBF8D3'>
                  <Tr>
                    <Th>Course Name</Th>
                    <Th isNumeric>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartCourses.map((course, index) => (
                    <Tr key={course.title} className={styles.tablebody}>
                      <Td>{course.title}</Td>
                      <Td isNumeric>${course.price.toFixed(2)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Box alignSelf='flex-end' borderStyle='solid' borderWidth='1px' borderColor='#E2E8F0' borderRadius='8px' p={5} w='100%'>
              <TableContainer marginLeft='30%' p={0}>
                <Table variant='unstyled'>
                  <Tbody>
                    <Tr>
                      <Td>Subtotal:</Td>
                      <Td>${subtotal.toFixed(2)}</Td>
                    </Tr>
                    <Tr>
                      <Td>Discount Applied:</Td>
                      <Td>-${discountApplied.toFixed(2)}</Td>
                    </Tr>
                    <Tr>
                      <Td>Total:</Td>
                      <Td>${total.toFixed(2)}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </VStack>
          <Spacer p='2%' />
          <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start' border='1px' borderRadius='8px' borderColor='#7FB519'>
            <Heading fontSize={24}>Select a Payment Method</Heading>
            <Tabs alignSelf='stretch' align='center' isFitted>
              <TabList>
                <Tab _selected={{ color: '#7FB519' }}>PayNow</Tab>
                <Tab _selected={{ color: '#7FB519' }}>Credit/Debit Card (via checkout.com)</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <CheckoutForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Flex>
      </Container>
    </Layout>
  );
};

async function sendToken(e: { token: string }) {
  let response = await fetch('/api/checkout?token=' + e.token);
  const data = await response.json();
  console.log('[sendToken]');
  console.log(data);
}

const CheckoutForm = () => (
  <Box>
    <Head>
      <script src='https://cdn.checkout.com/js/framesv2.min.js' defer />
    </Head>

    <Frames
      config={{
        debug: true,
        publicKey: 'pk_sbox_5cdu3zk4ywwlclah2kcfiq7p2qt',
        localization: {
          cardNumberPlaceholder: 'Card number',
          expiryMonthPlaceholder: 'MM',
          expiryYearPlaceholder: 'YY',
          cvvPlaceholder: 'CVV',
        },
        style: {
          base: {
            fontSize: '17px',
            maxHeight: '20px',
          },
        },
      }}
      cardTokenized={sendToken}
      ready={() => {}}
      frameActivated={e => {}}
      frameFocus={e => {}}
      frameBlur={e => {}}
      frameValidationChanged={e => {}}
      paymentMethodChanged={e => {}}
      cardValidationChanged={e => {}}
      cardSubmitted={() => {}}
      cardTokenizationFailed={e => {}}
      cardBinChanged={e => {}}
    >
      <VStack w='full' h='full' p={10} spacing={1} alignItems='flex-start'>
        <Text className={styles.checkoutForm}>Card Information</Text>
        <Box borderWidth='2px' borderRadius='6px' height='40px' width='full' padding='8px 16px'>
          <CardNumber />
        </Box>
        <Text className={styles.checkoutForm}>Expiry</Text>
        <Box borderWidth='2px' borderRadius='6px' height='40px' width='full' padding='8px 16px'>
          <ExpiryDate />
        </Box>
        <Text className={styles.checkoutForm}>CVV</Text>
        <Box borderWidth='2px' borderRadius='6px' height='40px' width='full' padding='8px 16px'>
          <Cvv />
        </Box>
        {/* <button onClick={() => Frames.submitCard()}>Submit Payment</button> */}
        <CustomButton style={{ alignSelf: 'flex-end' }} onClick={() => Frames.submitCard()} variant={'green-solid'}>
          <Text>Proceed</Text>
        </CustomButton>
      </VStack>
    </Frames>
  </Box>
);

export default Payment;
