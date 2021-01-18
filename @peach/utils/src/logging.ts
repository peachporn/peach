import pino from 'pino';

export const logger = pino({
  prettyPrint: true,
  level: 'debug',
});

export const logScope = (scope: string) => logger.child({ scope });
