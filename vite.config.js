import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.kirk.replit.dev',
      '61e8b1a8-0f09-44c5-8504-35e0686b57af-00-3mhc2og8jh3an.kirk.repl.co',
      '61e8b1a8-0f09-44c5-8504-35e0686b57af-00-3mhc2og8j',
    ]
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
