'use client'

import { XUIProvider } from '@xaui/core/theme'
import { Progress } from '@xaui/web'

export default function Home() {
  return (
    <XUIProvider>
      <Progress value={0.5} />
    </XUIProvider>
  )
}
