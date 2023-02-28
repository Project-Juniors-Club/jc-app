import { Prisma, GameType, AssetType, QuizGame, QuizGameOptionType, Image } from '@prisma/client';
import prisma from '../prisma';

export type SerializedQuizOption = {
  isCorrect: boolean;
  type: QuizGameOptionType;
  text: string | null;
  image: Image | null;
};

export type SerializedQuizQuestion = {
  questionNumber: number;
  isMultipleResponse: boolean;
  text: string;
  image: Image | null;
  options: SerializedQuizOption[];
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
          questionTitle: question.text,
          image: question?.image?.assetId && {
            connect: {
              assetId: question.image.assetId,
            },
          },
          quizGameOptions: {
            create: question.options.map(option => ({
              isCorrectOption: option.isCorrect,
              quizGameOptionType: option.type,
              optionText: option.text,
              optionImage: option?.image?.assetId && {
                connect: {
                  assetId: option.image.assetId,
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
