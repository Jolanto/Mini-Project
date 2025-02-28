import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // Ensure this is correctly set
    chunkSizeWarningLimit: 2000,
  },
  plugins: [react()],
});
