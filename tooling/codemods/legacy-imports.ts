import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'

const OLD_PACKAGE = '@xaui/native'
const NEW_PACKAGE = '@xaui/native-legacy'

// './theme' only ever existed on the v1 package — the legacy tree never exported it,
// so a specifier using it already points at the right package and must be left alone.
const RESERVED_V1_SUBPATHS = new Set(['theme'])

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'])
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.turbo',
  '.next',
])

// Anchored on the closing quote so it can't partially match '@xaui/native-legacy/...'.
const SPECIFIER_PATTERN = new RegExp(
  `(['"])${escapeRegExp(OLD_PACKAGE)}(/[^'"]*)?\\1`,
  'g'
)

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function transformImports(source: string): string {
  return source.replace(
    SPECIFIER_PATTERN,
    (match, quote: string, subpath?: string) => {
      const firstSegment = subpath?.slice(1).split('/')[0]
      if (firstSegment && RESERVED_V1_SUBPATHS.has(firstSegment)) return match
      return `${quote}${NEW_PACKAGE}${subpath ?? ''}${quote}`
    }
  )
}

function collectSourceFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) collectSourceFiles(fullPath, files)
    else if (SOURCE_EXTENSIONS.has(extname(entry))) files.push(fullPath)
  }
  return files
}

export function run(targetDir: string): { changed: string[] } {
  const changed: string[] = []
  for (const file of collectSourceFiles(targetDir)) {
    const original = readFileSync(file, 'utf8')
    const transformed = transformImports(original)
    if (transformed !== original) {
      writeFileSync(file, transformed)
      changed.push(file)
    }
  }
  return { changed }
}
