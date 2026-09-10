import type { Metadata } from 'next'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Agent skills — XAUI Native',
  description:
    'Install the XAUI agent skill with the skills CLI, so your coding agent reads the real API instead of guessing at one.',
}

export default function SkillsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Agent skills</h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          The XAUI skill is a SKILL.md file — the import shape, the slot notation,
          what <code>variant</code> is against <code>color</code>, and a link to
          every component&apos;s markdown. An agent that has it reads the real API
          instead of guessing at one.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Install with the skills CLI</h2>
        <p className="text-muted-foreground">
          <a
            href="https://skills.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            skills
          </a>{' '}
          is the CLI for the open agent skills ecosystem. It detects the agents on
          the machine and writes the skill into each one&apos;s skills directory:
        </p>
        <CodeBlock
          language="bash"
          code={`npx skills add https://ui.xtartapp.com/skills/xaui/SKILL.md`}
        />
        <p className="text-muted-foreground">
          Commit the installed skill with the project and every agent that opens the
          repo picks it up. It works with Claude Code, OpenCode, Cursor, Codex and
          the other agents the CLI supports.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Install by hand</h2>
        <p className="text-muted-foreground">
          Without the CLI, download the file into the agent&apos;s skills directory
          yourself:
        </p>
        <CodeBlock
          language="bash"
          code={`mkdir -p .claude/skills/xaui
curl -o .claude/skills/xaui/SKILL.md https://ui.xtartapp.com/skills/xaui/SKILL.md`}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Without a skill file</h2>
        <p className="text-muted-foreground">
          For tools that take a docs index rather than a skill file, point them at{' '}
          <Link
            className="underline underline-offset-4 hover:text-foreground"
            href="/docs/llms-txt"
          >
            llms.txt
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
