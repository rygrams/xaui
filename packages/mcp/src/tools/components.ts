import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { containerDocs } from '../data/container.js'

const COMPONENTS: Record<string, typeof containerDocs> = {
  container: containerDocs,
}

export function registerComponentTools(server: McpServer) {
  server.registerTool(
    'list_components',
    { description: 'List all available XAUI components' },
    () => ({
      content: [
        {
          type: 'text',
          text: Object.entries(COMPONENTS)
            .map(([id, c]) => `- **${c.name}** (\`${id}\`): ${c.description}`)
            .join('\n'),
        },
      ],
    }),
  )

  server.registerTool(
    'get_component_docs',
    {
      description:
        'Get full documentation for a XAUI component including props, examples, and package info',
      inputSchema: { component: z.string().describe('Component id, e.g. "container"') },
    },
    ({ component }) => {
      const doc = COMPONENTS[component.toLowerCase()]
      if (!doc) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${component}" not found. Available: ${Object.keys(COMPONENTS).join(', ')}`,
            },
          ],
        }
      }

      const propsTable = doc.props
        .map((p) => `| \`${p.name}\` | \`${p.type}\` | ${p.default} | ${p.description} |`)
        .join('\n')

      const examples = doc.examples
        .map((e) => `### ${e.title}\n\`\`\`tsx\n${e.code}\n\`\`\``)
        .join('\n\n')

      const text = `
# ${doc.name}

${doc.description}

## Packages

**Native (React Native)**
\`\`\`ts
${doc.packages.native.import}
\`\`\`
Platform: ${doc.packages.native.platform}

**Hybrid (Web / WebView)**
\`\`\`ts
${doc.packages.hybrid.import}
\`\`\`
Platform: ${doc.packages.hybrid.platform}

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
${propsTable}

## Examples

${examples}
`.trim()

      return { content: [{ type: 'text', text }] }
    },
  )

  server.registerTool(
    'get_component_examples',
    {
      description: 'Get usage examples for a XAUI component',
      inputSchema: { component: z.string().describe('Component id, e.g. "container"') },
    },
    ({ component }) => {
      const doc = COMPONENTS[component.toLowerCase()]
      if (!doc) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${component}" not found. Available: ${Object.keys(COMPONENTS).join(', ')}`,
            },
          ],
        }
      }

      const text = doc.examples
        .map((e) => `### ${e.title}\n\`\`\`tsx\n${e.code}\n\`\`\``)
        .join('\n\n')

      return { content: [{ type: 'text', text }] }
    },
  )
}
