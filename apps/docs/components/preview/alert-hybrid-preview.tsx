'use client'

import { useState } from 'react'
import { Alert } from '@xaui/hybrid/alert'
import type { AlertVariant } from '@xaui/hybrid/alert'
import type { ThemeColor } from '@xaui/hybrid'
import { FlatPhonePreview } from '@/components/ui/flat-phone-preview'

const COLORS: ThemeColor[] = ['primary', 'success', 'warning', 'danger']
const VARIANTS: AlertVariant[] = ['flat', 'solid', 'bordered', 'faded']

export function AlertHybridPreview() {
  const [variant, setVariant] = useState<AlertVariant>('flat')

  return (
    <div className="space-y-4">
      <FlatPhonePreview>
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

      <div className="flex justify-center gap-2">
        {VARIANTS.map(v => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={[
              'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
              variant === v
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground',
            ].join(' ')}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}
