import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CourseList from '../../components/course/homepage/CourseList';
import ViewedCourseList from '../../components/course/homepage/ViewedCourseList';
import WelcomeMessage from '../../components/course/homepage/WelcomeMessage';
import NavBar from '../../components/navbar/NavBar';
import { getRecentCourses } from '../../lib/courseRecent';
import { getAllCourses, SerializedCourse } from '../../lib/server/course';

const CourseHomePage = ({ courses }) => {
  const sess = useSession();

  const [recentCourses, setRecentCourses] = useState<any[]>([]);

  useEffect(() => {
    if (!sess || !sess.data) {
      return;
    }
    getRecentCourses(sess?.data?.user?.id).then((value: SerializedCourse[]) => {
      setRecentCourses(value);
    });
  }, [sess]);

  return (
    <>
      <NavBar />
      <div className='px-40 py-16'>
        <WelcomeMessage isUnfinishedCoursesEmpty={recentCourses.length > 0} />
        <ViewedCourseList courses={recentCourses} />
        <CourseList courses={courses} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const courses = await getAllCourses();

  return {
    props: { courses },
    revalidate: 86400,
  };
}

export default CourseHomePage;
