import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { User } from '../../interfaces';
import Layout from '../../components/Layout';
import List from '../../components/List';
import prisma from '../../lib/prisma';

type Props = {
  users: User[];
};

const WithStaticProps = ({ users }: Props) => (
  <Layout title='Users List | Next.js + TypeScript Example'>
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    {users?.map(user => (
      <div
        key={user.id}
        className='user'
        style={{
          // cursor: 'pointer',
          padding: 10,
          border: '1px solid #ccc',
          borderRadius: 5,
          margin: 10,
          backgroundColor: '#f0f0f0',
        }}
      >
        <h3>Email: {user.email}</h3>
      </div>
    ))}
    <p>
      <Link href='/'>
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

// get all the users
export const getServerSideProps: GetServerSideProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items = JSON.parse(JSON.stringify(await prisma.user.findMany()));

  return { props: { items } };
};

export default WithStaticProps;
