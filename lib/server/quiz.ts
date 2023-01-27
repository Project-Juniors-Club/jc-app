import { Prisma, GameType, AssetType, QuizGame, QuizGameOptionType, Image } from '@prisma/client';
import prisma from '../prisma';

export type SerializedQuizOption = {
  isCorrectOption: boolean;
  quizGameOptionType: QuizGameOptionType;
  optionText: string | null;
  optionImage: Image | null;
};

export type SerializedQuizQuestion = {
  questionNumber: number;
  isMultipleResponse: boolean;
  questionTitle: string;
  image: Image | null;
  quizGameOptions: SerializedQuizOption[];
};

export const createQuiz = async (quizGameQuestions: SerializedQuizQuestion[]) => {
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
        create: quizGameQuestions.map(question => ({
          questionNumber: question.questionNumber,
          isMultipleResponse: question.isMultipleResponse,
          questionTitle: question.questionTitle,
          image: question.image && {
            connect: {
              assetId: question.image.assetId,
            },
          },
          quizGameOptions: {
            create: question.quizGameOptions.map(option => ({
              isCorrectOption: option.isCorrectOption,
              quizGameOptionType: option.quizGameOptionType,
              optionText: option.optionText,
              optionImage: option.optionImage && {
                connect: {
                  assetId: option.optionImage.assetId,
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
