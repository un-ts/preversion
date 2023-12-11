import autoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    autoImport({
      imports: 'vitest',
    }),
  ],
  resolve: {
    alias: {
      preversion: new URL('src/index.ts', import.meta.url).pathname,
    },
  },
  test: {
    coverage: {
      reporter: ['lcov', 'json', 'text'],
      include: ['src'],
    },
  },
})
