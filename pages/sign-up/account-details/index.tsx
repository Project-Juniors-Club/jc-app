import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signUpDobState, signUpEmailState, signUpInfoState, signUpNameState, signUpTocState } from '../../../atoms/atoms';

import Layout from '../../../components/Layout';

type FormValues = {
  email: string;
  name: string;
  dob: string;
  toc: boolean;
};

const AccountDetails = () => {
  const { email, name, dob, toc } = useRecoilValue(signUpInfoState);
  const setEmail = useSetRecoilState(signUpEmailState);
  const setName = useSetRecoilState(signUpNameState);
  const setDob = useSetRecoilState(signUpDobState);
  const setToc = useSetRecoilState(signUpTocState);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { email, name, dob, toc } });
  const watchToc = watch('toc');
  const router = useRouter();
  //fetch user data first if it exists

  const onSubmit = (data: FormValues) => {
    setEmail(data.email);
    setName(data.name);
    setDob(data.dob);
    setToc(data.toc);
    router.push('account-summary');
  };

  return (
    <Layout title='Sign Up - Email Verification | Project Juniors Club'>
      <Flex justify='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing='48px' w='full' maxW='xl' bg={useColorModeValue('white', 'gray.700')} my='64px' textAlign='center'>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Sign Up - Account Details
            </Heading>
            <Stack spacing='24px' textAlign='left' textColor='gray.800'>
              <FormControl id='email'>
                <FormLabel textColor='gray.800'>Email</FormLabel>
                <Input
                  placeholder='Enter your email address'
                  _placeholder={{ color: 'gray.500' }}
                  focusBorderColor='#8EC12C'
                  type='email'
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
              <FormControl id='name'>
                <FormLabel textColor='gray.800'>Full Name</FormLabel>
                <Input
                  placeholder='Enter your name'
                  _placeholder={{ color: 'gray.500' }}
                  focusBorderColor='#8EC12C'
                  type='text'
                  {...register('name', {
                    required: 'This is required.',
                  })}
                />
              </FormControl>
              <FormControl id='dob'>
                <FormLabel textColor='gray.800'>Date of Birth</FormLabel>
                <Input focusBorderColor='#8EC12C' type='date' {...register('dob', { required: 'This is required.' })} />
              </FormControl>
              <FormControl id='toc'>
                {/* TODO: change to theme primary once set up */}
                <Checkbox colorScheme='green' textColor='gray.800' spacing='24px' {...register('toc', { required: 'This is required.' })}>
                  I agree to the Terms and Conditions of registering my child for the Food Bank Juniors Club
                </Checkbox>
              </FormControl>
            </Stack>
            <Stack spacing={6}>
              <Button
                type='submit'
                disabled={!watchToc}
                bg='#8EC12C'
                //TODO: change to hover color
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </form>
      </Flex>
    </Layout>
  );
};

export default AccountDetails;
