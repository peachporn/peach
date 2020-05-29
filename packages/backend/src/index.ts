import { PrismaClient } from '@peach/database';

export const prisma = new PrismaClient();

const main = () => prisma.movie.findMany();

main()
  .then(console.log)
  .catch((e: Error) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
