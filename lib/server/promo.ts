import { Prisma, promo } from '@prisma/client';
import prisma from '../prisma';

export type Promo = {
  id: String;
  code: String;
  discount: number;
  startDate: string;
  endDate: string;
};

export const getPromosWithId = async (id: string) => {
  // const promos = await prisma.promo.findMany({
  //   where: { courseId: id },
  //   include: {
  //     id: true,
  //     code: true,
  //     startDate: true,
  //     endDate: true,
  //     discount: true,
  //   },
  // });

  const promos = [{ id: 1, code: 'plsbuy', startDate: 1, endDate: '2', discount: 30 }];

  return promos;
};

export const updatePromo = async (id: string, promo: Promo): Promise<Promo> => {
  return (await prisma.promo.update({
    where: {
      id: id,
    },
    data: {
      ...promo,
    },
  })) as Promo;
};

export const createPromo = async (
  where: Partial<Prisma.PromoWhereUniqueInput>,
  data: Prisma.PromoUpdateInput,
  select?: Prisma.PromoSelect,
) => {
  return (await prisma.promo.create({
    where,
    data,
    select,
  })) as Promo;
};
