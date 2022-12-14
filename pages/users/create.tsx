import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

import { userInfoState } from '../../atoms/atoms';

async function addUser(user) {
  const response = await fetch('../api/index', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [_userInfo, setUserInfo] = useRecoilState(userInfoState);

  const onSubmit = data => {
    console.log(data);
    setUserInfo({
      name: 'temp name',
      email: data.email,
      role: 1,
    });
  };

  const password = useRef({});
  password.current = watch('password', '');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Flex width='full' align='center' justifyContent='center'>
      <Box p={8} width='50%' maxWidth='1000px' borderWidth={1} borderRadius={8} boxShadow='md'>
        <>
          <Box textAlign='center'>
            <Heading>Create Account</Heading>
          </Box>
          <Box textAlign='left'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={Boolean(errors.email)}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  id='email'
                  placeholder='test@test.com'
                  size='md'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: 'Invalid Email Format',
                    },
                  })}
                />
                {errors.email && <FormErrorMessage>{String(errors.email.message)}</FormErrorMessage>}
              </FormControl>
              <FormControl mt={6} isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='*******'
                    size='md'
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password should be at least 8 characters long' },
                    })}
                  />
                  <InputRightElement width='3rem' mr={'0.5rem'}>
                    <Button h='1.5rem' size='sm' onClick={handlePasswordVisibility}>
                      ????
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <FormErrorMessage>{String(errors.password.message)}</FormErrorMessage>}
              </FormControl>
              <FormControl mt={6} isInvalid={Boolean(errors.confirmPassword)}>
                <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='*******'
                    size='md'
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      validate: value => value === password.current || 'The password do not match',
                    })}
                  />
                  <InputRightElement width='3rem' mr={'0.5rem'}>
                    <Button h='1.5rem' size='sm' onClick={handleConfirmPasswordVisibility}>
                      ????
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmPassword && <FormErrorMessage>{String(errors.confirmPassword.message)}</FormErrorMessage>}
              </FormControl>
              <Box textAlign='center' width='100%'>
                <Button variant='outline' type='submit' width='5rem' mt={4}>
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </>
      </Box>
    </Flex>
  );
}
