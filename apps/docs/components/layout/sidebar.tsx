'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getActiveTab, getSections } from '@/lib/data/navigation'

type SidebarProps = {
  /** Every published `@xaui/native` version, newest first — the Releases tab's own list. */
  versions: string[]
  /** What closes the drawer the nav is rendered in, when it is rendered in one. */
  onNavigate?: () => void
}

/**
 * The nav under the header, showing **one tab's** sections rather than the whole site: the
 * tabs are the top level, so a sidebar that repeated them would give the same link two
 * places to be active.
 */
export function SidebarNav({ versions, onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const tab = getActiveTab(pathname)
  const sections = getSections(tab, versions)

  return (
    <nav className="flex h-full flex-col overflow-y-auto px-3 py-5">
      {sections.map(section => (
        <div className="mb-5" key={section.title}>
          <h3 className="mb-1.5 px-2 text-xs font-semibold tracking-wide text-muted-foreground">
            {section.title}
          </h3>
          {section.note && (
            <p className="rounded-md border border-dashed px-2 py-2 text-xs leading-relaxed text-muted-foreground">
              {section.note}
            </p>
          )}
          <ul className="space-y-0.5">
            {section.items.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    'flex items-center rounded-md px-2 py-1.5 text-sm transition-colors',
                    pathname === item.href
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function Sidebar({ versions }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-26 z-30 hidden h-[calc(100vh-6.5rem)] w-64 border-r bg-background md:block">
      <SidebarNav versions={versions} />
    </aside>
  )
}
