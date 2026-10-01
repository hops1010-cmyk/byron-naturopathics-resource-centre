import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: ['index.html', 'links.html'],
    },
  },
})
