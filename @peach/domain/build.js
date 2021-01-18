const { build } = require('esbuild');

build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.js',
  platform: 'node',
  bundle: true,
  target: 'es2019',
});
