import meow from 'meow';

export const cli = meow(
  `
    Usage
      $ peach <input>
 
    Options
      --port, -p  Specify port to listen on, default: 3000
      --debug     Enable debug logging
`,
  {
    flags: {
      debug: {
        type: 'boolean',
      },
      port: {
        type: 'number',
        alias: 'p',
      },
    },
  },
);
