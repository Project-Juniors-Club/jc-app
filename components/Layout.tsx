import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Footer from './Footer';
import { calc } from '@chakra-ui/react';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { data: session, status } = useSession();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href='/about'>
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href='/users'>
            <a>Users List</a>
          </Link>{' '}
          | <Link href='/api/users'>Users API</Link>{' '}
          {status !== 'authenticated' && [
            '| ',
            <Link key='login' href='/login'>
              Login
            </Link>,
          ]}{' '}
          | <Link href='/uploads'>View Uploads</Link> | <Link href='/uploads/upload'>Upload</Link> |{' '}
          <button onClick={() => signOut()}>Sign out</button>|{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href='/checkout'>Checkout.com API</a>{' '}
        </nav>
      </header>
      {/* 323px is the height of the footer on PC/Laptop devices */}
      <div style={{ minHeight: 'calc(100vh - 323px)' }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
