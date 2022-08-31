import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async event => {
    if (isError) {
      event.preventDefault();
      window.alert("Password don't match");
    } else {
      event.preventDefault();
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const isError = password !== confirmPassword;

  return (
    <Flex width='full' align='center' justifyContent='center'>
      <Box p={8} width='50%' maxWidth='1000px' borderWidth={1} borderRadius={8} boxShadow='md'>
        <>
          <Box textAlign='center'>
            <Heading>Create Account</Heading>
          </Box>
          <Box textAlign='left'>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  type='email'
                  placeholder='test@test.com'
                  size='md'
                  onChange={event => setEmail(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='*******'
                    size='md'
                    onChange={event => setPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width='3rem' mr={'0.5rem'}>
                    <Button h='1.5rem' size='sm' onClick={handlePasswordVisibility}>
                      👀
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={6} isInvalid={isError}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    value={confirmPassword}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='*******'
                    size='md'
                    onChange={event => setConfirmPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width='3rem' mr={'0.5rem'}>
                    <Button h='1.5rem' size='sm' onClick={handleConfirmPasswordVisibility}>
                      👀
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {isError ? <FormErrorMessage>Password does not match.</FormErrorMessage> : <FormHelperText>✔️</FormHelperText>}
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
