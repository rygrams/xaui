'use client'

import { XUIProvider } from '@xaui/hybrid/core'
import type { ReactNode } from 'react'

export function HybridProvider({ children }: { children: ReactNode }) {
  return <XUIProvider>{children}</XUIProvider>
}
