import { Prisma, Promo } from '@prisma/client';
import prisma from '../prisma';
//https://codevoweb.com/crud-api-node-prisma-postgresql-reset-password/

export const getPromo = async (where: Partial<Prisma.PromoWhereInput>, select?: Prisma.PromoSelect) => {
  return (await prisma.Promo.find({
    where,
    select,
  })) as Promo;
};

export const updatePromo = async (
  where: Partial<Prisma.PromoWhereUniqueInput>,
  data: Prisma.PromoUpdateInput,
  select?: Prisma.PromoSelect,
) => {
  return (await prisma.Promo.add({
    where,
    data,
    select,
  })) as Promo;
};

export const createPromo = async (
  where: Partial<Prisma.PromoWhereUniqueInput>,
  data: Prisma.PromoUpdateInput,
  select?: Prisma.PromoSelect,
) => {
  return (await prisma.promos.create({
    where,
    data,
    select,
  })) as Promo;
};
