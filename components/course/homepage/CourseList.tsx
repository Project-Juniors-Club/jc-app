import CourseCard from './CourseCard';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Course } from '../../../interfaces';
import FilterButton from '../../buttons/FilterButton';

type SortTypes = 'priceAscending' | 'priceDescending' | 'durationAscending' | 'durationDescending' | '';

const CourseList = ({ courses }: { courses: Course[] }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortTypes>('');
  const sortedCourses = useMemo(() => {
    return [
      ...courses.sort((a, b) => {
        if (sort === 'priceAscending') {
          return a.price - b.price;
        }
        if (sort === 'priceDescending') {
          return b.price - a.price;
        }
        if (sort === 'durationAscending') {
          return 0;
          // return a.duration - b.duration;
        }
        if (sort === 'durationDescending') {
          return 1;
          // return b.duration - a.duration;
        }
        return 0;
      }),
    ];
  }, [sort, courses]);
  const filteredCourses = useMemo(() => {
    return sortedCourses.filter(
      course => course.name.toLowerCase().includes(search.toLowerCase()) || course.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, sortedCourses]);
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
          <div className='flex items-center'>
            <p className='mr-2.5'>Current filters:</p>
            <FilterButton />
          </div>
          <select
            className='rounded-md border border-solid border-[#C7C7C7] py-1.5 px-3 '
            value={sort}
            onChange={e => setSort(e.target.value as SortTypes)}
          >
            {/*TODO: style arrow on select*/}
            <option value={''} disabled selected hidden>
              Sort by:
            </option>
            <option value={'priceAscending'}>Price: Low to High</option>
            <option value={'priceDescending'}>Price: High to Low</option>
            <option value={'durationAscending'}>Duration: Low to High</option>
            <option value={'durationDescending'}>Duration: High to Low</option>
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
