import { FormEvent, SyntheticEvent, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Heading, Input, SimpleGrid, Image } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import useSnackbar from '../../hooks/useSnackbar';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // So that error does not pop up on first visit
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
        <SimpleGrid columns={[1, 1, 1, 2]} spacing={0}>
          <Box display={['none', 'none', 'none', 'block']}>
            <Image src='https://foodbank.sg/wp-content/uploads/2020/07/IMG_9279-1024x768.jpg' alt='Food Bank' backgroundPosition='center' />
          </Box>
          <Box
            marginBlock={[2, 0, 0, 0]}
            p={8}
            borderWidth={1}
            borderRadius={0}
            boxShadow='none'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            width='full'
          >
            <>
              <Heading>Welcome back!</Heading>
              <Box textAlign='left'>
                <FormControl isRequired isInvalid={!isValidEmail} mt={4} width={{ sm: '200px', md: '300px', lg: '500px' }}>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input id='email' type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
                  {isValidEmail ? '' : <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                </FormControl>
                <FormControl isRequired mt={4} width={{ sm: '200px', md: '300px', lg: '500px' }}>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input id='password' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
                  <FormErrorMessage>Please enter a valid password.</FormErrorMessage>
                </FormControl>
                <Box mt={4} color='black' fontWeight='medium'>
                  <Link href='/forgot-password'>Forgot Password?</Link>
                </Box>
                <Button
                  type='submit'
                  isLoading={isLoading}
                  backgroundColor='#009100'
                  color='white'
                  onClick={handleSubmit}
                  mt={4}
                  width='full'
                >
                  SUBMIT
                </Button>
              </Box>
            </>
          </Box>
        </SimpleGrid>
      </Flex>
    </Layout>
  );
};

export default LoginPage;
