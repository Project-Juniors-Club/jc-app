import { Prisma, User } from '@prisma/client';
import prisma from '../prisma';
import { UserType } from '../../interfaces/index';
//https://codevoweb.com/crud-api-node-prisma-postgresql-reset-password/

export type SerializedUsers = {
  id: string;
  email: string;
  type: UserType;
  emailVerified: Date;
  password: string;
  image: string;
  name: string;
  age: number;
  dob: Date;
  pdpa: boolean;
  deleted: boolean;
  otp: string;
};

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

export const getAllUsers = async (): Promise<SerializedUsers[]> => {
  const users = await prisma.user.findMany();
  return users;
};
