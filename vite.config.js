import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router-dom')) return 'router';
          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) return 'redux';
          if (id.includes('@tanstack/react-query') || id.includes('axios')) return 'query';
          if (id.includes('react-icons')) return 'icons';
          if (id.includes('react') || id.includes('react-dom')) return 'react';
          return 'vendor';
        },
      },
    },
  },
})
