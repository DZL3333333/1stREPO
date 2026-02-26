import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: 'all',
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  },
})
