import {
  Box,
  BoxProps,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Provider } from 'next-auth/providers';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';

import Layout from '../../components/Layout';
import google from '../../public/assets/google_logo.svg';
import apple from '../../public/assets/apple_logo_black.svg';
import facebook from '../../public/assets/facebook_logo_blue.svg';
import { signUpEmailState, signUpPasswordState } from '../../atoms/atoms';
import { FormEvent } from 'react';
import Navbar from '../../components/navbar/NavBar';
import { SSOSignUp } from '../login';

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  csrfToken: string;
  providers: Provider[];
};

const sso = [
  {
    name: 'google',
    icon: (props: BoxProps) => (
      <Box w='50px' h='50px' {...props}>
        <Image src={google} width={100} height={100} alt='google-sign-in' />
      </Box>
    ),
  },
  {
    name: 'apple',
    icon: (props: BoxProps) => (
      <Box w='43px' h='50px' {...props}>
        <Image src={apple} width={100} height={100} alt='google-sign-in' />
      </Box>
    ),
  },
  {
    name: 'facebook',
    icon: (props: BoxProps) => (
      <Box w='50px' h='50px' {...props}>
        <Image src={facebook} width={100} height={100} alt='google-sign-in' />
      </Box>
    ),
  },
];

const SignUp = ({ csrfToken, providers }: Props) => {
  const [email, setEmail] = useRecoilState(signUpEmailState);
  const [password, setPassword] = useRecoilState(signUpPasswordState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: email ?? '', password: password ?? '' } });
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const body = { ...data };
    console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
    const res = await fetch(`/api/users/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/',
      });
    }

    // setEmail(data.email);
    // router.push('/sign-up/account-details');
  };

  const handleSignIn = (event: FormEvent, provider: Provider) => {
    event.preventDefault();
    signIn(provider.id);
  };

  return (
    <>
      <Navbar />
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
                Sign Up
              </Heading>
              <Box textAlign='left'>
                <form onSubmit={handleSubmit(onSubmit)} color='black'>
                  <FormControl isInvalid={Boolean(errors.email)} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
                    <FormLabel htmlFor='email' color='#3D3D3D'>
                      Email
                    </FormLabel>
                    <Flex>
                      <Input
                        id='email'
                        type='email'
                        placeholder='Enter your email address'
                        _placeholder={{ color: 'gray.500' }}
                        focusBorderColor='#8EC12C'
                        {...register('email', {
                          required: 'This is required.',
                          pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Please enter a valid email address.',
                          },
                        })}
                      />
                    </Flex>
                    {errors.email && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.password)} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
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
                    Sign up
                  </Button>
                  <Box width='full' textAlign='center' mt={5}>
                    Already have an account?{' '}
                    <Link href='/login'>
                      <Text as='u' fontWeight='bold' color='#385600' _hover={{ cursor: 'pointer' }}>
                        Log in
                      </Text>
                    </Link>
                  </Box>
                </form>
                <SSOSignUp />
              </Box>
            </>
          </Box>
        </Flex>
      </Box>
      <Flex justify='center'>
        <Stack spacing='48px' w='full' maxW='xl' bg={useColorModeValue('white', 'gray.700')} my='64px' textAlign='center'>
          <Text>
            Already have an account?{' '}
            <Link href='/login'>
              <Text as='u' fontWeight='bold' color='#385600' _hover={{ cursor: 'pointer' }}>
                Log in
              </Text>
            </Link>
          </Text>
          <SSOSignUp />
        </Stack>
      </Flex>
    </>
  );
};

export default SignUp;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return { redirect: { destination: '/' } };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { csrfToken, providers },
  };
}
