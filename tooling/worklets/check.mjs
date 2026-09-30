import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { createRequire } from 'node:module'
import babel from '@babel/core'

/**
 * Holds `@xaui/native` to shipping worklets the **consumer's** Babel plugin compiles.
 *
 * **Why the package ships raw directives.** The worklets plugin stamps every function it
 * compiles with its own version, and the runtime refuses a worklet whose stamp differs from
 * its own (`Mismatch between JavaScript code version and Worklets Babel plugin version`).
 * Compiled at our build, the whole package only ran on the one `react-native-worklets` our
 * lockfile held — issue #434, every animation dead on Expo SDK 57. Reanimated and Gesture
 * Handler publish compiled JS with the `'worklet'` directives left in, and the app's own
 * Metro build compiles them in `node_modules` with the plugin that matches its runtime. We
 * do the same.
 *
 * That only works if every worklet says so. The plugin also compiles some callbacks
 * **without** a directive, by recognising the callee — `useAnimatedStyle`, a
 * `Gesture.Pan().onUpdate` chain — and that recognition does not survive bundling: esbuild
 * renames the import to `useAnimatedStyle2`, or calls it as
 * `(0, import_reanimated.useAnimatedStyle)`, and the callback silently ships as a plain
 * function the UI thread cannot run.
 *
 * Two checks:
 *
 * - **source** — every function the plugin compiles in `src` carries its own `'worklet'`.
 * - **dist** — nothing in `dist` is already compiled, and every directive survived the
 *   bundler, so the consumer's plugin finds exactly the worklets the source declared.
 *
 *     node tooling/worklets/check.mjs
 */

const PACKAGE = join(import.meta.dirname, '../../packages/native')

const require = createRequire(import.meta.url)
const plugin = require.resolve('react-native-worklets/plugin')
const typescript = [
  require.resolve('@babel/preset-typescript'),
  { isTSX: true, allExtensions: true },
]

/** What the plugin leaves on every function it compiles, and only there. */
const COMPILED = /__workletHash\s*=/g
const STAMP = '__pluginVersion'

function main() {
  const dist = join(PACKAGE, 'dist')

  if (!existsSync(dist)) {
    console.error('✗ packages/native/dist is missing. Build @xaui/native first.')
    process.exitCode = 1
    return
  }

  const failures = [
    ...filesIn(join(PACKAGE, 'src'), ['.ts', '.tsx'])
      .filter(file => !file.includes('__tests__') && !/\.test\.tsx?$/.test(file))
      .flatMap(file => checkSource(file)),
    ...filesIn(dist, ['.js', '.cjs']).flatMap(file => checkDist(file)),
  ]

  for (const failure of failures) console.error(`  ✗ ${failure}`)

  if (failures.length > 0) {
    console.error(`\n${failures.length} problem(s). See tooling/worklets/check.mjs.`)
    process.exitCode = 1
    return
  }

  console.log(
    "✓ every worklet in @xaui/native carries its own 'worklet' directive, and dist ships them uncompiled."
  )
}

function checkSource(file) {
  const source = readFileSync(file, 'utf8')
  const { declared, compiled } = worklets(file, source, [typescript])
  if (compiled === declared) return []

  return [
    `${relative(PACKAGE, file)}: the plugin compiles ${compiled} worklet(s), ${declared} carry 'worklet'. ` +
      "Give every gesture callback and animated-hook callback its own 'worklet' directive.",
  ]
}

function checkDist(file) {
  const source = readFileSync(file, 'utf8')
  const where = relative(PACKAGE, file)

  if (source.includes(STAMP)) {
    return [
      `${where} ships precompiled worklets, pinned to one react-native-worklets version. Do not run the worklets plugin in the build.`,
    ]
  }

  const { declared, compiled } = worklets(file, source, [])
  if (compiled === declared) return []

  return [
    `${where}: ${declared} 'worklet' directive(s) survived the bundler, the plugin compiles ${compiled}.`,
  ]
}

/** How many functions say `'worklet'`, and how many the plugin actually compiles. */
function worklets(file, source, presets) {
  const options = {
    filename: file,
    babelrc: false,
    configFile: false,
    sourceType: file.endsWith('.cjs') ? 'script' : 'module',
    presets,
  }

  let declared = 0
  babel.traverse(babel.parseSync(source, options), {
    Directive(path) {
      if (path.node.value.value === 'worklet') declared += 1
    },
  })

  const { code } = babel.transformSync(source, { ...options, plugins: [plugin] })
  const compiled = code.match(COMPILED)?.length ?? 0

  return { declared, compiled }
}

function filesIn(directory, extensions) {
  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && extensions.includes(extname(entry.name)))
    .map(entry => join(entry.parentPath, entry.name))
}

main()
