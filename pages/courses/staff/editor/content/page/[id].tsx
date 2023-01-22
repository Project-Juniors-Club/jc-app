import { Article, Asset, AssetType, Category, CourseStatus, Game, Page, Video, Image, GameType } from '@prisma/client';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
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
import { getSession, useSession } from 'next-auth/react';
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
import { setConstantValue, updateTypeAssertion } from 'typescript';
import UploadImageButton from '../../../../../../components/course/content/editor/UploadImageButton';
import UploadVideoButton from '../../../../../../components/course/content/editor/UploadVideoButton';
import QuizCreator from '../../../../../../components/quiz-editor/Creator';
import SortingGameCreator from '../../../../../../components/sorting-game-editor/Creator';
import { CourseStructure, getCourseStructure } from '../../../../../../lib/server/course';
import { useMutation } from '@tanstack/react-query';
import { resolve } from 'path';
import { createOrUpdateAsset } from '../../../../../../lib/editor';

export type EditorPageFormValues = {
  name: string;
  description?: string;
  duration: number;
  assetType: AssetType;
  interactiveType?: GameType;
  text?: string;
  image?: File[];
  video?: File[];
};

type Props = {
  id: string;
  courseStructure: CourseStructure;
  page: Page & {
    chapter: {
      courseId: string;
    };
    asset: Asset & {
      image: Image;
      video: Video;
      article: Article;
    };
  };
};

const constructPageFormValue = (page): EditorPageFormValues => {
  return {
    name: page.name,
    duration: page.duration,
    assetType: page.asset.assetType,
    description: page?.description,
    interactiveType: page?.asset?.game?.type,
    text: page?.asset?.article?.text,
  };
};

const EditContentPage = ({ id, courseStructure, page }: Props) => {
  const router = useRouter();
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO: fill this in with database value
  const useFormReturns = useForm({
    defaultValues: { ...constructPageFormValue(page) }, // TODO: intergrate interactive type
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
  const interactiveType: string = useWatch({ name: 'interactiveType', control: control });
  const pageContent: string = useWatch({ name: 'assetType', control: control });

  const session = useSession();
  const mutation = useMutation({
    mutationFn: async (data: EditorPageFormValues) => {
      const newAssetId = await createOrUpdateAsset(data);
      return axios.put(`/api/courses/pages/${id}`, {
        ...data,
        newAssetId: newAssetId,
        updaterId: session.data.user.id,
        courseId: courseStructure.id,
      });
    },
    onSuccess: data => {
      openSuccessNotification('Updated page successfully!');
    },
    onError: () => {
      openErrorNotification('Update failed', 'Please try again');
    },
  });

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
                  <MyAccordion isChapterSelected={false} selectedId={id} courseStructure={courseStructure} />
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
              <form
                onSubmit={handleSubmit(data => {
                  console.log(data);

                  mutation.mutate(data);
                })}
              >
                <Box mt={4}>
                  <FormLabel htmlFor='title'>Page Title *</FormLabel>
                  <Input placeholder='Page Title Here' {...register('name', { required: true })} />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor='duration'>Page Duration *</FormLabel>
                  <Input placeholder='Page Duration Here' {...register('duration', { valueAsNumber: true })} />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor='page-content-type'>Page Content Type *</FormLabel>
                  <Select placeholder='Page Content Type' {...register('assetType')}>
                    <option value='article'>Text</option>
                    <option value='image'>Image</option>
                    <option value='video'>Video</option>
                    <option value='games'>Interactive Component</option>
                  </Select>
                </Box>
                {pageContent === 'article' && (
                  <Box mt={4}>
                    <FormLabel htmlFor='text'>Text*</FormLabel>
                    <Textarea
                      placeholder='Text'
                      size='sm'
                      resize='vertical'
                      {...register('text', { required: pageContent === 'article' })}
                    />
                  </Box>
                )}
                {pageContent === 'image' && (
                  <Box mt={4}>
                    <FormLabel htmlFor='image'>Image Upload*</FormLabel>
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
                    <FormLabel htmlFor='image-desc'>Page Description*</FormLabel>
                    <Textarea placeholder='Page Description' size='sm' resize='vertical' {...register('description')} />
                  </Box>
                )}
                {pageContent === 'video' && (
                  <Box mt={4}>
                    <FormLabel htmlFor='video'>Video Upload*</FormLabel>
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
                    <FormLabel htmlFor='video-desc'>Page Description*</FormLabel>
                    <Textarea placeholder='Page Description' size='sm' resize='vertical' {...register('description')} />
                  </Box>
                )}
                {pageContent === 'interactive' && (
                  <Box mt={4} minH='max-content'>
                    <FormLabel htmlFor='interactive'>Interactive Component Type*</FormLabel>
                    <Select
                      placeholder='Interactive Component Type'
                      onChange={event => {
                        setValue('interactiveType', event.target.value as GameType);
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
  const id = req.query.id as string;

  const page = await prisma.page.findUnique({
    where: {
      id: id,
    },
    include: {
      chapter: {
        select: {
          courseId: true,
        },
      },
      asset: {
        include: {
          article: true,
          image: true,
          video: true,
          game: true,
        },
      },
    },
  });

  const courseStructure: CourseStructure = await getCourseStructure(page.chapter.courseId);

  return { props: { id, courseStructure, page, key: id } };
};

export default EditContentPage;
