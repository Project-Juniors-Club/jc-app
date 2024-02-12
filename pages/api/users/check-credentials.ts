import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await handlePOST(res, req);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}

// POST /api/user
async function handlePOST(res, req) {
  // this is weird where the body is return in the form of { <body in json string> : ''}
  const body = JSON.parse(Object.keys(req.body)[0]);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      password: true,
      deleted: true,
    },
  });
  if (user && bcrypt.compareSync(body.password, user.password) && !user.deleted) {
    // logger.debug("password correct");
    res.json(omit(user, 'password'));
  } else {
    // logger.debug("incorrect credentials");
    res.status(400).end('Invalid Credentials');
  }
}
