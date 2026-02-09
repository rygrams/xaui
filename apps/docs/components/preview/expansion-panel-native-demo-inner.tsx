'use client'

import { useState } from 'react'

export function ExpansionPanelNativeDemoInner() {
  const [openKey, setOpenKey] = useState<string>('what-is-xaui')

  const items = [
    {
      key: 'what-is-xaui',
      title: 'What is Xaui?',
      content:
        'Xaui is a modern React Native UI library inspired by Flutter, designed to help you build beautiful and consistent mobile applications.',
    },
    {
      key: 'key-features',
      title: 'Key Features',
      content:
        'Flutter-inspired API\nSmooth animations with Reanimated\nComplete design system\nTypeScript support',
    },
    {
      key: 'getting-started',
      title: 'Getting Started',
      content:
        'Install Xaui using npm or yarn, wrap your app with XUIProvider, and start building with our comprehensive component library.',
    },
  ]

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      {items.map(item => {
        const isOpen = openKey === item.key
        return (
          <div key={item.key} className="border-b border-zinc-200 last:border-b-0">
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left"
              onClick={() => setOpenKey(isOpen ? '' : item.key)}
              type="button"
            >
              <span className="text-sm font-medium text-zinc-900">{item.title}</span>
              <span
                aria-hidden="true"
                className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-90' : ''}`}
              >
                ▶
              </span>
            </button>
            {isOpen ? (
              <div className="px-4 pb-4 whitespace-pre-line text-sm leading-6 text-zinc-600">
                {item.content}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
