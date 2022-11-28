import CourseCard from './CourseCard';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Course } from '../../../interfaces';

const CourseList = ({ courses }: { courses: Course[] }) => {
  const [search, setSearch] = useState('');
  const filteredCourses = useMemo(() => {
    return courses.filter(
      course => course.name.toLowerCase().includes(search.toLowerCase()) || course.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, courses]);
  return (
    <section aria-labelledby='course-home-explore-courses'>
      <div className='py-12'>
        <h2 id='course-home-explore-courses' className='text-3xl font-bold'>
          Explore Courses:
        </h2>
        <div className='search-outline my-6 flex h-12 w-[28rem] rounded-lg border border-solid border-black px-4'>
          <Image src={'/icons/Search.svg'} width='24' height={'24'} alt='Search' />
          <input
            className='w-full pl-2.5 focus:outline-none'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={'Search'}
          />
        </div>
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
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
