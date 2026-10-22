import path from 'node:path'
import { defineConfig } from 'vitest/config'

const alias = {
  '@': path.resolve(import.meta.dirname, 'src'),
  '@payload-config': path.resolve(import.meta.dirname, 'src/payload.config.ts'),
  'server-only': path.resolve(import.meta.dirname, 'tests/stubs/server-only.ts'),
}

export default defineConfig({
  test: {
    projects: [
      {
        resolve: { alias },
        test: { name: 'unit', include: ['tests/unit/**/*.test.ts'], environment: 'node' },
      },
      {
        resolve: { alias },
        test: {
          name: 'integration',
          include: ['tests/integration/**/*.test.ts'],
          environment: 'node',
          testTimeout: 60_000,
          hookTimeout: 120_000,
          fileParallelism: false,
          setupFiles: ['tests/integration/env.ts'],
        },
      },
    ],
  },
})
