export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

export interface NavSection {
  title: string
  items: NavItem[]
  note?: string
}

export const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs/introduction',
      },
    ],
  },
  {
    title: 'Work in progress',
    items: [],
    note: 'The component, theme and tooling pages are offline while XAUI is rebuilt on the v1 API. They come back one at a time as each component lands.',
  },
]
