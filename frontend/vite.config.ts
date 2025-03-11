import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    https: {
      pfx: fs.readFileSync('src/ssl/community_ssl.pfx'),
      passphrase: 'rootroot'
    },
    host: 'localhost',
    port: 5173
  }
})
