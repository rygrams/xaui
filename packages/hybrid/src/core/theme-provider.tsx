'use client'

import { useEffect, type ReactNode } from 'react'

type ColorMode = 'light' | 'dark'

type CSSVarValue = string | number

export type XUIVariables = Record<`--xui-${string}`, CSSVarValue>

export interface XUIProviderProps {
  children: ReactNode
  colorScheme?: ColorMode
  target?: 'html' | 'body'
  variables?: Partial<XUIVariables>
  darkVariables?: Partial<XUIVariables>
}

const getSystemColorMode = (): ColorMode => {
  if (typeof globalThis === 'undefined' || !globalThis.matchMedia) return 'light'
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function XUIProvider({
  children,
  colorScheme,
  target = 'html',
  variables,
  darkVariables,
}: XUIProviderProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    const styleTarget = target === 'body' ? document.body : root
    if (!styleTarget) return

    const resolvedMode: ColorMode = colorScheme ?? getSystemColorMode()
    root.dataset.colorScheme = resolvedMode

    const activeVars = resolvedMode === 'dark' ? { ...variables, ...darkVariables } : variables
    if (!activeVars) return

    const appliedKeys: string[] = []
    for (const [key, value] of Object.entries(activeVars)) {
      if (value === undefined || value === null) continue
      styleTarget.style.setProperty(key, String(value))
      appliedKeys.push(key)
    }

    return () => {
      for (const key of appliedKeys) {
        styleTarget.style.removeProperty(key)
      }
    }
  }, [colorScheme, darkVariables, target, variables])

  return <>{children}</>
}
