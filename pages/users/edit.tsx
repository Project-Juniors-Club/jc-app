import {
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Box,
  Center,
  Flex,
  Container,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CustomButton from '../../components/Button';
import Footer from '../../components/Footer';
import NavBar from '../../components/navbar/NavBar';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserManagePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user.email);
  const [fullname, setFullname] = useState(session?.user.name);
  const [dob, setDob] = useState(session?.data?.dob && session?.data?.dob.split('T')[0]);
  const [newPass, setNewPass] = useState('');
  const [otp, setOtp] = useState('');
  const [isInvalidOtp, setInvalidOtp] = useState(false);
  const [updateModal, setUpdateModal] = useState(0);
  const confirmUpdate = async (uid, email, fullname, dob) => {
    setIsLoading2(true);
    try {
      const response = await axios.post('/api/users/update/set/' + uid + '/' + otp, {
        newEmail: email,
        fullName: fullname,
        dob: dob,
        newPass: newPass,
      });
      const { status, data } = response;
      if (status === 200) {
        setInvalidOtp(false);
        setUpdateModal(2);
      }
    } catch (err: any) {
      console.error(err);
      setInvalidOtp(true);
    } finally {
      setIsLoading2(false);
    }
  };
  const createOtp = async uid => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/users/update/otp/' + uid);
      const { status, data } = response;
      if (status !== 200) {
        console.error(response.status);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  function handleChange() {
    //no editing allowed, do nothing
  }
  return (
    <>
      <Modal isOpen={updateModal === 1} onClose={() => setUpdateModal(0)}>
        <ModalOverlay />
        <ModalContent minW='600px'>
          {/**<ModalCloseButton/>**/}
          <ModalBody>
            <Center>
              <h1 className='pb-6 pt-7 text-4xl font-bold '>{`Update Account Details`}</h1>
            </Center>
            <Box>
              <Text mb='16px' as='span'>{`You are updating your account details. 
                            To confirm the update, please enter the OTP sent to your email.`}</Text>
            </Box>
          </ModalBody>
          <Box className='pl-6 pr-6 pt-3'>
            <Input value={otp} onChange={e => setOtp(e.target.value)} size='md' placeholder='Enter your OTP' isInvalid={isInvalidOtp} />
          </Box>
          <Box className='p-6 pb-8'>
            <Center>
              <CustomButton className='mr-3' onClick={() => setUpdateModal(0)} variant={'green-outline'}>
                <Text>Cancel</Text>
              </CustomButton>
              <CustomButton
                onClick={async () => {
                  await confirmUpdate(session?.data.id, email, fullname, dob);
                }}
                variant={'black-solid'}
              >
                <Text color={'#FFFFFF'}>Submit</Text>
              </CustomButton>
            </Center>
          </Box>
        </ModalContent>
      </Modal>
      <Modal isOpen={updateModal === 2} onClose={() => signOut({ callbackUrl: '/' })}>
        <ModalOverlay />
        <ModalContent minW='600px'>
          {/**<ModalCloseButton/>**/}
          <ModalBody>
            <Center>
              <h1 className='pb-6 pt-7 text-4xl font-bold '>{`Update Account Details`}</h1>
            </Center>
            <Box>
              <Center>
                <Text mb='16px' as='span'>{`Your account details have been successfully updated!`}</Text>
              </Center>
            </Box>
          </ModalBody>
          <Box className='pl-6 pr-6'></Box>
          <Box className='p-6 pb-8'>
            <Center>
              <CustomButton onClick={() => signOut({ callbackUrl: '/login' })} variant={'green-outline'}>
                <Text fontSize='small'>Done</Text>
              </CustomButton>
            </Center>
          </Box>
        </ModalContent>
      </Modal>
      <NavBar />
      <Box className='mt-5'>
        <Flex direction={'column'}>
          <Box className='min-w-screen min-h-[100%] bg-white px-40 py-20'>
            <Center className='h-full w-full'>
              <Stack direction='column' spacing={3}>
                <h1 className='pb-6 text-5xl font-bold '>Account Details</h1>
                <Box />
                <Box>
                  <Text mb='8px'>Email</Text>
                  <Input value={email} onChange={e => setEmail(e.target.value)} size='md' type='email' isInvalid={!validateEmail(email)} />
                </Box>
                <Box>
                  <Text mb='8px'>Full Name</Text>
                  <Input value={fullname} onChange={e => setFullname(e.target.value)} size='md' />
                </Box>
                <Box>
                  <Text mb='8px'>Date of Birth</Text>
                  <Input value={dob} onChange={e => setDob(e.target.value)} size='md' type='date' />
                </Box>
                <Box>
                  <Text mb='8px'>Password</Text>
                  <Input value={newPass} onChange={e => setNewPass(e.target.value)} size='md' placeholder='unchanged' type='password' />
                </Box>
                <Box className='pb-6'></Box>
                <Box>
                  <CustomButton style={{ float: 'left' }} onClick={() => router.push('/users/manage')} variant={'black-solid'}>
                    <Text color={'#FFFFFF'}>{`< Go back`}</Text>
                  </CustomButton>
                  <CustomButton
                    style={{ float: 'right' }}
                    onClick={async () => {
                      await createOtp(session?.data.id);
                      setUpdateModal(1);
                    }}
                    disabled={isLoading || !validateEmail(email)}
                    isLoading={isLoading}
                    loadingText='Sending OTP'
                    variant={'green-solid'}
                  >
                    <Text color={'#FFFFFF'}>Update</Text>
                  </CustomButton>
                </Box>
              </Stack>
            </Center>
          </Box>
          <Box style={{ height: 275 }}></Box>
          <Box style={{ bottom: 0, width: '100%' }}>
            <Footer />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export default UserManagePage;
