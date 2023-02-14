import { Button, Flex, FormControl, Heading, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import Layout from '../../../components/Layout';

const EmailVerify = () => {
  return (
    <Layout title='Sign Up - Email Verification | Project Juniors Club'>
      <Flex justify='center'>
        <Stack spacing='48px' w='full' maxW='xl' bg={useColorModeValue('white', 'gray.700')} my='64px' textAlign='center'>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Sign Up - Email Verification
          </Heading>
          <Stack spacing='24px' textAlign='left' textColor='gray.800'>
            <Text>You’re almost there!</Text>
            <Text>We’ve sent a One-Time Password (OTP) to your email. Please enter your OTP below to verify your email address,</Text>
            <FormControl id='otp'>
              <Input placeholder='Enter your OTP' _placeholder={{ color: 'gray.500' }} focusBorderColor='#8EC12C' type='number' />
            </FormControl>
          </Stack>
          <Stack spacing={6}>
            <Button
              bg='#8EC12C'
              _hover={{
                bg: 'blue.500',
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default EmailVerify;
