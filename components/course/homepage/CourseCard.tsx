import React from 'react';
import { Course } from '../../../interfaces';

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <article className='w-[352px] overflow-hidden rounded-2xl border border-solid border-[#c7c7c7]'>
      <div className='h-[160px] bg-red-600'></div>
      {/* <img/> */}
      <div className='relative h-[169px] px-4'>
        <h3 className=' pt-6 pb-2 text-xl'>{course.description}</h3>
        <div className='absolute left-4 bottom-3 right-4 mb-3 flex items-center justify-between text-center'>
          <span className=' text-sm text-[#8e8e8e]'>{course.name}</span>
          <span className='text-2xl font-bold'>S${course.price}</span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
