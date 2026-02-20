import Image from 'next/image'

const screenshots = [
  { src: '/screenshots/datepicker-1.jpg', alt: 'DatePicker preview light mode - calendar open' },
  { src: '/screenshots/datepicker-2.jpg', alt: 'DatePicker preview light mode - theme colors' },
  { src: '/screenshots/datepicker-3.jpg', alt: 'DatePicker preview dark mode - theme colors' },
  { src: '/screenshots/datepicker-4.jpg', alt: 'DatePicker preview dark mode - calendar open' },
] as const

export function DatepickerScreenshots() {
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
