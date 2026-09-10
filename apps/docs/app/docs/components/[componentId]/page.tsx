import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from 'lucide-react'
import { ApiTable } from '@/components/docs/api-table'
import { Markdown } from '@/components/docs/markdown'
import { NativePreview } from '@/components/preview/native-preview'
import { CodeBlock } from '@/components/ui/code-block'
import { getComponentDocument } from '@/lib/component-doc'
import { components, getComponentById, type Component } from '@/lib/data/components'

type ComponentPageProps = {
  params: Promise<{ componentId: string }>
}

const SECTION_LINKS = [
  ['overview', 'Overview'],
  ['anatomy', 'Anatomy'],
  ['usage', 'Usage'],
  ['props', 'Props'],
  ['slots', 'Slots'],
  ['variants', 'Variants'],
  ['accessibility', 'Accessibility'],
  ['migration', 'Migration'],
] as const

function getKeywords(component: Component) {
  return [
    'xaui',
    'react native',
    'react native web',
    component.title,
    component.category,
    component.importPath,
    ...component.exports,
  ]
}

export function generateStaticParams() {
  return components.map(component => ({ componentId: component.id }))
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const { componentId } = await params
  const component = getComponentById(componentId)
  if (!component) return { title: 'Component not found — XAUI' }

  return {
    title: `${component.title} — XAUI Native`,
    description: component.description,
    keywords: getKeywords(component),
    alternates: { canonical: component.href },
    openGraph: {
      type: 'article',
      title: `${component.title} — XAUI Native`,
      description: component.description,
      url: component.href,
      siteName: 'XAUI Documentation',
    },
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { componentId } = await params
  const component = getComponentById(componentId)
  if (!component) notFound()

  const document = getComponentDocument(component)
  const rootTable = document.propTables[0]
  const slotTables = document.propTables.slice(1)
  const index = components.findIndex(item => item.id === component.id)
  const previous = components[index - 1]
  const next = components[index + 1]

  return (
    <article className="mx-auto max-w-4xl space-y-14 pb-20">
      <header className="space-y-5 border-b pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            Alpha
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
            {component.category}
          </span>
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {component.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            {component.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            className="inline-flex items-center gap-1.5 font-medium hover:underline"
            href={component.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            Source <ExternalLink className="size-3.5" />
          </a>
          <a
            className="inline-flex items-center gap-1.5 font-medium hover:underline"
            href={`/docs/${component.id}.md`}
          >
            Markdown <FileText className="size-3.5" />
          </a>
        </div>
      </header>

      <nav aria-label="Page sections" className="flex flex-wrap gap-2">
        {SECTION_LINKS.map(([id, label]) => (
          <a
            className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            href={`#${id}`}
            key={id}
          >
            {label}
          </a>
        ))}
      </nav>

      <DocSection id="overview" title="Overview">
        <Markdown>{document.overview}</Markdown>
        <NativePreview componentId={component.id} demoId={component.demoId} />
        <div className="space-y-3">
          <h3 className="text-base font-semibold">First example</h3>
          <CodeBlock code={document.example} />
        </div>
      </DocSection>

      <DocSection id="anatomy" title="Anatomy">
        <Markdown>{document.anatomy}</Markdown>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Markdown>{document.usage}</Markdown>
      </DocSection>

      <DocSection id="props" title="Root props">
        {rootTable ? (
          <ApiTable table={rootTable} />
        ) : (
          <EmptyNote>
            This component declares no props of its own beyond its React Native node.
          </EmptyNote>
        )}
      </DocSection>

      <DocSection id="slots" title="Slots">
        {slotTables.length ? (
          <div className="space-y-10">
            {slotTables.map(table => (
              <ApiTable key={table.name} table={table} />
            ))}
          </div>
        ) : (
          <EmptyNote>
            This component is standalone and exposes no public slot.
          </EmptyNote>
        )}
      </DocSection>

      <DocSection id="variants" title="Variants, sizes and colour">
        {document.variants ? (
          <Markdown>{document.variants}</Markdown>
        ) : (
          <EmptyNote>
            This component adds no visual axis of its own. The values it does take
            are in the generated types above and in the live demo.
          </EmptyNote>
        )}
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        {document.accessibility ? (
          <Markdown>{document.accessibility}</Markdown>
        ) : (
          <EmptyNote>
            The source defines no extra rule. Keep the React Native labels, roles,
            states and focus order your case needs, then check the result with
            VoiceOver and TalkBack.
          </EmptyNote>
        )}
      </DocSection>

      <DocSection id="migration" title="Migration from legacy">
        {document.migration ? (
          <Markdown>{document.migration}</Markdown>
        ) : (
          <EmptyNote>
            This component declares no rule of its own. The{' '}
            <Link className="font-medium underline" href="/docs/migration">
              migration guide
            </Link>{' '}
            covers variants, colours and slots.
          </EmptyNote>
        )}
      </DocSection>

      {document.notes.length > 0 && (
        <DocSection id="design-notes" title="Implementation notes">
          <div className="space-y-10">
            {document.notes.map(note => (
              <section className="space-y-3" key={note.title}>
                <h3 className="text-xl font-semibold tracking-tight">
                  {note.title}
                </h3>
                <Markdown>{note.markdown}</Markdown>
              </section>
            ))}
          </div>
        </DocSection>
      )}

      <nav
        className="grid gap-3 border-t pt-8 sm:grid-cols-2"
        aria-label="Components"
      >
        {previous ? (
          <Link
            className="group rounded-xl border p-4 transition-colors hover:bg-muted/50"
            href={previous.href}
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" /> Previous
            </span>
            <span className="mt-1 block font-semibold">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            className="group rounded-xl border p-4 text-right transition-colors hover:bg-muted/50"
            href={next.href}
          >
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Next <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-1 block font-semibold">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  )
}

function DocSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-8 space-y-6" id={id}>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {children}
    </section>
  )
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed bg-muted/20 px-4 py-3 text-sm leading-6 text-muted-foreground">
      {children}
    </div>
  )
}
