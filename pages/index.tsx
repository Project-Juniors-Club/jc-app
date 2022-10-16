import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';

const IndexPage = () => {
  // const { data: session } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login');
  //     return;
  //   }
  // }, [session, router]);

  return (
    <Layout title='Home | Next.js + TypeScript Example'>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href='/about'>
          <a className='text-1xl'>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
