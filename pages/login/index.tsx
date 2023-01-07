// External imports
import { useState } from 'react';
import { Text, Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Heading, Input, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import CustomButton from '../../components/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

// Local imports
import useSnackbar from '../../hooks/useSnackbar';
import { URL } from '../../utils/links';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import { Provider } from 'next-auth/providers';

type Props = {
  csrfToken: string;
  providers: Provider[];
};

const LoginPage = ({ csrfToken, providers }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const router = useRouter();
  const { openErrorNotification, openSuccessNotification } = useSnackbar();

  const login = (data: FormData) => {
    return axios.post(URL, data);
  };

  const mutation = useMutation(login, {
    onSuccess: () => {
      openSuccessNotification('Login successful', 'Welcome back!');
      router.push('/');
    },
    onError: error => {
      openErrorNotification('Login failed', 'Please recheck your email and password.');
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
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
                <FormControl isInvalid={Boolean(errors.email) || mutation.isError} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
                  <FormLabel htmlFor='email' color='#3D3D3D'>
                    Email
                  </FormLabel>
                  <Flex>
                    <Input
                      id='email'
                      type='email'
                      placeholder='Enter your email address'
                      borderColor='grey'
                      color='#3D3D3D'
                      {...register('email', {
                        required: 'This is required.',
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: 'Please enter a valid email address.',
                        },
                      })}
                    />
                    <CustomButton variant={'green-outline'} className='mr-4 ml-4 h-[40px] w-40 text-base'>
                      <Text color={'#385600'} fontWeight={400}>
                        Send OTP
                      </Text>
                    </CustomButton>
                  </Flex>

                  {errors.email && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.password) || mutation.isError}
                  mt={4}
                  width={{ sm: '80vw', md: '80vw', lg: '500px' }}
                >
                  <FormLabel htmlFor='OTP' color='#3D3D3D'>
                    OTP
                  </FormLabel>
                  <Input
                    id='OTP'
                    placeholder='Enter your OTP'
                    borderColor='grey'
                    color='black'
                    {...register('password', {
                      required: 'This is required.',
                    })}
                  />
                  {(errors.password || mutation.isError) && <FormErrorMessage>Incorrect OTP</FormErrorMessage>}
                </FormControl>
                <Button
                  type='submit'
                  isLoading={mutation.isLoading}
                  backgroundColor='#8EC12C'
                  _dark={{ backgroundColor: '#78be20' }}
                  color='black'
                  mt={4}
                  width='full'
                >
                  Log In
                </Button>
                <Box width='full' textAlign='center' mt={5}>
                  Don&#39;t have an account?{' '}
                  <Text as='b'>
                    <Text as='u'>
                      <Link href='/signup'>Sign Up</Link>
                    </Text>
                  </Text>
                </Box>
              </form>
              <Flex color={'#9E9E9E'}>
                <div className={'border-[#9E9E9E]-[0.4] mt-5 h-0 w-1/2 border-[0.1px] border-solid'} />
                <span className={'m-2'}>OR</span>
                <div className={'border-[#9E9E9E]-[0.4] mt-5 h-0 w-1/2 border-[0.1px] border-solid'} />
              </Flex>

              <Box width='full' textAlign='center' mt={5} mb={5}>
                <Text as='b'>Login with SSO</Text>
              </Box>

              <Flex justifyContent={'space-evenly'}>
                {Object.values(providers).map(provider =>
                  provider.id === 'email' ? (
                    <></>
                  ) : (
                    <div className='m-7 cursor-pointer' key={provider.name}>
                      <Image
                        src={`/assets/${provider.name}Login.svg`}
                        width='50'
                        height='50'
                        alt='user'
                        onClick={event => {
                          event.preventDefault();
                          signIn(provider.id);
                        }}
                      />
                    </div>
                  ),
                )}
              </Flex>
            </Box>
          </>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginPage;

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
