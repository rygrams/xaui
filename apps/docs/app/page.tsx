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
      <div className="p-20 space-y-3">
        <Progress value={value} themeColor="danger" borderRadius={5} size={10} />
        <Progress value={value} themeColor="primary" borderRadius={5} size={10} />
        <Progress value={value} themeColor="success" borderRadius={5} size={10} />
        <Progress value={value} themeColor="warning" size={10} />
        <Progress value={value} themeColor="default" borderRadius={5} size={10} />

        <div className="flex space-x-3 mt-4">
          <Progress
            value={value}
            size={100}
            themeColor="primary"
            borderRadius={5}
            variant="circular"
          />
          <Progress
            value={value}
            size={100}
            themeColor="default"
            borderRadius={5}
            variant="circular"
          />
          <Progress
            value={value}
            size={100}
            themeColor="secondary"
            borderRadius={5}
            variant="circular"
          />
          <Progress
            value={value}
            size={100}
            themeColor="tertiary"
            borderRadius={5}
            variant="circular"
          />
        </div>
      </div>
    </XUIProvider>
  )
}
