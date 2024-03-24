import { SortingGameObjectType } from '@prisma/client';
import { SerializedSortingGameObject, SerializedBucket } from '../lib/server/sorting';

export const validateBuckets = (sortingGameBuckets: SerializedBucket[]) => {
  if (sortingGameBuckets.length <= 0) {
    return { valid: false, message: 'There should be at least 1 bucket for each game.' };
  }

  const validatedObjects = sortingGameBuckets.map(bucket => validateObjects(bucket.sortingGameObjects));
  const invalidResults = validatedObjects.filter(result => !result.valid);
  return invalidResults.length != 0 ? invalidResults.at(0) : { valid: true };
};

const validateObjects = (sortingGameObjects: SerializedSortingGameObject[]) => {
  if (sortingGameObjects.length <= 0) {
    return { valid: false, message: 'There should be at least 1 object in each bucket.' };
  }

  const validatedObjects = sortingGameObjects.map(object => validateObject(object));
  const invalidResults = validatedObjects.filter(result => !result.valid);
  return invalidResults.length != 0 ? invalidResults.at(0) : { valid: true };
};

const validateObject = (object: SerializedSortingGameObject) => {
  const { objectType, text, image } = object;

  if (objectType == SortingGameObjectType.text && (text == null || text.length == 0 || image != null)) {
    return { valid: false, message: 'There should be non-empty text, and no image, for a sorting game text object.' };
  }

  if (objectType == SortingGameObjectType.image && (image == null || text != null)) {
    return { valid: false, message: 'There should be an image, and no text, for a sorting game text object.' };
  }

  return { valid: true };
};

export default validateBuckets;
