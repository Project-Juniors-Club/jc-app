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
  import { getSession } from 'next-auth/react';
  import { useRouter } from 'next/router';
  import { useForm } from 'react-hook-form';
  import { useRecoilValue, useSetRecoilState } from 'recoil';
  import { userInfoState, emailState,nameState,roleState } from '../../atoms/atoms';
  
  import Layout from '../../components/Layout';
  import { useAdminQuery, useUserQuery } from '../../hooks/queries';
  
  type FormValues = {
    email: string;
    name: string;
  };
  
  const AccountDetails = ({ user }) => {
    const { email, name, role } = useRecoilValue(userInfoState);
    const setEmail = useSetRecoilState(nameState);
    const setName = useSetRecoilState(emailState);
    const setRole = useSetRecoilState(roleState);

    const adminQuery = useAdminQuery(user?.id);
    const userQuery = useUserQuery(user?.id);
    // if user exists, use user data instead
    if (adminQuery?.data && userQuery?.data) {
      const { role } = adminQuery.data;
      const {name, email} = userQuery.data;
      setRole(role);
      setName(name);
      setEmail(email);
    }
  
    const {
      register,
      watch,
      formState: { errors, isDirty },
      handleSubmit,
    } = useForm({ defaultValues: { email, name,} });
  
    const onSubmit = (data: FormValues) => {
      setEmail(data.email);
      setName(data.name);
    };
  
    return (
      <Layout title='Staff Portal'>
        <Flex justify='center'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing='48px' w='full' maxW='xl' bg={useColorModeValue('white', 'gray.700')} my='64px' textAlign='center'>
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Staff - Account Details
              </Heading>
              <Stack spacing='24px' textAlign='left' textColor='gray.800'>
                
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
                <FormControl id='role' isReadOnly>
                  <FormLabel textColor='gray.800'>Role</FormLabel>
                  <Input focusBorderColor='#8EC12C' type='text' value={role}/>
                </FormControl>
                <FormControl id='title' isReadOnly>
                  <FormLabel textColor='gray.800'>Title</FormLabel>
                  <Input focusBorderColor='#8EC12C' type='text' value={role}/>
                </FormControl>
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
                
              </Stack>
              <Stack spacing={6}>
                <Button
                  type='submit'
                  disabled={!isDirty}
                  bg='#8EC12C'
                  //TODO: change to hover color
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </form>
        </Flex>
      </Layout>
    );
  };
  
  export default AccountDetails;
  
  export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
    console.log(session);
    return {
      props: { user: session.user ?? undefined },
    };
  }
  