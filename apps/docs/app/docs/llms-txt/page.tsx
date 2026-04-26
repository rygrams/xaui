import type { Metadata } from 'next'
import { CodeBlock } from '@/components/ui/code-block'
import { ExternalLink, Bot, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LLMs.txt - Xaui',
  description: 'Machine-readable documentation for AI assistants',
}

export default function LlmsTxtPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">LLMs.txt</h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          Xaui exposes machine-readable documentation so AI assistants can understand the
          library and generate accurate component code.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="/llms.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 rounded-lg border p-5 transition-colors hover:bg-muted/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold">llms.txt</p>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Index of all components — one link per component.
            </p>
          </div>
        </a>

        <a
          href="/docs/container.md"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 rounded-lg border p-5 transition-colors hover:bg-muted/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold">container.md</p>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Container props, events, and usage example.
            </p>
          </div>
        </a>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">What is llms.txt?</h2>
        <p className="text-muted-foreground">
          <a
            href="https://llmstxt.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            llmstxt.org
          </a>{' '}
          is an open standard that helps AI assistants discover and consume documentation.
          A short index file at <code className="rounded bg-muted px-1.5 py-0.5 text-sm">/llms.txt</code> links
          to per-component markdown files that LLMs fetch on demand.
        </p>
        <p className="text-muted-foreground">
          This lets tools like Claude, Cursor, or Copilot understand the exact API surface
          of each component and generate accurate, idiomatic code without hallucinating prop names.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Usage in Claude</h2>
        <p className="text-muted-foreground">
          Paste this into your system prompt or project instructions:
        </p>
        <CodeBlock
          language="text"
          code={`Refer to https://ui.xtartapp.com/llms.txt for the XAUI component library.
Fetch the linked markdown files to get props and examples before generating code.`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Usage in Cursor</h2>
        <p className="text-muted-foreground">
          Add the following to <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.cursorrules</code> or your Cursor docs index:
        </p>
        <CodeBlock
          language="text"
          code={`@docs https://ui.xtartapp.com/llms.txt`}
        />
      </div>
    </div>
  )
}
