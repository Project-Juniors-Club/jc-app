import { Article, Asset, AssetType, Page, Video, Image, GameType, Game } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useFieldArray, useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { Box, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Grid, GridItem, Divider, Center, Input, Select, HStack, VStack, FormLabel, Textarea } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSnackbar from '../../../../../../hooks/useSnackbar';
import prisma from '../../../../../../lib/prisma';
import NavBarCart from '../../../../../../components/navbar/NavBarCourse';
import Footer from '../../../../../../components/Footer';
import Button from '../../../../../../components/Button';
import MyAccordion from '../../../../../../components/course/content/editor/MyAccordion';
import UploadImageButton from '../../../../../../components/course/content/editor/UploadImageButton';
import UploadVideoButton from '../../../../../../components/course/content/editor/UploadVideoButton';
import QuizCreator from '../../../../../../components/quiz-editor/Creator';
import SortingGameCreator from '../../../../../../components/sorting-game-editor/Creator';
import { CourseStructure, getCourseStructure } from '../../../../../../lib/server/course';
import { createOrUpdateAsset, validatePageFormValues } from '../../../../../../lib/editor';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CancelModal from '../../../../../../components/course/create/CancelModal';
import { EditorSerializedQuizQuestion } from '../../../../../../components/quiz-editor/Question';
import getPageEditorFormValue from '../../../../../../lib/server/page';

type Props = {
  id: string;
  courseStructure: CourseStructure;
  formValues: EditorPageFormValues;
};

// this containts all value needed for the form
export type EditorPageFormValues = {
  originalAssetId: string;
  originalAssetType: string;
  originalInteractiveType?: string;
  courseId: string;

  name: string;
  description?: string;
  duration: number;
  assetType: AssetType;
  interactiveType?: GameType;
  text?: string;
  image?: {
    filename?: string;
    uploadedFile?: File;
    removeOriginal: boolean;
  };
  video?: {
    filename?: string;
    uploadedFile?: File;
    removeOriginal: boolean;
  };
  quizGame: {
    questions: EditorSerializedQuizQuestion[];
  };
  // TODO: intergrate sorting game
  sortingGame: any;
};

const EditContentPage = ({ id, courseStructure: initialCourseStructure, formValues }: Props) => {
  const router = useRouter();
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const { data: courseStructure } = useQuery<CourseStructure>({
    queryKey: ['courseStructure'],
    queryFn: async () => {
      const res = await axios.get(`/api/courses/structure/${initialCourseStructure.id}`);
      return res.data;
    },
    initialData: initialCourseStructure,
  });

  const useFormReturns = useForm({
    defaultValues: formValues,
    resolver: values => {
      // This page form is too complicated, centralise all validation here
      return validatePageFormValues(values);
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

  const interactiveType: string = useWatch({ name: 'interactiveType', control: control });
  const pageContent: string = useWatch({ name: 'assetType', control: control });

  const submitPageData = async (data: EditorPageFormValues) => {
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
  };

  const session = useSession();
  const mutateOnSave = useMutation({
    mutationFn: submitPageData,
    onSuccess: data => {
      openSuccessNotification('Updated page successfully!');
      queryClient.invalidateQueries({ queryKey: ['courseStructure'] });
    },
    onError: () => {
      openErrorNotification('Update failed', 'Please try again');
    },
  });
  const mutateOnExit = useMutation({
    mutationFn: submitPageData,
    onSuccess: data => {
      openSuccessNotification('Saved page successfully', 'Redirecting to course page');
      router.push(`/courses/staff/${courseStructure.id}`);
    },
    onError: () => {
      openErrorNotification('Failed to save page', 'Please try again');
    },
  });
  const isDisabled = mutateOnSave.isLoading || mutateOnExit.isLoading || mutateOnExit.isSuccess;
  console.log(errors);

  return (
    <div>
      <NavBarCart />
      <div className='min-h-max px-[9.375rem] font-open-sans'>
        <header className='py-16 text-5xl font-bold'>Edit Course Content</header>
        <Flex>
          <Box minW='393px'>
            <MyAccordion isChapterSelected={false} selectedId={id} courseStructure={courseStructure} />
          </Box>
          <Box w='100%' ml='2.25rem' pl='3.5rem' borderLeft='1px' borderLeftColor='#C7C7C7'>
            <form
              onSubmit={handleSubmit(data => {
                mutateOnSave.mutate(data);
              })}
            >
              <FormControl mt={4} isInvalid={!!errors.name} isDisabled={isDisabled}>
                <FormLabel htmlFor='title'>Page Title *</FormLabel>
                <Input placeholder='Page Title Here' {...register('name', { required: { value: true, message: 'Enter Page Title' } })} />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mt={4} isInvalid={!!errors.duration} isDisabled={isDisabled}>
                <FormLabel htmlFor='duration'>Page Duration (in minutes) *</FormLabel>
                <Input
                  type='number'
                  placeholder='Page Duration Here'
                  {...register('duration', {
                    required: { value: true, message: 'Enter Page Duration' },
                    valueAsNumber: true,
                  })}
                />
                <FormErrorMessage>{errors?.duration?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mt={4} isDisabled={isDisabled}>
                <FormLabel htmlFor='page-content-type'>Page Content Type *</FormLabel>
                <Select {...register('assetType')}>
                  <option value='article'>Text</option>
                  <option value='image'>Image</option>
                  <option value='video'>Video</option>
                  <option value='game'>Interactive Component</option>
                </Select>
              </FormControl>
              {pageContent === 'article' && (
                <FormControl mt={4} isDisabled={isDisabled} isInvalid={!!errors.text}>
                  <FormLabel htmlFor='text'>Text *</FormLabel>
                  <Textarea
                    placeholder='Text'
                    size='sm'
                    resize='vertical'
                    {...register('text', { required: { value: pageContent === 'article', message: 'Enter Page Text' } })}
                  />
                  <FormErrorMessage>{errors?.text?.message}</FormErrorMessage>
                </FormControl>
              )}
              {pageContent === 'image' && (
                <>
                  <FormControl mt={4}>
                    <FormLabel htmlFor='image'>Image Upload *</FormLabel>
                    <UploadImageButton useFormReturns={useFormReturns} isDisabled={isDisabled} imageFilename={formValues.image.filename} />
                  </FormControl>
                  <FormControl mt={4} isDisabled={isDisabled} isInvalid={!!errors?.description}>
                    <FormLabel htmlFor='image-desc'>Page Description *</FormLabel>
                    <Textarea
                      placeholder='Page Description'
                      size='sm'
                      resize='vertical'
                      {...register('description', { required: { value: pageContent === 'image', message: 'Enter Page Description' } })}
                    />
                    <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
                  </FormControl>
                </>
              )}
              {pageContent === 'video' && (
                <>
                  <FormControl mt={4}>
                    <FormLabel htmlFor='video'>Video Upload *</FormLabel>
                    <UploadVideoButton useFormReturns={useFormReturns} isDisabled={isDisabled} videoFilename={formValues.video.filename} />
                  </FormControl>
                  <FormControl mt={4} isDisabled={isDisabled} isInvalid={!!errors?.description}>
                    <FormLabel htmlFor='video-desc'>Page Description *</FormLabel>
                    <Textarea
                      placeholder='Page Description'
                      size='sm'
                      resize='vertical'
                      {...register('description', { required: { value: pageContent === 'video', message: 'Enter Page Description' } })}
                    />
                    <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
                  </FormControl>
                </>
              )}
              {pageContent === 'game' && (
                <Box mt={4} minH='max-content'>
                  <FormLabel htmlFor='interactive'>Interactive Component Type *</FormLabel>
                  <Select
                    placeholder='Interactive Component Type'
                    defaultValue={formValues?.interactiveType}
                    onChange={event => {
                      setValue('interactiveType', event.target.value as GameType);
                    }}
                    mb='6'
                  >
                    <option value='quizGame'>Quiz</option>
                    <option value='sortingGame'>Sorting Game</option>
                  </Select>
                  {interactiveType === 'quizGame' && <QuizCreator useFormReturns={useFormReturns} />}
                  {interactiveType === 'sortGame' && <SortingGameCreator useFormReturns={useFormReturns} />}
                </Box>
              )}
              <Flex mt={4} justifyContent={'space-between'}>
                <HStack>
                  <Button type='submit' isLoading={isSubmitting}>
                    Save Page
                  </Button>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      onOpen();
                    }}
                    variant='black-outline'
                    isDisabled={isDisabled}
                  >
                    Cancel
                  </Button>
                </HStack>
                <Button variant='black-solid'>Delete Page</Button>
              </Flex>
            </form>
          </Box>
        </Flex>
        <HStack py='3.5rem'>
          <Button onClick={handleSubmit(data => mutateOnExit.mutate(data))}>Save Course Content & Exit</Button>
          <Button
            variant='black-outline'
            onClick={e => {
              e.preventDefault();
              onOpen();
            }}
          >
            Cancel
          </Button>
        </HStack>
        <CancelModal
          isOpen={isOpen}
          onClose={onClose}
          isCentered={true}
          exitOnClick={() => router.push(`/courses/staff/${courseStructure.id}`)}
        />
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async req => {
  const id = req.query.id as string;

  const formValues = await getPageEditorFormValue(id);
  const courseStructure: CourseStructure = await getCourseStructure(formValues.courseId);

  return { props: { id, courseStructure, formValues, key: id } };
};

export default EditContentPage;
