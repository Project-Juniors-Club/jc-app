import { Prisma, User } from '@prisma/client';
import prisma from '../prisma';
//https://codevoweb.com/crud-api-node-prisma-postgresql-reset-password/
export const findUser = async (where: Partial<Prisma.UserWhereInput>, select?: Prisma.UserSelect) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export const findUniqueUser = async (where: Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};

export const updateUser = async (where: Partial<Prisma.UserWhereUniqueInput>, data: Prisma.UserUpdateInput, select?: Prisma.UserSelect) => {
  return (await prisma.user.update({
    where,
    data,
    select,
  })) as User;
};
