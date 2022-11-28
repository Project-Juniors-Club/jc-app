import React from 'react';

const CourseCard = () => {
  return (
    <article className='overflow-hidden rounded-2xl border border-solid' style={{ width: '352px', borderColor: '#C7C7C7' }}>
      <div className='bg-red-600' style={{ height: '160px' }}></div>
      {/* <img/> */}
      <div className='px-4'>
        <h3 className=' pt-6 pb-2 text-xl'>This is the course title which is pretty long but should not exceed more than three lines</h3>
        <div className='mb-3 flex items-center justify-between text-center'>
          <span className=' text-sm' style={{ color: '#8E8E8E' }}>
            Course coordinator
          </span>
          <span className='text-2xl font-bold'>S$2.95</span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
