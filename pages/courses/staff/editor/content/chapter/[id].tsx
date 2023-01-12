import { Asset, AssetType, Category, CourseStatus } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';
import { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormRegister, useForm, useWatch } from 'react-hook-form';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Heading,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import { SimpleGrid, Center, Input, Select, Spacer, Flex, Stack, HStack, VStack, FormLabel, FormControl, Textarea } from '@chakra-ui/react';
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
  description: string;
};

type Props = {
  id: string;
  sess: Session;
};

const EditContentChapter = ({ id, sess }: Props) => {
  const router = useRouter();
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO: fill this in with database value
  const useFormReturns = useForm({
    defaultValues: {
      title: '',
      description: '',
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

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const { title, description } = data;

    // returns id of course created
    return await axios
      .post('/api/chapter', {
        title: title.trim(),
        description: description.trim(),
        creatorId: sess.user.id,
      })
      .then(resp => resp.data.data.id);
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
                  <MyAccordion isChapterSelected={true} selectedId={id} />
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
                  <FormLabel htmlFor='title'>Chapter Title:</FormLabel>
                  <Input w='600px' placeholder='Chapter Title Here' {...register('title')} />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor='desc'>Chapter Description:</FormLabel>
                  <Input placeholder='Chapter Description Here' {...register('description')} />
                </Box>
                <Box mt={4}>
                  <HStack>
                    <Button background='#A9D357' type='submit' isLoading={isSubmitting}>
                      Save Chapter
                    </Button>
                    <Button background='white' border='1px solid #000000'>
                      Cancel
                    </Button>
                    <Button background='#4D4D4D' color='white'>
                      Delete Chapter
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

export default EditContentChapter;
