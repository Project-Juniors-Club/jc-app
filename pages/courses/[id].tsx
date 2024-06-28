import axios from 'axios';
import prisma from '../../lib/prisma';
import {
  Image,
  Text,
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
} from '@chakra-ui/react';
import CustomButton from '../../components/Button';
import { GetServerSidePropsContext } from 'next';
import { Category } from '@prisma/client';
import { getCourseContentOverview, getCourseWithAuthorAndDate } from '../../lib/server/course';
import Layout from '../../components/Layout';
import styles from '../../components/Course.module.css';
import NavBarCourse from '../../components/navbar/NavBar';
import { getSession, useSession } from 'next-auth/react';
import { getUserCourseId, isCoursePurchased } from '../../lib/server/userCourses';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type CourseViewProp = {
  course: any;
  creator: any;
  category: Category;
  errors: any;
  userCourseId: string;
  courseContentOverview: {
    chapters: {
      id: string;
      description: string;
      name: string;
      pages: {
        id: string;
        name: string;
        duration: number;
      }[];
    }[];
  };
  isPurchased: boolean;
};

const CourseView = ({ course, category, errors, courseContentOverview, userCourseId, isPurchased }: CourseViewProp) => {
  const sess = useSession();
  const { chapters } = courseContentOverview;
  const [isAdded, setIsAdded] = useState(false);
  const duration = chapters.reduce((acc, chapter) => acc + chapter.pages.reduce((a, b) => a + b.duration, 0), 0);
  const router = useRouter();
  const [chapterCompletionStatus, setChapterCompletionStatus] = useState({});
  const [pageCompletionStatus, setPageCompletionStatus] = useState({});

  useEffect(() => {
    const fetchCompletionStatus = async () => {
      const { data } = await axios.post('/api/course-completion', { userCourseId, chapters });
      setChapterCompletionStatus(data.chapterStatus);
      setPageCompletionStatus(data.pageStatus);
    };
    if (userCourseId) {
      fetchCompletionStatus();
    }
  }, [userCourseId, chapters]);

  const addToCart = async () => {
    const {
      data: { data: updatedCourse },
    } = await axios.post(`/api/cart/${router.query.id}`, {
      userId: sess?.data.user?.id,
    });
    if (updatedCourse) {
      setIsAdded(true);
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
      <Flex justifyContent='space-around' mt='60px' mx='150px'>
        <Box>
          <Box className={styles.header} mb='15px'>
            {course.title}
          </Box>
          <Box className={styles.category}>{category?.name || <Text fontStyle={'italic'}>Uncategorised</Text>}</Box>

          <Box className={styles.description} mt='125px'>
            <Box mt='10px'>Duration: {duration} min</Box>
            <Box mt='10px'>Created by: {course.createdBy.user.name}</Box>
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

          <Box mt='75px'>
            <Box className={styles.header}>Course Content</Box>
            <Box className={styles.description} mt='20px' fontSize='16px'>
              {chapters.length} chapters | {duration} min
            </Box>
          </Box>

          {isPurchased ? (
            <Accordion allowMultiple className={styles.accordion}>
              {chapters.map((chapter, chapterIndex) => (
                <AccordionItem key={chapterIndex} className='bg-main-light-green'>
                  <h2>
                    <AccordionButton border='1px solid #C7C7C7'>
                      <Box flex='1' textAlign='left' flexDirection={'column'}>
                        <Box display='flex' alignItems='center'>
                          <Checkbox colorScheme='gray' isChecked={chapterCompletionStatus[chapter.id]} isReadOnly mr={2} />
                          <Box as='span' flex='1' textAlign='left' className='text-lg font-bold'>
                            {chapter.name}
                          </Box>
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
                  {chapter.pages.map((page, pageIndex) => (
                    <AccordionPanel key={pageIndex} pb={4} className='bg-white' border='0.5px solid #C7C7C7'>
                      <Box flex='1' textAlign='left' flexDirection={'column'}>
                        <Box display='flex' alignItems='center'>
                          <Checkbox isChecked={pageCompletionStatus[`${chapter.id}-${page.id}`]} isReadOnly mr={2} />
                          <Box as='span' flex='1' textAlign='left' className='text-sm'>
                            <a href={`/courses/pages/${page.id}`}>{page.name}</a>
                          </Box>
                        </Box>
                        <Box flex='1' textAlign='left' className='color text-xs'>
                          {`${page.duration}min`}
                        </Box>
                      </Box>
                    </AccordionPanel>
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Accordion allowMultiple className={styles.accordion}>
              {chapters.map(chapter => {
                return (
                  <>
                    <AccordionItem className='bg-main-light-green'>
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
          )}
        </Box>
        <Box>
          <Box width='450px' height='240px' bgColor='#EBF8D3' borderRadius='16px'>
            {course.coverImage?.url ? (
              <Image width='450px' height='240px' borderRadius='16px' src={course.coverImage.url} alt='testing' />
            ) : (
              <></>
            )}
          </Box>

          {!isPurchased ? (
            <Flex mt='50px' justifyContent='center' alignItems='center' gap='24px'>
              <Box className={styles.description} mr='20px'>
                <Box>Price:</Box>
                <Box mt='-5px' fontWeight='bold'>
                  ${course.price}
                </Box>
              </Box>
              <CustomButton variant={'green-solid'} onClick={addToCart} disabled={isAdded || userCourseId !== ''}>
                <Box color={'#000000'}>{isAdded || userCourseId !== '' ? 'Added' : 'Add To Cart'}</Box>
              </CustomButton>
            </Flex>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const id = context.params?.id as string;
  const userId = session?.user?.id;
  const isPurchased = await isCoursePurchased(userId, id);
  const course = await getCourseWithAuthorAndDate(id);
  const courseContentOverview = await getCourseContentOverview(id);
  let userCourseId = await getUserCourseId(userId, id);
  if (userCourseId === undefined) {
    userCourseId = null;
  }
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
      userCourseId,
      isPurchased,
    },
  };
}
export default CourseView;
