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
    return await uploadFile(data.image[0]);
  }
  if (data.assetType === 'video') {
    return await uploadFile(data.video[0]);
  }
};
