import { EditorSerializedMatchingGame } from '../../components/matching-game-editor/Creator';
import { constructDefaultQuestion } from '../../components/quiz-editor/Creator';
import { EditorSerializedQuizQuestion } from '../../components/quiz-editor/Question';
import { EditorPageFormValues } from '../../pages/courses/staff/editor/content/page/[id]';
import prisma from '../prisma';
import { findUniqueMatchingGame } from './matchingGame';
import { findUniqueQuiz } from './quiz';
import { findQuiz } from './quiz';

const getEditorQuizGame = async (gameId: string): Promise<{ questions: EditorSerializedQuizQuestion[] }> => {
  const prismaQuiz = await prisma.quizGame.findUnique({
    where: {
      gameId,
    },
    include: {
      quizGameQuestions: {
        include: {
          quizGameOptions: {
            include: {
              optionImage: true,
            },
          },
          image: true,
        },
        orderBy: {
          questionNumber: 'asc',
        },
      },
    },
  });
  return {
    questions: prismaQuiz.quizGameQuestions.map(question => {
      return {
        isMultipleResponse: question.isMultipleResponse,
        text: question.questionTitle,
        image: question.image, // _uploadedFile is null
        questionNumber: question.questionNumber,
        options: question.quizGameOptions.map(option => {
          return {
            isCorrect: option.isCorrectOption,
            type: option.quizGameOptionType,
            text: option.optionText,
            image: option.optionImage,
          };
        }),
      };
    }),
  };
};

const getEditorMatchingGame = async (gameId: string): Promise<EditorSerializedMatchingGame> => {
  const matchingGame = await findUniqueMatchingGame(gameId);
  return {
    duration: matchingGame.duration,
    images: matchingGame.images.map(image => image.image),
  };
};

// fill in here with whatever value is needed for the SSR form data
const getPageEditorFormValue = async (id: string): Promise<EditorPageFormValues> => {
  const page = await prisma.page.findUnique({
    where: {
      id: id,
    },
    include: {
      chapter: {
        select: {
          courseId: true,
        },
      },
      asset: {
        include: {
          article: true,
          image: true,
          video: true,
          game: true,
        },
      },
    },
  });

  const assetType = page.asset.assetType;
  const interactiveType = page.asset?.game?.type || 'quizGame';

  const result = {
    originalAssetId: page?.asset?.id,
    originalAssetType: assetType,
    originalInteractiveType: interactiveType,

    courseId: page.chapter.courseId,

    name: page.name,
    duration: page.duration,
    description: page?.description,

    assetType: assetType,
    interactiveType: interactiveType,

    text: page?.asset?.article?.text || null,

    image: {
      filename: page?.asset?.image?.filename || null,
      uploadedFile: null,
      removeOriginal: false,
    },

    video: {
      filename: page?.asset?.video?.filename || null,
      uploadedFile: null,
      removeOriginal: false,
    },

    quizGame:
      assetType === 'game' && interactiveType === 'quizGame'
        ? await getEditorQuizGame(page.asset.game.assetId)
        : {
            // By right, this won't be registered
            questions: [constructDefaultQuestion(0)],
          },

    // TODO: fetch sortingGame data
    sortingGame: { buckets: [] },

    matchingGame:
      assetType === 'game' && interactiveType === 'matchingGame'
        ? await getEditorMatchingGame(page.asset.game.assetId)
        : {
            duration: 0,
            images: [],
          },
  };
  return result;
};

export default getPageEditorFormValue;
