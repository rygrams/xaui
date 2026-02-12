'use client'

import { useState } from 'react'
import { ExternalLink, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

type Platform = 'ios' | 'android' | 'myDevice'

type SnackPreviewProps = {
  code: string
  dependencies?: Record<string, string>
  platform?: Platform
  theme?: 'light' | 'dark'
  height?: number
}

const XAUI_DEPS: Record<string, string> = {
  '@xaui/native': '0.0.27',
  'react-native-svg': '15.8.0',
}

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'myDevice', label: 'My Device' },
]

export function SnackPreview({
  code,
  dependencies = {},
  platform: initialPlatform = 'ios',
  theme = 'light',
  height = 500,
}: SnackPreviewProps) {
  const [platform, setPlatform] = useState<Platform>(initialPlatform)

  const deps = { ...XAUI_DEPS, ...dependencies }

  // Embedded iframe uses comma-separated pkg@version
  const embeddedDepsParam = encodeURIComponent(
    Object.entries(deps)
      .map(([pkg, version]) => `${pkg}@${version}`)
      .join(',')
  )

  // Full Snack page uses JSON-encoded dependencies
  const openDepsParam = encodeURIComponent(JSON.stringify(deps))

  const codeParam = encodeURIComponent(code)

  const snackUrl =
    `https://snack.expo.dev/embedded?` +
    `preview=true&platform=${platform}&theme=${theme}` +
    `&sdkVersion=54.0.0` +
    `&dependencies=${embeddedDepsParam}` +
    `&code=${codeParam}`

  const openUrl =
    `https://snack.expo.dev/?` +
    `platform=${platform}&theme=${theme}` +
    `&sdkVersion=54.0.0` +
    `&dependencies=${openDepsParam}` +
    `&code=${codeParam}`

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-1 rounded-md border bg-background p-0.5">
          {PLATFORMS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPlatform(value)}
              className={cn(
                'flex items-center gap-1 rounded px-2.5 py-0.5 text-xs font-medium transition-colors',
                platform === value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {value === 'myDevice' && <Smartphone className="h-3 w-3" />}
              {label}
            </button>
          ))}
        </div>
        <a
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>Open in Expo Snack</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <iframe
        key={`${platform}-${theme}`}
        src={snackUrl}
        style={{ width: '100%', height: `${height}px`, border: 0 }}
        title="Expo Snack Preview"
        allow="geolocation; camera; microphone"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
    </div>
  )
}
