import { FormEvent, SyntheticEvent, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Heading, Input } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import useSnackbar from '../../hooks/useSnackbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { openErrorNotification, openSuccessNotification } = useSnackbar();

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // login successful
        openSuccessNotification('Login successful', 'You are now logged in.');
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error(err);
      openErrorNotification('Login failed', 'Please recheck your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title='Login'>
      <Flex width='full' align='center' justifyContent='center'>
        <Box p={8} width={['90%', '60%']} borderWidth={1} borderRadius={12} boxShadow='md'>
          <>
            <Heading>Login</Heading>
            <Box textAlign='left'>
              <FormControl isRequired isInvalid={!isValidEmail} mt={4}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input id='email' type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
                {isValidEmail ? '' : <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
                <FormErrorMessage>Please enter a valid password.</FormErrorMessage>
              </FormControl>
              <Button type='submit' isLoading={isLoading} backgroundColor='#009100' color='white' onClick={handleSubmit} mt={4}>
                Submit
              </Button>
            </Box>
          </>
        </Box>
      </Flex>
    </Layout>
  );
};

export default LoginPage;
