import { prisma, PrismaClient } from '@peach/utils/src/prisma';

export type Context = {
  prisma: PrismaClient;
};

export const createContext = (): Context => ({
  prisma,
});
