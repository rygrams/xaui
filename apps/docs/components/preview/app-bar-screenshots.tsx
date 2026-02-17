'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const screenshots = [
  { src: '/screenshots/app-bar-1.jpg', alt: 'AppBar preview 1' },
  { src: '/screenshots/app-bar-2.jpg', alt: 'AppBar preview 2' },
] as const

export function AppBarScreenshots() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
      <div className="flex gap-4 flex-col md:flex-row justify-start items-center">
        {screenshots.map(item => (
          <Dialog key={item.src}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="w-full max-w-64 cursor-pointer overflow-hidden rounded-2xl border-4 border-gray-300 transition hover:border-gray-400"
                aria-label={`Open ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl p-2 flex items-center justify-center">
              <div className="w-full max-w-76 overflow-hidden rounded-2xl border-4 border-gray-300">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
