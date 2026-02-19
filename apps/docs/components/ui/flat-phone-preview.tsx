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
      <div style={{ width: '260px' }}>
        <div className="rounded-[2.4rem] bg-zinc-800 p-[7px] shadow-md">
          <div className="flex justify-center pb-2 pt-1.5">
            <div className="h-1.5 w-10 rounded-full bg-zinc-600" />
          </div>
          <div
            data-color-scheme={colorScheme}
            className={[
              'flex flex-col overflow-hidden rounded-[1.8rem]',
              isDark ? 'bg-zinc-900' : 'bg-white',
            ].join(' ')}
            style={{ minHeight: '540px' }}
          >
            <div className="flex-1 overflow-y-auto">
              <HybridProvider colorScheme={colorScheme}>{children}</HybridProvider>
            </div>
            <div className={['flex justify-center py-2', isDark ? 'bg-zinc-900' : 'bg-white'].join(' ')}>
              <div className={['h-1 w-16 rounded-full', isDark ? 'bg-zinc-700' : 'bg-zinc-300'].join(' ')} />
            </div>
          </div>
          <div className="pt-[7px]" />
        </div>
      </div>
    </div>
  )
}
