'use client'

import { XUIProvider } from '@xaui/web/core'
import { useState, useEffect } from 'react'
import { Button } from '@xaui/web/button'
import { ActivityIndicator } from '@xaui/web/indicator'

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
        <ActivityIndicator variant="circular" size={8} showTrack themeColor="secondary" />

        <Button themeColor="primary" isLoading className="w-100">
          Button
        </Button>
      </div>
    </XUIProvider>
  )
}
