// External imports
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Heading, Input, SimpleGrid, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

// Local imports
import useSnackbar from '../../hooks/useSnackbar';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onChange' });
  
  const { openErrorNotification, openSuccessNotification } = useSnackbar();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const values = await res.json();
      if (res.ok) {
        // login successful
        openSuccessNotification('Login successful', 'You are now logged in.');
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error(err);
      openErrorNotification('Login failed', 'Please recheck your email and password.');
    }
  };

  return (
    <Box height='100vh' display='flex' justifyContent='center' alignItems='center' backgroundColor='#f6f6f6'>
      <Flex width='full' alignContent='center' justifyContent='center' height='100%'>
        <SimpleGrid columns={[1, 1, 1, 2]} spacing={0}>
          <Box display={['none', 'none', 'none', 'block']}>
            <Image
              src='https://foodbank.sg/wp-content/uploads/2020/07/IMG_9279-1024x768.jpg'
              alt='Food Bank'
              backgroundPosition='center'
              height='100%'
              fit='cover'
            />
          </Box>
          <Box
            marginBlock={[2, 0, 0, 0]}
            boxShadow='none'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            width='full'
          >
            <>
              <Image
                // Placeholder url
                src='https://i.imgur.com/7izz9oQ.png'
                alt='Food Bank'
                backgroundPosition='center'
                height='200px'
                marginBottom={6}
              />
              <Heading color='black'>Welcome back!</Heading>
              <Box textAlign='left'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isInvalid={Boolean(errors.email)} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
                    <FormLabel htmlFor='email' color='black'>
                      Email
                    </FormLabel>
                    <Input
                      id='email'
                      type='email'
                      placeholder='Email'
                      borderColor='#78be20'
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
                  <FormControl isInvalid={Boolean(errors.password)} mt={4} width={{ sm: '80vw', md: '80vw', lg: '500px' }}>
                    <FormLabel htmlFor='password' color='black'>
                      Password
                    </FormLabel>
                    <Input
                      id='password'
                      type='password'
                      placeholder='Password'
                      borderColor='#78be20'
                      {...register('password', {
                        required: 'This is required.',
                      })}
                    />
                    {errors.password && <FormErrorMessage>Please enter a password.</FormErrorMessage>}
                  </FormControl>
                  <Box mt={4} color='black' fontWeight='medium'>
                    <Link href='/forgot-password'>Forgot Password?</Link>
                  </Box>
                  <Button
                    type='submit'
                    isLoading={isSubmitting}
                    // Color: Pantone 368 C
                    backgroundColor='#78be20'
                    color='white'
                    mt={4}
                    width='full'
                  >
                    SUBMIT
                  </Button>
                </form>
              </Box>
            </>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default LoginPage;
