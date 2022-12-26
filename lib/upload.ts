import axios from 'axios';

const uploadFile = async (file: File) => {
  return axios
    .put('/api/media', {
      name: file.name,
      type: file.type,
    })
    .then(({ data: { uploadUrl, assetId } }) =>
      axios
        .put(uploadUrl, file, {
          headers: {
            'Content-type': file.type,
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(() => assetId as String),
    );
};

export default uploadFile;
