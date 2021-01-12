import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execP, spawnP } from '../utils/exec';
import { logScope } from '../utils';

const log = logScope('migration');

dotenv.config();

const migrationsPath = path.resolve(__dirname, './migrations');

const checkMigrationsPath = () =>
  fs
    .stat(migrationsPath)
    .then(() => true)
    .catch(() => false);

const addPermissions = () => execP(`chmod -R +x ./node_modules`);
const runPrismaMigrate = () =>
  spawnP(`./node_modules/@prisma/cli/build/index.js --preview-feature migrate deploy`, log);

const runMigrations = async () => {
  await checkMigrationsPath();
  await addPermissions();
  return runPrismaMigrate();
};

runMigrations().then(console.log);
