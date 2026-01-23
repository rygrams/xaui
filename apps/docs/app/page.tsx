'use client'

import { XUIProvider } from '@xaui/web/core'
import { Progress } from '@xaui/web/progress'
import { ActivityIndicator } from '@xaui/web/indicator'
import { useState, useEffect } from 'react'

export default function Home() {
  const [value, setValue] = useState(0.1)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => (prevValue >= 1 ? 0 : prevValue + 0.05))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <XUIProvider>
      <div className="p-20 space-y-3">
        <ActivityIndicator />
        <ActivityIndicator variant="linear" size={5} />
      </div>
    </XUIProvider>
  )
}
