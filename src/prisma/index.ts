import { PrismaClient } from '@prisma/client';
import * as path from 'path';

export const prisma = new PrismaClient({
  datasources: {
    db: `file:${path.resolve(__dirname, 'database.db')}`,
    __internal: {
      debug: true
    }
  },
});
