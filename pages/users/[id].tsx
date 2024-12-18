import { GetServerSideProps } from 'next';

import { User } from '../../interfaces';
import Layout from '../../components/Layout';
import ListDetail from '../../components/ListDetail';
import prisma from '../../lib/prisma';

type Props = {
  item?: User;
  errors?: string;
};

const ServerSidePropsDetail = ({ item, errors }: Props) => {
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

export default ServerSidePropsDetail;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;
    const user = await prisma.user.findFirst({
      where: {
        id: id?.toString(),
      },
    });
    return { props: { item: JSON.parse(JSON.stringify(user)) } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};