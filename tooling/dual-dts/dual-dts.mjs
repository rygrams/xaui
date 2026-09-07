import { readdir, copyFile } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'

/**
 * Mirrors every `*.d.ts` under a built `dist` to a sibling `*.d.cts`.
 *
 * **Why this exists.** `@xaui/native` is `"type": "module"`, and its `exports` map gives
 * `require` its own `types` condition pointing at `.d.cts` — so the CJS half of the dual
 * package needs a declaration file with that extension next to every `.d.ts`. `tsup`'s
 * `dts` used to write both halves; it did it by rolling all thirty-five entry points up in
 * one `rollup-plugin-dts` worker, which holds the package's whole type graph at once and
 * ran the process out of heap (`ERR_WORKER_OUT_OF_MEMORY`) once the component count crossed
 * Node's default. Declarations now come from `tsc --emitDeclarationOnly` — a plain
 * file-by-file emit with no rollup pass — which only writes `.d.ts`, so this step supplies
 * the `.d.cts` half.
 *
 * The two files are byte-identical: nothing in `src` branches its types on the module
 * system, and the relative specifiers `tsc` leaves in are extensionless, so they resolve
 * the same whichever sibling a consumer's resolver lands on.
 *
 *     node tooling/dual-dts/dual-dts.mjs packages/native/dist
 */

async function main() {
  const target = process.argv[2]

  if (!target) {
    console.error('usage: dual-dts.mjs <dist directory>')
    process.exitCode = 1
    return
  }

  const declarations = await declarationsIn(resolve(target))

  await Promise.all(declarations.map(file => copyFile(file, cjsSibling(file))))

  console.log(
    `✓ mirrored ${declarations.length} .d.ts file(s) to .d.cts in ${target}`
  )
}

/** `.../index.d.ts` -> `.../index.d.cts`. `extname` of a `.d.ts` path is `.ts`. */
function cjsSibling(file) {
  return `${file.slice(0, -extname(file).length)}.cts`
}

async function declarationsIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  const nested = await Promise.all(
    entries.map(entry => {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) return declarationsIn(path)
      return path.endsWith('.d.ts') ? [path] : []
    })
  )

  return nested.flat()
}

main()
