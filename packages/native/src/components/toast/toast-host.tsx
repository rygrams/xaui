import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { ReactNode } from 'react'
import Animated from 'react-native-reanimated'
import { Portal } from '../../system/portal'
import { useXAUITheme } from '../../theme/theme-hooks'
import { toastEntering, toastExiting } from './toast.animation'
import { ToastDismissContext, ToastQueueContext } from './toast.context'
import type { ToastOptions, ToastPlacement, ToastRecord } from './toast.type'

export type ToastHostProps = {
  children?: ReactNode
  /** Which edge the stack sits against. */
  placement?: ToastPlacement
  /**
   * How long a toast stays before it leaves, in milliseconds. `0` keeps it until it is
   * dismissed; one entry can override it.
   *
   * @default 4000
   */
  duration?: number
  /**
   * How many are shown at once. Past it the **oldest** goes, because the newest is the one
   * that just happened and the reader is looking for it.
   *
   * @default 3
   */
  limit?: number
}

/**
 * Where toasts live. Mounted once, near the root of the app.
 *
 * It owns the three things one `Toast` deliberately does not know: the queue, the timers,
 * and what is stacked under it. That split is what lets a caller replace the card entirely
 * — `render` returns whatever they like — without the queue caring what it looks like.
 *
 * It renders into the nearest `PortalHost`, so the stack sits over navigation rather than
 * inside whatever screen happened to ask for it.
 */
export function ToastHost({
  children,
  placement = 'bottom',
  duration = 4000,
  limit = 3,
}: ToastHostProps) {
  const theme = useXAUITheme()
  const [records, setRecords] = useState<readonly ToastRecord[]>([])
  const seed = useId()
  const count = useRef(0)

  // Kept in a ref rather than in state: a timer is not something the stack renders, and
  // clearing one must not schedule another render on the way out.
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
    setRecords(current => current.filter(record => record.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    for (const timer of timers.current.values()) clearTimeout(timer)
    timers.current.clear()
    setRecords([])
  }, [])

  const toast = useCallback(
    (options: ToastOptions) => {
      count.current += 1
      const id = `${seed}-${count.current}`
      const life = options.duration ?? duration

      setRecords(current => {
        const next = [...current, { ...options, id }]
        // The oldest goes, not the newest: the newest is the one that just happened, and
        // the reader is looking for it.
        const dropped = next.slice(0, Math.max(next.length - limit, 0))
        for (const record of dropped) {
          const timer = timers.current.get(record.id)
          if (timer) clearTimeout(timer)
          timers.current.delete(record.id)
        }
        return next.slice(-limit)
      })

      if (life > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), life)
        )
      }

      return id
    },
    [dismiss, duration, limit, seed]
  )

  const queue = useMemo(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  )

  const stack = {
    ...sheet.stack,
    ...(placement === 'top' ? { top: 0 } : { bottom: 0 }),
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    // Newest nearest the edge it came from, so the eye finds it without reading the pile.
    flexDirection:
      placement === 'top' ? ('column-reverse' as const) : ('column' as const),
  }

  return (
    <ToastQueueContext.Provider value={queue}>
      {children}
      {records.length > 0 ? (
        <Portal>
          {/* `box-none` so the strip over the screen's edge does not swallow presses meant
              for whatever is under it — only the cards themselves take touches. */}
          <View pointerEvents="box-none" style={stack}>
            {records.map(record => (
              <Animated.View
                key={record.id}
                pointerEvents="box-none"
                entering={toastEntering(placement)}
                exiting={toastExiting(placement)}
              >
                <ToastDismissContext.Provider value={() => dismiss(record.id)}>
                  {record.render({ dismiss: () => dismiss(record.id) })}
                </ToastDismissContext.Provider>
              </Animated.View>
            ))}
          </View>
        </Portal>
      ) : null}
    </ToastQueueContext.Provider>
  )
}

const sheet = StyleSheet.create({
  stack: { position: 'absolute', start: 0, end: 0 },
})

ToastHost.displayName = 'XAUI.ToastHost'
