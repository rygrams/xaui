import Image from 'next/image'

const screenshots = [
  { src: '/screenshots/timepicker-1.jpg', alt: 'TimePicker preview light mode' },
  { src: '/screenshots/timepicker-2.jpg', alt: 'TimePicker preview dark mode' },
  { src: '/screenshots/timepicker-3.jpg', alt: 'TimePicker preview trigger mode' },
] as const

export function TimepickerScreenshots() {
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
