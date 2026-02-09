'use client'

import { ReactNode } from 'react'

interface PhonePreviewProps {
  children: ReactNode
}

export function PhonePreview({ children }: PhonePreviewProps) {
  return (
    <div className="flex justify-center py-10">
      <div className="relative rounded-[2.25rem] bg-linear-to-br from-cyan-400 via-sky-500 to-emerald-500 p-8 shadow-[0_30px_70px_rgba(14,116,144,0.35)]">
        <div className="pointer-events-none absolute -left-6 top-10 h-24 w-24 rounded-full bg-white/25 blur-2xl" />
        <div className="pointer-events-none absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-blue-900/25 blur-2xl" />

        {/* Phone Frame */}
        <div className="relative h-[660px] w-[330px] rounded-[3.2rem] bg-linear-to-b from-zinc-700 via-zinc-900 to-black p-[3px] shadow-[0_25px_50px_rgba(0,0,0,0.55)]">
          {/* Side Buttons */}
          <div className="absolute -left-[4px] top-28 h-12 w-[3px] rounded-full bg-zinc-500" />
          <div className="absolute -left-[4px] top-44 h-16 w-[3px] rounded-full bg-zinc-500" />
          <div className="absolute -right-[4px] top-36 h-20 w-[3px] rounded-full bg-zinc-500" />

          <div className="relative h-full w-full rounded-[3rem] bg-black p-3">
            {/* Screen */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.55rem] bg-white ring-1 ring-white/10">
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-3 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black shadow-inner" />

              {/* Content */}
              <div className="h-full w-full pt-10">{children}</div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-3 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white/35" />
        </div>
      </div>
    </div>
  )
}
