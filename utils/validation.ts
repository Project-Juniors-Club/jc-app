import { UserType } from '@prisma/client';

//Validate email address using regex pattern
export const validateEmail = (email: string) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

// Verify a user is an internal staff of Food Bank
export const isInternal = async (req) => {
  let role = req.nextauth.token?.type;
  if (role === UserType.staff || role === UserType.courseEditor || role === UserType.admin) {
    return true;
  }
  return false;
};
