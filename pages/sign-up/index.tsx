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
import { signUpEmailState } from '../../atoms/atoms';
import { FormEvent } from 'react';

type FormValues = {
  email: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: email ?? '' } });
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    setEmail(data.email);
    router.push('/sign-up/account-details');
  };

  const handleSignIn = (event: FormEvent, provider: Provider) => {
    event.preventDefault();
    signIn(provider.id);
  };

  return (
    <Layout title='Sign Up | Project Juniors Club'>
      <Flex justify='center'>
        <Stack spacing='48px' w='full' maxW='xl' bg={useColorModeValue('white', 'gray.700')} my='64px' textAlign='center'>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing='48px'>
              <FormControl id='email'>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <FormLabel textColor='gray.800'>Email</FormLabel>
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
                {errors.email && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
              </FormControl>
              <Stack spacing={6}>
                {/* <Link href='/sign-up/account-details'> */}
                <Button
                  type='submit'
                  bg='#8EC12C'
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
                {/* </Link> */}
              </Stack>
            </Stack>
          </form>
          <Text>
            Already have an account?{' '}
            <Link href='/login'>
              <Text as='u' fontWeight='bold' color='#385600' _hover={{ cursor: 'pointer' }}>
                Log in
              </Text>
            </Link>
          </Text>
          <Flex align='center'>
            <Divider />
            <Text padding={2} color='gray.400' fontWeight='semibold'>
              OR
            </Text>
            <Divider />
          </Flex>
          <Text fontWeight='semibold'>Sign Up with SSO</Text>
          <HStack spacing='72px' justify='center'>
            {Object.values(providers).map(provider => {
              if (provider.id !== 'email') {
                const p = sso.find(p => p.name.toLowerCase() === provider.id.toLowerCase());
                return (
                  <div key={provider.name}>
                    <button onClick={_ => handleSignIn(_, provider)}>{p ? <p.icon /> : `Sign in with ${provider.name}`}</button>
                  </div>
                );
              }
            })}
          </HStack>
        </Stack>
      </Flex>
    </Layout>
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
