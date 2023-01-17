import { useMemo, useState } from 'react';
import { Category, Course, CourseStatus, User } from '@prisma/client';
import CustomButton from '../../../components/Button';
import prisma from '../../../lib/prisma';
import NavBarCart from '../../../components/navbar/NavBarCart';
import { useRouter } from 'next/router';
import { getAllCourses } from '../../../lib/server/course';
import { LinkBox, LinkOverlay, Image } from '@chakra-ui/react';
import Layout from '../../../components/Layout';

const CourseCard = ({ course }) => {
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

const SortAndFilterMenu = ({ categories, setCategory, setSortCriteria }) => {
  return (
    <>
      <div className='relative mt-1 rounded-md shadow-sm'>
        <label htmlFor='sortCriteria' className='block text-sm font-medium text-gray-700'>
          Sort By
        </label>
        <select
          id='sortCriteria'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          onChange={e => {
            setSortCriteria(e.target.value);
          }}
        >
          <option value='Popularity'>Popularity</option>
          <option value='Price' defaultChecked>
            Price
          </option>
        </select>
      </div>

      <div className='relative mt-1 rounded-md shadow-sm'>
        <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
          Filter By
        </label>
        <select
          id='category'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          onChange={e => {
            setCategory(e.target.value);
          }}
        >
          <option value={' '}>All Categories</option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

interface IProps {
  courses: Course[];
  categories: Category[];
}

//TODO: maybe standardise header across all pages?
const StaffCourseOverviewPage = ({ courses, categories }: IProps) => {
  const [category, setCategory] = useState<Category>(null);
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const router = useRouter();

  const filteredData = useMemo(
    () =>
      searchField || sortCriteria
        ? courses
            .sort((a, b) => {
              if (sortCriteria.includes('Price')) {
                return Number(b.price) - Number(a.price);
              }
            })
            .filter(course => {
              const searchFieldLower = searchField.toLowerCase().trim();
              return course.title.toString().toLowerCase().includes(searchFieldLower);
            })
        : courses,
    [searchField, sortCriteria, courses],
  );

  return (
    <Layout title={`${'Course Overview'} | Staff`}>
      <NavBarCart />
      <div className='px-36'>
        <div className='flex items-center justify-between py-16'>
          <h1 className='text-5xl font-bold'>Course Overview</h1>
          <CustomButton variant={'green-solid'} onClick={() => router.push(`/courses/staff/create`)}>
            Create Course +
          </CustomButton>
        </div>
        <div className='flex gap-2 py-16'>
          <div className='w-52'>
            <SortAndFilterMenu categories={categories} setCategory={setCategory} setSortCriteria={setSortCriteria} />
          </div>
          <div className='flex w-full flex-col gap-9'>
            <div>
              <label htmlFor='filterName' className='block text-sm font-medium text-gray-700'>
                Search Course
              </label>
              <div className='relative mt-1 rounded-md shadow-sm'>
                <input
                  type='text'
                  name='filterName'
                  id='filterName'
                  className='block w-full rounded-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                  placeholder='Search by title...'
                  onChange={e => {
                    setSearchField(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <div className='text-bold text-right text-sm text-[#7B7B7B]/50'>{`${filteredData.length} results`}</div>
              {filteredData.map((course: Course, idx: number) => (
                <CourseCard key={idx} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(): Promise<{ props: { courses: Course[]; categories: Category[] } }> {
  const categories = JSON.parse(JSON.stringify(await prisma.category.findMany()));
  const courses = JSON.parse(JSON.stringify(await getAllCourses()));
  return { props: { courses, categories } };
}

export default StaffCourseOverviewPage;
