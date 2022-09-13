const { PrismaClient } = require('@prisma/client');
const { users } = require('../utils/sample-data.ts');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.createMany({
      data: users 
    })
    console.log('Seeded user data')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
load()