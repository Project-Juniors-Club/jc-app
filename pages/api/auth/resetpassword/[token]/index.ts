import { NextApiRequest, NextApiResponse } from 'next';
// import { createHash } from 'node:crypto';
// import bcrypt from 'bcrypt';

// import prisma from '../../../../../lib/prisma';
// import { findUser } from '../../../../../lib/server/user';
// import dayjs from 'dayjs';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  // try {
  //   const { token }: { token?: string } = _req.query;
  //   const { password } = _req.body;
  //   const passwordResetToken = createHash('sha256').update(token).digest('hex');
  //   //TODO: change to API endpoint when getUser is ready
  //   const user = await findUser({
  //     passwordResetToken,
  //     passwordResetExpiryDate: {
  //       gt: dayjs().toDate(),
  //     },
  //   });
  //   if (!user) {
  //     return res.status(403).json({
  //       status: 'fail',
  //       message: 'Invalid token or token has expired.',
  //     });
  //   }
  //   //TODO: check salt with auth side
  //   const hashedPassword = await bcrypt.hash(password, 12);
  //   await prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       password: hashedPassword,
  //       passwordResetToken: null,
  //       passwordResetExpiryDate: null,
  //     },
  //   });
  //   console.log(hashedPassword);
  //   //TODO: add logout method
  //   res.status(200).json({
  //     status: 'success',
  //     message: 'Password successfully updated',
  //   });
  // } catch (err: any) {
  //   console.error(err);
  // }
  return;
};

export default handler;
