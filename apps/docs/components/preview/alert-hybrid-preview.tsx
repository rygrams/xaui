'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Alert } from '@xaui/hybrid/alert'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'colors' | 'variants' | 'closable'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  {
    value: 'colors',
    title: 'Theme Colors',
    description: 'Default, primary, success, warning, danger',
  },
  {
    value: 'variants',
    title: 'Variants',
    description: 'Flat, solid, bordered, faded',
  },
  {
    value: 'closable',
    title: 'Closable',
    description: 'Dismissible alerts with close button',
  },
]

function ColorsDemo({ isDark }: { isDark: boolean }) {
  const bg = isDark ? '#18181b' : '#ffffff'

  return (
    <div
      style={{
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: bg,
        fontSize: '0.9em',
      }}
    >
      <Alert
        title="Default"
        description="This is a default alert message."
        themeColor="default"
        variant="flat"
      />
      <Alert
        title="Primary"
        description="This is a primary alert message."
        themeColor="primary"
        variant="flat"
      />
      <Alert
        title="Success"
        description="Operation completed successfully."
        themeColor="success"
        variant="flat"
      />
      <Alert
        title="Warning"
        description="Please review before continuing."
        themeColor="warning"
        variant="flat"
      />
      <Alert
        title="Danger"
        description="Something went wrong. Please try again."
        themeColor="danger"
        variant="flat"
      />
    </div>
  )
}

function VariantsDemo({ isDark }: { isDark: boolean }) {
  const bg = isDark ? '#18181b' : '#ffffff'

  return (
    <div
      style={{
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: bg,
        fontSize: '0.9em',
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          color: isDark ? '#a1a1aa' : '#71717a',
          margin: 0,
        }}
      >
        Flat
      </p>
      <Alert
        title="Flat Variant"
        description="A subtle container background with themed colors."
        themeColor="primary"
        variant="flat"
      />

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          color: isDark ? '#a1a1aa' : '#71717a',
          margin: '8px 0 0',
        }}
      >
        Solid
      </p>
      <Alert
        title="Solid Variant"
        description="A strong, filled background for emphasis."
        themeColor="primary"
        variant="solid"
      />

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          color: isDark ? '#a1a1aa' : '#71717a',
          margin: '8px 0 0',
        }}
      >
        Bordered
      </p>
      <Alert
        title="Bordered Variant"
        description="Minimal with a colored border outline."
        themeColor="primary"
        variant="bordered"
      />

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          color: isDark ? '#a1a1aa' : '#71717a',
          margin: '8px 0 0',
        }}
      >
        Faded
      </p>
      <Alert
        title="Faded Variant"
        description="Semi-transparent background for a softer look."
        themeColor="primary"
        variant="faded"
      />

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          color: isDark ? '#a1a1aa' : '#71717a',
          margin: '16px 0 0',
        }}
      >
        All Variants — Success
      </p>
      <Alert
        title="Flat"
        description="Success flat"
        themeColor="success"
        variant="flat"
      />
      <Alert
        title="Solid"
        description="Success solid"
        themeColor="success"
        variant="solid"
      />
      <Alert
        title="Bordered"
        description="Success bordered"
        themeColor="success"
        variant="bordered"
      />
      <Alert
        title="Faded"
        description="Success faded"
        themeColor="success"
        variant="faded"
      />
    </div>
  )
}

function ClosableDemo({ isDark }: { isDark: boolean }) {
  const bg = isDark ? '#18181b' : '#ffffff'
  const [alerts, setAlerts] = useState({
    info: true,
    success: true,
    warning: true,
    danger: true,
  })

  const handleClose = (key: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [key]: false }))
  }

  const handleReset = () => {
    setAlerts({ info: true, success: true, warning: true, danger: true })
  }

  return (
    <div
      style={{
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: bg,
        fontSize: '0.9em',
      }}
    >
      <button
        type="button"
        onClick={handleReset}
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#6b21a8',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          marginBottom: 4,
          textAlign: 'left',
        }}
      >
        Reset all alerts
      </button>

      {alerts.info && (
        <Alert
          title="Info"
          description="You can dismiss this alert."
          themeColor="default"
          variant="flat"
          isClosable
          onClose={() => handleClose('info')}
        />
      )}
      {alerts.success && (
        <Alert
          title="Saved!"
          description="Your changes have been saved."
          themeColor="success"
          variant="flat"
          isClosable
          onClose={() => handleClose('success')}
        />
      )}
      {alerts.warning && (
        <Alert
          title="Warning"
          description="Your session will expire in 5 minutes."
          themeColor="warning"
          variant="bordered"
          isClosable
          onClose={() => handleClose('warning')}
        />
      )}
      {alerts.danger && (
        <Alert
          title="Error"
          description="Failed to save changes. Please retry."
          themeColor="danger"
          variant="solid"
          isClosable
          onClose={() => handleClose('danger')}
        />
      )}

      {!alerts.info && !alerts.success && !alerts.warning && !alerts.danger && (
        <p
          style={{
            fontSize: 13,
            color: isDark ? '#a1a1aa' : '#71717a',
            textAlign: 'center',
            padding: 20,
          }}
        >
          All alerts dismissed. Click &quot;Reset all alerts&quot; to bring them
          back.
        </p>
      )}
    </div>
  )
}

export function AlertHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('colors')

  const isDark = colorScheme === 'dark'

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto]">
      <div className="space-y-4">
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

        <div className="overflow-hidden rounded-xl border">
          {SCENARIOS.map((opt, i) => (
            <label
              key={opt.value}
              className={[
                'flex cursor-pointer items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40',
                scenario === opt.value ? 'bg-muted/40' : '',
                i < SCENARIOS.length - 1 ? 'border-b' : '',
              ].join(' ')}
            >
              <input
                type="radio"
                name="alert-scenario"
                value={opt.value}
                checked={scenario === opt.value}
                onChange={() => setScenario(opt.value)}
                className="mt-0.5 shrink-0 accent-foreground"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{opt.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {opt.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <DeviceFrame colorScheme={colorScheme}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scenario}-${colorScheme}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ minHeight: '100%' }}
          >
            {scenario === 'colors' && <ColorsDemo isDark={isDark} />}
            {scenario === 'variants' && <VariantsDemo isDark={isDark} />}
            {scenario === 'closable' && <ClosableDemo isDark={isDark} />}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}
