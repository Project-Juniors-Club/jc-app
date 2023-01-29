import { LinkBox, LinkOverlay, Image } from '@chakra-ui/react';
import React from 'react';
import { Course } from '../../../interfaces';

const CourseCard = ({ course }: any) => {
  const isFree = course.price <= 0;

  return (
    <LinkBox as='article' borderWidth='1px' rounded='md' className='m-1 p-2'>
      <LinkOverlay href={`staff/${course.id}`}>
        <div className='flex w-full items-center gap-x-12 py-6'>
          <div>
            <div className='grid h-[148px] w-[259px] place-content-center rounded-2xl bg-[#C7C7C7]'>
              {course.coverImage?.url ? (
                <Image src={course.coverImage.url} alt='testing' />
              ) : (
                <div className='h-min font-bold'>No Image Found</div>
              )}
            </div>
          </div>
          <div className='flex w-full flex-col gap-8'>
            <div className='flex flex-col gap-3'>
              <div className='text-[11px] italic text-[#7B7B7B]'>{course.status}</div>
              <div>
                <div className='text-xl font-bold'>{course.title}</div>
                <div className='text-sm font-bold text-[#8E8E8E]'>{course.createdBy.user.name}</div>
              </div>
            </div>
            <div className='flex h-8 w-full justify-between'>
              <div className={`w-max rounded-md px-4 py-1.5 text-sm text-white ${course.category ? 'bg-[#A9D357]' : 'bg-[#606060]'}`}>
                {course.category ? course.category.name : 'Uncategorized'}
              </div>
              <div className={`flex w-max flex-row px-3 py-1 ${isFree ? 'bg-[#A9D357]' : 'bg-[#606060]'} rounded-md text-white`}>
                {isFree ? 'FREE' : `S\$${Number(course.price).toFixed(2)}`}
              </div>
            </div>
          </div>
        </div>
      </LinkOverlay>
    </LinkBox>
  );
};

export default CourseCard;
