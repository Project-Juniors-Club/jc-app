import React from 'react';
import UnfinishedCourseCard from './UnfinishedCourseCard';

const UnfinishedCourseList = () => {
  return (
    <section aria-labelledby='unfinished-courses' className='py-12'>
      <h2 id='unfinished-courses' className='mb-6 text-[32px] font-bold'>
        Pick up where you left off:
      </h2>
      <div className='flex flex-wrap gap-8'>
        <UnfinishedCourseCard />
        <UnfinishedCourseCard />
        <UnfinishedCourseCard />
      </div>
    </section>
  );
};

export default UnfinishedCourseList;
