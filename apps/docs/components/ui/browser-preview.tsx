'use client'

import { type ReactNode } from 'react'
import { HybridProvider } from '@/components/providers/xui-provider'

type BrowserPreviewProps = {
  children: ReactNode
  url?: string
}

export function BrowserPreview({ children, url = 'localhost' }: BrowserPreviewProps) {
  return (
    <div className="flex justify-center py-4">
      <div
        className="overflow-hidden rounded-2xl border shadow-md"
        style={{ width: '360px' }}
      >
        <div className="flex items-center gap-2 border-b bg-zinc-100 px-3 py-2 dark:bg-zinc-800">
          <div className="flex shrink-0 gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="min-w-0 flex-1 truncate rounded bg-white/70 px-2 py-0.5 text-center font-mono text-xs text-zinc-400 dark:bg-zinc-700/70">
            {url}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900">
          <HybridProvider>{children}</HybridProvider>
        </div>
      </div>
    </div>
  )
}
