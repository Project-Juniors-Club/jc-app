import { Prisma } from '@prisma/client';
import prisma from '../prisma';

export type Promo = {
  id: string;
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
};

export const getPromosWithId = async (id: string) => {
  const promos = await prisma.promo.findMany({
    orderBy: [{ endDate: 'desc' }],
    where: { courseId: id },
    select: {
      id: true,
      code: true,
      startDate: true,
      endDate: true,
      discount: true,
    },
  });

  const mappedPromos = promos.map(promo => {
    let { startDate, endDate, ...obj } = promo;

    obj['startDate'] = promo.startDate.toLocaleDateString();
    obj['endDate'] = promo.endDate.toLocaleDateString();
    return obj as Promo;
  });

  return mappedPromos;
};
