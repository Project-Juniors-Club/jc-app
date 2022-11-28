import React from 'react';
import CourseList from '../../components/course/homepage/CourseList';
import UnfinishedCourseList from '../../components/course/homepage/UnfinishedCourseList';
import WelcomeMessage from '../../components/course/homepage/WelcomeMessage';

const CourseHomePage = () => {
  return (
    <div className='px-40 py-16'>
      <WelcomeMessage />
      <UnfinishedCourseList />
      <CourseList />
    </div>
  );
};

export default CourseHomePage;
