import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { registerComponentTools } from './tools/components.js'
import { registerInstallationTools } from './tools/installation.js'

const server = new McpServer({
  name: 'xaui',
  version: '0.0.1',
})

registerComponentTools(server)
registerInstallationTools(server)

const transport = new StdioServerTransport()
await server.connect(transport)
