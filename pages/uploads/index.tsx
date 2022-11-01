import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';

const Uploads = ({ url: url }) => {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<String>();
  console.log(url);

  function storeFile(event) {
    setFile(event.target.files[0]);
    setMessage(null);
  }

  return (
    <Layout title='Upload Media'>
      <p className='container flex p-4'>These are the files in juniors club AWS bucket. Not completed.</p>
      {/* <Image src={data} alt='data' /> */}
    </Layout>
  );
};

export default Uploads;
