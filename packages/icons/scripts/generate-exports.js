#!/usr/bin/env node

import { readdirSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '..', 'src', 'icons')
const packageJsonPath = join(__dirname, '..', 'package.json')
const tsupConfigPath = join(__dirname, '..', 'tsup.config.ts')

// Get all icon files
const iconFiles = readdirSync(iconsDir)
  .filter(file => file.endsWith('.tsx'))
  .map(file => file.replace('.tsx', ''))
  .sort()

// Generate package.json exports
const generatePackageExports = () => {
  const exports = {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.js',
      require: './dist/index.js',
    },
    './package.json': './package.json',
  }

  for (const icon of iconFiles) {
    exports[`./${icon}`] = {
      types: `./dist/${icon}.d.ts`,
      import: `./dist/${icon}.js`,
      require: `./dist/${icon}.js`,
    }
  }

  return exports
}

// Generate tsup entries
const generateTsupEntries = () => {
  const entries = {
    index: 'src/index.ts',
  }

  for (const icon of iconFiles) {
    entries[icon] = `src/entries/${icon}.ts`
  }

  return entries
}

// Create entry files for each icon
const createEntryFiles = () => {
  const entriesDir = join(__dirname, '..', 'src', 'entries')

  // Create entries directory if it doesn't exist
  mkdirSync(entriesDir, { recursive: true })

  for (const icon of iconFiles) {
    const entryPath = join(entriesDir, `${icon}.ts`)

    // Convert kebab-case to PascalCase for icon name
    const iconName =
      icon
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('') + 'Icon'

    const entryContent = `export { ${iconName} } from '../icons/${icon}'
export type { IconProps, IconVariant } from '../icon.type'
`

    writeFileSync(entryPath, entryContent)
  }
}

// Generate new package.json content
const updatePackageJson = () => {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

  packageJson.exports = generatePackageExports()

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
}

// Generate new tsup.config.ts content
const updateTsupConfig = () => {
  const entries = generateTsupEntries()

  // Format entries with proper quoting for keys containing hyphens
  const formatEntries = obj => {
    const lines = []
    for (const [key, value] of Object.entries(obj)) {
      const quotedKey = key.includes('-') || key === 'index' ? `'${key}'` : key
      lines.push(`    ${quotedKey}: '${value}'`)
    }
    return lines.join(',\n')
  }

  const config = `import { defineConfig } from 'tsup'

const entries = {
${formatEntries(entries)}
} as const

export default defineConfig(options => {
  const entryList = Object.entries(entries)
  const groupSize = 80
  const entryGroups = Array.from(
    { length: Math.ceil(entryList.length / groupSize) },
    (_, index) =>
      Object.fromEntries(
        entryList.slice(index * groupSize, (index + 1) * groupSize)
      )
  )

  return entryGroups.map((entry, index) => ({
    entry,
    format: ['cjs', 'esm'] as const,
    dts: true,
    clean: !options.watch && index === 0,
    external: ['react', 'react-native', 'react-native-svg', '@xaui/core'],
    target: 'es2020',
  }))
})
`

  writeFileSync(tsupConfigPath, config)
}

// Run the script
console.log('🚀 Generating icon exports...')
console.log(`📦 Found ${iconFiles.length} icons`)

console.log('📝 Creating entry files...')
createEntryFiles()

console.log('📝 Updating package.json...')
updatePackageJson()

console.log('📝 Updating tsup.config.ts...')
updateTsupConfig()

console.log('✅ Done! Icon exports generated successfully.')
console.log('\n📋 Next steps:')
console.log('1. Run `pnpm build` to build the package')
console.log(
  '2. Test imports with `import { ChevronLeftIcon } from "@xaui/icons/chevron-left"`'
)
