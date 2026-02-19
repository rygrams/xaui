'use client'

import { useEffect, type ReactNode } from 'react'

type HybridProviderProps = {
  children: ReactNode
  colorScheme?: 'light' | 'dark'
}

export function HybridProvider({ children, colorScheme }: HybridProviderProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!colorScheme) return
    document.documentElement.dataset.colorScheme = colorScheme
  }, [colorScheme])

  return <>{children}</>
}
