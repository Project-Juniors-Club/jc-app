import React from 'react';
import CourseList from '../../components/course/homepage/CourseList';
import UnfinishedCourseList from '../../components/course/homepage/UnfinishedCourseList';
import WelcomeMessage from '../../components/course/homepage/WelcomeMessage';
import { Course } from '../../interfaces';

const CourseHomePage = ({ courses }) => {
  return (
    <div className='px-40 py-16'>
      <WelcomeMessage />
      <UnfinishedCourseList />
      <CourseList courses={courses} />
    </div>
  );
};

export async function getStaticProps() {
  //   const courses = await prisma.course.findMany();
  const courses: Course[] = [
    { adminId: '1', description: 'test', id: '1', name: 'abc', price: 100, stars: 2.2 },
    {
      adminId: '1',
      description: 'This is the course title which is pretty long but should not exceed more than three lines',
      id: '2',
      name: 'Course coordinator',
      price: 100,
      stars: 2.2,
    },
    { adminId: '1', description: 'test', id: '3', name: 'Hello world', price: 100, stars: 2.2 },
  ];

  return {
    props: { courses },
    revalidate: 86400,
  };
}
export default CourseHomePage;
