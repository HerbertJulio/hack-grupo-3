import { defineConfig } from 'azion';

export default defineConfig({
  build: {
    entry: 'index.ts',
    worker: true,
    preset: {
      name: 'typescript',
    },
  },
});
