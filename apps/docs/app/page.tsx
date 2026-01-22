'use client'

import { XUIProvider } from '@xaui/web/core'
import { Progress } from '@xaui/web/progress'
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
      <div className="p-20 space-y-10">
        <Progress value={value} themeColor="danger" />

        <Progress value={value} themeColor="primary" variant="circular" />
      </div>
    </XUIProvider>
  )
}
