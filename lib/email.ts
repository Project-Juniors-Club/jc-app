import { Prisma } from '@prisma/client';
import nodemailer from 'nodemailer';

const smtp: { host: string; port: number; user: string; pass: string } = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};

export const createEmail = (user: Prisma.UserCreateInput, url: string) => {
  //TODO: change from text
  const from = `Juniors Club <juniorsclub.nus@gmail.com>`;
  const to = user.email;
  //Private function to create new nodemailer transport
  const newTransport = () => {
    return nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  };
  const send = async (subject: string = 'No subject') => {
    try {
      //TODO: use templating engine to generate email
      const mailOptions = {
        from,
        to,
        subject,
        text: url,
        html: `<a href=${url}>${url}</a>`,
      };

      const info = await newTransport().sendMail(mailOptions);
      console.log(nodemailer.getTestMessageUrl(info));
    } catch (err: any) {
      console.error(err)
    }
  };

  const sendPasswordToken = async () => {
    await send('Your password reset token (valid for only 10 minutes).');
  };
  //methods returned can be accessed
  return { sendPasswordToken };
};
