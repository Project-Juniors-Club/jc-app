import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function Upload() {
  const [file, setFile] = useState<File>();
  const [uploadedFile, setUploadedFile] = useState<String>();
  const [message, setMessage] = useState<String>();

  function storeFile(event) {
    setFile(event.target.files[0]);
    setMessage(null);
  }

  const uploadFile = async () => {
    setMessage('Uploading...');
    const BUCKET_URL = 'https://juniors-club.s3.ap-southeast-1.amazonaws.com/';
    const { data } = await axios.put('/api/media/', {
      name: file.name,
      type: file.type,
    });

    let { data: newData } = await axios.put(data.url, file, {
      headers: {
        'Content-type': file.type,
        'Access-Control-Allow-Origin': '*',
      },
    });

    setFile(null);
    setUploadedFile(BUCKET_URL + file.name);
    setMessage('Uploaded!');
    console.log(uploadedFile);
  };

  return (
    <Layout title='Upload Media'>
      <p>Here, you can upload, view, or delete media from our very own AWS bucket.</p>
      <div className='container mx-auto flex min-h-screen items-center justify-center p-4'>
        <main>
          <p>Please select a file to upload</p>
          <input type='file' onChange={e => storeFile(e)} className='rounded-sm p-2' />
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
}
