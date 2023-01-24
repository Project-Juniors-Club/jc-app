import axios from 'axios';
import { Image } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import prisma from '../../../lib/prisma';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getCourseWithAuthorAndDate } from '../../../lib/server/course';
import Layout from '../../../components/Layout';
import CustomButton from '../../../components/Button';
import styles from '../../../components/Course.module.css';
import { useRouter } from 'next/router';

const CourseStaffView = ({ course, category, creator, errors }) => {
  const router = useRouter();

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
    chapters: 5,
  };

  return (
    <Layout>
      <Box backgroundColor={'#DEF2B7'}>
        <Flex justifyContent='space-between' py={'40px'} mx={'150px'}>
          <Box>
            <Link href='/courses/'>
              <a className={styles.navigateBack}>{'\u2190'} View all courses</a>
            </Link>
            <div className={styles.status}>{course.status}</div>
            <Box className={styles.header} mb='15px'>
              {course.title}
            </Box>
            <Box className={styles.category}>{category?.name}</Box>
            <Flex>
              {/* buttons have placeholder emojis */}
              <CustomButton variant={'green-solid'}>
                <Flex>
                  <Box color={'#000000'}>Edit Course Details</Box>
                  <Image src={'/icons/edit.svg'} className={styles.icon} alt='open' />
                </Flex>
              </CustomButton>
              <CustomButton variant={'black-outline'} className={styles.courseButton}>
                <Flex>
                  <Box color={'#000000'}>Delete Course</Box>
                  <Image src={'/icons/trash.svg'} className={styles.icon} alt='open' />
                </Flex>
              </CustomButton>
              <CustomButton variant={'black-solid'} className={styles.courseButton}>
                <Flex>
                  <Box color={'#FFFFFF'}>Publish Course</Box>
                  <Image src={'/icons/open.svg'} className={styles.icon} alt='open' />
                </Flex>
              </CustomButton>
            </Flex>
          </Box>

          <Box>
            <Box className={styles.coverImage}>
              {course.coverImage?.url ? (
                <Image width='322px' height='184px' borderRadius='16px' src={course.coverImage.url} alt='testing' />
              ) : (
                <>Image</>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>

      <Flex justifyContent='space-between' py={'40px'} mx={'150px'}>
        <Box width='70%'>
          <Box>
            <Box className={styles.secondaryHeader}>Description</Box>
            <Box className={styles.secondaryDescription}>{course.description}</Box>
          </Box>
          <Box>
            <Box className={styles.secondaryHeader}>Learning Objectives</Box>
            <Box className={styles.secondaryDescription}>{course.learningObjectives}</Box>
          </Box>
          <Box>
            <Box className={styles.secondaryHeader}>Price</Box>
            <Box className={styles.secondaryDescription}>S${course.price}</Box>
          </Box>
          <Box>
            <Flex justifyContent='space-between'>
              <Box>
                <Box className={styles.secondaryHeader}>Course Content</Box>
                <Box className={styles.secondaryDescription}>
                  {dummy.chapters} chapters | {dummy.duration}
                </Box>
              </Box>
              <CustomButton
                variant={'green-solid'}
                className={styles.editCourseContentButton}
                onClick={() => router.push(`/courses/staff/editor/content/${course.id}`)}
              >
                <Flex className={styles.button}>
                  <Box color={'#000000'}>Edit Course Content</Box>
                  <Image src={'/icons/edit.svg'} className={styles.icon} alt='open' />
                </Flex>
              </CustomButton>
            </Flex>
          </Box>
        </Box>

        <Box>
          <Box mr='50px'>
            <Box className={styles.secondaryHeader}>Change History</Box>
            <Box className={styles.changeHistory}>
              <strong>Date created: </strong>
              {course.createDate}
            </Box>
            <Box className={styles.changeHistory}>
              <strong>Created by: </strong>
              {course.createdBy.user.name}
            </Box>
            <Box className={styles.changeHistory}>
              <strong>Date last updated: </strong>
              {course.lastUpdatedDate}
            </Box>
            <Box className={styles.changeHistory}>
              <strong>Updated by: </strong>
              {course.lastUpdatedBy.user.name}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const courses = await prisma.course.findMany();
  const paths = courses.map(course => ({
    params: { id: course.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const course = await getCourseWithAuthorAndDate(id);
    const category =
      course.categoryId &&
      (await prisma.category.findUnique({
        where: {
          id: course.categoryId,
        },
      }));
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
export default CourseStaffView;
