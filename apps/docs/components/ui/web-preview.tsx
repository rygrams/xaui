'use client'

import { type ReactNode } from 'react'
import { XUIProvider } from '@xaui/native/core'

type WebPreviewProps = {
  children: ReactNode
  height?: number
}

export function WebPreview({ children, height = 500 }: WebPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-muted-foreground">Preview</span>
      </div>
      <div
        className="flex items-start justify-center bg-background p-6"
        style={{ minHeight: height }}
      >
        <XUIProvider>{children}</XUIProvider>
      </div>
    </div>
  )
}
