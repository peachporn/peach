const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (_env, argv) => ({
  entry: path.resolve(__dirname, './src/prisma/migrate.ts'),
  output: {
    filename: 'migrate.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    // .mjs format should preferabbly stay in the first position
    extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: {
          loader: 'ts-loader',
          options: {
            projectReferences: true,
            transpileOnly: true,
            logLevel: 'INFO',
            onlyCompileBundledFiles: true,
            experimentalWatchApi: true,
          },
        },
      },
    ],
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'prisma/migrations', to: 'migrations' },
        {
          from: argv.mode === 'development' ? './.env' : './.env.example',
          to: './.env',
          toType: 'file',
        },
        {
          from: 'node_modules/@prisma/cli',
          to: './node_modules/@prisma/cli',
        },
        {
          from: 'node_modules/@prisma/engines',
          to: './node_modules/@prisma/engines',
        },
        {
          flatten: true,
          from: 'node_modules/.prisma/client/schema.prisma',
        },
      ],
    }),
  ],
});
