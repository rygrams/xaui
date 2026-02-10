import Image from 'next/image'

export function ExpansionPanelNativeScreenshot() {
  const phones = [
    {
      title: 'Light',
      src: '/screenshots/expansion-panel-1.jpg',
      gradient: 'from-cyan-500 via-sky-500 to-blue-600',
    },
    {
      title: 'Bordered',
      src: '/screenshots/expansion-panel-2.jpg',
      gradient: 'from-fuchsia-500 via-purple-500 to-indigo-600',
    },
    {
      title: 'Splitted',
      src: '/screenshots/expansion-panel-3.jpg',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    },
  ]

  return (
    <div className="w-full bg-white px-2 py-6">
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
              <div className="flex h-[560px] w-[288px] items-center justify-center">
                <div className="relative h-[560px] w-[280px] rounded-[3rem] bg-linear-to-b from-zinc-700 via-zinc-900 to-black p-[3px] shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
                  <div className="absolute -left-[4px] top-28 h-12 w-[3px] rounded-full bg-zinc-500" />
                  <div className="absolute -left-[4px] top-44 h-16 w-[3px] rounded-full bg-zinc-500" />
                  <div className="absolute -right-[4px] top-36 h-20 w-[3px] rounded-full bg-zinc-500" />

                  <div className="relative h-full w-full rounded-[2.8rem] bg-black p-2.5">
                    <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-white">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
