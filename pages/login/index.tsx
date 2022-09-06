import { FormEvent, SyntheticEvent, useState } from 'react';
import { Button, FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import useSnackbar from '../../hooks/useSnackbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();


  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleFailure = () => {
    // showSnackbar.error({
    //   title: 'Login failed!',
    //   description: 'Please check your email and password.',
    // });
    alert('Login failed! Please check your email and password.');
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
        alert(`Login successful!`);
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error(err);
      handleFailure();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title='Login'>
      <FormControl isRequired isInvalid={!isValidEmail}>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
        {isValidEmail ? '' : <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input id='password' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
        <FormErrorMessage>Please enter a valid password.</FormErrorMessage>
      </FormControl>
      <Button type='submit' isLoading={isLoading} colorScheme='blue' onClick={handleSubmit}>
        Submit
      </Button>
    </Layout>
  );
};

export default LoginPage;
