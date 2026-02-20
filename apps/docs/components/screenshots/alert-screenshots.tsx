import Image from 'next/image'

const screenshots = [
  { src: '/screenshots/alert-1.jpg', alt: 'Alert preview 1' },
  { src: '/screenshots/alert-2.jpg', alt: 'Alert preview 2' },
  { src: '/screenshots/alert-3.jpg', alt: 'Alert preview 3' },
] as const

export function AlertScreenshots() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Preview</h2>
      <div className="overflow-x-auto flex flex-col items-center md:items-start md:flex-row gap-4">
        {screenshots.map(item => (
          <div
            key={item.src}
            className="overflow-hidden rounded-2xl shrink-0 border-4 border-gray-200"
          >
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
