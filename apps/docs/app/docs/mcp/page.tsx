import { Metadata } from 'next'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'MCP Server - Xaui',
  description:
    'Add XAUI knowledge to your AI assistant with the official MCP server',
}

export default function McpPage() {
  const claudeCodeCmd = 'claude mcp add xaui -- npx -y @xaui/ui-mcp@latest'

  const cursorConfig = `{
  "mcpServers": {
    "xaui": {
      "command": "npx",
      "args": ["-y", "@xaui/ui-mcp@latest"]
    }
  }
}`

  const claudeDesktopConfig = `{
  "mcpServers": {
    "xaui": {
      "command": "npx",
      "args": ["-y", "@xaui/ui-mcp@latest"]
    }
  }
}`

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">MCP Server</h1>
        <p className="text-base text-muted-foreground md:text-xl">
          The official XAUI MCP (Model Context Protocol) server gives your AI
          assistant full knowledge of XAUI components, props, and usage patterns — no
          copy-pasting docs required.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">What is MCP?</h2>
          <p className="text-muted-foreground">
            MCP (Model Context Protocol) is an open standard that lets AI assistants
            connect to external tools and data sources. Adding the XAUI MCP server
            means your AI can look up component props, get usage examples, and
            understand the difference between{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
              @xaui/native-legacy
            </code>{' '}
            and{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
              @xaui/hybrid-legacy
            </code>{' '}
            without you explaining it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Claude Code</h2>
          <p className="text-muted-foreground">Run this once in your terminal:</p>
          <CodeBlock code={claudeCodeCmd} language="bash" />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Cursor</h2>
          <p className="text-muted-foreground">
            Add to{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
              .cursor/mcp.json
            </code>{' '}
            in your project root:
          </p>
          <CodeBlock code={cursorConfig} language="json" />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Claude Desktop</h2>
          <p className="text-muted-foreground">
            Add to{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono">
              claude_desktop_config.json
            </code>
            :
          </p>
          <CodeBlock code={claudeDesktopConfig} language="json" />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Available tools</h2>
          <p className="text-muted-foreground">
            Once connected, your AI assistant can call these tools:
          </p>
          <div className="rounded-lg border divide-y">
            {[
              {
                name: 'list_components',
                description: 'List all available XAUI components with descriptions',
              },
              {
                name: 'get_component_docs',
                description:
                  'Get full documentation for a component — props table, package info, platform notes',
              },
              {
                name: 'get_component_examples',
                description: 'Get usage code examples for a component',
              },
              {
                name: 'get_installation',
                description:
                  'Get installation instructions for @xaui/native-legacy, @xaui/hybrid-legacy, or both',
              },
              {
                name: 'get_native_vs_hybrid',
                description: 'Explain the difference between the two packages',
              },
              {
                name: 'get_mcp_setup',
                description: 'Get instructions to add XAUI MCP to an AI assistant',
              },
            ].map(tool => (
              <div key={tool.name} className="px-4 py-3 flex gap-4 items-start">
                <code className="text-sm font-mono text-primary shrink-0">
                  {tool.name}
                </code>
                <span className="text-sm text-muted-foreground">
                  {tool.description}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">LLM reference file</h2>
          <p className="text-muted-foreground">
            Prefer a plain-text reference? A machine-readable file with all component
            docs is available at:
          </p>
          <CodeBlock code="https://ui.xtartapp.com/llm.txt" language="bash" />
          <p className="text-sm text-muted-foreground">
            You can paste this URL into any AI assistant that accepts URLs, or
            download it into your project as a local context file.
          </p>
        </section>
      </div>
    </div>
  )
}
