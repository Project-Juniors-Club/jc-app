import { AssetType, GameType } from '@prisma/client';
import { EditorPageFormValues } from '../pages/courses/staff/editor/content/page/[id]';
import axios from 'axios';
import uploadFile from './upload';
import { SerializedQuizQuestion } from './server/quiz';
import { NUM_MATCHING_IMAGES } from '../components/matching-game-editor/Creator';

export const createOrUpdateAsset = async (data: EditorPageFormValues) => {
  // article, image, and video will require create new anyway, there is no need use the post endpoint
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

  // games are more tricky, since we can have multiple images, better to handle more carefully
  if (data.assetType === 'game') {
    return handleGame(data);
  }
};

const handleGame = async (data: EditorPageFormValues) => {
  if (data.interactiveType === 'quizGame') {
    // attempt to upload all images, this might not be a good idea. If something fails, it is hard to surface to the frontend individually which failed
    // alternatively, we start uploading the moment the image is selected, but those does not have a good way to handle local changes (we risk uploading unused images to the cloud, without cleanup S3 will fill up)
    data.quizGame.questions = await Promise.all(
      data.quizGame.questions.map(async (question, idx): Promise<SerializedQuizQuestion> => {
        if (!!question?.image) {
          question.image.assetId = question?.image?._uploadedFile ? await uploadFile(question.image._uploadedFile) : question.image.assetId;
          question.questionNumber = idx;
        }
        question.options = await Promise.all(
          question.options.map(async option => {
            if (!!option?.image) {
              option.image.assetId = option?.image?._uploadedFile ? await uploadFile(option.image._uploadedFile) : option.image.assetId;
            }
            return option;
          }),
        );
        return question;
      }),
    );

    if (data.originalAssetType === 'game' && data.originalInteractiveType === 'quizGame') {
      return (await axios.put(`/api/quiz-game/${data.originalAssetId}`, { quizGameQuestions: data.quizGame.questions })).data.data.gameId;
    } else {
      return (await axios.post(`/api/quiz-game`, { quizGameQuestions: data.quizGame.questions })).data.data.gameId;
    }
  }

  if (data.interactiveType === 'matchingGame') {
    // attempt to upload all images, this might not be a good idea. If something fails, it is hard to surface to the frontend individually which failed
    // alternatively, we start uploading the moment the image is selected, but those does not have a good way to handle local changes (we risk uploading unused images to the cloud, without cleanup S3 will fill up)
    data.matchingGame.images = await Promise.all(
      data.matchingGame.images.map(async image => {
        image.assetId = image._uploadedFile ? await uploadFile(image._uploadedFile) : image.assetId;
        return image;
      }),
    );

    if (data.originalAssetType === 'game' && data.originalInteractiveType === 'matchingGame') {
      return (await axios.put(`/api/matching-game/${data.originalAssetId}`, { ...data.matchingGame })).data.data.gameId;
    } else {
      return (await axios.post(`/api/matching-game`, { ...data.matchingGame })).data.data.gameId;
    }
  }
};

export const validatePageFormValues = (data: EditorPageFormValues) => {
  // all values are either undefined if there is no error, or object with values of form {message: ..., type: ...}
  const initialErrors = {
    name: validatePageTitle(data),
    duration: validatePageDuration(data),
    image: validatePageImage(data),
    video: validatePageVideo(data),
    description: validatePageDescription(data),
    quizGame: validateQuizGame(data),
    matchingGame: validateMatchingGame(data),
  };

  const errors = Object.entries(initialErrors).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});

  if (Object.keys(errors).length === 0) {
    return { values: data, errors: {} };
  } else {
    return { values: {}, errors: errors };
  }
};

const validatePageTitle = ({ name: title }: EditorPageFormValues) => {
  return title.trim().length > 0 ? undefined : { message: 'This is required', type: 'required' };
};

const validatePageDuration = ({ duration }: EditorPageFormValues) => {
  return duration >= 0 ? undefined : { message: 'Please enter valid duration', type: 'valid' };
};

const validatePageImage = ({ assetType, image: { uploadedFile, filename, removeOriginal } }: EditorPageFormValues) => {
  return assetType === 'image' && !uploadedFile && ((!!filename && removeOriginal) || !filename)
    ? { uploadedFile: { message: 'This is required', type: 'required' } }
    : undefined;
};

const validatePageVideo = ({ assetType, video: { uploadedFile, filename, removeOriginal } }: EditorPageFormValues) => {
  return assetType === 'video' && !uploadedFile && ((!!filename && removeOriginal) || !filename)
    ? { uploadedFile: { message: 'This is required', type: 'required' } }
    : undefined;
};

const validatePageDescription = ({ assetType, description }: EditorPageFormValues) => {
  return (assetType === 'image' || assetType === 'video') && description.trim().length === 0
    ? { message: 'This is required', type: 'required' }
    : undefined;
};

const validateQuizGame = ({ assetType, interactiveType, quizGame }: EditorPageFormValues) => {
  if (assetType !== 'game' || interactiveType !== 'quizGame') {
    return undefined;
  }
  const errors = quizGame.questions.map((question, _) => {
    const questionError = {};
    if (question.text.trim().length === 0) {
      questionError['text'] = { message: 'This is required', type: 'required' };
    }

    // array of undefined or optionError
    const optionErrors = question.options.map((option, _) => {
      const optionError = {};
      if (option.type === 'text' || option.type === 'textAndImage') {
        if (!option.text || option.text?.trim().length === 0) {
          optionError['text'] = { message: 'This is required', type: 'required' };
        }
      }
      if (option.type === 'image' || option.type === 'textAndImage') {
        if (!option.image.assetId && !option.image._uploadedFile) {
          optionError['image'] = { message: 'Select an image', type: 'required' };
        }
      }
      return Object.keys(optionError).length > 0 ? optionError : undefined;
    });
    if (optionErrors.filter(err => err != undefined).length !== 0) {
      questionError['options'] = optionErrors;
    }

    if (question.options.filter(({ isCorrect }, _) => isCorrect).length == 0) {
      questionError['atLeastOneCorrect'] = { message: 'At least one option needs to be correct', type: 'atLeastOneCorrect' };
    }
    return Object.keys(questionError).length > 0 ? questionError : undefined;
  });

  return errors.filter(err => err != undefined).length !== 0
    ? {
        questions: errors,
      }
    : undefined;
};

const validateMatchingGame = ({ assetType, interactiveType, matchingGame }: EditorPageFormValues) => {
  if (assetType !== 'game' || interactiveType !== 'matchingGame') {
    return undefined;
  }

  let imagesErrors = [];
  for (let i = 0; i < NUM_MATCHING_IMAGES; i++) {
    if (matchingGame.images[i] === undefined || (!matchingGame.images[i].assetId && !matchingGame.images[i]._uploadedFile)) {
      imagesErrors[i] = { message: 'Select an image', type: 'required' };
    } else {
      imagesErrors[i] = undefined;
    }
  }

  const durationError = matchingGame?.duration >= 0 ? undefined : { message: 'Please enter valid duration', type: 'valid' };

  return imagesErrors.filter(err => err != undefined).length !== 0 || durationError
    ? {
        images: imagesErrors,
        duration: durationError,
      }
    : undefined;
};
