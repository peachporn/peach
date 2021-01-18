/* eslint-disable global-require */
/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
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
