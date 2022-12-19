import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import uploadFileMain from '../../lib/upload';

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

    const assetId = await uploadFileMain(file);

    setFile(null);
    setMessage('Uploaded!');
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
