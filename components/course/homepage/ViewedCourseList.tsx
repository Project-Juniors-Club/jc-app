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
        {courses.map((value, i) => (
          <CourseCard key={courses[i].id} course={courses[i]} />
        ))}
      </div>
    </section>
  );
};

export default ViewedCourseList;
