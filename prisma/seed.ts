import { sampleUserData } from '../utils/sample-data';
import prisma from '../lib/prisma';

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
