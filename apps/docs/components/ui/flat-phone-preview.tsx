'use client'

import { type ReactNode } from 'react'
import { HybridProvider } from '@/components/providers/xui-provider'

type FlatPhonePreviewProps = {
  children: ReactNode
}

export function FlatPhonePreview({ children }: FlatPhonePreviewProps) {
  return (
    <div className="flex justify-center py-4">
      <div style={{ width: '320px' }}>
        <div className="overflow-hidden rounded-[2.5rem] border-[3px] border-zinc-800 bg-zinc-800 dark:border-zinc-600">
          <div className="flex justify-center bg-zinc-800 py-2.5 dark:bg-zinc-700">
            <div className="h-1.5 w-16 rounded-full bg-zinc-600 dark:bg-zinc-500" />
          </div>
          <div className="bg-white dark:bg-zinc-900">
            <HybridProvider>{children}</HybridProvider>
          </div>
          <div className="flex justify-center bg-white py-2.5 dark:bg-zinc-900">
            <div className="h-1 w-20 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
