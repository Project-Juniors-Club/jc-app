import { sampleUserData } from '../utils/sample-data';
import prisma from '../lib/prisma';

const load = async () => {
  try {
    // Delete sample datauser records
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
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default load;
