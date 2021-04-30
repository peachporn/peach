import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, './.env'),
});

export const fromEnv = (name: string) => {
  const v = process.env[name];

  if (!v) {
    throw new Error(`No environment variable ${name} found!`);
  }

  return v;
};

export const fromEnvOptional = (name: string) => process.env[name];
