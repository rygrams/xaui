'use client'

import { XUIProvider } from '@xaui/hybrid/core'
import { defaultDarkTheme } from '@xaui/core/theme'
import type { ReactNode } from 'react'

type HybridProviderProps = {
  children: ReactNode
  colorScheme?: 'light' | 'dark'
}

export function HybridProvider({ children, colorScheme }: HybridProviderProps) {
  return (
    <XUIProvider darkTheme={defaultDarkTheme} colorScheme={colorScheme}>
      {children}
    </XUIProvider>
  )
}
