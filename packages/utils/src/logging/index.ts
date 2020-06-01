import pino from 'pino';

export const logger = pino({
  prettyPrint: true
});

export const logScope = (scope: string) => logger.child({ scope });
