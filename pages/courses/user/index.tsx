import { useMemo, useState } from 'react';
import { Category, Course, CourseStatus, User } from '@prisma/client';
import prisma from '../../../lib/prisma';
import NavBarAdmin from '../../../components/navbar/NavBarAdmin';
import { useRouter } from 'next/router';
import { getAllCourses } from '../../../lib/server/course';
import { getAllUsers } from '../../../lib/server/user';
import InternalCourseCard from '../../../components/course/homepage/InternalCourseCard';
import Footer from '../../../components/Footer';

interface IProps {
  courses: Course[];
  categories: Category[];
  users: User[];
}

//TODO: maybe standardise header across all pages?
const StaffCourseOverviewPage = ({ courses, categories, users }: IProps) => {
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('');
  const router = useRouter();

  console.log(users);
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
    <>
      <NavBarAdmin />
      <div className='px-36'>
        <div className='flex gap-2 py-16'>
          <div className='flex w-full flex-col gap-9'>
            <div>
              <div className='text-bold text-right text-sm text-[#7B7B7B]/50'>{`${filteredData.length} results`}</div>
              {filteredData.map((course: Course, idx: number) => (
                <InternalCourseCard key={idx} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(): Promise<{ props: { courses: Course[]; categories: Category[] } }> {
  const categories = JSON.parse(JSON.stringify(await prisma.category.findMany()));
  const courses = JSON.parse(JSON.stringify(await getAllCourses()));
  const users = JSON.parse(JSON.stringify(await getAllUsers()));
  return { props: { courses, categories, users } };
}

export default StaffCourseOverviewPage;
