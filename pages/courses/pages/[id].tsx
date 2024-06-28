import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function Page({ page }) {
  return (
    <>
      <Head>
        <title>{page.name}</title>
      </Head>
      <main>
        <h1>{page.name}</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  try {
    const res = await axios.get(`http://localhost:3000/api/courses/pages/${id}`, {});
    const data = res.data;
    console.log('Page data:', data);

    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        page: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
