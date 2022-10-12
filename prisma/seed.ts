import prisma from '../lib/prisma';
import { User, UserType } from '../interfaces';

const sampleDataPwList = process.env.SAMPLE_DATA_PW_LIST;
const [alicePw, bobPw, carolinePw, davePw] = sampleDataPwList.split(', ');

/** Dummy user data. */
const sampleUserData: User[] = [
  { id: '101', username: 'Alice', email: 'alice@yahoo.com', password: alicePw, type: UserType.normalUser },
  { id: '102', username: 'Bob', email: 'bob@gmail.com', password: bobPw, type: UserType.admin },
  { id: '103', username: 'Caroline', email: 'caroline@outlook.com', password: carolinePw, type: UserType.superAdmin },
  { id: '104', username: 'Dave', email: 'dave@hotmail.com', password: davePw, type: UserType.normalUser },
];

const load = async () => {
  try {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: sampleUserData.map(user => user.email),
        },
      },
    });

    // Add sample user data
    await prisma.user.createMany({
      data: sampleUserData,
    });

    console.log('User data seeded!');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

load();

export default load;
