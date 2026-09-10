'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createTheme, XAUIProvider } from '@xaui/native/theme'
import { nativeDemoRegistry } from './native-demo-registry.generated'

/**
 * The screen is rendered at a phone's own point size and scaled to whatever width the
 * frame gets, instead of letting one CSS pixel be one point.
 *
 * A demo laid out in a 320-pixel frame reads every component at 320 points wide — a
 * width no phone has — so a button sized for 390 points fills far more of the screen
 * than it does on a device. Rendering at 390×844 and scaling the whole screen by one
 * factor keeps text, spacing and touch targets in the ratio a real iPhone shows them.
 */
const DEVICE = { width: 390, height: 844 }

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
  const [scale, setScale] = useState(1)
  const screen = useRef<HTMLDivElement>(null)
  const Demo = nativeDemoRegistry[demoId]

  useEffect(() => {
    import('@/lib/device-frame').then(() => setMounted(true))
  }, [])

  // Before paint, so the first frame is already at scale rather than snapping to it.
  useLayoutEffect(() => {
    const node = screen.current
    if (!node) return

    const measure = () => setScale(node.clientWidth / DEVICE.width)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [mounted])

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
                '--df-ar': `${DEVICE.width}/${DEVICE.height}`,
                '--df-bezel': '0',
                '--df-radius': '2.25rem',
              } as React.CSSProperties
            }
          >
            <div className="native-preview-screen" ref={screen}>
              {/* GestureHandlerRootView's flex only bounds the demo when its HTML parent
                  participates in flex layout. That bound is what makes ScrollView scroll. */}
              <div
                style={{
                  display: 'flex',
                  width: DEVICE.width,
                  height: DEVICE.height,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <XAUIProvider colorMode={mode} theme={docsTheme}>
                    <Demo />
                  </XAUIProvider>
                </GestureHandlerRootView>
              </div>
            </div>
          </device-frame>
        ) : (
          <div className="aspect-[390/844] w-full max-w-[320px] animate-pulse rounded-[2.25rem] bg-zinc-900" />
        )}
      </div>
    </div>
  )
}
