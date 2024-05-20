import { logScope } from './logging';
import { wait } from './timeout';

const log = logScope('retry');

export const retryWithFalloff =
  (
    maxTries: number,
    shouldRetry: (error: Error) => boolean,
    delayInMs: number,
    delayFalloffFn: (delayInMs: number) => number,
    tries: number = 0,
  ) =>
  <T>(fn: () => Promise<T>): Promise<T> =>
    fn().catch(error => {
      if (!shouldRetry(error)) throw error;
      if (tries >= maxTries) throw error;

      log.info(`Retry #${tries}, waiting for ${delayInMs}ms...`);

      return wait(delayInMs).then(() =>
        retryWithFalloff(
          maxTries,
          shouldRetry,
          delayFalloffFn(delayInMs),
          delayFalloffFn,
          tries + 1,
        )(fn),
      );
    });
