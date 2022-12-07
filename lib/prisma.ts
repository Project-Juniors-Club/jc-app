// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// https://github.com/nextauthjs/next-auth/issues/824#issuecomment-734800530
declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
