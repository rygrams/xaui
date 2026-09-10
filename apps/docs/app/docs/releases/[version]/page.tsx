import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Markdown } from '@/components/docs/markdown'
import { getRelease, getReleases } from '@/lib/releases'

type ReleasePageProps = {
  params: Promise<{ version: string }>
}

export function generateStaticParams() {
  return getReleases().map(release => ({ version: release.version }))
}

export async function generateMetadata({
  params,
}: ReleasePageProps): Promise<Metadata> {
  const { version } = await params
  const release = getRelease(decodeURIComponent(version))
  if (!release) return { title: 'Release not found — XAUI' }

  return {
    title: `@xaui/native ${release.version} — XAUI Native`,
    description:
      release.summary || `Release notes for @xaui/native ${release.version}.`,
    alternates: { canonical: release.href },
  }
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { version } = await params
  const release = getRelease(decodeURIComponent(version))
  if (!release) notFound()

  const releases = getReleases()
  const index = releases.findIndex(
    candidate => candidate.version === release.version
  )
  const newer = releases[index - 1]
  const older = releases[index + 1]

  return (
    <article className="space-y-10 pb-16">
      <header className="space-y-4 border-b pb-6">
        <Link
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          href="/docs/releases"
        >
          <ArrowLeft className="size-3.5" /> All releases
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {release.version}
          </h1>
          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            {release.channel === 'alpha' ? 'Alpha' : 'Stable'}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          <code>@xaui/native@{release.version}</code>
        </p>
      </header>

      <Markdown>{release.markdown}</Markdown>

      <nav aria-label="Releases" className="grid gap-3 border-t pt-8 sm:grid-cols-2">
        {older ? (
          <Link
            className="rounded-xl border p-4 transition-colors hover:bg-muted/50"
            href={older.href}
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" /> Older
            </span>
            <span className="mt-1 block font-semibold">{older.version}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link
            className="rounded-xl border p-4 text-right transition-colors hover:bg-muted/50"
            href={newer.href}
          >
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Newer <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-1 block font-semibold">{newer.version}</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
