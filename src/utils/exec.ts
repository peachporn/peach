import child_process from 'child_process';

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
