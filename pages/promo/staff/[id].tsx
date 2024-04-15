// External imports
import { useState, useMemo } from 'react';
import {
  Text,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  SimpleGrid,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalContent,
  RadioGroup,
  Radio,
  Stack,
  PseudoBox,
  Spacer,
} from '@chakra-ui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Local imports
import useSnackbar from '../../../hooks/useSnackbar';
import { URL } from '../../../utils/links';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import { Provider } from 'next-auth/providers';
import NavBarAdmin from '../../../components/navbar/NavBarAdmin';
import { EditIcon } from '@chakra-ui/icons';
import prisma from '../../../lib/prisma';
import { Promo, getPromosWithId } from '../../../lib/server/promo';
import CustomButton from '../../../components/Button';
import Layout from '../../../components/Layout';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';

type FormData = {
  code: string;
  discount: number;
  dateRange: Date[];
};

enum PromoStatus {
  Active,
  Upcoming,
  Expired,
}

type PromoProps = {
  promos: Promo[];
};

const PromoPage = ({ promos }: PromoProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const router = useRouter();

  const [search, setSearch] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedPromo, setSelectedPromo] = useState('');

  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(), new Date()]);

  const [isPermanent, setPermanence] = useState('true');

  const setFormValues = (promo: Promo) => {
    console.log('HEHEH');
    reset({ ...promo });
    onOpen();
  };

  const color = (promo: Promo) => {
    const today = new Date();
    if (today.getTime() - promo.startDate.getTime()) {
    }
  };

  const filteredPromos = useMemo(() => {
    return promos.filter(promo => promo.code.toLowerCase().includes(search.toLowerCase()));
  }, [search, promos]);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    console.log('HEHEHE');
    // try {
    //   // const res = await signIn('credentials', {
    //   //   email: data.email,
    //   //   password: data.password,
    //   //   redirect: false,
    //   // });
    // //   if (res?.error) {
    // //     toast.error('Login failed. Please check your credentials and try again.');
    // //   } else {
    // //     toast.success('Login successful!');
    // //     router.push('/');
    // //   }
    // // } catch (error) {
    // //   console.error('Error during login:', error);
    // //   toast.error('An unexpected error occurred during login.');
    //   console.log("JHEJE")
    // }
  };

  return (
    <Layout>
      <NavBarAdmin />
      <Flex height='100vh' direction='column' padding='5rem 10rem 5rem 10rem' alignItems='left' backgroundColor='#f6f6f6'>
        <Heading color='black' fontWeight={700} className={'text-[2.25rem]'}>
          Promo Code List
        </Heading>
        <div className='flex w-full flex-col gap-9 px-20 py-10'>
          <div>
            <label htmlFor='filterName' className='block text-sm font-medium text-gray-700'>
              Search Promo
            </label>
            <div className='relative mt-1 w-1/2 rounded-md shadow-sm'>
              <input
                type='text'
                name='filterName'
                id='filterName'
                className='block w-full rounded-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                placeholder='Search '
                onChange={e => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <CustomButton variant='black-solid' onClick={onOpen}>
            Add Promo Code
          </CustomButton>

          <TableContainer display='flex' maxWidth='100%' minWidth='80%' marginInline='0%' border='1px solid #B8DD72' borderRadius='lg'>
            <Table variant='simple'>
              <Thead bgColor='#EBF8D3'>
                <Tr>
                  <Th>Promo Code</Th>
                  <Th>Discount Level (%)</Th>
                  <Th>Start Date</Th>
                  <Th>End Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredPromos.map((promo, index: number) => (
                  <Tr key={index}>
                    <Td width='30%'>{promo.code}</Td>
                    <Td width='25%'>{promo.discount}</Td>
                    <Td width='15%'>{promo.startDate}</Td>
                    <Td width='15%'>{promo.endDate}</Td>
                    <Td width='15%'>
                      <Box>
                        <Text></Text>
                        <EditIcon className='opacity-0 hover:opacity-100' onClick={() => setFormValues(promo)} />
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalContent width='full' padding='3rem'>
            <Box textAlign='left'>
              <form onSubmit={handleSubmit(onSubmit)} color='black'>
                <FormControl isInvalid={Boolean(errors.code)} mt={4} mb={4}>
                  <FormLabel htmlFor='code' color='#3D3D3D'>
                    Promo Code
                  </FormLabel>
                  <Flex my={5}>
                    <Input
                      id='code'
                      placeholder='Create Promo Code'
                      _placeholder={{ color: 'gray.500' }}
                      focusBorderColor='#8EC12C'
                      borderColor='grey'
                      color='black'
                      {...register('code', {
                        required: 'This is required.',
                      })}
                    />
                  </Flex>
                  {errors.code && <FormErrorMessage>Please enter a promo code.</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={Boolean(errors.discount)} mt={4}>
                  <FormLabel htmlFor='discount' color='#3D3D3D'>
                    Discount (%) *
                  </FormLabel>
                  <Flex my={5}>
                    <Input
                      id='discount'
                      placeholder='Enter Discount'
                      _placeholder={{ color: 'gray.500' }}
                      focusBorderColor='#8EC12C'
                      borderColor='grey'
                      color='black'
                      {...register('discount', {
                        required: 'This is required.',
                      })}
                    />
                  </Flex>
                  {errors.discount && <FormErrorMessage>Please input a valid discount in %.</FormErrorMessage>}
                </FormControl>
                <FormLabel htmlFor='discount' color='#3D3D3D'>
                  Validity Period
                </FormLabel>
                <RadioGroup onChange={setPermanence} value={isPermanent} mb={5}>
                  <Stack direction='row'>
                    <Radio value={'true'}>Yes</Radio>
                    <Radio value={'false'}>No</Radio>
                  </Stack>
                </RadioGroup>
                {isPermanent == 'false' && (
                  <FormControl isInvalid={Boolean(errors.dateRange)} mt={4}>
                    <Controller
                      name='dateRange'
                      control={control}
                      render={({ field }) => (
                        <RangeDatepicker
                          {...field}
                          propsConfigs={{
                            dayOfMonthBtnProps: {
                              defaultBtnProps: {
                                _hover: {
                                  background: '#A9D357',
                                },
                              },
                              selectedBtnProps: { background: '#A9D357' },
                              isInRangeBtnProps: {
                                background: '#EBF8D3',
                              },
                            },
                          }}
                          selectedDates={selectedDates}
                          onDateChange={value => {
                            setSelectedDates(value);
                            field.onChange(value);
                          }}
                        />
                      )}
                    />
                    {errors.dateRange && <FormErrorMessage>Please input a valid date range.</FormErrorMessage>}
                  </FormControl>
                )}
                <Flex gap='1rem'>
                  <CustomButton type='submit' variant='green-solid'>
                    Save
                  </CustomButton>
                  <CustomButton onClick={onClose} variant='black-outline'>
                    Cancel
                  </CustomButton>
                </Flex>
              </form>
            </Box>
          </ModalContent>
        </Modal>
      </Flex>
    </Layout>
  );
};

export default PromoPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  const id = context.params?.id as string;
  const promos = await getPromosWithId(id);
  console.log(promos);
  if (!session) {
    return { redirect: { destination: '/home' } };
  }
  return {
    props: { promos },
  };
}
