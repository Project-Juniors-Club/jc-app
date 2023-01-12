import { Asset, AssetType, Category, CourseStatus } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';
import { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormRegister, useForm, useWatch } from 'react-hook-form';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box, Button, Heading } from '@chakra-ui/react';
import {
  SimpleGrid,
  Grid,
  GridItem,
  Divider,
  Center,
  Input,
  Select,
  Spacer,
  Flex,
  Stack,
  HStack,
  VStack,
  FormLabel,
  FormControl,
  Textarea,
} from '@chakra-ui/react';
import CustomButton from '../../../../../../components/Button';
import { useDisclosure } from '@chakra-ui/react';
import TextInput from '../../../../../../components/course/create/TextInput';
import TextAreaInput from '../../../../../../components/course/create/TextAreaInput';
import CategorySelect from '../../../../../../components/course/create/CategorySelect';
import UploadButton from '../../../../../../components/course/create/UploadButton';
import PriceInput from '../../../../../../components/course/create/PriceInput';
import CancelModal from '../../../../../../components/course/create/CancelModal';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import useSnackbar from '../../../../../../hooks/useSnackbar';
import { useState } from 'react';
import prisma from '../../../../../../lib/prisma';
import NavBarCart from '../../../../../../components/navbar/NavBarCourse';
import Footer from '../../../../../../components/Footer';
import uploadFile from '../../../../../../lib/upload';
import MyAccordion from '../../../../../../components/course/content/editor/MyAccordion';
import { setConstantValue } from 'typescript';
import UploadImageButton from '../../../../../../components/course/content/editor/UploadImageButton';
import UploadVideoButton from '../../../../../../components/course/content/editor/UploadVideoButton';
import QuizCreator from '../../../../../../components/quiz-editor/Creator';
import SortingGameCreator from '../../../../../../components/sorting-game-editor/Creator';

type FormValues = {
  title: string;
  learningObjectives: string;
  description: string;
  category: Category;
  coverImage: File[];
  isFree: string;
  price: number;
};

type Props = {
  id: string;
  categories: Category[];
  sess: Session;
};

const EditContentPage = ({ id, categories, sess }: Props) => {
  const router = useRouter();
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO: fill this in with database value
  const useFormReturns = useForm({
    defaultValues: {
      questions: [],
      sortingGame: { text: null, buckets: [] },
      pageType: '',
      title: '',
      duration: '',
      interactiveType: '',
      text: '',
      imageDesc: '',
      videoDesc: '',
    },
  });
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { isSubmitting, errors, isSubmitSuccessful },
    watch,
    setValue,
  } = useFormReturns;

  const isDisabled = isSubmitting || isSubmitSuccessful;
  const interactiveType: string = useWatch({ name: 'interactiveType', defaultValue: '', control: control });

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const { title, description, learningObjectives, isFree, category, coverImage } = data;

    const coverImageAssetId = coverImage.length ? await uploadFile(coverImage[0]) : undefined;

    // returns id of course created
    return await axios
      .post('/api/courses', {
        title: title.trim(),
        description: description.trim(),
        learningObjectives: learningObjectives.trim(),
        coverImageAssetId: coverImageAssetId,
        creatorId: sess.user.id,
        price: +isFree ? 0 : data?.price,
        categoryId: category?.id,
        status: CourseStatus.DRAFT,
      })
      .then(resp => resp.data.data.id);
  };

  const [pageContent, setPageContent] = React.useState('');

  const pageContentChange = event => {
    setValue('pageType', event.target.value);
    setPageContent(event.target.value);
  };

  return (
    <div>
      <NavBarCart />
      <div className='min-h-max px-[9.375rem] font-open-sans'>
        <header className='py-16 text-5xl font-bold'>Edit Course Content</header>
        <Grid templateColumns='repeat(5, 1fr)' gap={20} mb={20}>
          <GridItem>
            <VStack spacing='20px'>
              <Center minH='max-content'>
                <Box mt={4}>
                  <MyAccordion isChapterSelected={false} selectedId={id} />
                  <Box mt={4}>
                    <HStack>
                      <Button background='#A9D357'>Save Course Content & Exit</Button>
                      <Button background='#4D4D4D' color='white'>
                        Cancel
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              </Center>
            </VStack>
          </GridItem>
          <Center>
            <Divider orientation='vertical' />
          </Center>
          <GridItem>
            <VStack spacing='20px'>
              <form onSubmit={handleSubmit(data => console.log(data))}>
                <Box mt={4}>
                  <FormLabel htmlFor='title'>Page Title:</FormLabel>
                  <Input w='600px' placeholder='Page Title Here' {...register('title')} />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor='duration'>Page Duration:</FormLabel>
                  <Input placeholder='Page Duration Here' {...register('duration')} />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor='page-content-type'>Page Content Type:</FormLabel>
                  <Select placeholder='Page Content Type' value={pageContent} onChange={pageContentChange}>
                    <option value='text'>Text</option>
                    <option value='image'>Image</option>
                    <option value='video'>Video</option>
                    <option value='interactive'>Interactive Component</option>
                  </Select>
                </Box>
                {pageContent === 'text' && (
                  <Box mt={4}>
                    <FormLabel htmlFor='text'>Text:</FormLabel>
                    <Textarea placeholder='Text' size='sm' resize='vertical' {...register('text')} />
                  </Box>
                )}
                {pageContent === 'image' && (
                  <Box mt={4}>
                    <FormLabel htmlFor='image'>Image Upload:</FormLabel>
                    <UploadImageButton
                      register={register}
                      resetField={resetField}
                      label={'image'}
                      buttonText={'Upload Image'}
                      isDisabled={isDisabled}
                      headerText=''
                      watch={watch}
                    />
                  </Box>
                )}
                {pageContent === 'image' && (
                  <Box mt={4}>
                    <FormLabel htmlFor='image-desc'>Image Description:</FormLabel>
                    <Textarea placeholder='Image Description' size='sm' resize='vertical' {...register('imageDesc')} />
                  </Box>
                )}
                {pageContent === 'video' && (
                  <Box mt={4}>
                    <FormLabel htmlFor='video'>Video Upload:</FormLabel>
                    <UploadVideoButton
                      register={register}
                      resetField={resetField}
                      label={'video'}
                      buttonText={'Upload Video'}
                      isDisabled={isDisabled}
                      headerText=''
                      watch={watch}
                    />
                  </Box>
                )}
                {pageContent === 'video' && (
                  <Box mt={4}>
                    <FormLabel htmlFor='video-desc'>Video Description:</FormLabel>
                    <Textarea placeholder='Video Description' size='sm' resize='vertical' {...register('videoDesc')} />
                  </Box>
                )}
                {pageContent === 'interactive' && (
                  <Box mt={4} minH='max-content'>
                    <FormLabel htmlFor='interactive'>Interactive Component Type:</FormLabel>
                    <Select
                      placeholder='Interactive Component Type'
                      onChange={event => {
                        setValue('interactiveType', event.target.value);
                      }}
                      mb='6'
                    >
                      <option value='quiz'>Quiz</option>
                      <option value='sort'>Sorting Game</option>
                      <option value='tbc'>TBC</option>
                    </Select>
                    {interactiveType === 'quiz' && <QuizCreator useFormReturns={useFormReturns} />}
                    {interactiveType === 'sort' && <SortingGameCreator useFormReturns={useFormReturns} />}
                  </Box>
                )}
                <Box mt={4}>
                  <HStack>
                    <Button background='#A9D357' type='submit' isLoading={isSubmitting}>
                      Save Page
                    </Button>
                    <Button background='white' border='1px solid #000000'>
                      Cancel
                    </Button>
                    <Button background='#4D4D4D' color='white'>
                      Delete Page
                    </Button>
                  </HStack>
                </Box>
              </form>
            </VStack>
          </GridItem>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async req => {
  // this is selected id
  const id = req.query.id as string;

  // get course structure for accordion
  // const course = serializeCourse(await getCourseWithCoverImage({ id })) as SerializedCourseWithCoverImage;

  // get chapter form content
  // const course = serializeCourse(await getCourseWithCoverImage({ id })) as SerializedCourseWithCoverImage;

  const sess = await getSession(req);
  return { props: { id, sess } };
};

export default EditContentPage;
