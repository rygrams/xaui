'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navigation } from '@/lib/data/navigation'
import { Search, Star, Github, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SearchDialog } from './search-dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

type SidebarNavProps = {
  onSearchOpen: () => void
  stars: number | null
}

function formatStars(count: number) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return String(count)
}

function SidebarNav({ onSearchOpen, stars }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.svg" alt="Xaui" width={32} height={32} className="rounded-lg" />
          <span>Xaui</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <a
            href="https://github.com/rygrams/xaui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="h-4 w-4" />
            {stars !== null && (
              <>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{formatStars(stars)}</span>
              </>
            )}
          </a>
          <a
            href="https://www.linkedin.com/in/ladji-bamory-gramboute/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border p-1.5 transition-colors hover:bg-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                fill="#0A66C2"
                d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32m-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43m264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="px-3 py-2">
        <button
          onClick={onSearchOpen}
          className="flex w-full items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
        >
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-auto rounded bg-background px-1.5 py-0.5 text-xs">⌘K</kbd>
        </button>
      </div>

      <nav className="flex-1 overflow-auto px-3 py-2 pb-0">
        {navigation.map(section => (
          <div key={section.title} className="mb-4">
            <h3 className="mb-1 px-2 text-xs font-semibold text-muted-foreground">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center rounded-md px-2 py-1.5 text-sm transition-colors',
                      pathname === item.href
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {item.title}
                  </Link>
                  {item.items && (
                    <ul className="ml-4 mt-1 space-y-0.5">
                      {item.items.map(subItem => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              'flex items-center rounded-md px-2 py-1.5 text-sm transition-colors',
                              pathname === subItem.href
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}

export function Sidebar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/rygrams/xaui')
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count))
      .catch(() => null)
  }, [])

  const openSearch = () => setSearchOpen(true)

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-background md:block">
        <SidebarNav onSearchOpen={openSearch} stars={stars} />
      </aside>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center gap-3 border-b bg-background px-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
            <SidebarNav onSearchOpen={openSearch} stars={stars} />
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/logo.svg" alt="Xaui" width={32} height={32} className="rounded-lg" />
          <span>Xaui</span>
        </Link>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
