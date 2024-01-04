import prisma from '../lib/prisma';
import { sampleUserData, sampleAdminData } from '../utils/seedData';

const load = async () => {
  try {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: sampleUserData.map(user => user.email),
        },
      },
    });
    await prisma.user.deleteMany({
      where: {
        email: {
          in: sampleAdminData.map(admin => admin.email),
        },
      },
    });

    // Add sample user data
    await prisma.user.createMany({
      data: sampleUserData,
    });
    // Add sample admin data
    sampleAdminData.forEach(async admin => {
      await prisma.admin.create({
        data: {
          role: admin.role,
          disabled: admin.disabled,
          user: {
            create: {
              id: admin.userId,
              email: admin.email,
              type: admin.type,
              name: admin.name,
            },
          },
        },
      });
    });

    console.log('User data seeded!');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

load();

export default load;
