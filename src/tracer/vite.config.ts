import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
  base: '/tracer/', // Adjust to '/' if at domain root
  server: {
    host: '0.0.0.0',
    port: 7070,
  },
});