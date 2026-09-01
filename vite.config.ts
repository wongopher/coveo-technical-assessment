import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// Atomic loads icons and locale files on demand at runtime, so they have to be
// served from the app root rather than bundled.
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'node_modules/@coveo/atomic-react/dist/assets', dest: '.' },
        { src: 'node_modules/@coveo/atomic-react/dist/lang', dest: '.' },
        { src: 'node_modules/@coveo/atomic/dist/atomic/themes', dest: '.' },
      ],
    }),
  ],
})
