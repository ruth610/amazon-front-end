import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),

  ],
  base: './', // or `/Amazon-Clone-2025/` if using a repo-based GitHub Page
})
