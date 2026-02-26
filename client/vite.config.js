import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: 'all',
    cors: true,
    headers: {
      'ngrok-skip-browser-warning': '69420',
    },
  },
})
