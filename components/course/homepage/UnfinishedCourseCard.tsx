import React from 'react';

const UnfinishedCourseCard = () => {
  return (
    <article className='flex overflow-hidden rounded-2xl border border-solid' style={{ borderColor: '#C7C7C7', width: '356px' }}>
      {/* <img /> */}
      <div style={{ background: 'red', width: '135px' }}></div>

      <div className='my-16 ml-4' style={{ width: '221px' }}>
        <h3 className='mb-2 text-sm font-bold' style={{ color: '#8E8E8E' }}>
          Course Title
        </h3>
        <p className='text-xl'>Current video title: This is a short description</p>
      </div>
    </article>
  );
};

export default UnfinishedCourseCard;
