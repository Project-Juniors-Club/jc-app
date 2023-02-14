import React from 'react';
import CourseList from '../../components/course/homepage/CourseList';
import UnfinishedCourseList from '../../components/course/homepage/UnfinishedCourseList';
import WelcomeMessage from '../../components/course/homepage/WelcomeMessage';
import NavBar from '../../components/navbar/NavBar';
import { Course } from '../../interfaces';
import prisma from '../../lib/prisma';
import { getAllCourses } from '../../lib/server/course';

const CourseHomePage = ({ courses }) => {
  return (
    <>
      <NavBar />
      <div className='px-40 py-16'>
        <WelcomeMessage isUnfinishedCoursesEmpty={false} />
        <UnfinishedCourseList />
        <CourseList courses={courses} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const courses = await getAllCourses();

  return {
    props: { courses },
    revalidate: 86400,
  };
}
export default CourseHomePage;
