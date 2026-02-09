'use client'

import { ReactNode } from 'react'

interface PhonePreviewProps {
  children: ReactNode
}

export function PhonePreview({ children }: PhonePreviewProps) {
  return (
    <div className="flex justify-center py-8">
      <div className="relative">
        {/* Phone Frame */}
        <div className="relative w-[320px] h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />

            {/* Content */}
            <div className="w-full h-full pt-10">{children}</div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  )
}
