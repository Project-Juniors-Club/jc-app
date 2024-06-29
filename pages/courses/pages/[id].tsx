import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Checkbox, Flex, Button } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import { getUserCourseId } from '../../../lib/server/userCourses';
import styles from '../../../components/Course.module.css';

import { useEffect, useState } from 'react';
import { getCourseContentOverview } from '../../../lib/server/course';
import Layout from '../../../components/Layout';
import NavBarCourse from '../../../components/navbar/NavBarCourse';

export default function Page({ userCourseId, courseChapters, course, chapter, page, article }) {
  const { chapters } = courseChapters
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

  return (
  <Layout title={course.title}>
      <NavBarCourse />
    
      <Head>
         <title>{page.name}</title>
      </Head>
      <Flex direction="column" p="20px">
        <Text fontSize="sm" color="gray.600">{course.title} > {chapter.name}</Text>
        <Flex justifyContent="space-between" alignItems="center" mt="10px">
          <Button background="transparent" onClick={() => {/* handle previous */}}> &lt; &nbsp; Previous</Button>
          <Button background="transparent" onClick={() => {/* handle next */}}>Next &nbsp; &gt; </Button>
        </Flex>
        <Flex mt="20px">
          <Box width="25%" pr="20px">
           <Text mb="15px" fontWeight="bold" style={{ fontSize: '32px' }}>{course.title}</Text>
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
          </Box>
          <Box width="75%" pl="20px">
            <Text mb="15px" fontWeight="bold" fontSize="32px">{page.name}</Text>
            <Text mb="10px" fontSize="20px">
             {article.text}
            </Text>
          </Box>
        </Flex>
      </Flex>
     
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const userId = session?.user?.id;
  const { id } = context.params;
  try {
    const res = await axios.get(`http://localhost:3000/api/courses/pages/${id}`);
    const { data } = res.data;

    if (!data) {
      return {
        notFound: true,
      };
    }
     const courseId = data.course.id;

  let userCourseId = await getUserCourseId(userId, courseId);
  if (userCourseId === undefined) {
    userCourseId = null;
  }
    const courseChapters = await getCourseContentOverview(courseId);
    
    return {
      props: {
        userCourseId, courseChapters,
        ...data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
