import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      preversion: new URL('src/index.ts', import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    coverage: {
      reporter: ['lcov', 'json', 'text'],
      include: ['src'],
    },
  },
})
