export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs/introduction',
      },
      {
        title: 'Getting Started',
        href: '/docs/getting-started',
      },
      {
        title: 'Installation',
        href: '/docs/installation',
      },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        title: 'All Components',
        href: '/docs/components',
      },
      {
        title: 'ExpansionPanel',
        href: '/docs/components/expansion-panel',
      },
    ],
  },
]
