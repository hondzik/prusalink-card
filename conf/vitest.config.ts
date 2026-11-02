import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json-summary'],
      include: ['src/utils/deviceEntities.ts', 'src/utils/printerEntities.ts', 'src/utils/printerDisplay.ts', 'src/utils/media.ts', 'src/utils/automation.ts', 'src/localize.ts'],
      thresholds: {
        lines: 90,
        statements: 90,
        functions: 90,
        branches: 80,
      },
    },
  },
});
