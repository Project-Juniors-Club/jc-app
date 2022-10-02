import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, useColorModeValue, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import useSnackbar from '../../hooks/useSnackbar';

type FormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const { openErrorNotification, openSuccessNotification } = useSnackbar();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { password: '', confirmPassword: '' } });
  const password = watch('password');
  const { query } = useRouter();
  const { token } = query;

  const resetPassword = async (data: FormValues) =>
    axios.post(`/api/auth/resetpassword/${token}`, {
      password: data.password,
    });

  const { isLoading, mutate } = useMutation(resetPassword, {
    onSuccess: ({ data }) => {
      console.log('POST ', data);
      openSuccessNotification(data.message);
    },
    onError: (error: AxiosError) => openErrorNotification(error.message),
  });

  const onSubmit = async (data: FormValues) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} boxShadow={'lg'} p={6} my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </Heading>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>New password</FormLabel>
            <Input
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password should be at least 8 characters long' },
              })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type='password'
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: value => value === password || 'Passwords do not match',
              })}
            />
            <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Button
              type='submit'
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              disabled={isLoading}
              isLoading={isLoading}
              loadingText='Submitting'
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default ResetPasswordPage;
