import axios from 'axios';
import { Image, Text, Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import Link from 'next/link';
import { Category } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getCourseContentOverview, getCourseWithAuthorAndDate } from '../../../lib/server/course';
import Layout from '../../../components/Layout';
import CustomButton from '../../../components/Button';
import styles from '../../../components/Course.module.css';
import { useRouter } from 'next/router';
import NavBarCourse from '../../../components/navbar/NavBarCourse';
import { DisplayedImage } from '../../../components/course/homepage/InternalCourseCard';
import { useState } from 'react';

type CourseStaffViewProp = {
  course: any;
  category: Category;
  errors: any;
  courseContentOverview: {
    chapters: {
      description: string;
      name: string;
      pages: {
        name: string;
        duration: number;
      }[];
    }[];
  };
};

const CourseStaffView = ({ course, category, errors, courseContentOverview }: CourseStaffViewProp) => {
  const { chapters } = courseContentOverview;
  const router = useRouter();

  const [courseStatus, setCourseStatus] = useState(course.status);

  const publishCourse = async courseId => {
    try {
      await axios.post(`/api/courses/${courseId}`, { id: courseId, status: 'APPROVED' });
      setCourseStatus('APPROVED');
    } catch (error) {
      console.error('Error publishing course:', error);
    }
  };

  const archiveCourse = async courseId => {
    try {
      await axios.post(`/api/courses/${courseId}`, { id: courseId, status: 'ARCHIVED' });
      setCourseStatus('ARCHIVED');
    } catch (error) {
      console.error('Error publishing course:', error);
    }
  };

  const unarchiveCourse = async courseId => {
    try {
      await axios.post(`/api/courses/${courseId}`, { id: courseId, status: 'DRAFT' });
      setCourseStatus('DRAFT');
    } catch (error) {
      console.error('Error publishing course:', error);
    }
  };

  if (errors) {
    return (
      <Layout title='Error | Next.js + TypeScript Example'>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={course.title}>
      <NavBarCourse />
      <Box backgroundColor={'#DEF2B7'}>
        <Flex justifyContent='space-between' py={'40px'} mx={'150px'}>
          <Box>
            <Link href='/courses/'>
              <a className={styles.navigateBack}>{'\u2190'} View all courses</a>
            </Link>
            <div className={styles.status}>
              {courseStatus === 'DRAFT' && <div className={styles.draft}>DRAFT</div>}
              {courseStatus === 'APPROVED' && <div className={styles.published}>PUBLISHED</div>}
              {courseStatus === 'ARCHIVED' && <div className={styles.archived}>ARCHIVED</div>}
            </div>
            <Box className={styles.header} mb='15px'>
              {course.title}
            </Box>
            <Box className={styles.category}>{category?.name || <Text fontStyle={'italic'}>Uncategorised</Text>}</Box>
            <Flex>
              {/* buttons have placeholder emojis */}
              <CustomButton variant={'green-solid'} onClick={() => router.push(`/courses/staff/editor/details/${course.id}`)}>
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
              <CustomButton
                variant={'black-solid'}
                className={styles.courseButton}
                onClick={() => {
                  courseStatus === 'DRAFT' && publishCourse(course.id);
                  courseStatus === 'APPROVED' && archiveCourse(course.id);
                  courseStatus === 'ARCHIVED' && unarchiveCourse(course.id);
                }}
              >
                <Flex>
                  <Box color={'#FFFFFF'}>
                    {courseStatus === 'DRAFT' && 'Publish Course'}
                    {courseStatus === 'APPROVED' && 'Archive Course'}
                    {courseStatus === 'ARCHIVED' && 'Unarchive Course'}
                  </Box>
                  <Image src={'/icons/open.svg'} className={styles.icon} alt='open' />
                </Flex>
              </CustomButton>
            </Flex>
          </Box>

          <Box>
            <Box className='mt-32 ml-48 '>
              <DisplayedImage url={course.coverImage?.url} />
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
                  {chapters.length} chapters |{' '}
                  {`${chapters.reduce((acc, chapter) => acc + chapter.pages.reduce((a, b) => a + b.duration, 0), 0)} min`}
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
            <Accordion allowMultiple>
              {chapters.map(chapter => {
                return (
                  <>
                    <AccordionItem className='bg-[#F2F2F2]'>
                      <h2>
                        <AccordionButton border='1px solid #C7C7C7'>
                          <Box flex='1' textAlign='left' flexDirection={'column'}>
                            <Box as='span' flex='1' textAlign='left' className='text-lg font-bold'>
                              {chapter.name}
                            </Box>
                            <Box flex='1' textAlign='left' className='color text-xs'>
                              {`${chapter.pages.length} pages | ${chapter.pages.reduce((a, b) => a + b.duration, 0)}min`}
                            </Box>
                            <Box flex='1' textAlign='left' className='mt-2'>
                              {chapter.description}
                            </Box>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      {chapter.pages.map(page => {
                        return (
                          <>
                            <AccordionPanel pb={4} className='bg-white' border='0.5px solid #C7C7C7'>
                              <Box flex='1' textAlign='left' flexDirection={'column'}>
                                <Box as='span' flex='1' textAlign='left' className='text-sm'>
                                  {page.name}
                                </Box>
                                <Box flex='1' textAlign='left' className='color text-xs'>
                                  {`${page.duration}min`}
                                </Box>
                              </Box>
                            </AccordionPanel>
                          </>
                        );
                      })}
                    </AccordionItem>
                  </>
                );
              })}
            </Accordion>
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
  const id = params?.id as string;
  console.log({ params });
  const course = await getCourseWithAuthorAndDate(id);
  const courseContentOverview = await getCourseContentOverview(id);
  console.log({ course });
  const category =
    course.categoryId &&
    (await prisma.category.findUnique({
      where: {
        id: course.categoryId,
      },
    }));
  return {
    props: {
      course,
      category,
      courseContentOverview,
    },
  };
};
export default CourseStaffView;
