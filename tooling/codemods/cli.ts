const CODEMODS: Record<string, () => Promise<{ run: (targetDir: string) => { changed: string[] } }>> = {
  'legacy-imports': () => import('./legacy-imports'),
}

async function main() {
  const [name, targetDir = '.'] = process.argv.slice(2)

  const load = name ? CODEMODS[name] : undefined
  if (!load) {
    console.error(`Unknown codemod "${name ?? ''}". Available: ${Object.keys(CODEMODS).join(', ')}`)
    process.exitCode = 1
    return
  }

  const { run } = await load()
  const { changed } = run(targetDir)

  if (changed.length === 0) {
    console.log(`xaui-codemod ${name}: no matching imports found in ${targetDir}`)
    return
  }
  console.log(`xaui-codemod ${name}: updated ${changed.length} file(s):`)
  for (const file of changed) console.log(`  ${file}`)
}

main()
