'use client'

import { createGlobalStyle } from 'styled-components'
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
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const XUIGlobalStyle = createGlobalStyle`
  :root {
    --xui-primary: #6b21a8;
    --xui-primary-fg: #ffffff;
    --xui-primary-bg: #e9d5ff;

    --xui-secondary: #71717a;
    --xui-secondary-fg: #ffffff;
    --xui-secondary-bg: #e4e4e7;

    --xui-tertiary: #78716c;
    --xui-tertiary-fg: #ffffff;
    --xui-tertiary-bg: #f5f5f4;

    --xui-danger: #b91c1c;
    --xui-danger-fg: #ffffff;
    --xui-danger-bg: #fecdd3;

    --xui-warning: #d97706;
    --xui-warning-fg: #111827;
    --xui-warning-bg: #fef3c7;

    --xui-success: #16a34a;
    --xui-success-fg: #ffffff;
    --xui-success-bg: #dcfce7;

    --xui-default: #18181b;
    --xui-default-fg: #ffffff;
    --xui-default-bg: #e4e4e7;

    --xui-background: #ffffff;
    --xui-foreground: #18181b;

    --xui-spacing-xs: 4px;
    --xui-spacing-sm: 8px;
    --xui-spacing-md: 16px;
    --xui-spacing-lg: 24px;
    --xui-spacing-xl: 32px;
    --xui-spacing-2xl: 48px;
    --xui-spacing-3xl: 64px;

    --xui-radius-none: 0px;
    --xui-radius-sm: 4px;
    --xui-radius-md: 8px;
    --xui-radius-lg: 12px;
    --xui-radius-xl: 16px;
    --xui-radius-2xl: 24px;
    --xui-radius-3xl: 32px;
    --xui-radius-full: 9999px;

    --xui-border-none: 0px;
    --xui-border-xs: 0.5px;
    --xui-border-sm: 1px;
    --xui-border-md: 1.75px;
    --xui-border-lg: 2.5px;
    --xui-border-xl: 3px;

    --xui-text-xs: 12px;
    --xui-text-sm: 14px;
    --xui-text-md: 16px;
    --xui-text-lg: 18px;
    --xui-text-xl: 20px;
    --xui-text-2xl: 24px;
    --xui-text-3xl: 30px;
    --xui-text-4xl: 36px;

    --xui-font-light: 300;
    --xui-font-normal: 400;
    --xui-font-medium: 500;
    --xui-font-semibold: 600;
    --xui-font-bold: 700;
    --xui-font-extrabold: 800;

    --xui-size-xs: 38px;
    --xui-size-sm: 42px;
    --xui-size-md: 46px;
    --xui-size-lg: 50px;
  }

  [data-color-scheme='dark'] {
    --xui-primary: #d8b4fe;
    --xui-primary-fg: #3b0764;
    --xui-primary-bg: #4c1d95;

    --xui-secondary: #d4d4d8;
    --xui-secondary-fg: #3f3f46;
    --xui-secondary-bg: #52525b;

    --xui-tertiary: #fecaca;
    --xui-tertiary-fg: #500724;
    --xui-tertiary-bg: #57534e;

    --xui-danger: #fca5a5;
    --xui-danger-fg: #4c0519;
    --xui-danger-bg: #991b1b;

    --xui-warning: #fbbf24;
    --xui-warning-fg: #f9fafb;
    --xui-warning-bg: #78350f;

    --xui-success: #4ade80;
    --xui-success-fg: #f9fafb;
    --xui-success-bg: #14532d;

    --xui-default: #e7e5e4;
    --xui-default-fg: #18181b;
    --xui-default-bg: #3f3f46;

    --xui-background: #18181b;
    --xui-foreground: #e7e5e4;
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-color-scheme]) {
      --xui-primary: #d8b4fe;
      --xui-primary-fg: #3b0764;
      --xui-primary-bg: #4c1d95;

      --xui-secondary: #d4d4d8;
      --xui-secondary-fg: #3f3f46;
      --xui-secondary-bg: #52525b;

      --xui-tertiary: #fecaca;
      --xui-tertiary-fg: #500724;
      --xui-tertiary-bg: #57534e;

      --xui-danger: #fca5a5;
      --xui-danger-fg: #4c0519;
      --xui-danger-bg: #991b1b;

      --xui-warning: #fbbf24;
      --xui-warning-fg: #f9fafb;
      --xui-warning-bg: #78350f;

      --xui-success: #4ade80;
      --xui-success-fg: #f9fafb;
      --xui-success-bg: #14532d;

      --xui-default: #e7e5e4;
      --xui-default-fg: #18181b;
      --xui-default-bg: #3f3f46;

      --xui-background: #18181b;
      --xui-foreground: #e7e5e4;
    }
  }

  @keyframes xui-fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes xui-fade-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  [data-xui-state='open'] {
    animation: xui-fade-in 250ms ease forwards;
  }

  [data-xui-state='closed'] {
    animation: xui-fade-out 250ms ease forwards;
  }

  .xui-alert {
    --xui-alert-solid-bg: var(--xui-alert-main);
    --xui-alert-solid-text: #ffffff;
    --xui-alert-solid-icon-bg: color-mix(in srgb, #ffffff 16%, transparent);
    --xui-alert-flat-bg: var(--xui-alert-bg-base);
  }

  [data-color-scheme='dark'] .xui-alert {
    --xui-alert-solid-bg: var(--xui-alert-bg-base);
    --xui-alert-solid-text: var(--xui-alert-main);
    --xui-alert-solid-icon-bg: color-mix(in srgb, var(--xui-alert-main) 16%, transparent);
    --xui-alert-flat-bg: color-mix(in srgb, var(--xui-alert-bg-base) 50%, transparent);
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-color-scheme]) .xui-alert {
      --xui-alert-solid-bg: var(--xui-alert-bg-base);
      --xui-alert-solid-text: var(--xui-alert-main);
      --xui-alert-solid-icon-bg: color-mix(in srgb, var(--xui-alert-main) 16%, transparent);
      --xui-alert-flat-bg: color-mix(in srgb, var(--xui-alert-bg-base) 50%, transparent);
    }
  }
`

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

    const activeVars =
      resolvedMode === 'dark' ? { ...variables, ...darkVariables } : variables
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

  return (
    <>
      <XUIGlobalStyle />
      {children}
    </>
  )
}
