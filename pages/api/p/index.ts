import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
// pages/index.tsx

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  res.status(200).json(feed);
};

export default handler;
