import { copyFile, mkdir, readdir, rm } from 'node:fs/promises'
import { execSync } from 'node:child_process'
import { dirname } from 'node:path'

const entries = {
  index: 'src/index.ts',
  'core/index': 'src/core/index.ts',
  'button/index': 'src/components/button/index.ts',
  'checkbox/index': 'src/components/checkbox/index.ts',
  'expansion-panel/index': 'src/components/expansion-panel/index.ts',
  'progress/index': 'src/components/progress/index.ts',
  'indicator/index': 'src/components/indicator/index.ts',
  'switch/index': 'src/components/switch/index.ts',
  'select/index': 'src/components/select/index.ts',
  'divider/index': 'src/components/divider/index.ts',
  'avatar/index': 'src/components/avatar/index.ts',
  'badge/index': 'src/components/badge/index.ts',
  'alert/index': 'src/components/alert/index.ts',
  'autocomplete/index': 'src/components/autocomplete/index.ts',
  'datepicker/index': 'src/components/datepicker/index.ts',
  'typography/index': 'src/components/typography/index.ts',
  'view/index': 'src/components/view/index.ts',
  'chip/index': 'src/components/chip/index.ts',
  'bottom-sheet/index': 'src/components/bottom-sheet/index.ts',
  'bottom-tab-bar/index': 'src/components/bottom-tab-bar/index.ts',
  'menu/index': 'src/components/menu/index.ts',
  'fab/index': 'src/components/fab/index.ts',
  'fab-menu/index': 'src/components/fab-menu/index.ts',
  'feature-discovery/index': 'src/components/feature-discovery/index.ts',
  'segment-button/index': 'src/components/segment-button/index.ts',
  'carousel/index': 'src/components/carousel/index.ts',
  'card/index': 'src/components/card/index.ts',
  'skeleton/index': 'src/components/skeleton/index.ts',
  'input/index': 'src/components/input/index.ts',
  'list/index': 'src/components/list/index.ts',
  'radio/index': 'src/components/radio/index.ts',
  'toolbar/index': 'src/components/toolbar/index.ts',
  'app-bar/index': 'src/components/app-bar/index.ts',
  'timepicker/index': 'src/components/timepicker/index.ts',
  'stepper/index': 'src/components/stepper/index.ts',
  'menubox/index': 'src/components/menubox/index.ts',
  'slider/index': 'src/components/slider/index.ts',
  'tabs/index': 'src/components/tabs/index.ts',
  'pager/index': 'src/components/pager/index.ts',
  'chart/index': 'src/components/chart/index.ts',
}

const getDeclarationFiles = async dir => {
  const entriesInDir = await readdir(dir, { withFileTypes: true })
  const nestedFiles = await Promise.all(
    entriesInDir.map(async entry => {
      const path = `${dir}/${entry.name}`
      if (entry.isDirectory()) return getDeclarationFiles(path)
      return path.endsWith('.d.ts') ? [path] : []
    })
  )
  return nestedFiles.flat()
}

execSync('tsc -p tsconfig.json --emitDeclarationOnly --declaration', {
  stdio: 'inherit',
})

await Promise.all(
  Object.entries(entries).map(async ([entryKey, sourcePath]) => {
    const sourceDtsPath = `dist/${sourcePath
      .replace(/^src\//, '')
      .replace(/\.tsx?$/, '.d.ts')}`
    const targetDtsPath = `dist/${entryKey}.d.ts`
    await mkdir(dirname(targetDtsPath), { recursive: true })
    await copyFile(sourceDtsPath, targetDtsPath)
  })
)

const declarationFiles = await getDeclarationFiles('dist')
await Promise.all(
  declarationFiles.map(file => copyFile(file, file.replace('.d.ts', '.d.mts')))
)

await rm('dist/__tests__', { recursive: true, force: true })
