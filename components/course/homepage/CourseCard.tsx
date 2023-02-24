import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { SerializedCourse, updateLastSeen } from '../../../lib/server/course';

const CourseCard = ({ course }: { course: SerializedCourse }) => {
  const router = useRouter();
  const sess = useSession();
  return (
    <article
      className='w-[22rem] cursor-pointer overflow-hidden rounded-2xl border border-solid border-[#c7c7c7]'
      onClick={() => {
        updateLastSeen(sess.data.user.id, course.id);
        router.push('/courses/' + course.id);
      }}
    >
      <div className='h-[10rem] bg-[#EBF8D3]'></div>
      {/* <img/> */}
      <div className='relative h-[10.5625rem] px-4'>
        <h3 className=' pt-6 pb-2 text-xl'>{course.title}</h3>
        <div className='absolute left-4 bottom-3 right-4 mb-3 flex items-center justify-between text-center'>
          <span className=' text-sm text-[#8e8e8e]'>{course.createdBy.user.name}</span>
          <span className='text-2xl font-bold'>S${course.price}</span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
