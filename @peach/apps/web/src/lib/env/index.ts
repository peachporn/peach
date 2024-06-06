const environmentVariables = [
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "DB_DATABASE",
  "LIBRARY_PATH",
] as const;
type EnvironmentVariable = (typeof environmentVariables)[number];

export const fromEnv = (name: EnvironmentVariable) => {
  const v = process.env[name];

  if (!v) {
    throw new Error(`No environment variable ${name} found!`);
  }

  return v;
};

export const fromEnvOptional = (name: string) => process.env[name];
