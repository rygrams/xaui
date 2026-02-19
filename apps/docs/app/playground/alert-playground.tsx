'use client'

import { useState } from 'react'
import { Alert } from '@xaui/hybrid/alert'
import type { AlertVariant, AlertProps } from '@xaui/hybrid/alert'
import type { ThemeColor } from '@xaui/hybrid'
import { BrowserPreview } from '@/components/ui/browser-preview'

const VARIANTS: AlertVariant[] = ['flat', 'solid', 'bordered', 'faded']
const COLORS: ThemeColor[] = ['default', 'primary', 'secondary', 'danger', 'warning', 'success']

type ChipButtonProps = {
  label: string
  active: boolean
  onClick: () => void
}

function ChipButton({ label, active, onClick }: ChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export function AlertPlayground() {
  const [variant, setVariant] = useState<AlertVariant>('flat')
  const [color, setColor] = useState<ThemeColor>('primary')
  const [isClosable, setIsClosable] = useState(false)
  const [hideIcon, setHideIcon] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  const alertProps: AlertProps = {
    title: 'Alert title',
    description: 'A hybrid web alert with CSS animations and Tailwind v4.',
    themeColor: color,
    variant,
    isClosable,
    hideIcon,
    isVisible: showAlert,
    onVisibleChange: setShowAlert,
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_auto]">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Variant
          </p>
          <div className="flex flex-wrap gap-2">
            {VARIANTS.map(v => (
              <ChipButton key={v} label={v} active={variant === v} onClick={() => setVariant(v)} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(c => (
              <ChipButton key={c} label={c} active={color === c} onClick={() => setColor(c)} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border accent-foreground"
              checked={isClosable}
              onChange={e => setIsClosable(e.target.checked)}
            />
            <span className="text-sm">Closable</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border accent-foreground"
              checked={hideIcon}
              onChange={e => setHideIcon(e.target.checked)}
            />
            <span className="text-sm">Hide icon</span>
          </label>
        </div>

        {!showAlert && (
          <button
            type="button"
            onClick={() => setShowAlert(true)}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            Reset alert
          </button>
        )}
      </div>

      <BrowserPreview>
        <div className="p-4">
          <Alert {...alertProps} />
        </div>
      </BrowserPreview>
    </div>
  )
}

export function AlertAllColors({ variant }: { variant: AlertVariant }) {
  return (
    <BrowserPreview>
      <div className="space-y-2 p-4">
        {COLORS.map(c => (
          <Alert
            key={c}
            title={c.charAt(0).toUpperCase() + c.slice(1)}
            description={`${variant} · ${c}`}
            themeColor={c}
            variant={variant}
          />
        ))}
      </div>
    </BrowserPreview>
  )
}
