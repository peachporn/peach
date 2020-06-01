import meow from 'meow';

export const cli = meow(
  `
    Usage
      $ peach <input>
 
    Options
      --port, -p  Specify port to listen on, default: 3000
`,
  {
    flags: {
      port: {
        type: 'number',
        alias: 'p',
      },
    },
  },
);
