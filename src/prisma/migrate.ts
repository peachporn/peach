import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execP } from '../utils/exec';

dotenv.config();

const migrationsPath = path.resolve(__dirname, './migrations');

const checkMigrationsPath = () =>
  fs
    .stat(migrationsPath)
    .then(() => true)
    .catch(() => false);

const addPermissions = () => execP(`chmod -R +x ./node_modules`);
const runPrismaMigrate = () =>
  execP(`./node_modules/@prisma/cli/build/index.js --experimental migrate up`);

const runMigrations = async () => {
  await checkMigrationsPath();
  await addPermissions();
  return runPrismaMigrate();
};

runMigrations().then(console.log);
