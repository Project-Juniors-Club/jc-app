import Image from 'next/image';
import { useState } from 'react';

interface Course {
  status: string;
  author: string;
  name: string;
  category: string;
  imageUrl: string;
  price: number;
}

interface ICourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: ICourseCardProps) => {
  const isFree = course.price == 0;
  return (
    <div className='flex items-center gap-12 py-8 w-full'>
      {course.imageUrl ? (
        <Image src={course.imageUrl} alt='sample image' />
      ) : (
        <div className='grid w-60 h-40 bg-[#C7C7C7] place-content-center rounded-2xl'>
          <div className='h-min font-bold'>No Image Found</div>
        </div>
      )}
      <div className='flex flex-col gap-8 w-full'>
        <div className='flex flex-col gap-3'>
          <div className='italic text-[#7B7B7B] text-[11px]'>{course.status}</div>
          <div>
            <div className='font-bold text-xl'>{course.name}</div>
            <div className='text-sm text-sm font-bold text-[#8E8E8E]'>{course.author}</div>
          </div>
        </div>
        <div className='flex h-8 w-full justify-between'>
          <div className='px-4 py-1.5 w-max outline outline-2 outline-black rounded-full font-bold text-[#3D3D3D] text-sm'>
            {course.category}
          </div>
          <div className={`flex flex-row px-3 py-1 w-max bg-[${isFree ? '#A9D357' : '#606060'}] rounded-md text-white`}>
            {isFree ? 'FREE' : `S\$${course.price.toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const SortAndFilterMenu = ({ categories, setCategory, setSortCriteria }) => {
  return (
    <form>
      <h1 className='font-bold'>Sort By</h1>
      <select
        onChange={e => {
          setSortCriteria(e.target.value);
        }}
      >
        <option value='Popularity'>Popularity</option>
        <option value='Price'>Price</option>
      </select>
      <h1 className='font-bold'>Filter By</h1>
      <select
        onChange={e => {
          setCategory(e.target.value);
        }}
      >
        <option value={''}>All Categories</option>
        {categories.map((category, index) => {
          return (
            <option key={index} value={category}>
              {category}
            </option>
          );
        })}
      </select>
    </form>
  );
};

interface IProps {
  courses: Course[];
}

//TODO: replace button
//TODO: replace search bar
//TODO: maybe standardise header across all pages?
//TODO: replace dropdown
//TODO: filter menu style?
const OverviewPage = ({ courses }: IProps) => {
  const [category, setCategory] = useState<string>(null);
  const [sortCrtieria, setSortCriteria] = useState<string>(null);
  const [filterName, setFilterName] = useState<string>(null);
  const coursesView = courses
    .filter(course => !category || course.category == category)
    .filter(course => {
      const lowFilterName = (filterName || '').toLowerCase();
      return course.author.toLowerCase().includes(lowFilterName) || course.name.toLowerCase().includes(lowFilterName);
    })
    .sort((course1, course2) => {
      return course1.price - course2.price;
    });
  return (
    <>
      <div className='flex items-center justify-between py-16 px-36'>
        <h1 className='text-5xl font-bold'>Course Overview</h1>
        <button>Create Course +</button>
      </div>
      <div className='flex py-16 px-36'>
        <div className='w-52'>
          <SortAndFilterMenu
            categories={courses.map(coures => coures.category)}
            setCategory={setCategory}
            setSortCriteria={setSortCriteria}
          />
        </div>
        <div className='flex flex-col w-full gap-9'>
          <input
            className='border border-black w-full'
            onChange={e => {
              setFilterName(e.target.value);
            }}
          />
          <div>
            <div className='text-right text-sm font-bold font-[#7B7B7B]/50'>{`${coursesView.length} results`}</div>
            {coursesView.map((course: Course, idx: number) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export function getServerSideProps(): { props: { courses: Course[] } } {
  // TODO: implement backend for get courses for staff, for now this is sample data
  return {
    props: {
      courses: [
        {
          status: 'Draft',
          author: 'Wei Xin 1',
          name: 'Adventures with Bala and Friends: A look into food wastage in Singapore',
          category: 'Category 1',
          imageUrl: null,
          price: 0.0,
        },
        {
          status: 'Approved',
          author: 'Wei Xin 2',
          name: 'Adventures with Bala and Friends: A look into food wastage in Singapore',
          category: 'Category 2',
          imageUrl: null,
          price: 100.0,
        },
      ],
    },
  };
}

export default OverviewPage;
