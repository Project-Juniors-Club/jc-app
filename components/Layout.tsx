import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Footer from './Footer';
import { calc } from '@chakra-ui/react';
import styles from './Layout.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {/* 323px is the height of the footer on PC/Laptop devices */}
      <div style={{ minHeight: 'calc(100vh - 323px)' }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
