import { Course } from '@prisma/client';
import { GetStaticProps, GetStaticPaths } from 'next';

import Layout from '../../../components/Layout';
import prisma from '../../../lib/prisma';
import { getCourseWithAuthorAndDate } from '../../../lib/server/course';

type Props = {
  course?: Course;
  errors?: string;
};

const StaticPropsDetail = ({ course, errors }: Props) => {
  if (errors) {
    return (
      <Layout title='Error | Next.js + TypeScript Example'>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${'Course Detail'} | Next.js + TypeScript Example`}>
      {course && <>{`${course.title} ${course.description} ${course.categoryId} ${course.creatorId}`}</>}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const courses = await prisma.course.findMany();
  const paths = courses.map(course => ({
    params: { id: course.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const course = await getCourseWithAuthorAndDate(id);
    return { props: { course } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
