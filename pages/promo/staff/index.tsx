// External imports
import { useState } from 'react';
import {
  Text,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  SimpleGrid,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Local imports
import useSnackbar from '../../hooks/useSnackbar';
import { URL } from '../../utils/links';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import { Provider } from 'next-auth/providers';
import Modal from '../../components/Modal';
import NavBarGeneral from '../../components/navbar/NavBarGeneral';
import NavBar from '../../components/navbar/NavBar';
import NavBarAdmin from '../../../components/navbar/NavBarAdmin';
import login from '../../login';
import { EditIcon } from '@chakra-ui/icons';

type FormData = {
  email: string;
  password: string;
};

enum PromoStatus {
  Active,
  Upcoming,
  Expired,
}

type Promo = {
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: PromoStatus;
};

const PromoTable = (promos: Promo[]) => {
  return (
    <TableContainer display='flex' maxW='60%' marginInline='20%' border='1px solid #B8DD72' borderRadius='lg'>
      <Table variant='simple'>
        <Thead bgColor='#EBF8D3'>
          <Tr>
            <Th>Promo Code</Th>
            <Th>Discount Level (%)</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {promos.map((promo, index: number) => (
            <Tr key={promo.code} className={styles.tablebody}>
              <Td width='30%'>{promo.code}</Td>
              <Td width='25%'>{promo.discount}</Td>
              <Td width='15%'>{promo.startDate}</Td>
              <Td width='15%'>{promo.endDate}</Td>
              <Td width='15%'>
                <Text fontSize='xs' color='red' _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
                  Remove
                </Text>
                <EditIcon style={{ opacity: 0 }} onClick={() => 'Push to router? or modal'} _hover={{ opacity: 1 }} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const PromoPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const router = useRouter();

  const [isPendingLogin, setPendingLogin] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>(null);
  const { openErrorNotification, openSuccessNotification } = useSnackbar();

  const mutation = useMutation(login, {
    onSuccess: data => {
      router.push('/');
    },
    onSettled: () => {},
    onError: error => {
      openErrorNotification('Unable to send Email', 'Please check retype your email and try again.');
    },
  });

  const onSubmit = async (data: FormData) => {
    setPendingLogin(true);
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Login failed. Please check your credentials and try again.');
      } else {
        toast.success('Login successful!');
        router.push('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An unexpected error occurred during login.');
    } finally {
      setPendingLogin(false);
    }
  };

  const handleModalClosed = () => {
    clearTimeout(timeoutId);
    setPendingLogin(false);
  };

  return (
    <>
      <NavBarAdmin />
      <Box height='100vh' display='flex' justifyContent='center' alignItems='center' backgroundColor='#f6f6f6'>
        <Heading color='black' fontWeight={700} className={'text-[2.25rem]'}>
          Promo Code List
        </Heading>
        <Flex width='full' alignContent='center' justifyContent='center' height='100%'>
          <Box
            marginBlock={[2, 0, 0, 0]}
            boxShadow='none'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            width='full'
          >
            <>
              <Box textAlign='left'>
                <form onSubmit={handleSubmit(onSubmit)} color='black'>
                  <FormControl isInvalid={Boolean(errors.email)} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
                    <FormLabel htmlFor='email' color='#3D3D3D'>
                      Email
                    </FormLabel>
                    <Flex>
                      <Input
                        id='code'
                        placeholder='Create Promo Code'
                        _placeholder={{ color: 'gray.500' }}
                        focusBorderColor='#8EC12C'
                        borderColor='grey'
                        color='black'
                        {...register('code', {
                          required: 'This is required.',
                        })}
                      />
                    </Flex>
                    {errors.code && <FormErrorMessage>Please enter a promo code.</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.email)} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
                    <FormLabel htmlFor='password' color='#3D3D3D'>
                      Password
                    </FormLabel>
                    <Flex>
                      <Input
                        id='password'
                        placeholder='Enter Discount'
                        _placeholder={{ color: 'gray.500' }}
                        focusBorderColor='#8EC12C'
                        borderColor='grey'
                        color='black'
                        {...register('discount', {
                          required: 'This is required.',
                        })}
                      />
                    </Flex>
                    {errors.discount && <FormErrorMessage>Please input a valid discount in %.</FormErrorMessage>}
                  </FormControl>
                  <Button type='submit' backgroundColor='#8EC12C' _dark={{ backgroundColor: '#78be20' }} color='black' mt={4} width='full'>
                    Log In
                  </Button>
                  <Box width='full' textAlign='center' mt={5}>
                    Don&#39;t have an account?{' '}
                    <Link href='/sign-up'>
                      <Text as='u' fontWeight='bold' color='#385600' _hover={{ cursor: 'pointer' }}>
                        Sign Up
                      </Text>
                    </Link>
                  </Box>
                </form>
              </Box>
            </>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default PromoPage;

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const session = await getSession({ req });
//   if (session) {
//     return { redirect: { destination: '/home' } };
//   }
//   const csrfToken = await getCsrfToken(context);
//   const providers = await getProviders();
//   return {
//     props: { csrfToken, providers },
//   };
// }
