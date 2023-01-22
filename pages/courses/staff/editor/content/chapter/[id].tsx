import { Asset, AssetType, Category, Chapter, CourseStatus } from '@prisma/client';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
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
  Text,
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
import { CourseStructure, getCourseStructure } from '../../../../../../lib/server/course';
import { useMutation } from '@tanstack/react-query';

type FormValues = {
  name: string;
  description: string;
};

type Props = {
  id: string;
  courseStructure: CourseStructure;
  chapter: Chapter;
};

const EditContentChapter = ({ id, courseStructure: initialCourseStructure, chapter }: Props) => {
  const router = useRouter();
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseStructure, setCourseStructure] = useState(initialCourseStructure);

  // TODO: fill this in with database value
  const useFormReturns = useForm({
    defaultValues: { name: chapter.name, description: chapter.description },
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

  const mutation = useMutation(
    (data: FormValues) => {
      return axios.put(`/api/courses/chapters/${id}`, { ...data, updaterId: session.data.user.id, courseId: courseStructure.id });
    },
    {
      onSuccess: ({ data }) => {
        openSuccessNotification('Updated chapter successfully!');
        courseStructure.chapters[chapter.chapterNumber - 1].name = data.data.name;
      },
      onError: () => {
        openErrorNotification('Update failed', 'Please try again');
      },
    },
  );
  const session = useSession();

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
                  <MyAccordion isChapterSelected={true} selectedId={id} courseStructure={courseStructure} />
                  <Box mt={4}>
                    <HStack>
                      <Button
                        background='#A9D357'
                        onClick={() => {
                          console.log(session);
                        }}
                      >
                        Save Course Content & Exit
                      </Button>
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
              <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
                <Box mt={4}>
                  <FormLabel htmlFor='title'>Chapter Title*</FormLabel>
                  <Input
                    // w='600px'
                    placeholder='Chapter Title Here'
                    {...register('name', { required: true, setValueAs: name => name.trim() })}
                  />
                </Box>
                <Box mt={4}>
                  <FormLabel htmlFor='desc'>Chapter Description</FormLabel>
                  <Textarea placeholder='Chapter Description Here' {...register('description')} />
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
  const id = req.query.id as string;

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: id,
    },
  });

  const courseStructure: CourseStructure = await getCourseStructure(chapter.courseId);

  return { props: { id, courseStructure, chapter, key: id } };
};

export default EditContentChapter;
