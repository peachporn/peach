const { build } = require('esbuild');

build({
  entryPoints: ['./src/index.ts'],
  outfile: '../../dist/migrate.js',
  platform: 'node',
  bundle: true,
  target: 'es2019',
});
