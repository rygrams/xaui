import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Markdown } from '@/components/docs/markdown'
import { CHANNEL_LABELS, getLatestRelease, getReleases } from '@/lib/releases'

export const metadata: Metadata = {
  title: 'Releases — XAUI Native',
  description:
    'Release notes for @xaui/native, as the changesets behind each publish wrote them.',
}

export default function ReleasesPage() {
  const latest = getLatestRelease()
  const history = getReleases().slice(1)

  return (
    <div className="space-y-12 pb-16">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Releases</h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          The notes for <code>@xaui/native</code>, as the changesets wrote them at
          publish time. These land on the <code>beta</code> dist-tag;{' '}
          <code>latest</code> still points at the previous line.
        </p>
      </header>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">{latest.version}</h2>
          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            {CHANNEL_LABELS[latest.channel]}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Latest
          </span>
        </div>
        <Markdown>{latest.markdown}</Markdown>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">History</h2>
        <ul className="divide-y rounded-xl border">
          {history.map(release => (
            <li key={release.version}>
              <Link
                className="flex items-start justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/50"
                href={release.href}
              >
                <span className="min-w-0">
                  <span className="font-medium">{release.version}</span>
                  {release.summary && (
                    <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                      {release.summary}
                    </span>
                  )}
                </span>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
