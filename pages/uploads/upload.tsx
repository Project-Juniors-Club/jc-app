import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';

const Upload = () => {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<String>();

  function storeFile(event) {
    setFile(event.target.files[0]);
    setMessage(null);
  }

  const uploadFile = async () => {
    setMessage('Uploading...');
    const { data } = await axios.put('/api/media/', {
      name: file.name,
      type: file.type,
    });

    setFile(null);
    setMessage('Uploaded!');
    console.log(data.message);
  };

  return (
    <Layout title='Upload Media'>
      <p className='container flex p-4'>
        Here, you can upload media files to our very own AWS bucket. Free limit is 5GB pls don't test with huge files!!
      </p>
      <p className='container flex p-4'>Console will log the response from the bucket.</p>
      <div className='container flex items-center p-4 mx-auto min-h-screen justify-center'>
        <main>
          <p>Please select a file to upload</p>
          <input type='file' onChange={e => storeFile(e)} className='p-1 rounded-sm' />
          {file && (
            <>
              <button onClick={uploadFile} className='bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all'>
                Upload a File!
              </button>
            </>
          )}
          <p>{message}</p>
        </main>
      </div>
      <p>
        <Link href='/'>
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default Upload;
