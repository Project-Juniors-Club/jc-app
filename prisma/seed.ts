import { sampleUserData } from '../utils/sample-data';
import prisma from '../lib/prisma';

const load = async () => {
  try {
    await prisma.user.createMany({
      data: sampleUserData,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default load;
