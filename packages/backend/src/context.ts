import { PrismaClient } from '@peach/database';

export type Context = {
  prisma: PrismaClient;
};

export const createContext = (): Context => ({
  prisma: new PrismaClient(),
});
