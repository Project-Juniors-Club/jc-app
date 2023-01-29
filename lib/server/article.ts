import { Prisma, Article, AssetType } from '@prisma/client';
import prisma from '../prisma';

export const createArticle = async (text: string) => {
  return (await prisma.article.create({
    data: {
      asset: {
        create: { assetType: AssetType.article },
      },
      text: text,
    },
  })) as Article;
};

export const findArticles = async (where?: Partial<Prisma.ArticleWhereInput>, select?: Prisma.ArticleSelect) => {
  return (await prisma.article.findMany({
    where,
    select,
  })) as Article[];
};

export const findUniqueArticle = async (where: Prisma.ArticleWhereUniqueInput, select?: Prisma.ArticleSelect) => {
  return (await prisma.article.findUnique({
    where,
    select,
  })) as Article;
};

export const updateArticle = async (
  where: Partial<Prisma.ArticleWhereUniqueInput>,
  data: Prisma.ArticleUpdateInput,
  select?: Prisma.ArticleSelect,
) => {
  return (await prisma.article.update({
    where,
    data,
    select,
  })) as Article;
};

export const deleteArticle = async (where: Partial<Prisma.ArticleWhereUniqueInput>, select?: Prisma.ArticleSelect) => {
  return (await prisma.article.delete({
    where,
    select,
  })) as Article;
};
