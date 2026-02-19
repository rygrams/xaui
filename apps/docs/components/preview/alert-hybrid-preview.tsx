'use client'

import { useState } from 'react'
import { Alert } from '@xaui/hybrid/alert'
import type { AlertVariant } from '@xaui/hybrid/alert'
import type { ThemeColor } from '@xaui/hybrid'
import { FlatPhonePreview } from '@/components/ui/flat-phone-preview'

const COLORS: ThemeColor[] = ['primary', 'success', 'warning', 'danger']

type VariantOption = {
  value: AlertVariant
  title: string
  description: string
}

const VARIANT_OPTIONS: VariantOption[] = [
  {
    value: 'flat',
    title: 'Flat',
    description: 'Transparent background with a subtle color wash',
  },
  {
    value: 'solid',
    title: 'Solid',
    description: 'Opaque solid color fills the alert container',
  },
  {
    value: 'bordered',
    title: 'Bordered',
    description: 'Transparent background with a visible colored border',
  },
  {
    value: 'faded',
    title: 'Faded',
    description: 'Lightly tinted background combined with a colored border',
  },
]

type ColorScheme = 'light' | 'dark'

export function AlertHybridPreview() {
  const [variant, setVariant] = useState<AlertVariant>('flat')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto]">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border">
          {VARIANT_OPTIONS.map((option, i) => (
            <label
              key={option.value}
              className={[
                'flex cursor-pointer items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40',
                variant === option.value ? 'bg-muted/40' : '',
                i < VARIANT_OPTIONS.length - 1 ? 'border-b' : '',
              ].join(' ')}
            >
              <input
                type="radio"
                name="alert-variant"
                value={option.value}
                checked={variant === option.value}
                onChange={() => setVariant(option.value)}
                className="mt-0.5 shrink-0 accent-foreground"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{option.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{option.description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-2">
          {(['light', 'dark'] as ColorScheme[]).map(scheme => (
            <button
              key={scheme}
              type="button"
              onClick={() => setColorScheme(scheme)}
              className={[
                'rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                colorScheme === scheme
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground',
              ].join(' ')}
            >
              {scheme}
            </button>
          ))}
        </div>
      </div>

      <FlatPhonePreview colorScheme={colorScheme}>
        <div className="space-y-2 p-4">
          {COLORS.map(color => (
            <Alert
              key={color}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
              description="Hybrid web alert — @xaui/hybrid"
              themeColor={color}
              variant={variant}
            />
          ))}
        </div>
      </FlatPhonePreview>
    </div>
  )
}
