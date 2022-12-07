import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import CustomButton from '../../components/Buttons';
import styles from '../../components/Course.module.css';
import { Box, Flex } from '@chakra-ui/react';

const Course = () => {
  // Dummy data
  const course = {
    title: 'Food Sourcing',
    description:
      'Lorem ipsum dolor sit amet consectetur landitiis illum dolor. Am inventore natus, eos rerum om inventore natus, eos rerum. Tempore, sint at. Doloribus, odio eaque. Am inventore natus, eos rerum. Am inventore natus, eos rerum.',
    duration: '10 hrs, 14 mins',
    creator: 'Food Bank',
    objective: 'This is one thing you could learn from this course.',
    price: 2.95,
    tags: ['#agriculture'],
    category: 'Food Cycle',
  };

  return (
    <Layout>
      <Flex justifyContent='space-around' mt='60px' mx='150px'>
        <Box>
          <Box className={styles.header} mb='15px'>
            {course.title}
          </Box>
          <CustomButton variant={'black-outline'}>
            <Box color={'#000000'}>{course.category}</Box>
          </CustomButton>

          <Box className={styles.description} mt='125px'>
            <Box mt='10px'>Duration: {course.duration}</Box>
            <Box mt='10px'>Created by: {course.creator}</Box>
            <Box mt='10px'>Tags: {course.tags}</Box>
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
                <li>{course.objective}</li>
                <li>{course.objective}</li>
                <li>{course.objective}</li>
              </Box>
            </Box>
          </Box>

          <Box my='75px'>
            <Box className={styles.header}>Course Content</Box>
            <Box className={styles.description} mt='20px' fontSize='16px'>
              7 videos | {course.duration}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box width='450px' height='240px' bgColor='#EBF8D3' borderRadius='16px'></Box>
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

export default Course;
