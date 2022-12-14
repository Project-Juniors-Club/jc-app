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
        Here, you can upload media files to our very own AWS bucket. Free limit is 5GB pls do not test with huge files!!
      </p>
      <p className='container flex p-4'>Console will log the response from the bucket.</p>
      <div className='container mx-auto flex min-h-screen items-center justify-center p-4'>
        <main>
          <p>Please select a file to upload</p>
          <input type='file' onChange={e => storeFile(e)} className='rounded-sm p-1' />
          {file && (
            <>
              <button onClick={uploadFile} className='rounded-sm bg-purple-500 p-2 text-white shadow-md transition-all hover:bg-purple-700'>
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
