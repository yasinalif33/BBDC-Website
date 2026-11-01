import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the built site works from any sub-path, including
// GitHub Pages at https://yasinalif33.github.io/BBDC-Website/
export default defineConfig({
  plugins: [react()],
  base: './'
})
