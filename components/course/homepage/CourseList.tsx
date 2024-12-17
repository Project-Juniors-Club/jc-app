import CourseCard from './CourseCard';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import FilterButton from '../../buttons/FilterButton';
import styles from './CourseList.module.css';
import { SerializedCourse } from '../../../lib/server/course';

type SortTypes = 'priceAscending' | 'priceDescending' | 'durationAscending' | 'durationDescending' | '';
export type FilterTypes = {
  title: string;
  options: string[];
};
const filterList: FilterTypes[] = [
  { title: 'Category', options: ['Category 1', 'Category 2', 'Category 3', 'Category 4'] },
  { title: 'Duration', options: ['0-5 hours', '5-10 hours', '10-15 hours', '>15 hours'] },
];

const CourseList = ({ courses }: { courses: SerializedCourse[] }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortTypes>('');
  const [filter, setFilter] = useState<FilterTypes[]>([
    { title: 'Category', options: [] },
    { title: 'Duration', options: [] },
  ]);
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
      course =>
        course.title.toLowerCase().includes(search.toLowerCase()) || course.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, sortedCourses]);
  const handleDelete = (title: string, option: string) => {
    setFilter(prev => {
      const x = prev.find(x => x.title === title);
      if (x) {
        x.options = x.options.filter(x => x !== option);
      }
      return [...prev];
    });
  };
  return (
    <section aria-labelledby='course-home-explore-courses'>
      <div className='py-12'>
        <h2 id='course-home-explore-courses' className='text-[2rem] font-bold'>
          All Courses:
        </h2>

        <div className={`${styles.search} my-6 flex h-12 w-[28rem] rounded-lg border border-solid border-black px-4`}>
          <Image src={'/icons/Search.svg'} width='24' height={'24'} alt='Search' />
          <input
            className='w-full pl-2.5 focus:outline-none'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={'Search'}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex flex-wrap items-center'>
            <p className='mr-2.5'>Current filters:</p>
            <FilterButton filterList={filterList} filter={filter} setFilter={setFilter} />
            {filter.map(x =>
              x.options.map(y => (
                <div
                  key={x.title + y}
                  className='ml-2.5 flex h-12 items-center rounded-lg border border-solid border-btn-green bg-main-green py-3 pr-[1.125rem] pl-6'
                >
                  <p className='mr-1'>{x.title + ': ' + y}</p>
                  <button className='h-6 w-6 cursor-pointer' onClick={() => handleDelete(x.title, y)}>
                    <Image src={'/icons/Cross.svg'} width={24} height={24} alt='cross' />
                  </button>
                </div>
              )),
            )}
          </div>
          <select
            className='rounded-md border border-solid border-[#C7C7C7] py-1.5 px-3 '
            value={sort}
            onChange={e => setSort(e.target.value as SortTypes)}
          >
            {/*TODO: style arrow on select*/}
            <option value={''} disabled hidden>
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
