import {
  getCategories,
  getComponentById,
  getComponents,
  getPackageOfPath,
  PACKAGES,
  type PackageName,
} from './components'

export interface NavItem {
  title: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
  note?: string
}

export type NavTabId =
  | 'getting-started'
  | 'components'
  | 'releases'
  | 'migration'
  | 'tram-getting-started'
  | 'tram-components'

export interface NavTab {
  id: NavTabId
  /** The package whose docs the tab belongs to — the header shows one package's tabs. */
  package: PackageName
  title: string
  /** Where the tab lands when it is clicked. */
  href: string
  /** The route prefixes the tab owns — what makes it the active one. */
  paths: string[]
  sections: NavSection[]
}

function componentSections(packageName: PackageName): NavSection[] {
  const components = getComponents(packageName)

  return [
    {
      title: 'Catalogue',
      items: [
        {
          title: `All components (${components.length})`,
          href: PACKAGES[packageName].catalog,
        },
      ],
    },
    ...getCategories(packageName).map(category => ({
      title: category,
      items: components
        .filter(component => component.category === category)
        .map(component => ({ title: component.title, href: component.href })),
    })),
  ]
}

/**
 * Native and Tram are two sets of docs under one header: the switch above the tabs picks
 * the package, and the tabs are that package's. Native's four are the four things a reader
 * comes for — start, catalogue, what changed, and how to leave the legacy API. Tram has
 * the first two; it has no legacy, and its release notes are its changelog.
 */
export const tabs: NavTab[] = [
  {
    id: 'getting-started',
    package: 'native',
    title: 'Getting Started',
    href: '/docs/introduction',
    paths: [
      '/docs/introduction',
      '/docs/installation',
      '/docs/getting-started',
      '/docs/faq',
      '/docs/theme',
      '/docs/fonts',
      '/docs/style-props',
      '/docs/llms-txt',
      '/docs/skills',
    ],
    sections: [
      {
        title: 'Overview',
        items: [
          { title: 'Introduction', href: '/docs/introduction' },
          { title: 'Installation', href: '/docs/installation' },
          { title: 'Quick start', href: '/docs/getting-started' },
          { title: 'FAQ', href: '/docs/faq' },
        ],
      },
      {
        title: 'Foundations',
        items: [
          { title: 'Theme', href: '/docs/theme' },
          { title: 'Fonts', href: '/docs/fonts' },
          { title: 'Style props', href: '/docs/style-props' },
          { title: 'LLMs.txt', href: '/docs/llms-txt' },
          { title: 'Agent skills', href: '/docs/skills' },
        ],
      },
    ],
  },
  {
    id: 'components',
    package: 'native',
    title: 'Components',
    href: '/docs/components',
    paths: ['/docs/components'],
    sections: componentSections('native'),
  },
  {
    id: 'releases',
    package: 'native',
    title: 'Releases',
    href: '/docs/releases',
    paths: ['/docs/releases'],
    sections: [
      {
        title: 'Releases',
        items: [{ title: 'Latest release', href: '/docs/releases' }],
      },
    ],
  },
  {
    id: 'migration',
    package: 'native',
    title: 'Migration',
    href: '/docs/migration',
    paths: ['/docs/migration'],
    sections: [
      {
        title: 'Migration',
        items: [{ title: 'From legacy', href: '/docs/migration' }],
      },
    ],
  },
  {
    id: 'tram-getting-started',
    package: 'tram',
    title: 'Getting Started',
    href: '/docs/tram/getting-started',
    paths: ['/docs/tram/getting-started'],
    sections: [
      {
        title: 'Tram',
        items: [
          { title: 'Get started', href: '/docs/tram/getting-started' },
          { title: 'All components', href: '/docs/tram/components' },
        ],
      },
    ],
  },
  {
    id: 'tram-components',
    package: 'tram',
    title: 'Components',
    href: '/docs/tram/components',
    paths: ['/docs/tram/components'],
    sections: componentSections('tram'),
  },
]

/**
 * Where the package switch sends a reader who is on `pathname`: the same component in the
 * other package when it has one, else that package's catalogue from a component page,
 * else its first page.
 */
export function getPackageSwitchHref(pathname: string, target: PackageName) {
  const componentId = pathname.match(/\/components\/([^/]+)$/)?.[1]
  if (componentId) {
    return getComponentById(componentId, target)?.href ?? PACKAGES[target].catalog
  }
  if (pathname.endsWith('/components')) return PACKAGES[target].catalog
  return PACKAGES[target].home
}

/** The tabs of one package, in header order. */
export function getPackageTabs(packageName: PackageName): NavTab[] {
  return tabs.filter(tab => tab.package === packageName)
}

export function getActiveTab(pathname: string): NavTab {
  const packageTabs = getPackageTabs(getPackageOfPath(pathname))

  return (
    packageTabs.find(tab =>
      tab.paths.some(candidate => pathname.startsWith(candidate))
    ) ?? packageTabs[0]
  )
}

/**
 * The Releases sidebar is the version list, which only the server can read — so the tab
 * carries the static entry and the versions arrive as a prop.
 */
export function getReleaseSections(versions: string[]): NavSection[] {
  const releases = tabs.find(tab => tab.id === 'releases')

  return [
    ...(releases?.sections ?? []),
    {
      title: '@xaui/native',
      items: versions.map(version => ({
        title: version,
        href: `/docs/releases/${version}`,
      })),
    },
  ]
}

export function getSections(tab: NavTab, versions: string[]): NavSection[] {
  return tab.id === 'releases' ? getReleaseSections(versions) : tab.sections
}
