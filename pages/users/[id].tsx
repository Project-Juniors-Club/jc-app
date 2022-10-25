import { GetStaticProps, GetStaticPaths } from 'next';

import { User } from '../../interfaces';
import Layout from '../../components/Layout';
import ListDetail from '../../components/ListDetail';
import prisma from '../../lib/prisma';

type Props = {
  item?: User;
  errors?: string;
};

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title='Error | Next.js + TypeScript Example'>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return <Layout title={`${'User Detail'} | Next.js + TypeScript Example`}>{item && <ListDetail item={item} />}</Layout>;
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const sampleUserData = await prisma.user.findMany();
  const paths = sampleUserData.map(user => ({
    params: { id: user.id.toString() },
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
    const user = await prisma.user.findFirst({
      where: {
        id: params?.id.toString(),
      },
    });
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item: JSON.parse(JSON.stringify(user)) } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
