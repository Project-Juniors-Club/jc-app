import { AssetType, GameType } from '@prisma/client';
import { EditorPageFormValues } from '../pages/courses/staff/editor/content/page/[id]';
import axios from 'axios';
import uploadFile from './upload';
import { SerializedQuizQuestion } from './server/quiz';

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
          console.log(idx);
          console.log(question.image.assetId);
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
};
