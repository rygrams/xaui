'use client'

import { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createTheme, XAUIProvider } from '@xaui/native/theme'
import { nativeDemoRegistry } from './native-demo-registry.generated'

const docsTheme = createTheme({
  fontFamilies: {
    body: 'var(--font-geist-sans, system-ui, sans-serif)',
    heading: 'var(--font-geist-sans, system-ui, sans-serif)',
    mono: 'var(--font-geist-mono, ui-monospace, monospace)',
  },
})

type NativePreviewClientProps = {
  componentId: string
  demoId: string
}

export function NativePreviewClient({
  componentId,
  demoId,
}: NativePreviewClientProps) {
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const Demo = nativeDemoRegistry[demoId]

  useEffect(() => {
    import('@/lib/device-frame').then(() => setMounted(true))
  }, [])

  if (!Demo) return null

  return (
    <div className="native-preview rounded-2xl border bg-[radial-gradient(circle_at_top,_var(--color-muted),_transparent_68%)] p-3 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">React Native Web preview</p>
          <p className="text-xs text-muted-foreground">
            The same verification screen the Expo app runs.
          </p>
        </div>
        <div className="flex rounded-lg border bg-background p-1 text-xs">
          <button
            className={`rounded-md px-2.5 py-1.5 ${mode === 'light' ? 'bg-muted font-medium' : ''}`}
            onClick={() => setMode('light')}
          >
            Light
          </button>
          <button
            className={`rounded-md px-2.5 py-1.5 ${mode === 'dark' ? 'bg-muted font-medium' : ''}`}
            onClick={() => setMode('dark')}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {mounted ? (
          <device-frame
            aria-label={`${componentId} demo`}
            footer="bar"
            mode={mode}
            shadow=""
            statusbar="none"
            style={
              {
                display: 'block',
                width: 'min(100%, 320px)',
                '--df-bezel': '0',
                '--df-radius': '2.25rem',
              } as React.CSSProperties
            }
          >
            <div className="native-preview-screen">
              <GestureHandlerRootView style={{ flex: 1 }}>
                <XAUIProvider colorMode={mode} theme={docsTheme}>
                  <Demo />
                </XAUIProvider>
              </GestureHandlerRootView>
            </div>
          </device-frame>
        ) : (
          <div className="aspect-[9/19.25] w-full max-w-[320px] animate-pulse rounded-[2.25rem] bg-zinc-900" />
        )}
      </div>
    </div>
  )
}
