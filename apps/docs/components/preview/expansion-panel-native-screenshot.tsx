import Image from 'next/image'

export function ExpansionPanelNativeScreenshot() {
  const phones = [
    {
      title: 'Light',
      src: '/screenshots/expansion-panel-1.jpeg',
      gradient: 'from-cyan-500 via-sky-500 to-blue-600',
    },
    {
      title: 'Bordered',
      src: '/screenshots/expansion-panel-2.jpeg',
      gradient: 'from-fuchsia-500 via-purple-500 to-indigo-600',
    },
    {
      title: 'Splitted',
      src: '/screenshots/expansion-panel-3.jpeg',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    },
  ]

  return (
    <div className="w-full bg-white px-2 pt-6 pb-3">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 md:grid-cols-3">
        {phones.map((phone, index) => (
          <div
            key={phone.title}
            className={`flex min-h-[650px] flex-col items-center rounded-[2rem] bg-linear-to-br ${phone.gradient} p-4 shadow-[0_26px_54px_rgba(0,0,0,0.25)]`}
          >
            <p className="mb-3 text-center text-base font-semibold tracking-tight text-white">
              {phone.title}
            </p>

            <div className="flex flex-1 items-center justify-center">
              <div className="relative h-[560px] w-[280px] overflow-hidden rounded-[2rem] border-2 border-zinc-200 bg-white shadow-[0_20px_45px_rgba(0,0,0,0.28)]">
                <Image
                  src={phone.src}
                  alt={`ExpansionPanel ${phone.title} screenshot`}
                  width={540}
                  height={1170}
                  className="h-full w-full object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
