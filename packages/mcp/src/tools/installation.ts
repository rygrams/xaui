import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { installationDocs } from '../data/installation.js'

export function registerInstallationTools(server: McpServer) {
  server.registerTool(
    'get_installation',
    {
      description: 'Get XAUI installation instructions for a specific package',
      inputSchema: {
        package: z
          .enum(['native', 'hybrid', 'both'])
          .describe('Which package to get installation instructions for'),
      },
    },
    ({ package: pkg }) => {
      if (pkg === 'both') {
        const native = installationDocs.packages.native
        const hybrid = installationDocs.packages.hybrid

        const text = `
# XAUI Installation

${installationDocs.nativeVsHybrid}

---

## @xaui/native

${native.description}

\`\`\`bash
${native.install}
\`\`\`

**Peer dependencies:** ${native.peerDependencies.join(', ')}

\`\`\`js
${native.setup}
\`\`\`

---

## @xaui/hybrid

${hybrid.description}

\`\`\`bash
${hybrid.install}
\`\`\`

**Peer dependencies:** ${hybrid.peerDependencies.join(', ')}

\`\`\`
${hybrid.setup}
\`\`\`
`.trim()

        return { content: [{ type: 'text', text }] }
      }

      const doc = installationDocs.packages[pkg]
      const text = `
# ${doc.name} Installation

${doc.description}

\`\`\`bash
${doc.install}
\`\`\`

**Peer dependencies:** ${doc.peerDependencies.join(', ')}

\`\`\`
${doc.setup}
\`\`\`
`.trim()

      return { content: [{ type: 'text', text }] }
    },
  )

  server.registerTool(
    'get_native_vs_hybrid',
    { description: 'Explain the difference between @xaui/native and @xaui/hybrid packages' },
    () => ({
      content: [{ type: 'text', text: installationDocs.nativeVsHybrid }],
    }),
  )

  server.registerTool(
    'get_mcp_setup',
    { description: 'Get instructions to add XAUI MCP to an AI assistant' },
    () => ({
      content: [{ type: 'text', text: installationDocs.mcpSetup }],
    }),
  )
}
