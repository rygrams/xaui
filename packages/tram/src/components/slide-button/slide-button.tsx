import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import type {
  AccessibilityActionEvent,
  LayoutChangeEvent,
  TextStyle,
  View,
} from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import {
  childrenToString,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { colorOf } from '../../system/style-values'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { LINE_WIDTH } from '../button/button.recipe'
import { SlideButtonFill } from './slide-button-fill'
import { SlideButtonLabel } from './slide-button-label'
import { SlideButtonThumb } from './slide-button-thumb'
import { SlideButtonProvider } from './slide-button.context'
import {
  DEFAULT_SIZE,
  SLIDE_BUTTON_SIZES,
  THUMB_INSET,
  slideButtonRecipe,
  thumbWidthFor,
} from './slide-button.recipe'
import { thresholdOf, travelOf } from './slide-button.travel'
import type { SlideButtonProps } from './slide-button.type'

const ACTIONS = [{ name: 'activate' }]

type KeyEvent = { key: string; preventDefault: () => void }

/**
 * A button you drag rather than tap — the Native `SlideButton`'s API, drawn as the Metro
 * lock screen: a rectangle in the `Button`'s line, a block of the accent at its start, and
 * a slide toward the end that fills the whole box with the accent once it counts.
 *
 * ```tsx
 * <SlideButton onConfirm={reset}>réinitialiser le thème</SlideButton>
 *
 * <SlideButton accent="red" onConfirm={wipe}>
 *   <SlideButton.Fill />
 *   <SlideButton.Label>glisser pour effacer</SlideButton.Label>
 *   <SlideButton.Thumb>
 *     <SlideButton.Icon as={TrashIcon} />
 *   </SlideButton.Thumb>
 * </SlideButton>
 * ```
 *
 * Let go short of `threshold` and the thumb springs home. Past it, `onConfirm` fires once,
 * the box fills with the accent, the label turns to the colour that reads on it and the
 * thumb inverts, a check in place of the chevron. Uncontrolled, it stays so; pass
 * `isConfirmed` and set it back to `false` to re-arm it.
 *
 * The grab is felt as a `press`, the confirmation as a `longPress` — through
 * `TramProvider`'s `onHaptic`, when the app gave it one.
 *
 * **A bare string is the whole component**: it composes the trail, the label and the
 * thumb. Write the slots out to leave the trail off or to put a mark in the thumb.
 */
export const SlideButtonRoot = forwardRef<View, SlideButtonProps>(
  function SlideButton(
    {
      children,
      size = DEFAULT_SIZE,
      radius,
      accent,
      color,
      threshold,
      isConfirmed: controlledConfirmed,
      defaultConfirmed = false,
      onConfirm,
      isDisabled = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onLayout,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const animate = useTramMotion()
    const glide = useTramEase()
    const isStill = useAnimationDisabled()

    const [trackLength, setTrackLength] = useState(0)
    // Counts the drags let go. A controlled slide may refuse the confirmation, and the
    // thumb then has to come home from the end although `confirmed` never moved.
    const [releases, setReleases] = useState(0)
    const offset = useSharedValue(0)

    const [confirmed, setConfirmed] = useControllableState({
      value: controlledConfirmed,
      defaultValue: defaultConfirmed,
    })

    const done = useSharedValue(confirmed ? 1 : 0)

    const reach = thresholdOf(threshold)
    const thumbSize = thumbWidthFor(size, theme)
    const travel = travelOf(trackLength, {
      inset: THUMB_INSET,
      thumbWidth: thumbSize,
    })

    const selection = { size, radius }
    const states = { disabled: isDisabled }

    const styles = slideButtonRecipe.resolve({ theme, selection, states })
    // The accent is a block here, so a named one is its true colour. Uncached: a raw tint
    // must stay out of the cache key.
    const paint = flatPaint({ accent, color })
    const tint = paint
      ? slideButtonRecipe.tint({ theme, color: paint, selection, states })
      : undefined
    // What reads on the accent is `onAccent`'s black or white, not the tint's own
    // derivation — black on lime, amber and yellow. A disabled box is grey whatever it was.
    const onPaint =
      paint && !isDisabled ? inkOn(paint, theme.colors.accentForeground) : undefined

    const confirm = useCallback(() => {
      if (confirmed || isDisabled) return
      haptic('longPress')
      setConfirmed(true)
      onConfirm?.()
    }, [confirmed, isDisabled, haptic, setConfirmed, onConfirm])

    const grab = useCallback(() => haptic('press'), [haptic])

    const release = useCallback(
      (reached: boolean) => {
        if (reached) confirm()
        setReleases(count => count + 1)
      },
      [confirm]
    )

    // The thumb follows the state on the UI thread: to the end when confirmed, home when
    // re-armed or refused. A spring to a target, so a re-arm mid-way turns it round.
    // `travel` is a dependency because it is zero until the box has been laid out.
    useEffect(() => {
      const target = confirmed ? travel : 0
      offset.value = isStill ? target : animate(target)
    }, [confirmed, travel, releases, isStill, animate, offset])

    // The fill-in has a set length rather than a target a finger moves: a curve, which
    // reduced motion shortens to the same fade.
    useEffect(() => {
      const target = confirmed ? 1 : 0
      done.value = isStill ? target : glide(target)
    }, [confirmed, isStill, glide, done])

    const measure = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        // Laid out from inside the line, like every child of the box.
        setTrackLength(Math.max(event.nativeEvent.layout.width - LINE_WIDTH * 2, 0))
      },
      [onLayout]
    )

    const face = StyleSheet.flatten<TextStyle>([styles.face, tint?.face])
    const faceColor = colorOf(face, 'backgroundColor') ?? theme.colors.accent
    const line = colorOf(StyleSheet.flatten<TextStyle>([styles.root]), 'borderColor')

    const context = useMemo(() => {
      const ink = onPaint ? { color: onPaint } : undefined
      const inverse = onPaint ? { backgroundColor: onPaint } : undefined
      const labelDone = StyleSheet.flatten<TextStyle>([
        styles.labelDone,
        tint?.labelDone,
        ink,
      ])
      const thumb = StyleSheet.flatten<TextStyle>([styles.thumb, tint?.thumb])
      const thumbDone = StyleSheet.flatten<TextStyle>([
        styles.thumbDone,
        tint?.thumbDone,
        inverse,
      ])
      const inks = {
        label:
          colorOf(StyleSheet.flatten<TextStyle>([styles.label]), 'color') ??
          theme.colors.foreground,
        labelDone: colorOf(labelDone, 'color') ?? theme.colors.accentForeground,
        thumb: colorOf(thumb, 'backgroundColor') ?? theme.colors.accent,
        thumbDone:
          colorOf(thumbDone, 'backgroundColor') ?? theme.colors.accentForeground,
      }

      return {
        fillStyle: [styles.fill, tint?.fill],
        labelStyle: styles.label,
        thumbStyle: styles.thumb,
        glyphStyle: [
          styles.glyph,
          tint?.glyph,
          onPaint ? { borderColor: onPaint } : undefined,
        ],
        checkStyle: [styles.check, tint?.check],
        inks,
        icon: {
          size: theme.fontSizes[SLIDE_BUTTON_SIZES[size].glyph],
          // The colour that reads on the accent. `SlideButton.Icon` cross-fades it to the
          // accent itself as the thumb inverts, on the same progress as the thumb.
          color: inks.thumbDone,
        },
        offset,
        done,
        travel,
        thumbSize,
        inset: THUMB_INSET,
        threshold: reach,
        isDisabled,
        isConfirmed: confirmed,
        isStill,
        reach: {
          horizontal: touchReach(thumbSize),
          vertical: touchReach(theme.controlHeights[size] - LINE_WIDTH * 2),
        },
        grab,
        release,
        confirm,
        trackLength,
      }
    }, [
      styles,
      tint,
      onPaint,
      theme,
      size,
      confirmed,
      offset,
      done,
      travel,
      thumbSize,
      reach,
      isDisabled,
      isStill,
      grab,
      release,
      confirm,
      trackLength,
    ])

    const lineRest = line ?? theme.colors.foreground
    const lined = useAnimatedStyle(() => {
      'worklet'
      return {
        borderColor: interpolateColor(done.value, [0, 1], [lineRest, faceColor]),
      }
    }, [done, lineRest, faceColor])

    const filled = useAnimatedStyle(() => {
      'worklet'
      return { opacity: done.value }
    }, [done])

    // Someone using a screen reader cannot drag: the activate action is the way in. An
    // action rather than an `onPress`, so the box is still not tappable-to-confirm for
    // everyone else — which is the whole point of it.
    const handleAction = (event: AccessibilityActionEvent) => {
      if (event.nativeEvent.actionName === 'activate') confirm()
    }

    // The same way in for a keyboard: on the web the box is a tab stop, and Enter or the
    // space bar confirms it.
    const handleKey = (event: KeyEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      confirm()
    }
    const web =
      Platform.OS === 'web'
        ? {
            onKeyDown: handleKey,
            tabIndex: isDisabled ? (-1 as const) : (0 as const),
          }
        : undefined

    const text = childrenToString(children)

    // No `asChild`, for the reason Native's has none: this is a structural container —
    // a box that measures itself and owns the drag's shared values — not a single node
    // to merge into a caller's element. `style` and the style props reshape it.
    return (
      <SlideButtonProvider value={context}>
        <Animated.View
          ref={ref}
          accessible
          accessibilityRole={accessibilityRole}
          // Merged, not spread over: a caller naming another state must not drop these.
          accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
          accessibilityActions={ACTIONS}
          onAccessibilityAction={handleAction}
          {...web}
          {...rest}
          onLayout={measure}
          // Most general to most specific: the cached recipe, the tint, the line's
          // colour on its way to the accent, the style props, `style`.
          style={[styles.root, tint?.root, lined, styleProps, style]}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.face, tint?.face, filled]}
          />
          {text !== null ? (
            <>
              <SlideButtonFill />
              <SlideButtonLabel>{text}</SlideButtonLabel>
              <SlideButtonThumb />
            </>
          ) : (
            children
          )}
        </Animated.View>
      </SlideButtonProvider>
    )
  }
)

SlideButtonRoot.displayName = 'XAUI.Tram.SlideButton.Root'
