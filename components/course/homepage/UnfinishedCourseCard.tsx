import React from 'react';

const UnfinishedCourseCard = () => {
  return (
    <article className='flex w-[356px] overflow-hidden rounded-2xl border border-solid border-[#c7c7c7]'>
      {/* <img /> */}
      <div style={{ background: 'red', width: '135px' }}></div>

      <div className='my-16 ml-4 w-[221px]'>
        <h3 className='mb-2 text-sm font-bold text-[#8e8e8e]'>Course Title</h3>
        <p className='text-xl'>Current video title: This is a short description</p>
      </div>
    </article>
  );
};

export default UnfinishedCourseCard;
