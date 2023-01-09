import { unstable_getServerSession } from 'next-auth';
import Layout from '../../components/Layout';
import { authOptions } from '../api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';

const InternalPage = ({ sess }) => {
  console.log('2 ' + JSON.stringify(sess));

  if (!sess) {
    return <Layout>Access denied</Layout>;
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>Welcome {sess.user.name}</strong>
        <strong>Your access is {sess.user.type}</strong>
      </p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const sess = await unstable_getServerSession(context.req, context.res, authOptions);
  console.log('Server side props in Admin route ' + JSON.stringify(sess));
  return { props: { sess } };
};

export default InternalPage;
