import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const workspace = path.resolve(import.meta.dirname, '../..')
const nativeDirectory = path.join(workspace, 'packages/native')
const docsDirectory = path.join(workspace, 'apps/docs')
const publicDocsDirectory = path.join(docsDirectory, 'public/docs')
const siteUrl = 'https://ui.xtartapp.com'
const llmsPath = path.join(docsDirectory, 'public/llms.txt')
const llmsFullPath = path.join(docsDirectory, 'public/llms-full.txt')
const stylePropsPath = path.join(
  docsDirectory,
  'lib/data/native-style-props.generated.json'
)
const skillPath = path.join(docsDirectory, 'public/skills/xaui/SKILL.md')

const CATEGORY_COMPONENTS = {
  Actions: [
    'button',
    'close-button',
    'fab',
    'morph-button',
    'slide-button',
    'toggle-button',
  ],
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
    'tile',
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
    'app-bar',
    'calendar',
    'jump-list',
    'page',
    'pager',
    'panorama',
    'pivot',
    'segment',
    'stepper',
    'tabs',
  ],
  Overlays: ['bottom-sheet', 'dialog', 'menu', 'popover'],
}

const CHART_DEMOS = {
  'area-chart': 'charts',
  'bar-chart': 'charts',
  chart: 'charts',
  'line-chart': 'charts',
  'pie-chart': 'charts',
  'radar-chart': 'charts',
  'radial-chart': 'charts',
}

/**
 * The two packages the docs describe, each read the same way: its `package.json` exports,
 * the `<id>.md` beside each component, the props out of its `.type.ts`, and its demo
 * screen in `apps/demo`. A component documented by both gets one page with a tab each.
 */
const EDITIONS = {
  native: {
    name: '@xaui/native',
    directory: nativeDirectory,
    demoDirectory: 'apps/demo/app',
    demoAliases: { ...CHART_DEMOS, 'range-calendar': 'date-range-picker' },
    // Every Native demo runs on the docs' React Native Web.
    withoutPreview: [],
    manifest: 'lib/data/native-components.generated.json',
    api: 'lib/data/native-api.generated.json',
    registry: 'components/preview/native-demo-registry.generated.tsx',
    registryName: 'nativeDemoRegistry',
    publicDirectory: publicDocsDirectory,
    markdownHref: id => `/docs/${id}.md`,
  },
  tram: {
    name: '@xaui/tram',
    directory: path.join(workspace, 'packages/tram'),
    demoDirectory: 'apps/demo/app/tram',
    demoAliases: CHART_DEMOS,
    // These two screens drive Expo Router — the router's own stack is what they show —
    // and the docs have no router to hand them.
    withoutPreview: ['page', 'scaffold'],
    manifest: 'lib/data/tram-components.generated.json',
    api: 'lib/data/tram-api.generated.json',
    registry: 'components/preview/tram-demo-registry.generated.tsx',
    registryName: 'tramDemoRegistry',
    publicDirectory: path.join(publicDocsDirectory, 'tram'),
    markdownHref: id => `/docs/tram/${id}.md`,
  },
}

const categoryByComponent = new Map(
  Object.entries(CATEGORY_COMPONENTS).flatMap(([category, componentIds]) =>
    componentIds.map(componentId => [componentId, category])
  )
)

function componentsDirectoryOf(edition) {
  return path.join(edition.directory, 'src/components')
}

function getComponentIds(edition) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(edition.directory, 'package.json'), 'utf8')
  )

  return Object.keys(packageJson.exports)
    .filter(exportPath => exportPath.startsWith('./'))
    .map(exportPath => exportPath.slice(2))
    .filter(componentId =>
      fs.existsSync(
        path.join(componentsDirectoryOf(edition), componentId, `${componentId}.md`)
      )
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

function getPropTables(edition, componentId) {
  const componentDirectory = path.join(componentsDirectoryOf(edition), componentId)
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

function getPublicExports(edition, componentId, title) {
  const indexSource = fs.readFileSync(
    path.join(componentsDirectoryOf(edition), componentId, 'index.ts'),
    'utf8'
  )
  const names = new Set()
  for (const match of indexSource.matchAll(/export const ([A-Z][A-Za-z0-9]*)/g)) {
    names.add(match[1])
  }
  for (const match of indexSource.matchAll(/export \{ ([A-Z][A-Za-z0-9]*) \}/g)) {
    if (!match[1].endsWith('Root')) names.add(match[1])
  }
  // A module that only re-exports another package's (Tram's `view`) names its components
  // in an `export { A, B } from` list.
  if (!names.size) {
    for (const match of indexSource.matchAll(/export \{([^}]+)\} from/g)) {
      for (const name of match[1].split(',').map(part => part.trim())) {
        if (/^[A-Z][A-Za-z0-9]*$/.test(name)) names.add(name)
      }
    }
  }
  if (!names.size) names.add(title.replaceAll(' ', ''))
  return [...names]
}

function getComponent(editionKey, componentId) {
  const edition = EDITIONS[editionKey]
  const relativeDirectory = path.relative(
    workspace,
    path.join(componentsDirectoryOf(edition), componentId)
  )
  const markdownPath = path.join(relativeDirectory, `${componentId}.md`)
  const markdown = fs.readFileSync(path.join(workspace, markdownPath), 'utf8')
  const title = getTitle(markdown, componentId)
  const category = categoryByComponent.get(componentId)
  if (!category) throw new Error(`Missing category for ${componentId}.`)

  const demoId = edition.demoAliases[componentId] ?? componentId
  const hasDemo = fs.existsSync(
    path.join(workspace, edition.demoDirectory, `${demoId}.tsx`)
  )
  if (!hasDemo) throw new Error(`Missing ${edition.name} demo for ${componentId}.`)

  return {
    id: componentId,
    title,
    description: getDescription(markdown),
    category,
    importPath: `${edition.name}/${componentId}`,
    href: `/docs/components/${componentId}`,
    sourceUrl: `https://github.com/rygrams/xaui/tree/main/${relativeDirectory}`,
    markdownPath,
    markdownHref: edition.markdownHref(componentId),
    demoId: edition.withoutPreview.includes(componentId) ? null : demoId,
    exports: getPublicExports(edition, componentId, title),
    propTables: getPropTables(edition, componentId),
  }
}

/**
 * One edition's generated files: the catalogue, the API tables, the demo registry the
 * preview loads screens from, and a copy of every page's markdown under `public/`.
 */
function writeEdition(editionKey) {
  const edition = EDITIONS[editionKey]
  const components = getComponentIds(edition).map(componentId =>
    getComponent(editionKey, componentId)
  )
  const catalog = components.map(
    ({ propTables: _propTables, ...component }) => component
  )
  const api = Object.fromEntries(
    components.map(component => [component.id, component.propTables])
  )
  const manifestPath = path.join(docsDirectory, edition.manifest)

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
  fs.writeFileSync(manifestPath, `${JSON.stringify(catalog, null, 2)}\n`)
  fs.writeFileSync(
    path.join(docsDirectory, edition.api),
    `${JSON.stringify(api, null, 2)}\n`
  )

  const registryPath = path.join(docsDirectory, edition.registry)
  const demoImport = path.relative(
    path.dirname(registryPath),
    path.join(workspace, edition.demoDirectory)
  )
  const demoIds = [
    ...new Set(components.map(component => component.demoId).filter(Boolean)),
  ]
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
    `export const ${edition.registryName}: Record<string, ComponentType> = {`,
    ...demoIds.map(
      demoId =>
        `  '${demoId}': dynamic(\n    () => import('${demoImport}/${demoId}'),\n    { loading, ssr: false }\n  ),`
    ),
    '}',
    '',
  ].join('\n')
  fs.writeFileSync(registryPath, demoRegistry)

  fs.mkdirSync(edition.publicDirectory, { recursive: true })
  for (const entry of fs.readdirSync(edition.publicDirectory)) {
    if (entry.endsWith('.md')) fs.rmSync(path.join(edition.publicDirectory, entry))
  }
  for (const component of components) {
    fs.copyFileSync(
      path.join(workspace, component.markdownPath),
      path.join(edition.publicDirectory, `${component.id}.md`)
    )
  }

  return components
}

const components = writeEdition('native')
const tramComponents = writeEdition('tram')

// Tram's version for the header badge; Native's comes from its changelog.
const tramPackageJson = JSON.parse(
  fs.readFileSync(path.join(EDITIONS.tram.directory, 'package.json'), 'utf8')
)
fs.writeFileSync(
  path.join(docsDirectory, 'lib/data/tram-package.generated.json'),
  `${JSON.stringify({ version: tramPackageJson.version }, null, 2)}\n`
)

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
  if (!union)
    throw new Error('DirectionalStyleKey not found in style-props.type.ts.')

  return {
    groups: groups.filter(group => group.keys.length),
    withheld: [...union.matchAll(/'([^']+)'/g)].map(match => match[1]),
  }
}

const styleProps = getStyleProps()
fs.writeFileSync(stylePropsPath, `${JSON.stringify(styleProps, null, 2)}\n`)

/**
 * The guide pages, for `llms.txt`. They are TSX rather than markdown, so the index links
 * the HTML page — an agent still gets the one page it needs instead of the whole site.
 */
const GUIDES = [
  [
    'Introduction',
    'introduction',
    'What XAUI is and the principles it is built on.',
  ],
  [
    'Installation',
    'installation',
    'The package and its peer dependencies in an Expo or React Native app.',
  ],
  [
    'Get started',
    'getting-started',
    'The provider, subpath imports and a first screen.',
  ],
  ['Theme', 'theme', 'createTheme, colour modes and the XAUIProvider.'],
  [
    'Style props',
    'style-props',
    'Every React Native style key of a node, as a prop.',
  ],
  ['Fonts', 'fonts', 'Load a font with Expo and point the theme at it.'],
  [
    'Migration',
    'migration',
    'From @xaui/native-legacy to @xaui/native, with the prop mapping.',
  ],
  [
    'FAQ',
    'faq',
    'Peer dependencies, the Worklets plugin, variant against color, web support.',
  ],
]

const componentLinks = components.map(
  component =>
    `- [${component.title}](${siteUrl}${component.markdownHref}): ${component.description}`
)
const tramComponentLinks = tramComponents.map(
  component =>
    `- [${component.title}](${siteUrl}${component.markdownHref}): ${component.description}`
)

const llms = [
  '# XAUI Native',
  '',
  '> XAUI (`@xaui/native`) is a React Native UI component library for Expo and React Native: composition-first components with dot-notation slots, Reanimated motion, semantic theming and a TypeScript API.',
  '',
  `${components.length} components, each imported from its own subpath (\`@xaui/native/button\`). Every component link below is its full markdown documentation — anatomy, props, slots, variants and accessibility. The same content, concatenated, is at ${siteUrl}/llms-full.txt.`,
  '',
  '```bash',
  'pnpm add @xaui/native',
  '```',
  '',
  '## Docs',
  '',
  ...GUIDES.map(
    ([title, slug, description]) =>
      `- [${title}](${siteUrl}/docs/${slug}): ${description}`
  ),
  `- [Agent skill](${siteUrl}/skills/xaui/SKILL.md): The rules an agent needs to write XAUI code, as a SKILL.md.`,
  '',
  '## Components',
  '',
  ...componentLinks,
  '',
  '## Tram components — Metro UI',
  '',
  `\`@xaui/tram\` is Metro UI for React Native: the same components drawn in the Metro design language of Windows Phone, modernised, on the @xaui/native engine, with the same names, slots and props apart from the Tram \`variant\`, \`accent\` and \`size\` vocabulary. ${tramComponents.length} components, each from its own subpath (\`@xaui/tram/button\`), under one \`TramProvider\` (\`@xaui/tram/theme\`). Each page below ends with its differences from Native.`,
  '',
  '```bash',
  'pnpm add @xaui/tram',
  '```',
  '',
  `- [Get started with Tram](${siteUrl}/docs/tram/getting-started): The package, TramProvider, the scaffold and a first screen.`,
  '',
  ...tramComponentLinks,
  '',
].join('\n')
fs.writeFileSync(llmsPath, llms)

// Every component's markdown in one file, for the agents that load a whole library into
// context at once instead of following links.
const llmsFull = [
  '# XAUI Native — full documentation',
  '',
  `> Every @xaui/native component page, in one file. The index is ${siteUrl}/llms.txt.`,
  '',
  ...components.map(component =>
    fs.readFileSync(path.join(workspace, component.markdownPath), 'utf8').trim()
  ),
  '# XAUI Tram — full documentation',
  '> Every @xaui/tram component page. Each one is a Native component redrawn in the Tram language; its last section lists what differs from Native.',
  // The titles are Native's, so each Tram page names its package where it starts.
  ...tramComponents.map(component =>
    fs
      .readFileSync(path.join(workspace, component.markdownPath), 'utf8')
      .trim()
      .replace(/^# (.+)$/m, '# $1 — @xaui/tram')
  ),
  '',
].join('\n\n')
fs.writeFileSync(llmsFullPath, llmsFull)

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
  'pnpm add @xaui/native',
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
  ...componentLinks,
  '',
]
fs.mkdirSync(path.dirname(skillPath), { recursive: true })
fs.writeFileSync(skillPath, skill.join('\n'))

console.log(
  `Generated ${components.length} Native and ${tramComponents.length} Tram component pages, API tables and llms.txt entries.`
)
