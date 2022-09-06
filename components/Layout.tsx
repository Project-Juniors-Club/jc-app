import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';

import { userInfoState } from '../atoms/atoms';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { name, email, role } = useRecoilValue(userInfoState);

  return <div>
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
          | <Link href='/api/users'>Users API</Link>
        </nav>
      <a>Name = {name}, </a>
      <a>Email = {email}, </a>
      <a>Role = {role}</a>
      </header>
      {children}
      <footer>
        <hr />
        <span>I&apos;m here to stay (Footer)</span>
      </footer>
  </div>
};

export default Layout;
