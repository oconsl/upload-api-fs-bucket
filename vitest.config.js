import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

const rootDir = resolve(__dirname)

export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
  },
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src')
    }
  }
})