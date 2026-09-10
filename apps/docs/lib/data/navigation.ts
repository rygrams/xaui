import { categories, components } from './components'

export interface NavItem {
  title: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
  note?: string
}

export type NavTabId = 'getting-started' | 'components' | 'releases' | 'migration'

export interface NavTab {
  id: NavTabId
  title: string
  /** Where the tab lands when it is clicked. */
  href: string
  /** The route prefixes the tab owns — what makes it the active one. */
  paths: string[]
  sections: NavSection[]
}

/**
 * The docs are Native only, so there is no renderer switch beside the tabs: every page
 * documents `@xaui/native`, and a toggle with one position is a control that lies about
 * having a choice. The four tabs are the four things a reader comes for — start, catalogue,
 * what changed, and how to leave the legacy API.
 */
export const tabs: NavTab[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    href: '/docs/introduction',
    paths: [
      '/docs/introduction',
      '/docs/installation',
      '/docs/getting-started',
      '/docs/faq',
      '/docs/theme',
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
          { title: 'Style props', href: '/docs/style-props' },
          { title: 'LLMs.txt', href: '/docs/llms-txt' },
          { title: 'Agent skills', href: '/docs/skills' },
        ],
      },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    href: '/docs/components',
    paths: ['/docs/components'],
    sections: [
      {
        title: 'Catalogue',
        items: [
          {
            title: `All components (${components.length})`,
            href: '/docs/components',
          },
        ],
      },
      ...categories.map(category => ({
        title: category,
        items: components
          .filter(component => component.category === category)
          .map(component => ({ title: component.title, href: component.href })),
      })),
    ],
  },
  {
    id: 'releases',
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
]

export function getActiveTab(pathname: string): NavTab {
  return (
    tabs.find(tab => tab.paths.some(candidate => pathname.startsWith(candidate))) ??
    tabs[0]
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
