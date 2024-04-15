// External imports
import { useState, useMemo } from 'react';
import {
  Text,
  Box,
  HStack,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
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
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Local imports
import { getSession } from 'next-auth/react';
import NavBarAdmin from '../../../components/navbar/NavBarAdmin';
import { EditIcon } from '@chakra-ui/icons';
import { Promo, getPromosWithId } from '../../../lib/server/promo';
import CustomButton from '../../../components/Button';
import Layout from '../../../components/Layout';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';

type FormData = {
  code: string;
  discount: number;
  dateRange: Date[];
};

type PromoProps = {
  promos: Promo[];
  courseId: string;
};

const PromoPage = ({ promos, courseId }: PromoProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [search, setSearch] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [promoId, setPromoId] = useState('');

  const [isPermanent, setPermanence] = useState('true');

  const setFormValues = (promo: FormData) => {
    reset({ ...promo });
    onOpen();
  };

  const getStatus = (promo: Promo) => {
    const today = new Date();
    const sDate = new Date(promo.startDate);
    const eDate = new Date(promo.endDate);

    if (eDate.getTime() - today.getTime() < 0) {
      return ['#A9D357', 'Active'];
    } else if (today.getTime() - sDate.getTime() < 0) {
      return ['#000000', 'Upcoming'];
    } else {
      return ['#000000', 'Expired'];
    }
  };

  const handleClose = () => {
    setFormValues({} as FormData);
    setPromoId('');
    setPermanence('true');
    onClose();
  };
  const filteredPromos = useMemo(() => {
    return promos.filter(promo => promo.code.toLowerCase().includes(search.toLowerCase()));
  }, [search, promos]);

  const onSubmit = async (data: FormData) => {
    const promo: Promo = {
      ...data,
      id: promoId,
      startDate: data.dateRange[0].toLocaleString(),
      endDate: data.dateRange[1].toLocaleString(),
    };
    try {
      let res: any;
      if (promoId === '') {
        res = await axios.post(`/api/promo`, { ...promo, courseId });
      } else {
        res = await axios.post(`/api/promo/${courseId}`, { ...promo });
      }

      if (res?.error) {
        toast.error('Unable to add/update promo.');
      } else {
        handleClose();
        toast.success('Promo added/updated!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An unexpected error occurred when creating/updating promo. Please try again.');
    }
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
                {filteredPromos.map((promo, index: number) => {
                  const [color, text] = getStatus(promo);
                  return (
                    <Tr key={index}>
                      <Td width='30%'>{promo.code}</Td>
                      <Td width='25%'>{promo.discount}</Td>
                      <Td width='15%'>{promo.startDate}</Td>
                      <Td width='15%'>{promo.endDate}</Td>
                      <Td width='15%'>
                        <HStack>
                          <Text color={color}>{text}</Text>
                          <EditIcon
                            className='opacity-0 hover:opacity-100'
                            onClick={() => {
                              if (promo.endDate) {
                                setPermanence('false');
                                setPromoId(promo.id);
                              }
                              let obj: FormData = { dateRange: [new Date(promo.startDate), new Date(promo.endDate)], ...promo };
                              setFormValues(obj);
                            }}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>

        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
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
                    <NumberInput min={0} max={100} width='100%'>
                      <NumberInputField
                        {...register('discount', {
                          required: 'This is required.',
                          max: 100,
                          min: 1,
                          valueAsNumber: true,
                        })}
                        name='discount'
                        placeholder='Discount in %'
                      />
                    </NumberInput>
                  </Flex>
                  {errors.discount && <FormErrorMessage>Please input a valid discount in % (1- 100).</FormErrorMessage>}
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
                  <FormControl isInvalid={Boolean(errors.dateRange)} my={5}>
                    <Controller
                      name='dateRange'
                      control={control}
                      defaultValue={[new Date(), new Date()]}
                      render={({ field }) => (
                        <RangeDatepicker
                          ref={field.ref}
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
                          selectedDates={field.value}
                          onDateChange={value => {
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
  const courseId = context.params?.id as string;
  const promos = await getPromosWithId(courseId);
  if (!session) {
    return { redirect: { destination: '/home' } };
  }
  return {
    props: { promos, courseId },
  };
}
