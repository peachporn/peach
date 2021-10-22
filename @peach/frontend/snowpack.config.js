/* eslint-disable global-require */
/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    static: {
      url: '/',
      static: true,
      resolve: false
    },
  },
  buildOptions: {
    out: '../../dist/frontend',
  },
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
  plugins: ['@snowpack/plugin-postcss'],
};
