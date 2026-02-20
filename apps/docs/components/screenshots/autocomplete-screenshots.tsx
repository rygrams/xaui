import Image from 'next/image'

const screenshots = [
  { src: '/screenshots/autocomplete-1.jpg', alt: 'Autocomplete preview 1' },
  { src: '/screenshots/autocomplete-2.jpg', alt: 'Autocomplete preview 2' },
  { src: '/screenshots/autocomplete-3.jpg', alt: 'Autocomplete preview 3' },
  { src: '/screenshots/autocomplete-4.jpg', alt: 'Autocomplete preview 4' },
] as const

export function AutocompleteScreenshots() {
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
