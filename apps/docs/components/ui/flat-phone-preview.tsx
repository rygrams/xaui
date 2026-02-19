'use client'

import { type ReactNode } from 'react'
import { HybridProvider } from '@/components/providers/xui-provider'

type FlatPhonePreviewProps = {
  children: ReactNode
  colorScheme?: 'light' | 'dark'
}

export function FlatPhonePreview({ children, colorScheme = 'light' }: FlatPhonePreviewProps) {
  const isDark = colorScheme === 'dark'

  return (
    <div className="flex justify-center py-4">
      <div style={{ width: '300px' }}>
        <div className="rounded-[2.8rem] bg-zinc-800 p-2 shadow-md">
          <div className="flex justify-center pb-2 pt-1.5">
            <div className="h-1.5 w-12 rounded-full bg-zinc-600" />
          </div>
          <div
            data-color-scheme={colorScheme}
            className={[
              'flex min-h-[540px] flex-col overflow-hidden rounded-[2rem]',
              isDark ? 'bg-zinc-900' : 'bg-white',
            ].join(' ')}
          >
            <div className="flex-1 overflow-y-auto">
              <HybridProvider>{children}</HybridProvider>
            </div>
            <div className={['flex justify-center py-2', isDark ? 'bg-zinc-900' : 'bg-white'].join(' ')}>
              <div className={['h-1 w-20 rounded-full', isDark ? 'bg-zinc-700' : 'bg-zinc-300'].join(' ')} />
            </div>
          </div>
          <div className="pt-2" />
        </div>
      </div>
    </div>
  )
}
