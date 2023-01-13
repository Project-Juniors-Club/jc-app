import { Prisma, GameType, AssetType, QuizGame, QuizGameOptionType } from '@prisma/client';
import prisma from '../prisma';

export type SerializedQuizOption = {
  isCorrectOption: boolean;
  quizGameOptionType: QuizGameOptionType;
  optionText: string | null;
  optionImageId: string | null;
};

export type SerializedQuizQuestion = {
  questionNumber: number;
  isMultipleResponse: boolean;
  questionTitle: string;
  imageId: string | null;
  quizGameOptions: SerializedQuizOption[];
};

export const createQuiz = async (questions: SerializedQuizQuestion[]) => {
  return (await prisma.quizGame.create({
    data: {
      game: {
        create: {
          type: GameType.quizGame,
          asset: {
            create: {
              assetType: AssetType.game,
            },
          },
        },
      },
      quizGameQuestions: {
        create: questions.map(question => ({
          questionNumber: question.questionNumber,
          isMultipleResponse: question.isMultipleResponse,
          questionTitle: question.questionTitle,
          image: question.imageId && {
            connect: {
              assetId: question.imageId,
            },
          },
          quizGameOptions: {
            create: question.quizGameOptions.map(option => ({
              isCorrectOption: option.isCorrectOption,
              quizGameOptionType: option.quizGameOptionType,
              optionText: option.optionText,
              optionImage: option.optionImageId && {
                connect: {
                  assetId: option.optionImageId,
                },
              },
            })),
          },
        })),
      },
    },
  })) as QuizGame;
};

export const findQuiz = async (where?: Partial<Prisma.QuizGameWhereInput>, select?: Prisma.QuizGameSelect) => {
  return (await prisma.quizGame.findMany({
    where,
    select,
  })) as QuizGame[];
};

export const findUniqueQuiz = async (where: Prisma.QuizGameWhereUniqueInput, select?: Prisma.QuizGameSelect) => {
  return (await prisma.quizGame.findUnique({
    where,
    select,
  })) as QuizGame;
};

export const updateQuiz = async (
  where: Partial<Prisma.QuizGameWhereUniqueInput>,
  data: Prisma.QuizGameUpdateInput,
  select?: Prisma.QuizGameSelect,
) => {
  return (await prisma.quizGame.update({
    where,
    data,
    select,
  })) as QuizGame;
};

export const deleteQuiz = async (where: Partial<Prisma.QuizGameWhereUniqueInput>, select?: Prisma.QuizGameSelect) => {
  return (await prisma.quizGame.delete({
    where,
    select,
  })) as QuizGame;
};
