'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { XUIProvider } from '@xaui/native/core'

const GEIST = 'var(--font-geist-sans, system-ui, sans-serif)'

const geistTheme = {
  fontFamilies: { body: GEIST, heading: GEIST, default: GEIST },
}

type WebPreviewProps = {
  children: ReactNode
}

export function WebPreview({ children }: WebPreviewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    import('@/lib/device-frame').then(() => setMounted(true))
  }, [])

  return (
    <div className="flex justify-center py-4">
      <style>{`
        .xui-preview {
          font-size: 0.75rem;
        }
        .xui-preview * {
          font-family: var(--font-geist-sans, system-ui, sans-serif) !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
      `}</style>

      {mounted ? (
        <device-frame
          model="iphone"
          mode="light"
          footer="bar"
          shadow=""
          padded=""
          style={
            {
              width: '280px',
              display: 'block',
              '--df-bezel': '0.5rem',
            } as React.CSSProperties
          }
        >
          <div className="xui-preview">
            <XUIProvider theme={geistTheme}>{children}</XUIProvider>
          </div>
        </device-frame>
      ) : (
        <div
          className="animate-pulse rounded-[3rem] bg-zinc-900"
          style={{ width: '280px', aspectRatio: '9/19.25' }}
        />
      )}
    </div>
  )
}
