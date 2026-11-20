import nativeCatalog from './native-components.generated.json'
import tramPackage from './tram-package.generated.json'
import tramCatalog from './tram-components.generated.json'

export type ComponentCategory =
  | 'Actions'
  | 'Charts'
  | 'Data display'
  | 'Feedback'
  | 'Forms'
  | 'Layout'
  | 'Navigation'
  | 'Overlays'

/**
 * The two packages the docs describe. They are two sites under one header: each has its
 * own catalogue, sidebar and pages, so a page never leaves the reader guessing which
 * package a prop or an import belongs to.
 */
export type PackageName = 'native' | 'tram'

type PackageInfo = {
  id: PackageName
  title: string
  name: string
  /** Where the package's docs start, and where its catalogue lives. */
  home: string
  catalog: string
}

export const PACKAGES: Record<PackageName, PackageInfo> = {
  native: {
    id: 'native',
    title: 'Native',
    name: '@xaui/native',
    home: '/docs/introduction',
    catalog: '/docs/components',
  },
  tram: {
    id: 'tram',
    title: 'Tram',
    name: '@xaui/tram',
    home: '/docs/tram/getting-started',
    catalog: '/docs/tram/components',
  },
}

export const TRAM_VERSION = tramPackage.version

/** Tram lives under this prefix; everything else is Native's. */
const TRAM_PREFIX = '/docs/tram'

export function getPackageOfPath(pathname: string): PackageName {
  return pathname === TRAM_PREFIX || pathname.startsWith(`${TRAM_PREFIX}/`)
    ? 'tram'
    : 'native'
}

export type Component = {
  package: PackageName
  id: string
  name: string
  title: string
  description: string
  category: ComponentCategory
  href: string
  importPath: string
  sourceUrl: string
  markdownPath: string
  /** Where the site serves the page's markdown. */
  markdownHref: string
  /** The demo screen the preview renders, or `null` when it cannot run in the docs. */
  demoId: string | null
  exports: string[]
}

type CatalogEntry = (typeof nativeCatalog)[number]

function toComponents(
  catalog: CatalogEntry[],
  packageName: PackageName
): Component[] {
  return catalog.map(entry => ({
    ...entry,
    package: packageName,
    name: entry.title,
    category: entry.category as ComponentCategory,
    href:
      packageName === 'tram' ? `${PACKAGES.tram.catalog}/${entry.id}` : entry.href,
  }))
}

/** `@xaui/native`'s components — what `components` has always meant on this site. */
export const components: Component[] = toComponents(nativeCatalog, 'native')

export const tramComponents: Component[] = toComponents(
  tramCatalog as CatalogEntry[],
  'tram'
)

const CATALOGS: Record<PackageName, Component[]> = {
  native: components,
  tram: tramComponents,
}

export function getComponents(packageName: PackageName) {
  return CATALOGS[packageName]
}

export function getCategories(packageName: PackageName) {
  return Array.from(
    new Set(getComponents(packageName).map(component => component.category))
  )
}

export function searchComponents(
  query: string,
  packageName: PackageName = 'native'
) {
  const all = getComponents(packageName)
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return all

  return all.filter(component =>
    [component.name, component.description, component.category, component.importPath]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  )
}

export function getComponentById(
  componentId: string,
  packageName: PackageName = 'native'
) {
  return getComponents(packageName).find(component => component.id === componentId)
}
