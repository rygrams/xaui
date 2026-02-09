'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { components } from '@/lib/data/components'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredComponents = query
    ? components.filter(
        c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : components

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev =>
        prev < filteredComponents.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = filteredComponents[selectedIndex]
      if (selected) {
        router.push(selected.href)
        onOpenChange(false)
        setQuery('')
      }
    } else if (e.key === 'Escape') {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Components
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-2">
          <Input
            placeholder="Type to search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-10"
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-auto px-2 pb-2">
          {filteredComponents.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No components found.
            </div>
          ) : (
            <div className="space-y-1">
              {filteredComponents.map((component, index) => (
                <Link
                  key={component.id}
                  href={component.href}
                  onClick={() => {
                    onOpenChange(false)
                    setQuery('')
                  }}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm transition-colors',
                    index === selectedIndex
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="font-medium">{component.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {component.description}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="border-t px-4 py-2 text-xs text-muted-foreground flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="rounded bg-muted px-1">↑</kbd>
            <kbd className="rounded bg-muted px-1">↓</kbd>
            to navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded bg-muted px-1">↵</kbd>
            to select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded bg-muted px-1">esc</kbd>
            to close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
