import {
  Box,
  BoxProps,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { getCsrfToken, getProviders, getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../../components/Layout';
import google from '../../public/assets/google_logo.svg';
import apple from '../../public/assets/apple_logo_black.svg';
import facebook from '../../public/assets/facebook_logo_blue.svg';
import { Provider } from 'next-auth/providers';

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
        <Image src={google} width={100} height={100} alt='google-sign-in' />
      </Box>
    ),
  },
  {
    name: 'facebook',
    icon: (props: BoxProps) => (
      <Box w='50px' h='50px' {...props}>
        <Image src={google} width={100} height={100} alt='google-sign-in' />
      </Box>
    ),
  },
];

const SignUp = ({ csrfToken, providers }: Props) => {
  return (
    <Layout title='Sign Up | Project Juniors Club'>
      <Flex justify='center'>
        <Stack spacing='48px' w='full' maxW='xl' bg={useColorModeValue('white', 'gray.700')} my='64px' textAlign='center'>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Sign Up
          </Heading>
          <FormControl id='email'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <FormLabel textColor='gray.800'>Email</FormLabel>
            <Input placeholder='Enter your email address' _placeholder={{ color: 'gray.500' }} focusBorderColor='#8EC12C' type='email' />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg='#8EC12C'
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign up
            </Button>
          </Stack>
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
            <Box w='50px' h='50px'>
              <Image src={google} width={100} height={100} alt='google-sign-in' />
            </Box>
            <Box w='43px' h='50px'>
              <Image src={apple} width={100} height={116} alt='apple-sign-in' />
            </Box>
            <Box w='50px' h='50px'>
              <Image src={facebook} width={100} height={100} alt='facebook-sign-in' />
            </Box>
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
