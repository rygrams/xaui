import Image from 'next/image'

const screenshots = [
  { src: '/screenshots/card-1.jpg', alt: 'Card preview light mode - cover image and overlay' },
  { src: '/screenshots/card-2.jpg', alt: 'Card preview light mode - profile and theme colors' },
  { src: '/screenshots/card-3.jpg', alt: 'Card preview dark mode - basic and theme colors' },
  { src: '/screenshots/card-4.jpg', alt: 'Card preview dark mode - elevation and pressable' },
] as const

export function CardScreenshots() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Preview</h2>
      <div className="flex flex-col items-center md:items-start md:flex-row gap-4 overflow-x-auto">
        {screenshots.map(item => (
          <div key={item.src} className="overflow-hidden rounded-2xl shrink-0 border-4 border-gray-200">
            <Image
              src={item.src}
              alt={item.alt}
              width={300}
              height={650}
              className="block object-cover object-top"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
