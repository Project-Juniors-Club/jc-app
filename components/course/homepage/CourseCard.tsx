import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { updateLastSeen } from '../../../lib/courseRecent';
import { SerializedCourse } from '../../../lib/server/course';
import { Image, Box } from '@chakra-ui/react';
import styles from './Course.module.css';

const CourseCard = ({ course }: { course: SerializedCourse }) => {
  const router = useRouter();
  const sess = useSession();
  return (
    <article
      className={`w-[22rem] cursor-pointer overflow-hidden rounded-2xl border border-solid border-[#c7c7c7] shadow-md ${styles.card}`}
      onClick={() => {
        if (!sess) {
          return;
        }
        updateLastSeen(sess?.data?.user?.id, course.id);
        router.push('/courses/' + course.id);
      }}
    >
      <Box width='450px' height='240px' bgColor='#EBF8D3' borderRadius='16px'>
        {course.coverImage?.url ? (
          <Image width='450px' height='240px' borderRadius='16px' src={course.coverImage.url} alt='testing' />
        ) : (
          <></>
        )}
      </Box>
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
