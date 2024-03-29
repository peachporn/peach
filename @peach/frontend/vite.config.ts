import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: '../../dist/frontend',
    emptyOutDir: true,
    assetsDir: '.',
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost',
      },
      '/assets': {
        target: 'http://localhost',
      },
    },
  },
});
