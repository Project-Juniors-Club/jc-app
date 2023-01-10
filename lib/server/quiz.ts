import { Prisma, GameType, AssetType, QuizGame, QuizGameOptionType } from '@prisma/client';
import prisma from '../prisma';

export type SerializedQuizQuestion = {
  isMultipleResponse: boolean;
  questionTitle: string;
  imageId: string | null;
  quizGameOptions: {
    isCorrectOption: boolean;
    quizGameOptionType: QuizGameOptionType;
    quizGameTextOption: { optionText: string } | null;
    quizGameImageOption: { imageId: string } | null;
  }[];
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
          isMultipleResponse: question.isMultipleResponse,
          questionTitle: question.questionTitle,
          image: {
            connect: {
              assetId: question.imageId ?? undefined,
            },
          },
          quizGameOptions: {
            create: question.quizGameOptions.map(option => ({
              isCorrectOption: option.isCorrectOption,
              quizGameOptionType: option.quizGameOptionType,
              quizGameTextOption: option.quizGameTextOption
                ? {
                    create: {
                      optionText: option.quizGameTextOption.optionText,
                    },
                  }
                : null,
              quizGameImageOption: option.quizGameImageOption
                ? {
                    create: {
                      imageId: option.quizGameImageOption.imageId,
                    },
                  }
                : null,
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
