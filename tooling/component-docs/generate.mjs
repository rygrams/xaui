import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const component = process.argv[2]
if (!component || !/^[a-z-]+$/.test(component)) {
  throw new Error('Pass a component folder name, for example phone-number-field.')
}
const directory = path.resolve('packages/native/src/components', component)
const sourcePath = path.join(directory, `${component}.type.ts`)
const program = ts.createProgram([sourcePath], { skipLibCheck: true, strict: true })
const checker = program.getTypeChecker()
const source = program.getSourceFile(sourcePath)
const lines = []
for (const statement of source.statements) {
  // Exported aliases only: a component's own `*OwnProps` is the half of its public type
  // that is not public, and a table for it would document the same props twice.
  if (
    !ts.isTypeAliasDeclaration(statement) ||
    !statement.name.text.endsWith('Props') ||
    !statement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
  )
    continue
  const type = checker.getTypeAtLocation(statement)
  const properties = checker
    .getPropertiesOfType(type)
    .filter(property =>
      property.declarations?.some(
        declaration => declaration.getSourceFile() === source
      )
    )
  lines.push(
    `### ${statement.name.text}`,
    '',
    'Inherited React Native and composed component props remain available.',
    ''
  )
  if (!properties.length) continue
  lines.push('| Prop | Type | Description |', '| --- | --- | --- |')
  for (const property of properties) {
    const declaration = property.valueDeclaration ?? property.declarations[0]
    const value = checker
      .typeToString(
        checker.getTypeOfSymbolAtLocation(property, declaration),
        undefined,
        ts.TypeFormatFlags.NoTruncation
      )
      .replaceAll('|', '\\|')
    const description = ts
      .displayPartsToString(property.getDocumentationComment(checker))
      .replaceAll('\n', ' ')
      .replaceAll('|', '\\|')
    lines.push(`| ${property.name} | \`${value}\` | ${description} |`)
  }
  lines.push('')
}
const documentPath = path.join(directory, `${component}.md`)
const document = fs.readFileSync(documentPath, 'utf8')
const start = '<!-- props:start -->'
const end = '<!-- props:end -->'
if (!document.includes(start) || !document.includes(end))
  throw new Error('Missing generated props markers.')
fs.writeFileSync(
  documentPath,
  document.slice(0, document.indexOf(start) + start.length) +
    '\n\n' +
    lines.join('\n') +
    '\n' +
    document.slice(document.indexOf(end))
)

// Publish the same source for documentation clients; the package file owns the prose.
const publicPath = path.resolve('apps/docs/public/docs', `${component}.md`)
fs.copyFileSync(documentPath, publicPath)
const llmsPath = path.resolve('apps/docs/public/llms.txt')
const llms = fs.readFileSync(llmsPath, 'utf8')
const title = fs.readFileSync(documentPath, 'utf8').split('\n')[0].replace(/^# /, '')
const url = `https://ui.xtartapp.com/docs/${component}.md`
if (!llms.includes(url))
  fs.appendFileSync(
    llmsPath,
    `\n- [${title}](${url}): Native v1 component, composition, API and accessibility.\n`
  )
