import pino from 'pino';
import { cli } from '../cli';

export const logger = pino({
  prettyPrint: true,
  level: cli.flags.debug ? 'debug' : 'info',
});

if (cli.flags.debug) {
  logger.debug('Running in debug mode!');
}

export const logScope = (scope: string) => logger.child({ scope });
