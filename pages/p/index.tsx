import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Post, User } from '../../interfaces';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';

type Props = {
  feed: Post[];
};

const WithStaticProps = ({ feed }: Props) => (
  <Layout title='My Posts | Next.js + TypeScript Example'>
    <h1>My Posts</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /p</p>
    {feed?.map(post => (
      <div key={post.id} className='post'>
        {/* mouse over cursor pointer */}
        <div
          // onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
          style={{
            // cursor: 'pointer',
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            margin: 10,
            backgroundColor: '#f0f0f0',
          }}
        >
          <h2>{`Title: ${post.title}`}</h2>
          <div>{`Contents: ${post.content}`}</div>
          <small>By {post.author.username}</small>
        </div>
      </div>
    ))}
    <p>
      <Link href='/'>
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const feed = await prisma.post.findMany();

  return { props: { feed } };
};

export default WithStaticProps;
