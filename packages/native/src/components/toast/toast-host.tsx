import { useCallback, useId, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Portal } from '../../system/portal'
import { useXAUITheme } from '../../theme/theme-hooks'
import { STACK_TIMING, toastEntering, toastExiting } from './toast.animation'
import { ToastDismissContext, ToastQueueContext } from './toast.context'
import type { ToastOptions, ToastPlacement, ToastRecord } from './toast.type'
import { toastStackStyle } from './toast.utils'

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
   * How many cards are visible at once. Past it a card is transparent rather than gone —
   * it is still queued, and dismissing the front one promotes it into view.
   *
   * @default 3
   */
  maxVisible?: number
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
  maxVisible = 3,
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

      // Nothing is dropped. A card past `maxVisible` is transparent, not discarded, so a
      // burst of six shows all six as the ones in front expire — and every one of them
      // keeps the timer it was given rather than dying with the record.
      setRecords(current => [...current, { ...options, id }])

      if (life > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), life)
        )
      }

      return id
    },
    [dismiss, duration, seed]
  )

  const queue = useMemo(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  )

  // Every card is anchored to the same edge and pushed back by its transform alone — the
  // pile costs the height of one card however many are in it, which is the whole point of
  // stacking rather than listing. The strip fills the portal so the cards have something
  // to be absolute inside.
  const inset = theme.spacing(4)
  const entry = {
    ...sheet.entry,
    start: inset,
    end: inset,
    ...(placement === 'top' ? { top: inset } : { bottom: inset }),
  }

  return (
    <ToastQueueContext.Provider value={queue}>
      {children}
      {records.length > 0 ? (
        <Portal>
          {/* `box-none` so the strip over the screen's edge does not swallow presses meant
              for whatever is under it — only the cards themselves take touches. */}
          <View pointerEvents="box-none" style={sheet.stack}>
            {/* Oldest first, so the newest is painted last and lands on top without a
                zIndex — the one thing the reader is looking for is the one in front. */}
            {records.map((record, index) => (
              <ToastStackEntry
                key={record.id}
                depth={records.length - 1 - index}
                placement={placement}
                maxVisible={maxVisible}
                style={entry}
              >
                <ToastDismissContext.Provider value={() => dismiss(record.id)}>
                  {record.render({ dismiss: () => dismiss(record.id) })}
                </ToastDismissContext.Provider>
              </ToastStackEntry>
            ))}
          </View>
        </Portal>
      ) : null}
    </ToastQueueContext.Provider>
  )
}

/**
 * One card in the pile, at the depth the stack put it.
 *
 * A component rather than a branch in the map, because the animated style is a hook and a
 * hook cannot be called per iteration. It reads the three numbers in JS and animates them
 * on the UI thread, so a dismissal slides the whole pile forward by one instead of
 * snapping it.
 */
function ToastStackEntry({
  children,
  depth,
  placement,
  maxVisible,
  style,
}: {
  children: ReactNode
  depth: number
  placement: ToastPlacement
  maxVisible: number
  style: StyleProp<ViewStyle>
}) {
  const { translateY, scale, opacity } = toastStackStyle(
    depth,
    placement,
    maxVisible
  )

  const stacking = useAnimatedStyle(
    () => ({
      opacity: withTiming(opacity, STACK_TIMING),
      transform: [
        { translateY: withTiming(translateY, STACK_TIMING) },
        { scale: withTiming(scale, STACK_TIMING) },
      ],
    }),
    [translateY, scale, opacity]
  )

  return (
    <Animated.View
      // `none` past the last visible card: a transparent card is still a target, and a
      // press meant for the front one must not land on something nobody can see.
      pointerEvents={opacity === 0 ? 'none' : 'box-none'}
      entering={toastEntering(placement)}
      exiting={toastExiting(placement)}
      style={[style, stacking]}
    >
      {children}
    </Animated.View>
  )
}

const sheet = StyleSheet.create({
  stack: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 },
  entry: { position: 'absolute' },
})

ToastHost.displayName = 'XAUI.ToastHost'
