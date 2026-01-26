'use client'

import { XUIProvider } from '@xaui/hybrid/core'
import { Button } from '@xaui/hybrid/button'

export default function Home() {

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
