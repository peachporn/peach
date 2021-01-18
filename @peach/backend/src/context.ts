import { prisma, PrismaClient } from '@peach/utils';

export type Context = {
  prisma: PrismaClient;
};

export const createContext = (): Context => ({
  prisma,
});
