import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 주소가 /drrrk/ 아래라서 base를 맞춘다. 다른 곳에 배포하면 VITE_BASE로 바꾼다.
export default defineConfig({
  base: process.env.VITE_BASE || '/drrrk/',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 8000 },
});
