'use client'

import { XUIProvider } from '@xaui/web/core'
import { Progress } from '@xaui/web'

export default function Home() {
  return (
    <XUIProvider>
      <Progress value={0.5} />
    </XUIProvider>
  )
}
