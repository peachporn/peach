import child_process from 'child_process';
import { Logger } from 'pino';

export const execP = (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    child_process.exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr);
      }
      if (stderr) {
        return resolve(stderr);
      }
      return resolve(stdout);
    });
  });

export const spawnP = (
  command: string,
  logger: Logger,
  errorAsStdout: boolean = false,
): Promise<string> =>
  new Promise((resolve, reject) => {
    const commandParts = command.split(' ').map(s => s.replace(/'/g, ''));
    const cp = child_process.spawn(commandParts[0], commandParts.slice(1), { shell: true });

    cp.stdout.on('data', data => {
      logger.debug(data.toString());
    });
    cp.stderr.on('data', data => {
      if (errorAsStdout) {
        logger.debug(data.toString());
      } else {
        logger.error(data.toString());
      }
    });

    cp.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Error executing command: ${command}`));
      }
      resolve('');
    });
  });
