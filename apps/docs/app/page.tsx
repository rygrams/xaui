'use client'

import { XUIProvider } from '@xaui/web/core'
import { Progress } from '@xaui/web/progress'
import { useState, useEffect } from 'react'

export default function Home() {
  const [value, setValue] = useState(0.1)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => prevValue + 0.01)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <XUIProvider>
      <div className="p-20">
        <Progress value={1} />
      </div>
    </XUIProvider>
  )
}
