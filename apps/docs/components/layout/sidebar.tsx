'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navigation } from '@/lib/data/navigation'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { SearchDialog } from './search-dialog'

export function Sidebar() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                X
              </div>
              <span>Xaui</span>
            </Link>
          </div>

          <div className="px-3 py-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
            >
              <Search className="h-4 w-4" />
              <span>Search...</span>
              <kbd className="ml-auto rounded bg-background px-1.5 py-0.5 text-xs">
                ⌘K
              </kbd>
            </button>
          </div>

          <nav className="flex-1 overflow-auto px-3 py-2">
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
      </aside>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
