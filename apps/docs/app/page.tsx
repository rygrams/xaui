'use client'

import { XUIProvider } from '@xaui/hybrid/core'
import { Button } from '@xaui/hybrid/button'

export default function Home() {
  return (
    <XUIProvider>
      <div className="p-20 space-y-3 w-full">
        <Button themeColor="primary" fullWidth>
          Button
        </Button>
      </div>
    </XUIProvider>
  )
}
