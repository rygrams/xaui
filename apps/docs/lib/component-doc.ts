import fs from 'node:fs'
import path from 'node:path'
import api from './data/native-api.generated.json'
import type { Component } from './data/components'

export type PropDefinition = {
  name: string
  type: string
  required: boolean
  description: string
}

export type PropTable = {
  name: string
  props: PropDefinition[]
}

export type ComponentDocument = {
  overview: string
  anatomy: string
  usage: string
  variants: string
  accessibility: string
  migration: string
  notes: { title: string; markdown: string }[]
  example: string
  propTables: PropTable[]
}

type MarkdownSection = {
  title: string
  markdown: string
}

const STANDARD_SECTIONS = [
  /^import$/i,
  /^overview$/i,
  /^anatomy$/i,
  /^usage$/i,
  /^props$/i,
  /^slots$/i,
  /variant/i,
  /sizes?/i,
  /colou?r/i,
  /appearance/i,
  /accessibility/i,
  /migration/i,
]

function parseSections(markdown: string) {
  const content = markdown.replace(/^# .+\n+/, '')
  const headings = [...content.matchAll(/^## (.+)$/gm)]
  const intro = content.slice(0, headings[0]?.index ?? content.length).trim()
  const sections = headings.map((heading, index) => ({
    title: heading[1].trim(),
    markdown: content
      .slice(
        (heading.index ?? 0) + heading[0].length,
        headings[index + 1]?.index ?? content.length
      )
      .replace(/<!-- props:start -->[\s\S]*?<!-- props:end -->/g, '')
      .trim(),
  }))

  return { intro, sections }
}

function findSection(sections: MarkdownSection[], pattern: RegExp) {
  return sections.find(section => pattern.test(section.title))?.markdown ?? ''
}

function joinSections(sections: MarkdownSection[], patterns: RegExp[]) {
  return sections
    .filter(section => patterns.some(pattern => pattern.test(section.title)))
    .map(section => `### ${section.title}\n\n${section.markdown}`)
    .join('\n\n')
}

function getFirstExample(markdown: string, component: Component) {
  const code = markdown.match(/```(?:tsx|jsx)\n([\s\S]*?)```/)?.[1]?.trim()
  if (code) return code

  const primaryExport = component.exports[0] ?? component.title.replaceAll(' ', '')
  return `import { ${primaryExport} } from '${component.importPath}'\n\nexport function Example() {\n  return <${primaryExport} />\n}`
}

function getFallbackAnatomy(component: Component, propTables: PropTable[]) {
  const root = component.exports[0] ?? component.title.replaceAll(' ', '')
  const slots = propTables
    .map(table => table.name.replace(/Props$/, ''))
    .filter(name => name !== root && name.startsWith(root))
    .map(name => name.slice(root.length))
    .filter(Boolean)

  if (!slots.length)
    return `\`${root}\` is a standalone component with no public slots.`
  return [
    '```tsx',
    `<${root}>`,
    ...slots.map(slot => `  <${root}.${slot} />`),
    `</${root}>`,
    '```',
  ].join('\n')
}

function readMarkdown(component: Component) {
  const publicPath = path.resolve(process.cwd(), 'public/docs', `${component.id}.md`)
  if (fs.existsSync(publicPath)) return fs.readFileSync(publicPath, 'utf8')

  const workspacePath = path.resolve(process.cwd(), '../..', component.markdownPath)
  return fs.readFileSync(workspacePath, 'utf8')
}

export function getComponentDocument(component: Component): ComponentDocument {
  const markdown = readMarkdown(component)
  const { intro, sections } = parseSections(markdown)
  const propTables = (api as Record<string, PropTable[]>)[component.id] ?? []
  const overview = findSection(sections, /^overview$/i) || intro
  const anatomy =
    findSection(sections, /^anatomy$/i) || getFallbackAnatomy(component, propTables)
  const usage =
    findSection(sections, /^usage$/i) || getFirstExample(markdown, component)
  const variants = joinSections(sections, [
    /variant/i,
    /sizes?/i,
    /colou?r/i,
    /appearance/i,
    /four levels/i,
  ])
  const accessibility = findSection(sections, /accessibility/i)
  const migration = findSection(sections, /migration/i)
  const notes = sections.filter(
    section =>
      section.markdown &&
      !STANDARD_SECTIONS.some(pattern => pattern.test(section.title)) &&
      !/four levels/i.test(section.title)
  )

  return {
    overview,
    anatomy,
    usage,
    variants,
    accessibility,
    migration,
    notes,
    example: getFirstExample(usage || markdown, component),
    propTables,
  }
}
