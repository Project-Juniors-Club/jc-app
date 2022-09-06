import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from "react";
import axios from "axios";

const BUCKET_URL = "http://juniors-club.s3-website-ap-southeast-1.amazonaws.com/";

const UploadPage = () => {
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/upload", {
      name: file.name,
      type: file.type,
    });

    console.log(data);

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(BUCKET_URL + file.name);
    setFile(null);
  };

  return (
    <Layout title='About | Next.js + TypeScript Example'>
        <h1>Upload</h1>
        <p>This is the upload page</p>
        <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
            <main>
                <p>Please select a file to upload</p>
                <input type="file" onChange={(e) => selectFile(e)} />
                {file && (
                <>
                    <p>Selected file: {file.name}</p>
                    <button
                    onClick={uploadFile}
                    className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
                    >
                    Upload a File!
                    </button>
                </>
                )}
                {uploadingStatus && <p>{uploadingStatus}</p>}
                {uploadedFile && <p>Uploaded!</p>}
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

export default UploadPage;