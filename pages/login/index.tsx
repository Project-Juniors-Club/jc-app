// External imports
import { useState } from 'react';
import { Text, Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Heading, Input, SimpleGrid } from '@chakra-ui/react';
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

type Props = {
  csrfToken: string;
  providers: Provider[];
};

type FormData = {
  email: string;
  password: string;
};

export const SSOSignUp = () => {
  return (
    <>
      <Flex className='mt-5' color={'#9E9E9E'}>
        <div className={'border-[#9E9E9E]-[0.4] mt-5 h-0 w-1/2 border-[0.1px] border-solid'} />
        <span className={'m-2'}>OR</span>
        <div className={'border-[#9E9E9E]-[0.4] mt-5 h-0 w-1/2 border-[0.1px] border-solid'} />
      </Flex>

      <Box width='full' textAlign='center' mt={5} mb={5}>
        <Text as='b'>Sign Up with SSO</Text>
      </Box>

      <Flex justifyContent={'space-evenly'}>
        <div className='m-7 cursor-pointer' key='google'>
          <Image
            src={`/assets/googleLogin.svg`}
            width='50'
            height='50'
            alt='user'
            onClick={event => {
              event.preventDefault();
              signIn('google');
            }}
          />
        </div>

        <div className='m-7 cursor-pointer' key='fb'>
          <Image
            src={`/assets/facebookLogin.svg`}
            width='50'
            height='50'
            alt='user'
            onClick={event => {
              event.preventDefault();
              signIn('facebook');
            }}
          />
        </div>
      </Flex>
    </>
  );
};

const LoginPage = ({ csrfToken, providers }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const router = useRouter();

  const [isPendingLogin, setPendingLogin] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>(null);
  const { openErrorNotification, openSuccessNotification } = useSnackbar();

  const login = async (data: FormData) => {
    console.log(data);
    const res = await signIn('credentials', { email: data.email, password: data.password, redirect: false });
    return res;
  };

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
      <NavBar />
      <Box height='100vh' display='flex' justifyContent='center' alignItems='center' backgroundColor='#f6f6f6'>
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
              <Heading color='black' fontWeight={700} className={'text-[2.25rem]'}>
                Log In
              </Heading>
              <Box textAlign='left'>
                <form onSubmit={handleSubmit(onSubmit)} color='black'>
                  <FormControl isInvalid={Boolean(errors.email)} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
                    <FormLabel htmlFor='email' color='#3D3D3D'>
                      Email
                    </FormLabel>
                    <Flex>
                      <Input
                        id='OTP'
                        placeholder='Enter your email address'
                        _placeholder={{ color: 'gray.500' }}
                        focusBorderColor='#8EC12C'
                        borderColor='grey'
                        color='black'
                        {...register('email', {
                          required: 'This is required.',
                        })}
                      />
                    </Flex>
                    {errors.email && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.email)} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
                    <FormLabel htmlFor='password' color='#3D3D3D'>
                      Password
                    </FormLabel>
                    <Flex>
                      <Input
                        id='password'
                        placeholder='Enter your password'
                        _placeholder={{ color: 'gray.500' }}
                        focusBorderColor='#8EC12C'
                        borderColor='grey'
                        color='black'
                        type='password'
                        {...register('password', {
                          required: 'This is required.',
                        })}
                      />
                    </Flex>
                    {errors.email && <FormErrorMessage>Please enter a password that is stronger.</FormErrorMessage>}
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
                <SSOSignUp />
                <ToastContainer position='bottom-center' autoClose={5000} />
              </Box>
            </>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default LoginPage;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return { redirect: { destination: '/courses' } };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { csrfToken, providers },
  };
}
