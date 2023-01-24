import { AssetType } from '@prisma/client';
import { EditorPageFormValues } from '../pages/courses/staff/editor/content/page/[id]';
import axios from 'axios';
import uploadFile from './upload';

export const createOrUpdateAsset = async (data: EditorPageFormValues) => {
  if (data.assetType === 'article') {
    const result = await axios.post('/api/articles', { text: data.text });
    return result.data.data.assetId;
  }
  if (data.assetType === 'image') {
    return data.image.uploadedFile ? await uploadFile(data.image.uploadedFile) : data.originalAssetId;
  }
  if (data.assetType === 'video') {
    return data.video.uploadedFile ? await uploadFile(data.video.uploadedFile) : data.originalAssetId;
  }
};
