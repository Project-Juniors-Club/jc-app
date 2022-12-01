import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import { signUpInfoState } from '../../../atoms/atoms';
import Layout from '../../../components/Layout';

const AccountSummary = () => {
  const { email, name, dob } = useRecoilValue(signUpInfoState);
  const { register, handleSubmit } = useForm({ defaultValues: { email, name, age: dayjs().diff(dob, 'year') } });
  return (
    <Layout title='Sign Up - Email Verification | Project Juniors Club'>
      <Flex justify='center'>
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
              bg='#8EC12C'
              _hover={{
                bg: 'blue.500',
              }}
            >
              Done
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default AccountSummary;
