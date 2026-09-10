import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const workspace = path.resolve(import.meta.dirname, '../..')
const nativeDirectory = path.join(workspace, 'packages/native')
const componentsDirectory = path.join(nativeDirectory, 'src/components')
const docsDirectory = path.join(workspace, 'apps/docs')
const publicDocsDirectory = path.join(docsDirectory, 'public/docs')
const manifestPath = path.join(
  docsDirectory,
  'lib/data/native-components.generated.json'
)
const apiPath = path.join(docsDirectory, 'lib/data/native-api.generated.json')
const demoRegistryPath = path.join(
  docsDirectory,
  'components/preview/native-demo-registry.generated.tsx'
)
const llmsPath = path.join(docsDirectory, 'public/llms.txt')
const stylePropsPath = path.join(
  docsDirectory,
  'lib/data/native-style-props.generated.json'
)
const skillPath = path.join(docsDirectory, 'public/skills/xaui/SKILL.md')
const packageJson = JSON.parse(
  fs.readFileSync(path.join(nativeDirectory, 'package.json'), 'utf8')
)

const CATEGORY_COMPONENTS = {
  Actions: ['button', 'close-button', 'fab', 'morph-button', 'toggle-button'],
  Charts: [
    'area-chart',
    'bar-chart',
    'chart',
    'line-chart',
    'pie-chart',
    'radar-chart',
    'radial-chart',
  ],
  'Data display': [
    'avatar',
    'badge',
    'carousel',
    'chip',
    'list',
    'list-box',
    'table',
    'tag-group',
    'timeline',
    'typography',
    'widget',
  ],
  Feedback: [
    'alert',
    'empty-state',
    'progress-bar',
    'progress-circle',
    'skeleton',
    'snackbar',
    'spinner',
    'toast',
  ],
  Forms: [
    'autocomplete',
    'checkbox',
    'color-picker',
    'combobox',
    'date-picker',
    'date-range-picker',
    'date-time-picker',
    'dummy-field',
    'field-group',
    'input-otp',
    'mask-field',
    'number-field',
    'number-pad',
    'number-stepper',
    'phone-number-field',
    'radio',
    'range-calendar',
    'rating',
    'search-field',
    'select',
    'slider',
    'switch',
    'text-area',
    'text-field',
    'time-picker',
    'wheel-picker',
  ],
  Layout: ['card', 'divider', 'flip-card', 'scaffold', 'surface', 'view'],
  Navigation: [
    'accordion',
    'agenda-calendar',
    'calendar',
    'pager',
    'segment',
    'stepper',
    'tabs',
  ],
  Overlays: ['bottom-sheet', 'dialog', 'menu', 'popover'],
}

const DEMO_ALIASES = {
  'area-chart': 'charts',
  'bar-chart': 'charts',
  chart: 'charts',
  'line-chart': 'charts',
  'pie-chart': 'charts',
  'radar-chart': 'charts',
  'radial-chart': 'charts',
  'range-calendar': 'date-range-picker',
}

const categoryByComponent = new Map(
  Object.entries(CATEGORY_COMPONENTS).flatMap(([category, componentIds]) =>
    componentIds.map(componentId => [componentId, category])
  )
)

function getComponentIds() {
  return Object.keys(packageJson.exports)
    .filter(exportPath => exportPath.startsWith('./'))
    .map(exportPath => exportPath.slice(2))
    .filter(componentId =>
      fs.existsSync(path.join(componentsDirectory, componentId, `${componentId}.md`))
    )
    .sort()
}

function stripMarkdown(value) {
  return value
    .replace(/<!--.*?-->/gs, '')
    .replace(/```.*?```/gs, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getDescription(markdown) {
  const withoutTitle = markdown.replace(/^# .+\n+/, '')
  const overview = withoutTitle.match(/(?:^|\n)## Overview\n+([\s\S]*?)(?=\n## |$)/)
  const source = overview?.[1] ?? withoutTitle
  const paragraph = source
    .split(/\n\s*\n/)
    .map(stripMarkdown)
    .find(value => value && !value.startsWith('|'))

  return paragraph ?? 'A composable React Native component from XAUI.'
}

function getTitle(markdown, componentId) {
  return markdown.match(/^# (.+)$/m)?.[1]?.trim() ?? componentId
}

function isExported(statement) {
  return statement.modifiers?.some(
    modifier => modifier.kind === ts.SyntaxKind.ExportKeyword
  )
}

function getTitleFromId(componentId) {
  return componentId
    .split('-')
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join('')
}

function getPropTables(componentId) {
  const componentDirectory = path.join(componentsDirectory, componentId)
  const indexSource = fs.readFileSync(
    path.join(componentDirectory, 'index.ts'),
    'utf8'
  )
  const typeFiles = fs
    .readdirSync(componentDirectory)
    .filter(file => file.endsWith('.type.ts'))
    .map(file => path.join(componentDirectory, file))
  const program = ts.createProgram(typeFiles, {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    strict: true,
  })
  const checker = program.getTypeChecker()
  const tables = []

  for (const sourcePath of typeFiles) {
    const source = program.getSourceFile(sourcePath)
    if (!source) continue

    for (const statement of source.statements) {
      const isPropsDeclaration =
        (ts.isTypeAliasDeclaration(statement) ||
          ts.isInterfaceDeclaration(statement)) &&
        statement.name.text.endsWith('Props') &&
        isExported(statement) &&
        new RegExp(`\\b${statement.name.text}\\b`).test(indexSource)

      if (!isPropsDeclaration) continue

      const type = checker.getTypeAtLocation(statement)
      const props = checker
        .getPropertiesOfType(type)
        .filter(property =>
          property.declarations?.some(declaration =>
            declaration.getSourceFile().fileName.startsWith(componentDirectory)
          )
        )
        .map(property => {
          const declaration = property.valueDeclaration ?? property.declarations?.[0]
          if (!declaration) return null

          return {
            name: property.name,
            type: checker.typeToString(
              checker.getTypeOfSymbolAtLocation(property, declaration),
              undefined,
              ts.TypeFormatFlags.NoTruncation
            ),
            required: !(property.flags & ts.SymbolFlags.Optional),
            description: ts
              .displayPartsToString(property.getDocumentationComment(checker))
              .replaceAll('\n', ' '),
          }
        })
        .filter(Boolean)

      tables.push({ name: statement.name.text, props })
    }
  }

  const rootName = `${getTitleFromId(componentId)}Props`
  return tables.sort((left, right) => {
    const leftIsRoot = left.name === rootName
    const rightIsRoot = right.name === rootName
    if (leftIsRoot !== rightIsRoot) return leftIsRoot ? -1 : 1
    return left.name.localeCompare(right.name)
  })
}

function getPublicExports(componentId, title) {
  const indexSource = fs.readFileSync(
    path.join(componentsDirectory, componentId, 'index.ts'),
    'utf8'
  )
  const names = new Set()
  for (const match of indexSource.matchAll(/export const ([A-Z][A-Za-z0-9]*)/g)) {
    names.add(match[1])
  }
  for (const match of indexSource.matchAll(/export \{ ([A-Z][A-Za-z0-9]*) \}/g)) {
    if (!match[1].endsWith('Root')) names.add(match[1])
  }
  if (!names.size) names.add(title.replaceAll(' ', ''))
  return [...names]
}

function getComponent(componentId) {
  const componentDirectory = path.join(componentsDirectory, componentId)
  const markdownPath = path.join(componentDirectory, `${componentId}.md`)
  const markdown = fs.readFileSync(markdownPath, 'utf8')
  const title = getTitle(markdown, componentId)
  const category = categoryByComponent.get(componentId)
  if (!category) throw new Error(`Missing category for ${componentId}.`)

  const demoId = DEMO_ALIASES[componentId] ?? componentId
  const hasDemo = fs.existsSync(
    path.join(workspace, 'apps/demo/app', `${demoId}.tsx`)
  )
  if (!hasDemo) throw new Error(`Missing demo for ${componentId}.`)

  return {
    id: componentId,
    title,
    description: getDescription(markdown),
    category,
    importPath: `@xaui/native/${componentId}`,
    href: `/docs/components/${componentId}`,
    sourceUrl: `https://github.com/rygrams/xaui/tree/main/packages/native/src/components/${componentId}`,
    markdownPath: `packages/native/src/components/${componentId}/${componentId}.md`,
    demoId,
    exports: getPublicExports(componentId, title),
    propTables: getPropTables(componentId),
  }
}

const components = getComponentIds().map(getComponent)
const catalog = components.map(
  ({ propTables: _propTables, ...component }) => component
)
const api = Object.fromEntries(
  components.map(component => [component.id, component.propTables])
)

fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
fs.writeFileSync(manifestPath, `${JSON.stringify(catalog, null, 2)}\n`)
fs.writeFileSync(apiPath, `${JSON.stringify(api, null, 2)}\n`)

const demoIds = [...new Set(components.map(component => component.demoId))]
const demoRegistry = [
  "'use client'",
  '',
  "import dynamic from 'next/dynamic'",
  "import type { ComponentType } from 'react'",
  '',
  'const loading = () => (',
  '  <div className="flex min-h-[560px] items-center justify-center text-sm text-zinc-500">',
  '    Loading the demo…',
  '  </div>',
  ')',
  '',
  'export const nativeDemoRegistry: Record<string, ComponentType> = {',
  ...demoIds.map(
    demoId =>
      `  '${demoId}': dynamic(\n    () => import('../../../demo/app/${demoId}'),\n    { loading, ssr: false }\n  ),`
  ),
  '}',
  '',
].join('\n')
fs.writeFileSync(demoRegistryPath, demoRegistry)

fs.mkdirSync(publicDocsDirectory, { recursive: true })
for (const entry of fs.readdirSync(publicDocsDirectory)) {
  if (entry.endsWith('.md')) fs.rmSync(path.join(publicDocsDirectory, entry))
}
for (const component of components) {
  fs.copyFileSync(
    path.join(workspace, component.markdownPath),
    path.join(publicDocsDirectory, `${component.id}.md`)
  )
}

// The release notes come from the same changelog npm shows, so the site cannot drift from
// what was published — and the copy is what a build outside the workspace reads.
fs.copyFileSync(
  path.join(nativeDirectory, 'CHANGELOG.md'),
  path.join(publicDocsDirectory, 'changelog.md')
)

/**
 * The style prop surface, read out of the two files that define it: the runtime table and
 * the union of keys R13 withholds. A React Native upgrade that adds a key lands on the
 * page with no edit here, which is the only way the list can stay true.
 */
function getStyleProps() {
  const tableSource = fs.readFileSync(
    path.join(nativeDirectory, 'src/utils/style-props.ts'),
    'utf8'
  )
  const table = tableSource.match(
    /const STYLE_PROP_KEYS = \[([\s\S]*?)\] as const/
  )?.[1]
  if (!table) throw new Error('STYLE_PROP_KEYS not found in utils/style-props.ts.')

  const groups = []
  for (const line of table.split('\n')) {
    const heading = line.match(/^\s*\/\/ (.+)$/)
    if (heading) {
      groups.push({ title: heading[1].trim(), keys: [] })
      continue
    }
    const key = line.match(/^\s*'([^']+)',/)
    if (key) groups.at(-1)?.keys.push(key[1])
  }

  const typeSource = fs.readFileSync(
    path.join(nativeDirectory, 'src/system/style-props/style-props.type.ts'),
    'utf8'
  )
  const union = typeSource.match(
    /export type DirectionalStyleKey =([\s\S]*?)\n\n/
  )?.[1]
  if (!union) throw new Error('DirectionalStyleKey not found in style-props.type.ts.')

  return {
    groups: groups.filter(group => group.keys.length),
    withheld: [...union.matchAll(/'([^']+)'/g)].map(match => match[1]),
  }
}

const styleProps = getStyleProps()
fs.writeFileSync(stylePropsPath, `${JSON.stringify(styleProps, null, 2)}\n`)

const llms = [
  '# XAUI Native',
  '',
  '> Composition-first React Native components with Reanimated motion and semantic tokens.',
  '',
  '## Components',
  '',
  ...components.map(
    component =>
      `- [${component.title}](https://ui.xtartapp.com/docs/${component.id}.md): ${component.description}`
  ),
  '',
].join('\n')
fs.writeFileSync(llmsPath, llms)

/**
 * The agent skill, from the same catalogue as `llms.txt`. It carries the rules an agent
 * cannot infer from a single component's markdown — the import shape, the slot notation,
 * what `variant` is against `color` — and then sends it to the per-component file rather
 * than restating any of it. One doc source, a third surface on top of it.
 */
const skill = [
  '---',
  'name: xaui-native',
  `description: Write React Native UI with @xaui/native — composition-first components with dot-notation slots, semantic variants and React Native style props. Use when a file imports from '@xaui/native', or when a task asks for a XAUI component, screen or theme.`,
  '---',
  '',
  '# @xaui/native',
  '',
  `${components.length} React Native components built on composition: a root plus dot-notation slots, Reanimated motion, and a theme that derives its own palettes.`,
  '',
  '## Install',
  '',
  '```bash',
  'pnpm add @xaui/native@beta',
  'pnpm exec expo install react-native-reanimated react-native-worklets \\',
  '  react-native-gesture-handler react-native-svg react-native-safe-area-context',
  '```',
  '',
  '`react-native-worklets/plugin` goes last in the Babel plugin list. One `XAUIProvider`',
  'at the root of the app, inside a `GestureHandlerRootView`.',
  '',
  '## The API',
  '',
  '```tsx',
  "import { Button } from '@xaui/native/button'",
  '',
  '<Button variant="primary" paddingHorizontal={20} onPress={save}>',
  '  <Button.Icon as={SaveIcon} />',
  '  <Button.Label fontSize={15}>Save</Button.Label>',
  '</Button>',
  '```',
  '',
  '## Rules',
  '',
  '- **Import from the subpath**, never the root: `@xaui/native/button`.',
  '- **Slots are dot notation** and render in JSX order. There is no `startContent`,',
  '  `endContent` or `customAppearance` — those are the legacy API.',
  '- **`variant` is a semantic appearance** out of the theme; **`color` is one raw hue**',
  '  the component derives its states from. A component only accepts the variant names in',
  "  its own markdown — do not carry another component's set over.",
  '- **Style props are the React Native style keys**, with React Native values and no',
  '  implicit scale: `padding={16}` is sixteen pixels. They go on the node that draws the',
  '  thing. `style` wins over them.',
  '- **Start and End, never Left and Right** — that is what mirrors under RTL.',
  '- **Do not invent a prop.** Fetch the component file below and read its API first.',
  '',
  '## Components',
  '',
  ...components.map(
    component =>
      `- [${component.title}](https://ui.xtartapp.com/docs/${component.id}.md): ${component.description}`
  ),
  '',
]
fs.mkdirSync(path.dirname(skillPath), { recursive: true })
fs.writeFileSync(skillPath, skill.join('\n'))

console.log(
  `Generated ${components.length} component pages, API tables and llms.txt entries.`
)
