import { SortingGameObjectType } from '@prisma/client';
import { SerializedSortingGameObject, SerializedObjectBucketPair } from '../lib/server/sorting';

export const validatePairs = (correctPairs: SerializedObjectBucketPair[]) => {
  if (correctPairs.length <= 0) {
    return { valid: false, message: 'There should be at least 1 bucket-object pair for each game.' };
  }

  const validatedPairs = correctPairs.map(pair => validatePair(pair));
  const invalidResults = validatedPairs.filter(result => !result.valid);
  return invalidResults.length != 0 ? invalidResults.at(0) : { valid: true };
};

const validatePair = (pair: SerializedObjectBucketPair) => {
  const { objects, bucket } = pair;

  if (bucket == null) {
    return { valid: false, message: 'There should be at least 1 bucket for each bucket-object pair.' };
  }

  if (objects.length <= 0) {
    return { valid: false, message: 'There should be at least 1 object in each bucket.' };
  }

  const validatedObjects = objects.map(object => validateObject(object));
  const invalidResults = validatedObjects.filter(result => !result.valid);
  return invalidResults.length != 0 ? invalidResults.at(0) : { valid: true };
};

const validateObject = (object: SerializedSortingGameObject) => {
  const { objectType, text, imageId } = object;

  if (objectType == SortingGameObjectType.text && (text == null || text.length == 0 || imageId != null)) {
    return { valid: false, message: 'There should be text, and no image, for a sorting game text object.' };
  }

  if (objectType == SortingGameObjectType.image && (imageId == null || imageId.length == 0 || text != null)) {
    return { valid: false, message: 'There should be an image, and no text, for a sorting game text object.' };
  }

  return { valid: true };
};

export default validatePairs;
