const { build } = require('esbuild');

build({
  entryPoints: ['./src/index.ts'],
  outfile: '../../dist/app.js',
  platform: 'node',
  bundle: true,
  target: 'es2019',
});
