import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { AccessibilityInfo, Platform, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Portal, useAnimationDisabled } from '@xaui/native/system'
import { ThemeContext, useXAUITheme } from '@xaui/native/theme'
import {
  enqueue,
  remove,
  startLeaving,
  startLeavingAll,
} from '../../system/toast-queue'
import { isPastVisible, stackPlaces } from '../../system/toast-stack'
import { createToastTimers } from '../../system/toast-timers'
import type { ToastTimers } from '../../system/toast-timers'
import { TramHapticsProvider, useTramHaptic } from '../../theme/tram-haptics'
import { ToastEntry } from './toast-entry'
import type { ToastEntryEvents, ToastPile } from './toast-entry'
import { ToastQueueContext } from './toast.context'
import { ToastOutletContext } from './toast.outlet'
import { TOAST_GAP, TOAST_INSET, toastLine } from './toast.recipe'
import type { ToastOptions, ToastPlacement, ToastRecord } from './toast.type'

export type ToastHostProps = {
  children?: ReactNode
  /**
   * Which edge the pile sits against.
   *
   * @default 'top'
   */
  placement?: ToastPlacement
  /**
   * How long a toast stays before it leaves, in milliseconds. `0` keeps it until it is
   * dismissed; one entry can override it.
   *
   * @default 4000
   */
  duration?: number
  /**
   * How many toasts are seen at once. Past it a toast is transparent rather than gone —
   * it is still queued, and comes into view when a place frees up.
   *
   * @default 3
   */
  maxVisible?: number
  /**
   * Whether a toast can be swiped away — toward the end, or away from the pile's edge.
   *
   * @default true
   */
  isSwipeable?: boolean
  /**
   * From the screen's edge to the first toast, in points. The host reads no safe area: the
   * app hands it the notch — `offset={insets.top}`.
   *
   * @default 0
   */
  offset?: number
  /**
   * What a screen reader calls the action that closes a toast.
   *
   * @default 'fermer'
   */
  dismissLabel?: string
}

type QueuedToast = ToastRecord & { isLeaving: boolean }

/**
 * Where toasts live. Mounted once, near the root of the app.
 *
 * It owns what one `Toast` deliberately does not know: the queue, the countdowns, and the
 * pile — the newest against the edge, the earlier ones past it. A countdown stops while a
 * finger is on its toast, and they all stop while a screen reader is on: nobody reads a
 * line that leaves by itself.
 *
 * It renders into the nearest `PortalHost`, over navigation and over what else is
 * portalled, and carries the theme it was written under there with it. A `Modal` is a
 * window over all of that: while one holds a `ToastOutlet`, the pile is drawn there.
 */
export function ToastHost({
  children,
  placement = 'top',
  duration = 4000,
  maxVisible = 3,
  isSwipeable = true,
  offset = 0,
  dismissLabel = 'fermer',
}: ToastHostProps) {
  const theme = useXAUITheme()
  const themeContext = useContext(ThemeContext)
  const haptic = useTramHaptic()
  const isStill = useAnimationDisabled()
  const [queue, setQueue] = useState<readonly QueuedToast[]>([])
  const [heights, setHeights] = useState<Readonly<Record<string, number>>>({})
  // The outlets asking for the pile, in the order they did: the last one draws it.
  const [outlets, setOutlets] = useState<readonly string[]>([])
  const seed = useId()
  const count = useRef(0)

  // Not state: a countdown is not something the pile renders.
  const timers = useRef<ToastTimers | null>(null)

  const dismiss = useCallback((id: string) => {
    timers.current?.stop(id)
    setQueue(current => startLeaving(current, id))
  }, [])

  // A countdown that ends dismisses its toast, so the timers are made once `dismiss` is.
  if (timers.current === null) timers.current = createToastTimers(dismiss)

  const dismissAll = useCallback(() => {
    timers.current?.stopAll()
    setQueue(startLeavingAll)
  }, [])

  const toast = useCallback(
    (options: ToastOptions) => {
      count.current += 1
      const id = `${seed}-${count.current}`

      // Nothing is dropped: a toast past `maxVisible` is queued and transparent, and it
      // keeps the time it was given.
      setQueue(current => enqueue(current, { ...options, id, isLeaving: false }))
      timers.current?.start(id, options.duration ?? duration)

      return id
    },
    [duration, seed]
  )

  useEffect(() => {
    const countdowns = timers.current

    return () => countdowns?.stopAll()
  }, [])

  useEffect(() => {
    // A browser does not say whether a screen reader is on, and `react-native-web`
    // answers yes to everyone: there the countdowns would never run.
    if (Platform.OS === 'web') return

    const follow = (isReading: boolean) => {
      if (isReading) timers.current?.freeze()
      else timers.current?.thaw()
    }
    AccessibilityInfo.isScreenReaderEnabled().then(follow, NOOP)
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      follow
    )

    return () => subscription.remove()
  }, [])

  const events = useMemo<ToastEntryEvents>(
    () => ({
      onHold: id => timers.current?.hold(id),
      onRelease: id => timers.current?.release(id),
      onDismiss: dismiss,
      onGone(id) {
        setQueue(current => remove(current, id))
        setHeights(({ [id]: _gone, ...others }) => others)
      },
      onHeight(id, height) {
        setHeights(current =>
          current[id] === height ? current : { ...current, [id]: height }
        )
      },
    }),
    [dismiss]
  )

  const claim = useCallback((outlet: string) => {
    setOutlets(current => [...current, outlet])

    return () => setOutlets(current => current.filter(other => other !== outlet))
  }, [])

  const api = useMemo(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  )

  const pile = useMemo<ToastPile>(
    () => ({
      placement,
      edge: offset,
      inset: theme.spacing(TOAST_INSET),
      isSwipeable,
      isStill,
      dismissLabel,
    }),
    [placement, offset, theme, isSwipeable, isStill, dismissLabel]
  )

  // A toast not measured yet counts for one line, so the pile starts making room for it
  // in the render that shows it.
  const line = toastLine(theme)
  const gap = theme.spacing(TOAST_GAP)
  const places = useMemo(
    () =>
      stackPlaces(
        queue.map(record => ({
          height: heights[record.id] ?? line,
          isLeaving: record.isLeaving,
        })),
        gap
      ),
    [queue, heights, line, gap]
  )

  const pileNode =
    queue.length > 0 ? (
      // Re-provided: the `Portal` copies this subtree into its host, which may sit above
      // the provider this host was written under.
      <ThemeContext.Provider value={themeContext}>
        <TramHapticsProvider value={haptic}>
          {/* `box-none`: the strip over the screen must not swallow presses meant for
              what is under it — only the toasts take touches. */}
          <View style={sheet.pile}>
            {queue.map((record, index) => (
              <ToastEntry
                key={record.id}
                record={record}
                place={places[index]}
                isHidden={isPastVisible(places[index].rank, maxVisible)}
                // Measured already: it is being moved to an outlet or back, not sent.
                isSettled={record.id in heights}
                pile={pile}
                events={events}
              />
            ))}
          </View>
        </TramHapticsProvider>
      </ThemeContext.Provider>
    ) : null

  const owner = outlets.length > 0 ? outlets[outlets.length - 1] : null
  const outlet = {
    // A `Modal` is outside the app's gesture root, and Android hears no gesture there
    // without one of its own.
    pile: pileNode ? (
      <GestureHandlerRootView style={sheet.pile}>{pileNode}</GestureHandlerRootView>
    ) : null,
    owner,
    claim,
  }

  return (
    <ToastQueueContext.Provider value={api}>
      <ToastOutletContext.Provider value={outlet}>
        {children}
        {pileNode && owner === null ? <Portal>{pileNode}</Portal> : null}
      </ToastOutletContext.Provider>
    </ToastQueueContext.Provider>
  )
}

const NOOP = () => {}

const sheet = StyleSheet.create({
  // Over the other portals — a dialog opened after a toast must not cover it.
  pile: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    zIndex: 1,
    pointerEvents: 'box-none',
  },
})

ToastHost.displayName = 'XAUI.Tram.ToastHost'
