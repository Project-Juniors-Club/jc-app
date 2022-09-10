import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';

type FormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({ defaultValues: { password: '', confirmPassword: '' } });
  const password = watch('password');
  const { query } = useRouter();
  const { token } = query;
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const { password } = data;
    try {
      const response = await axios.post(`/api/auth/resetpassword/${token}`, {
        password,
      });
      const { status, data } = response;
      //TODO: add error handling for when token is invalid/expired (403)
      //logout
      if (status !== 200) {
        console.error(response.status);
      }
      //TODO: replace with redirect to login page
      console.log('POST ', data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout title='Reset Password | Next.js + TypeScript Example'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} justifyContent='center'>
          <FormControl isInvalid={Boolean(errors.password)}>
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
          <FormControl isInvalid={Boolean(errors.password)}>
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
          <Button type='submit' disabled={!isDirty || isLoading} isLoading={isLoading} loadingText='Submitting' colorScheme='blue'>
            Submit
          </Button>
        </VStack>
      </form>
    </Layout>
  );
};
export default ResetPasswordPage;
