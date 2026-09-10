'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ArrowLeftRight,
  BookOpen,
  Blocks,
  Github,
  Menu,
  Search,
  Star,
  Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getActiveTab, tabs, type NavTabId } from '@/lib/data/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SearchDialog } from './search-dialog'
import { SidebarNav } from './sidebar'

const TAB_ICONS: Record<NavTabId, typeof BookOpen> = {
  'getting-started': BookOpen,
  components: Blocks,
  releases: Tag,
  migration: ArrowLeftRight,
}

type SiteHeaderProps = {
  /** The newest published version — what the badge beside the name reads. */
  version: string
  versions: string[]
}

function formatStars(count: number) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return String(count)
}

/**
 * Identity, search and the section tabs, above the sidebar rather than inside it.
 *
 * The two rows are two different things: the top one never changes, so the logo, the
 * version and the search stay where the eye left them; the bottom one is the site's own
 * level of navigation, and the sidebar under it belongs to whichever tab is lit.
 */
export function SiteHeader({ version, versions }: SiteHeaderProps) {
  const pathname = usePathname()
  const activeTab = getActiveTab(pathname)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/rygrams/xaui')
      .then(response => response.json())
      .then(data => setStars(data.stargazers_count))
      .catch(() => null)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-background/85 backdrop-blur">
        <div className="flex h-14 items-center gap-3 border-b px-4">
          <Sheet onOpenChange={setMenuOpen} open={menuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open the menu"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="w-72 p-0" showCloseButton={false} side="left">
              <SidebarNav
                onNavigate={() => setMenuOpen(false)}
                versions={versions}
              />
            </SheetContent>
          </Sheet>

          <div className="flex min-w-0 items-center gap-2">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Image
                alt="Xaui"
                className="rounded-lg"
                height={28}
                src="/logo.svg"
                width={28}
              />
              <span>Xaui</span>
            </Link>
            <Link
              className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              href="/docs/releases"
              title="Release notes"
            >
              v{version}
            </Link>
          </div>

          <div className="mx-auto hidden w-full max-w-md md:block">
            <button
              className="flex w-full items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-4" />
              <span>Search a component…</span>
              <kbd className="ml-auto rounded bg-background px-1.5 py-0.5 text-xs">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-1.5 md:ml-0">
            <button
              aria-label="Search"
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-4" />
            </button>
            <a
              className="flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              href="https://github.com/rygrams/xaui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="size-4" />
              {stars !== null && (
                <>
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <span>{formatStars(stars)}</span>
                </>
              )}
            </a>
            <a
              aria-label="LinkedIn"
              className="rounded-full border p-1.5 transition-colors hover:bg-accent"
              href="https://www.linkedin.com/in/ladji-bamory-gramboute/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 512 512"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32m-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43m264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z"
                  fill="#0A66C2"
                />
              </svg>
            </a>
          </div>
        </div>

        <nav
          aria-label="Documentation sections"
          className="flex h-12 items-center gap-1 overflow-x-auto border-b px-2 md:px-4"
        >
          {tabs.map(tab => {
            const Icon = TAB_ICONS[tab.id]
            const isActive = tab.id === activeTab.id

            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  '-mb-px flex h-full shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 text-sm transition-colors',
                  isActive
                    ? 'border-foreground font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
                href={tab.href}
                key={tab.id}
              >
                <Icon className="size-4" />
                {tab.title}
              </Link>
            )
          })}
        </nav>
      </header>

      <SearchDialog onOpenChange={setSearchOpen} open={searchOpen} />
    </>
  )
}
