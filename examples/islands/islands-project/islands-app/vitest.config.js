import { defineConfig } from 'vitest/config';
import { default as react } from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
