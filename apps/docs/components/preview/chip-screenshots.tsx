'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const screenshots = [
  { src: '/screenshots/chip-1.jpg', alt: 'Chip preview dark mode' },
  { src: '/screenshots/chip-2.jpg', alt: 'Chip preview light mode' },
] as const

export function ChipScreenshots() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Preview</h2>
      <div className="grid grid-cols-2 gap-3 md:flex md:flex-row md:gap-4 md:items-start">
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
                  width={1080}
                  height={2340}
                  className="h-auto w-full"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl p-2 flex items-center justify-center">
              <div className="overflow-hidden rounded-2xl border-4 border-gray-300">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1080}
                  height={2340}
                  className="block max-h-[80dvh] w-auto"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
