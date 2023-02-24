import React from 'react';
import { SerializedCourse } from '../../../lib/server/course';
import CourseCard from './CourseCard';
import UnfinishedCourseCard from './UnfinishedCourseCard';

const ViewedCourseList = ({ courses }: { courses: SerializedCourse[] }) => {
  return (
    <section aria-labelledby='unfinished-courses' className='py-12'>
      <h2 id='unfinished-courses' className='mb-6 text-[2rem] font-bold'>
        Pick up where you left off:
      </h2>
      <div className='flex flex-wrap gap-8'>
        {courses.map(value => (
          <CourseCard key={courses[0].id} course={courses[0]} />
        ))}
      </div>
    </section>
  );
};

export default ViewedCourseList;
