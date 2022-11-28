import React from 'react';
import CourseCard from './CourseCard';

const CourseList = () => {
  return (
    <section aria-labelledby='course-home-explore-courses'>
      <div className='py-12'>
        <h2 id='course-home-explore-courses' className='text-3xl font-bold'>
          Explore Courses:
        </h2>
        <input className='my-6' />
        <div className='flex items-center justify-between'>
          <div>
            <p>Current filters:</p>
          </div>
          <select>
            <option>Sort by:</option>
          </select>
        </div>
      </div>
      <div className='flex flex-wrap gap-x-8 gap-y-12 pt-12 pb-16'>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </section>
  );
};

export default CourseList;
