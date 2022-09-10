import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { createHash, randomBytes } from 'node:crypto';
import { createEmail } from '../../../../lib/email';
import { findUser, updateUser } from '../../../../lib/server/user';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = _req.body;
    //business logic from lib/server
    const user = await findUser({ email: email.toLowerCase() }, { id: true });
    const message = 'You will receive a reset email if user with that email exists.';
    if (!user) {
      return res.status(200).json({
        status: 'success',
        message,
      });
    }
    const resetToken = randomBytes(32).toString('hex');
    const passwordResetToken = createHash('sha256').update(resetToken).digest('hex');
    await updateUser(
      { id: user.id },
      {
        passwordResetToken,
        passwordResetExpiryDate: dayjs().add(10, 'minute').toDate(),
      },
      { email: true },
    );
    try {
      //TODO: change to dynamic path based on config
      const url = `http://localhost:3000/reset-password/${resetToken}`;
      await createEmail(user, url).sendPasswordToken();
      res.status(200).json({
        status: 'success',
        message,
      });
    } catch (err: any) {
      await updateUser(
        { id: user.id },
        {
          passwordResetToken: null,
          passwordResetExpiryDate: null,
        },
      );
      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending email',
      });
    }
  } catch (err: any) {
    console.error(err);
  }
};

export default handler;
