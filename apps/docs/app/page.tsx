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
      <div className="p-20 space-y-3 w-full">
        <Button
          themeColor="primary"
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          }
          fullWidth
        >
          Button
        </Button>
      </div>
    </XUIProvider>
  )
}
