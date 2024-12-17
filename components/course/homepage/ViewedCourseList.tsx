import React from 'react';
import { SerializedCourse } from '../../../lib/server/course';
import { useSession } from 'next-auth/react';
import CourseCard from './CourseCard';
import UnfinishedCourseCard from './UnfinishedCourseCard';

const ViewedCourseList = ({ courses, full_name }: { courses: SerializedCourse[], full_name: String }) => {
  return (<>
      { full_name && (
    <section aria-labelledby='unfinished-courses' className='py-12'>
      <h2 id='unfinished-courses' className='mb-6 text-[2rem] font-bold'>
        My Courses:
      </h2>
      <div className='flex flex-wrap gap-8'>
        {courses.map((value, i) => (
          <CourseCard key={courses[i].id} course={courses[i]} />
        ))}
      </div>
    </section>)}
      </>
  );
};

export default ViewedCourseList;
