import { forwardRef, useCallback, useContext, useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import type { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native'
import {
  childrenToString,
  containsElementOfType,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { colorOf } from '../../system/style-values'
import { ButtonSurfaceContext } from '../button/button.context'
import { ToastDescription } from './toast-description'
import { ToastPressable } from './toast-pressable'
import { ToastTitle } from './toast-title'
import { ToastEntryContext, ToastProvider } from './toast.context'
import { useAnnouncement } from './toast.hook'
import { DEFAULT_VARIANT, toastRecipe } from './toast.recipe'
import type { ToastProps, ToastSpokenPart } from './toast.type'

/**
 * One notice, drawn as Metro's: a flat rectangle of the accent, its text in the ink that
 * reads on it, on one line.
 *
 * ```tsx
 * toast({
 *   render: () => (
 *     <Toast variant="success" onPress={open}>
 *       <Toast.Title>enregistré</Toast.Title>
 *       <Toast.Description>vos modifications sont sur le serveur</Toast.Description>
 *       <Toast.Actions>
 *         <Toast.Close asChild><Button>fermer</Button></Toast.Close>
 *       </Toast.Actions>
 *     </Toast>
 *   ),
 * })
 * ```
 *
 * **It is presentational.** It does not know it is in a queue, when it will leave, or what
 * is stacked under it — the `ToastHost` owns all three, and the way in, the swipe and the
 * way out with them. Outside a host it still renders, with a dismiss that does nothing.
 *
 * A `Button` inside it is drawn as text in the toast's ink unless it says otherwise.
 */
export const ToastRoot = forwardRef<View, ToastProps>(function Toast(
  {
    children,
    variant = DEFAULT_VARIANT,
    radius,
    accent,
    color,
    onPress,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const entry = useContext(ToastEntryContext)
  const isInheritedStill = useAnimationDisabled()
  const isStill = isInheritedStill || (entry?.isStill ?? false)
  const dismiss = entry?.dismiss ?? NOOP
  const dismissLabel = entry?.dismissLabel

  // A bare string is the title: a toast is a row of slots, and text needs one to be in.
  const text = childrenToString(children)
  const content = text === null ? children : <ToastTitle>{text}</ToastTitle>
  // Said once: a toast the pile only moved to another window is not a new one.
  const isArriving = entry !== null && !entry.isMoved

  const isTitleOnly = !containsElementOfType(children, ToastDescription)
  const styles = toastRecipe.resolve({
    theme,
    selection: { variant, radius, isTitleOnly: isTitleOnly ? 'true' : undefined },
  })

  // A named accent or a raw colour repaints the rectangle with its true colour — a fill is
  // never the accent read as ink — and the text follows with the ink that reads on it.
  const fill = flatPaint({ accent, color })
  const themedInk =
    colorOf(StyleSheet.flatten<TextStyle>(styles.title), 'color') ??
    theme.colors.accentForeground
  const ink = fill ? inkOn(fill, themedInk) : themedInk

  const spoken = useRef<Record<ToastSpokenPart, string | null>>({
    title: null,
    description: null,
  })
  const report = useCallback((part: ToastSpokenPart, text: string | null) => {
    spoken.current[part] = text
  }, [])

  const label = rest.accessibilityLabel ?? rest['aria-label']
  useAnnouncement(isArriving, () => {
    const { title, description } = spoken.current

    return label ?? [title, description].filter(Boolean).join(', ')
  })

  // The press as a screen reader makes it: there is no touch to hand the caller.
  const activate = useMemo(
    () => (onPress ? () => onPress(NO_TOUCH) : undefined),
    [onPress]
  )

  const context = useMemo(() => {
    const inked = { color: ink }

    return {
      titleStyle: [styles.title, inked],
      descriptionStyle: [styles.description, inked],
      actionsStyle: styles.actions,
      ink,
      dismiss,
      dismissLabel,
      activate,
      report,
    }
  }, [styles, ink, dismiss, dismissLabel, activate, report])

  const surface = useMemo(() => ({ variant: 'text' as const, color: ink }), [ink])

  // What cannot wait is an alert, and interrupts; the rest is a status, and takes its turn.
  const isUrgent = variant === 'danger' || variant === 'warning'

  // The fill, as drawn — the recipe's, the paint, or what the caller's style set — so the
  // band past the toast's edge is the same colour as the toast.
  const rootStyle = [
    styles.root,
    fill ? { backgroundColor: fill } : undefined,
    styleProps,
    style,
  ]
  const ground = colorOf(StyleSheet.flatten<ViewStyle>(rootStyle), 'backgroundColor')
  const bleed = entry?.bleed ?? 0
  const band =
    bleed > 0 && ground ? (
      <View
        style={[
          sheet.band,
          { height: bleed, backgroundColor: ground },
          entry?.bleedSide === 'bottom' ? { bottom: -bleed } : { top: -bleed },
        ]}
      />
    ) : null

  const box = {
    role: isUrgent ? ('alert' as const) : ('status' as const),
    // Announced when it arrives rather than when the reader reaches it — a toast that
    // waits its turn in the reading order has usually gone by the time it is read.
    accessibilityLiveRegion: liveRegionFor(isUrgent, entry?.isMoved ?? false),
    onAccessibilityEscape: entry ? dismiss : undefined,
    ...rest,
    // Most general to most specific: the cached recipe, the paint, the style props, `style`.
    style: rootStyle,
  }

  return (
    <ButtonSurfaceContext.Provider value={surface}>
      <ToastProvider value={context}>
        {/* Two components rather than a branch in one: a toast with no `onPress` is not
            pressable at all, and never reaches the press's shared value. */}
        {onPress ? (
          <ToastPressable ref={ref} {...box} isStill={isStill} onPress={onPress}>
            {band}
            {content}
          </ToastPressable>
        ) : (
          <View ref={ref} {...box}>
            {band}
            {content}
          </View>
        )}
      </ToastProvider>
    </ButtonSurfaceContext.Provider>
  )
})

const sheet = StyleSheet.create({
  // Out of the row's flow, so it takes no gap and changes no height the pile measures.
  band: { position: 'absolute', start: 0, end: 0, pointerEvents: 'none' },
})

/** Stable, so a `Toast` outside a host does not rebuild its context every render. */
const NOOP = () => {}

/**
 * Android reads a live region when it appears. One that was moved appears again, and has
 * been read.
 */
function liveRegionFor(isUrgent: boolean, isMoved: boolean) {
  if (isMoved) return 'none' as const

  return isUrgent ? ('assertive' as const) : ('polite' as const)
}

/**
 * What a screen reader's press hands the caller: no touch, and the methods a handler may
 * call on one without looking — each doing nothing.
 */
const NO_TOUCH = {
  nativeEvent: {},
  preventDefault: () => {},
  stopPropagation: () => {},
  persist: () => {},
  isDefaultPrevented: () => false,
  isPropagationStopped: () => false,
} as unknown as GestureResponderEvent

ToastRoot.displayName = 'XAUI.Tram.Toast.Root'
