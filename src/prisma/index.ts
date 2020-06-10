import { PrismaClient } from '@prisma/client';
import * as path from 'path';

export const prisma = new PrismaClient({
  datasources: {
    db: 'file:./database.db',
  },
});
