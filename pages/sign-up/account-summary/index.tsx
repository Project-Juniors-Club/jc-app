import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import { signUpInfoState } from '../../../atoms/atoms';
import Layout from '../../../components/Layout';
import useSnackbar from '../../../hooks/useSnackbar';

type FormValues = {
  email: string;
  name: string;
  age: number;
  toc: boolean;
};

const AccountSummary = () => {
  const { email, name, dob, toc } = useRecoilValue(signUpInfoState);
  const { register, handleSubmit } = useForm({ defaultValues: { email, name, age: dayjs().diff(dob, 'year'), toc } });
  const { openErrorNotification, openSuccessNotification } = useSnackbar();
  const router = useRouter();
  //if user exists (sign up by sso), update user
  const updateUser = (data: FormValues) => {
    console.log({ email: data.email, name: data.name, age: data.age, pdpa: data.toc });
    return axios.put('/api/users', { email: data.email, name: data.name, age: data.age, pdpa: data.toc });
  };
  //if user doesnt exist (sign up by email), create new user
  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      openSuccessNotification('Account creation successful', 'Welcome to Juniors Club!');
      router.push('/');
    },
    onError: error => {
      openErrorNotification('Account creation unsuccessful', 'Please try again.');
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };
  return (
    <Layout title='Sign Up - Email Verification | Project Juniors Club'>
      <Flex justify='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing='48px' w='full' maxW='xl' bg={useColorModeValue('white', 'gray.700')} my='64px' textAlign='center'>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Sign Up - Account Summary
            </Heading>
            <Stack spacing='24px' textAlign='left' textColor='gray.800'>
              <FormControl id='email'>
                <FormLabel textColor='gray.800'>Email</FormLabel>
                <Input
                  type='email'
                  disabled
                  _disabled={{ color: 'gray.800' }}
                  placeholder='No email address provided.'
                  _placeholder={{ color: 'gray.500' }}
                  focusBorderColor='#8EC12C'
                  {...register('email', { required: 'This is required' })}
                />
              </FormControl>
              <FormControl id='name'>
                <FormLabel textColor='gray.800'>Full Name</FormLabel>
                <Input
                  type='text'
                  disabled
                  _disabled={{ color: 'gray.800' }}
                  placeholder='No name provided.'
                  _placeholder={{ color: 'gray.500' }}
                  focusBorderColor='#8EC12C'
                  {...register('name', { required: 'This is required.' })}
                />
              </FormControl>
              <FormControl id='age'>
                <FormLabel textColor='gray.800'>Age</FormLabel>
                <Input
                  type='number'
                  disabled
                  _disabled={{ color: 'gray.800' }}
                  placeholder='No age provided.'
                  _placeholder={{ color: 'gray.500' }}
                  focusBorderColor='#8EC12C'
                  {...register('age', { required: 'This is required' })}
                />
              </FormControl>
            </Stack>
            <Stack spacing={6}>
              <Button
                type='submit'
                bg='#8EC12C'
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Done
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
    </Layout>
  );
};

export default AccountSummary;
