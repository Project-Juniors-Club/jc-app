import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
  CheckboxGroup,
  Checkbox,
  HStack,
  Link,
  VStack,
  Image,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  PinInput,
  PinInputField,
  Center,
  Spacer,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

import { userInfoState } from '../../atoms/atoms';

async function addUser(user) {
  const response = await fetch('../api/index', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const email = useRef({});
  email.current = watch('email', '');

  //Chakra UI Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [_userInfo, setUserInfo] = useRecoilState(userInfoState);

  const password = useRef({});
  password.current = watch('password', '');

  const [otp, setOTP] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  //Timer for OTP
  const [timer, setTimer] = useState(60);
  const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  // Opens the modal and sends an OTP email
  const openModal = () => {
    if (!timer) {
      setTimer(60);
    }
    sendOTP();
    onOpen();
  };

  // Resends OTP and disables button for 60 s
  const sendOTP = () => {
    console.log(email.current);
  };

  const onSubmit = data => {
    onOpen;
    console.log(FormData);
    setUserInfo({
      name: 'temp name',
      email: data.email,
      role: 1,
    });
    if (data) {
      router.push('/login');
    }
  };

  return (
    <div>
      <Box height='100vh' display='flex' justifyContent='center' alignItems='center'>
        <Flex width='full' alignContent='center' justifyContent='center' height='100%'>
          <SimpleGrid columns={[1, 1, 1, 2]} spacing={0}>
            <Box display={['none', 'none', 'none', 'block']}>
              <Image src='/assets/login_left.jpg' alt='Food Bank' backgroundPosition='center' height='100%' fit='cover' />
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
                <Image src='/logo/Juniors_Club_logo.png' alt='Food Bank' backgroundPosition='center' height='200px' marginBottom={6} />
                <Flex width='full' align='center' justifyContent='center'>
                  <Box flexDirection={'column'}>
                    <Box textAlign='center'>
                      <Heading>Create Account</Heading>
                    </Box>
                    <Box textAlign='left'>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl mt={6} isInvalid={Boolean(errors.name)}>
                          <FormLabel htmlFor='name'>Name</FormLabel>
                          <InputGroup>
                            <Input
                              id='name'
                              type='text'
                              placeholder='Alex Chua'
                              size='md'
                              {...register('name', {
                                required: 'Name is required',
                                pattern: {
                                  value: /^[A-Z]+$/i,
                                  message: 'Name should only contains alphabets only',
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.name && <FormErrorMessage>{String(errors.name.message)}</FormErrorMessage>}
                        </FormControl>
                        <FormControl mt={6} isInvalid={Boolean(errors.age)}>
                          <FormLabel htmlFor='age'>Age</FormLabel>
                          <InputGroup>
                            <NumberInput defaultValue={15}>
                              <NumberInputField
                                name='age'
                                placeholder={'21'}
                                {...register('age', {
                                  required: 'Age is required',
                                  max: {
                                    value: 150,
                                    message: 'What a liar',
                                  },
                                  min: {
                                    value: 13,
                                    message: 'Age provided must be more than 13 years old',
                                  },
                                  pattern: {
                                    value: /^\d+$/,
                                    message: 'Only digits are allowed',
                                  },
                                })}
                              />
                            </NumberInput>
                          </InputGroup>
                          {errors.age && <FormErrorMessage>{String(errors.age.message)}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={6} isInvalid={Boolean(errors.email)}>
                          <FormLabel htmlFor='email'>Email</FormLabel>
                          <HStack>
                            <VStack>
                              <Input
                                id='email'
                                placeholder='test@test.com'
                                size='md'
                                {...register('email', {
                                  required: 'Email is required',
                                  pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: 'Invalid Email Format',
                                  },
                                })}
                              />
                              {errors.email && <FormErrorMessage>{String(errors.email.message)}</FormErrorMessage>}
                            </VStack>
                            <Button onClick={() => openModal()}> Verify</Button>
                          </HStack>
                        </FormControl>

                        <FormControl mt={6} isInvalid={Boolean(errors.password)}>
                          <FormLabel htmlFor='password'>Password</FormLabel>
                          <InputGroup>
                            <Input
                              id='password'
                              type={showPassword ? 'text' : 'password'}
                              placeholder='*******'
                              size='md'
                              {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password should be at least 8 characters long' },
                              })}
                            />
                            <InputRightElement width='3rem' mr={'0.5rem'}>
                              <Button h='1.5rem' size='sm' onClick={handlePasswordVisibility}>
                                👀
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          {errors.password && <FormErrorMessage>{String(errors.password.message)}</FormErrorMessage>}
                        </FormControl>

                        <FormControl mt={6} isInvalid={Boolean(errors.pdpa)}>
                          <HStack>
                            <CheckboxGroup>
                              <Checkbox
                                id='pdpa'
                                {...register('pdpa', {
                                  required: 'PDPA is required',
                                })}
                              />
                            </CheckboxGroup>
                            <Text>
                              Allow to be{' '}
                              <Link href='https://www.youtube.com/watch?v=eBGIQ7ZuuiU' color={'#3399FF'}>
                                consented
                              </Link>
                            </Text>
                          </HStack>
                          {errors.pdpa && <FormErrorMessage>{String(errors.pdpa.message)}</FormErrorMessage>}
                        </FormControl>

                        <Box textAlign='center' width='100%'>
                          <Button variant='outline' type='submit' width='5rem' mt={4}>
                            Create
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Box>
                </Flex>
              </>
            </Box>
          </SimpleGrid>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <VStack>
                <Text>Please Input Your OTP that is sent to your email</Text>
                <Center>
                  <PinInput otp type='alphanumeric' mask size='lg' onChange={e => setOTP(e)}>
                    <PinInputField mr={3} />
                    <PinInputField mr={3} />
                    <PinInputField mr={3} />
                    <PinInputField mr={3} />
                    <PinInputField mr={3} />
                    <PinInputField mr={3} />
                  </PinInput>
                </Center>
              </VStack>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Flex alignItems='left'>
              <Button colorScheme='blue' onClick={onClose}>
                Close
              </Button>
              <Spacer />
              <Button variant='ghost' onClick={() => sendOTP()} isDisabled={timer > 0}>
                Resend OTP {timer} S
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
