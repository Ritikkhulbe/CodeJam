import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
// import { is } from '@electron-toolkit/utils'

import react from '@vitejs/plugin-react'

const isDev = true

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      minify: !isDev,
      rollupOptions: {
        external: ['express']
      },
      watch: {
        include: ['src/main/**', 'src/server/**']
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      watch: {
        include: ['src/preload/**']
      },
      minify: !isDev
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    build: {
      minify: !isDev,
      cssMinify: !isDev
    }
  }
})
