import axios from 'axios';
import prisma from '../../lib/prisma';
import { Image } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getCourseWithAuthorAndDate } from '../../lib/server/course';
import Layout from '../../components/Layout';
import CustomButton from '../../components/Button';
import styles from '../../components/Course.module.css';

const Course = ({ course, category, creator, errors }) => {
  if (errors) {
    return (
      <Layout title='Error | Next.js + TypeScript Example'>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  // dummy data for some fields temporarily
  const dummy = {
    duration: '10 hrs, 14 mins',
  };
  return (
    <Layout>
      <Flex justifyContent='space-around' mt='60px' mx='150px'>
        <Box>
          <Box className={styles.header} mb='15px'>
            {course.title}
          </Box>
          <CustomButton variant={'black-outline'}>
            <Box color={'#000000'}>{category.name}</Box>
          </CustomButton>

          <Box className={styles.description} mt='125px'>
            <Box mt='10px'>Duration: {dummy.duration}</Box>
            <Box mt='10px'>Created by: {creator.name}</Box>
          </Box>

          <Box mt='75px'>
            <Box className={styles.header}>Course Description</Box>
            <Box width='672px' mt='20px' textAlign='justify' className={styles.description}>
              {course.description}
            </Box>
          </Box>

          <Box mt='75px'>
            <Box className={styles.header}>Learning Objectives</Box>
            <Box width='672px' mt='20px' textAlign='justify' className={styles.description}>
              <Box ml='20px'>
                <li>{course.learningObjectives}</li>
              </Box>
            </Box>
          </Box>

          <Box my='75px'>
            <Box className={styles.header}>Course Content</Box>
            <Box className={styles.description} mt='20px' fontSize='16px'>
              7 videos | {dummy.duration}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box width='450px' height='240px' bgColor='#EBF8D3' borderRadius='16px'>
            {course.coverImage?.url ? (
              <Image width='450px' height='240px' borderRadius='16px' src={course.coverImage.url} alt='testing' />
            ) : (
              <></>
            )}
          </Box>
          <Flex mt='50px' justifyContent='center' alignItems='center' gap='24px'>
            <Box className={styles.description} mr='20px'>
              <Box>Price:</Box>
              <Box mt='-5px' fontWeight='bold'>
                ${course.price}
              </Box>
            </Box>
            <CustomButton variant={'green-solid'}>
              <Box color={'#000000'}>Add to cart</Box>
            </CustomButton>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await prisma.course.findMany();
  const paths = courses.map(course => ({
    params: { id: course.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const course = await getCourseWithAuthorAndDate(id);
    const category = await prisma.category.findUnique({
      where: {
        id: course.categoryId,
      },
    });
    const creator = await prisma.user.findUnique({
      where: {
        id: course.creatorId,
      },
    });
    return {
      props: {
        course,
        category,
        creator,
      },
    };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
export default Course;
