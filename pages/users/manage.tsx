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
import axios from 'axios';

const UserManagePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isInvalidOtp, setInvalidOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const createOtp = async email => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/users/delete/createOtp/' + email);
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
  const submitOtp = async (email, otp, step) => {
    setIsLoading2(true);
    try {
      const response = await axios.post('/api/users/delete/execute/' + email + '/' + otp + '/' + step);
      const { status, data } = response;
      if (status === 200) {
        setInvalidOtp(false);
        setDeleteModal(step);
      }
    } catch (err: any) {
      setInvalidOtp(true);
      console.error(err);
    } finally {
      setIsLoading2(false);
    }
  };
  const router = useRouter();
  const { data: session } = useSession();
  const [showDeleteModal, setDeleteModal] = useState(0);
  function handleChange() {
    //no editing allowed, do nothing
  }
  return (
    <>
      <Modal isOpen={showDeleteModal === 1} onClose={() => setDeleteModal(0)}>
        <ModalOverlay />
        <ModalContent minW='600px'>
          {/**<ModalCloseButton/>**/}
          <ModalBody>
            <Center>
              <h1 className='pb-6 pt-7 text-4xl font-bold '>{`Delete Account`}</h1>
            </Center>
            <Box>
              <Text mb='16px' as='span'>{`Deleting the account will delete all records. This action `}</Text>
              <Text mb='16px' className='font-bold' as='span'>{`cannot be undone.`}</Text>
              <Text mb='16px'>{`To confirm, enter the OTP sent to your email.`}</Text>
            </Box>
          </ModalBody>
          <Box className='pl-6 pr-6'>
            <Input value={otp} onChange={e => setOtp(e.target.value)} size='md' placeholder='Enter your OTP' isInvalid={isInvalidOtp} />
          </Box>
          <Box className='p-6 pb-8'>
            <Center>
              <CustomButton className='mr-3' onClick={() => setDeleteModal(0)} variant={'green-outline'}>
                <Text>Cancel</Text>
              </CustomButton>
              <CustomButton
                onClick={async () => {
                  await submitOtp(session?.user.email, otp, 2);
                }}
                variant={'black-solid'}
              >
                <Text color={'#FFFFFF'}>Submit</Text>
              </CustomButton>
            </Center>
          </Box>
        </ModalContent>
      </Modal>
      <Modal isOpen={showDeleteModal === 2} onClose={() => setDeleteModal(0)}>
        <ModalOverlay />
        <ModalContent minW='600px'>
          {/**<ModalCloseButton/>**/}
          <ModalBody>
            <Center>
              <VStack>
                <h1 className='pb-6 pt-7 text-4xl font-bold '>{`Delete Account`}</h1>
                <Box>
                  <Text mb='16px' as='span'>{`Your account will be `}</Text>
                  <Text mb='16px' as='span' className='font-bold'>{`permanently deleted. `}</Text>
                  <Text mb='16px' as='span'>{`Are you sure to proceed?`}</Text>
                </Box>
              </VStack>
            </Center>
          </ModalBody>
          <Box className='pb-8 pt-6'>
            <Center>
              <CustomButton className='mr-3' onClick={() => setDeleteModal(0)} variant={'green-outline'}>
                <Text>Cancel</Text>
              </CustomButton>
              <CustomButton
                onClick={async () => {
                  await submitOtp(session?.user.email, otp, 3);
                }}
                variant={'black-solid'}
              >
                <Text color={'#FFFFFF'}>Submit</Text>
              </CustomButton>
            </Center>
          </Box>
        </ModalContent>
      </Modal>
      <Modal isOpen={showDeleteModal === 3} onClose={() => signOut({ callbackUrl: '/' })}>
        <ModalOverlay />
        <ModalContent minW='600px'>
          {/**<ModalCloseButton/>**/}
          <ModalBody>
            <Center>
              <VStack>
                <h1 className='pb-6 pt-7 text-4xl font-bold '>{`Your account has been deleted`}</h1>
                <Box className='pl-2 pr-2'>
                  <Text mb='16px'>{`We have received a request to permanently delete your account. Your account has been deactivated from the site and will be permanently deleted within 14 days.`}</Text>
                  <Text mb='16px' className=''>
                    If you did not request to delete your account, please cancel the request here:&nbsp;
                    <u>
                      <a href='mailto:juniorsclub.nus+deletereq@gmail.com'>link</a>
                    </u>
                  </Text>
                  <Text mb='16px'>{`You will now be redirected to the public landing page.`}</Text>
                </Box>
              </VStack>
            </Center>
          </ModalBody>
          <Box className='pb-8 pt-2'>
            <Center>
              <CustomButton onClick={() => signOut({ callbackUrl: '/' })} variant={'green-outline'}>
                <Text>Done</Text>
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
                  <Input value={session?.user.email} onChange={handleChange} size='md' variant='filled' />
                </Box>
                <Box>
                  <Text mb='8px'>Full Name</Text>
                  <Input value={session?.user.name} onChange={handleChange} size='md' variant='filled' />
                </Box>
                <Box>
                  <Text mb='8px'>Date of Birth</Text>
                  <Input
                    value={session?.data?.dob ? session?.data?.dob.split('T')[0] : 'NA'}
                    onChange={handleChange}
                    size='md'
                    variant='filled'
                  />
                </Box>
                <Box className='pb-6'></Box>
                <Box>
                  <CustomButton
                    onClick={async () => {
                      await createOtp(session?.user.email);
                      setDeleteModal(1);
                    }}
                    variant={'black-solid'}
                    disabled={isLoading}
                    isLoading={isLoading}
                    loadingText='Sending OTP'
                  >
                    <Text color={'#FFFFFF'}>Delete Account</Text>
                  </CustomButton>
                  <CustomButton style={{ float: 'right' }} onClick={() => router.push('/users/edit')} variant={'green-solid'}>
                    <Text color={'#FFFFFF'}>Edit Details</Text>
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

export default UserManagePage;
