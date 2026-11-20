import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from 'lucide-react'
import { ApiTable } from '@/components/docs/api-table'
import { Markdown } from '@/components/docs/markdown'
import { NativePreview } from '@/components/preview/native-preview'
import { JsonLd } from '@/components/seo/json-ld'
import { CodeBlock } from '@/components/ui/code-block'
import { OutboundLink } from '@/components/ui/outbound-link'
import { getComponentDocument } from '@/lib/component-doc'
import {
  getComponentById,
  getComponents,
  PACKAGES,
  type Component,
  type PackageName,
} from '@/lib/data/components'
import { pageMetadata, SITE_URL, TRAM_KEYWORDS, TRAM_SITE_NAME } from '@/lib/site'

const SECTION_LINKS = {
  native: [
    ['overview', 'Overview'],
    ['anatomy', 'Anatomy'],
    ['usage', 'Usage'],
    ['props', 'Props'],
    ['slots', 'Slots'],
    ['variants', 'Variants'],
    ['accessibility', 'Accessibility'],
    ['migration', 'Migration'],
  ],
  // A Tram page ends on what it does unlike Native, where Native's ends on the legacy API.
  tram: [
    ['overview', 'Overview'],
    ['anatomy', 'Anatomy'],
    ['usage', 'Usage'],
    ['props', 'Props'],
    ['slots', 'Slots'],
    ['variants', 'Variants'],
    ['accessibility', 'Accessibility'],
    ['differences', 'From Native'],
  ],
} as const

/**
 * What a page's title calls the component. A Tram page leads with Metro — the word people
 * search for, and what tells it from the Native page of the same name.
 */
function getPageTitle(component: Component) {
  return component.package === 'tram'
    ? `Metro ${component.title} for React Native`
    : `${component.title} for React Native`
}

/**
 * The meta description. A Tram page whose own first line does not say Metro is introduced
 * as the Metro UI component it is, so every Tram result reads as Metro in a search.
 */
function getPageDescription(component: Component) {
  if (component.package !== 'tram' || /metro/i.test(component.description)) {
    return component.description
  }

  const lead = component.description.charAt(0).toLowerCase()
  return `Metro UI ${component.title} for React Native and Expo — ${lead}${component.description.slice(1)}`
}

function getKeywords(component: Component) {
  return [
    'xaui',
    'react native',
    'react native web',
    ...(component.package === 'tram'
      ? [`metro ${component.title.toLowerCase()}`, ...TRAM_KEYWORDS]
      : []),
    component.title,
    component.category,
    component.importPath,
    ...component.exports,
  ]
}

export function getComponentStaticParams(packageName: PackageName) {
  return getComponents(packageName).map(component => ({ componentId: component.id }))
}

export function getComponentMetadata(
  componentId: string,
  packageName: PackageName
): Metadata {
  const component = getComponentById(componentId, packageName)
  if (!component) return { title: 'Component not found' }

  return pageMetadata({
    title: getPageTitle(component),
    description: getPageDescription(component),
    path: component.href,
    markdownPath: component.markdownHref,
    keywords: getKeywords(component),
    siteName: packageName === 'tram' ? TRAM_SITE_NAME : undefined,
  })
}

/** The page as an article about one component, and where it sits in the docs. */
function getStructuredData(component: Component) {
  const url = `${SITE_URL}${component.href}`
  const catalog = PACKAGES[component.package].catalog

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline:
          component.package === 'tram'
            ? `Metro ${component.title} — React Native component (@xaui/tram)`
            : `${component.title} — React Native component`,
        description: getPageDescription(component),
        url,
        inLanguage: 'en',
        keywords: getKeywords(component).join(', '),
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: {
          '@id': `${SITE_URL}/#${component.package === 'tram' ? 'tram' : 'library'}`,
        },
        encoding: {
          '@type': 'MediaObject',
          encodingFormat: 'text/markdown',
          contentUrl: `${SITE_URL}${component.markdownHref}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          ['Docs', PACKAGES[component.package].home],
          ['Components', catalog],
          [component.title, component.href],
        ].map(([name, path], position) => ({
          '@type': 'ListItem',
          position: position + 1,
          name,
          item: `${SITE_URL}${path}`,
        })),
      },
    ],
  }
}

/**
 * One package's page of a component, the eight sections in order. The page names its
 * package where it starts and links to the other package's page when there is one — the
 * only place the two meet.
 */
export function ComponentDocPage({ component }: { component: Component }) {
  const packageName = component.package
  const siblings = getComponents(packageName)
  const index = siblings.findIndex(item => item.id === component.id)
  const previous = siblings[index - 1]
  const next = siblings[index + 1]
  const other: PackageName = packageName === 'tram' ? 'native' : 'tram'
  const counterpart = getComponentById(component.id, other)

  const document = getComponentDocument(component)
  const rootTable = document.propTables[0]
  const slotTables = document.propTables.slice(1)
  const isTram = packageName === 'tram'

  return (
    <article className="mx-auto max-w-4xl space-y-14 pb-20">
      <JsonLd data={getStructuredData(component)} />
      <header className="space-y-5 border-b pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-foreground px-2.5 py-1 text-background">
            {PACKAGES[packageName].name}
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
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <code className="rounded-md bg-muted px-2 py-1 text-xs">
            {component.importPath}
          </code>
          <OutboundLink
            className="inline-flex items-center gap-1.5 font-medium hover:underline"
            event="github_click"
            href={component.sourceUrl}
            location="component_source"
          >
            Source <ExternalLink className="size-3.5" />
          </OutboundLink>
          <a
            className="inline-flex items-center gap-1.5 font-medium hover:underline"
            href={component.markdownHref}
          >
            Markdown <FileText className="size-3.5" />
          </a>
          {counterpart && (
            <Link
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:underline"
              href={counterpart.href}
            >
              The {PACKAGES[other].title} {counterpart.title}{' '}
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
      </header>

      <nav aria-label="Page sections" className="flex flex-wrap gap-2">
        {SECTION_LINKS[packageName].map(([id, label]) => (
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
        {component.demoId ? (
          <NativePreview
            componentId={component.id}
            demoId={component.demoId}
            edition={packageName}
          />
        ) : (
          <EmptyNote>
            This component drives the app&apos;s navigator, so its demo runs in the
            Expo app rather than in the page. The examples below are that
            screen&apos;s.
          </EmptyNote>
        )}
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
            {isTram && counterpart ? (
              <>
                This module is the Native one, re-exported: its props are on the{' '}
                <Link className="font-medium underline" href={counterpart.href}>
                  Native page
                </Link>
                .
              </>
            ) : (
              'This component declares no props of its own beyond its React Native node.'
            )}
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

      {isTram ? (
        <DocSection id="differences" title="Differences from Native">
          {document.differences ? (
            <Markdown>{document.differences}</Markdown>
          ) : (
            <EmptyNote>
              {counterpart
                ? 'The same API as the Native component, drawn in Tram.'
                : "Tram's own: Native has no component of this name."}
            </EmptyNote>
          )}
        </DocSection>
      ) : (
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
      )}

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
