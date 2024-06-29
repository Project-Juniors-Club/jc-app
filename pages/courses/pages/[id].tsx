import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function Page({ page, asset, article }) {
  return (
    <>
      <Head>
        <title>{page.name}</title>
      </Head>
      <main>
        <h1>{page.name}</h1>
        {asset.assetType === 'article' && article && (
          <div>
            <h2>Article Text</h2>
            <p>{article.text}</p>
          </div>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  try {
    const res = await axios.get(`http://localhost:3000/api/courses/pages/${id}`);
    const { data } = res.data;

    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        ...data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
