import { readFileSync, writeFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { createRequire } from 'node:module'
import babel from '@babel/core'

/**
 * Runs the Reanimated worklets Babel plugin over a built `dist`.
 *
 * **Why a published RN library has to do this itself.** The plugin turns a function into a
 * worklet — a serialized body plus its captured closure — and Reanimated aborts the process
 * when it is handed a plain function to run on the UI runtime. In an app that transformation
 * happens in the consumer's Metro build; over `node_modules` it does not reliably happen at
 * all. The libraries that get this right, `react-native-gesture-handler` among them, ship
 * their **source**, so Babel sees the original `'worklet'` call sites. We ship a compiled
 * `dist`, so the same pass has to run here instead.
 *
 * Without it every animation in the package is a hard crash — `Abort trap: 6` inside
 * `WorkletRuntime::runSync`, with no JavaScript error to read.
 *
 *     node tooling/workletize/workletize.mjs packages/native/dist
 */

const EXTENSIONS = new Set(['.js', '.cjs', '.mjs'])

const require = createRequire(import.meta.url)
const plugin = require.resolve('react-native-worklets/plugin')

async function main() {
  const target = process.argv[2]

  if (!target) {
    console.error('usage: workletize.mjs <dist directory>')
    process.exitCode = 1
    return
  }

  const files = await jsFilesIn(resolve(target))
  let workletized = 0

  for (const file of files) {
    const source = readFileSync(file, 'utf8')
    // Nothing to do for the files that never touch the UI runtime, which is most of them.
    if (!source.includes('react-native-reanimated')) continue

    const result = babel.transformSync(source, {
      filename: file,
      babelrc: false,
      configFile: false,
      sourceType: file.endsWith('.cjs') ? 'script' : 'module',
      plugins: [plugin],
      compact: false,
    })

    if (!result?.code || !result.code.includes('__workletHash')) continue

    writeFileSync(file, result.code)
    workletized += 1
  }

  console.log(`✓ workletized ${workletized} file(s) in ${target}`)
}

async function jsFilesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  const nested = await Promise.all(
    entries.map(entry => {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) return jsFilesIn(path)
      return EXTENSIONS.has(extname(entry.name)) ? [path] : []
    })
  )

  return nested.flat()
}

main()
