/* eslint-disable global-require */
/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    static: {
      url: '/',
      static: true,
      resolve: false,
    },
  },
  workspaceRoot: '../../',
  packageOptions: {
    external: ['fs', 'path', 'child_process'],
    polyfillNode: true,
  },
  buildOptions: {
    out: '../../dist/frontend',
  },
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
  plugins: ['@snowpack/plugin-postcss', '@prefresh/snowpack'],
};
