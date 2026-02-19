import { defineConfig } from 'tsup'
import { cpSync } from 'fs'

const entries = {
  index: 'src/index.ts',
  'core/index': 'src/core/index.ts',
  'alert/index': 'src/components/alert/index.ts',
} as const

export default defineConfig({
  entry: entries,
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: true,
  external: ['react', 'react-dom', 'tailwindcss', '@xaui/core'],
  target: 'es2020',
  async onSuccess() {
    cpSync('src/styles/xui.css', 'dist/index.css')
  },
})
