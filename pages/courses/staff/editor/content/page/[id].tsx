import { Article, Asset, AssetType, Page, Video, Image, GameType } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Box, Button, FormControl } from '@chakra-ui/react';
import { Grid, GridItem, Divider, Center, Input, Select, HStack, VStack, FormLabel, Textarea } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSnackbar from '../../../../../../hooks/useSnackbar';
import prisma from '../../../../../../lib/prisma';
import NavBarCart from '../../../../../../components/navbar/NavBarCourse';
import Footer from '../../../../../../components/Footer';
import MyAccordion from '../../../../../../components/course/content/editor/MyAccordion';
import UploadImageButton from '../../../../../../components/course/content/editor/UploadImageButton';
import UploadVideoButton from '../../../../../../components/course/content/editor/UploadVideoButton';
import QuizCreator from '../../../../../../components/quiz-editor/Creator';
import SortingGameCreator from '../../../../../../components/sorting-game-editor/Creator';
import { CourseStructure, getCourseStructure } from '../../../../../../lib/server/course';
import { useMutation } from '@tanstack/react-query';
import { createOrUpdateAsset } from '../../../../../../lib/editor';

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

export type EditorPageFormValues = {
  name: string;
  description?: string;
  duration: number;
  assetType: AssetType;
  interactiveType?: GameType;
  originalAssetId: string;
  text?: string;
  image?: {
    uploadedFile?: File;
    removeOriginal: boolean;
  };
  video?: {
    uploadedFile?: File;
    removeOriginal: boolean;
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
    originalAssetId: page?.asset?.id,
    image: {
      uploadedFile: null,
      removeOriginal: false,
    },
    video: {
      uploadedFile: null,
      removeOriginal: false,
    },
  };
};

const EditContentPage = ({ id, courseStructure, page }: Props) => {
  const router = useRouter();
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  const { isOpen, onClose, onOpen } = useDisclosure();

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

  const interactiveType: string = useWatch({ name: 'interactiveType', control: control });
  const pageContent: string = useWatch({ name: 'assetType', control: control });

  const session = useSession();
  const mutation = useMutation({
    mutationFn: async (data: EditorPageFormValues) => {
      const newAssetId = await createOrUpdateAsset(data);
      if (data.assetType != 'image' && data.assetType != 'video') {
        data.description = '';
      }
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

  const isDisabled = mutation.isLoading;

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
                  mutation.mutate(data);
                })}
              >
                <FormControl isDisabled={mutation.isLoading}>
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
                      <FormLabel htmlFor='text'>Text *</FormLabel>
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
                      <FormLabel htmlFor='image'>Image Upload *</FormLabel>
                      <UploadImageButton
                        useFormReturns={useFormReturns}
                        isDisabled={isDisabled}
                        imageFilename={page?.asset?.image?.filename}
                      />
                    </Box>
                  )}
                  {pageContent === 'image' && (
                    <Box mt={4}>
                      <FormLabel htmlFor='image-desc'>Page Description *</FormLabel>
                      <Textarea placeholder='Page Description' size='sm' resize='vertical' {...register('description')} />
                    </Box>
                  )}
                  {pageContent === 'video' && (
                    <Box mt={4}>
                      <FormLabel htmlFor='video'>Video Upload *</FormLabel>
                      <UploadVideoButton
                        useFormReturns={useFormReturns}
                        isDisabled={isDisabled}
                        videoFilename={page?.asset?.video?.filename}
                      />
                    </Box>
                  )}
                  {pageContent === 'video' && (
                    <Box mt={4}>
                      <FormLabel htmlFor='video-desc'>Page Description *</FormLabel>
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
                </FormControl>
              </form>
            </VStack>
          </GridItem>
        </Grid>
      </div>
      <button onClick={() => console.log(isSubmitSuccessful)}>hello</button>
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
