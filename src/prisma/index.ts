import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import { fromEnv } from '../utils/env';

const databasePath = fromEnv('DATABASE_PATH') || './database.db';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${databasePath}`,
    },
  },
});
