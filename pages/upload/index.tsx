import { METHODS } from 'http';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function upload() {
  const [message, setMessage] = useState<String | undefined>();
  const [file, setFile] = useState<File | undefined>();

  function storeFile(event) {
    console.log('File stored!');
    setFile(event.target.files[0]);
  }

  const uploadFile = async () => {
    setMessage('Uploading...');
    // todo: api calls for get, post, delete
    // const url = await fetch('/api/media/', {
    //   method: 'POST',
    //   {
    //     key:
    //   }
    // });

    setMessage('Uploaded!');
    setFile(null);
  };

  return (
    <Layout title='Upload Media'>
      <p>Here, you can upload, view, or delete media from our very own AWS bucket.</p>
      <div className='container flex items-center p-4 mx-auto min-h-screen justify-center'>
        <main>
          <p>Please select a file to upload</p>
          <input type='file' onChange={e => storeFile(e)} className='p-2 rounded-sm' />
          {file && (
            <button onClick={uploadFile} className='bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all'>
              Upload a File!
            </button>
          )}
          {file && <p>{message}</p>}
        </main>
      </div>
      <p>
        <Link href='/'>
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
}
