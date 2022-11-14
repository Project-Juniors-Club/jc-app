import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import Layout from '../../../components/Layout';

const AccountDetails = () => {
  return (
    <Layout title='Sign Up - Email Verification | Project Juniors Club'>
      <Flex justify='center'>
        <Stack spacing='48px' w='full' maxW='xl' bg={useColorModeValue('white', 'gray.700')} my='64px' textAlign='center'>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Sign Up - Account Details
          </Heading>
          <Stack spacing='24px' textAlign='left' textColor='gray.800'>
            <FormControl id='email'>
              <FormLabel textColor='gray.800'>Email</FormLabel>
              <Input placeholder='Enter your email address' _placeholder={{ color: 'gray.500' }} focusBorderColor='#8EC12C' type='email' />
            </FormControl>
            <FormControl id='name'>
              <FormLabel textColor='gray.800'>Full Name</FormLabel>
              <Input placeholder='Enter your name' _placeholder={{ color: 'gray.500' }} focusBorderColor='#8EC12C' type='text' />
            </FormControl>
            <FormControl id='dob'>
              <FormLabel textColor='gray.800'>Date of Birth</FormLabel>
              <Input focusBorderColor='#8EC12C' type='date' />
            </FormControl>
          </Stack>
          <Stack spacing={6}>
            <Button
              bg='#8EC12C'
              _hover={{
                bg: 'blue.500',
              }}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default AccountDetails;
