import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native'
import { useSharedValue, withSpring } from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { DEFAULT_THRESHOLD, THUMB_SPRING } from './slide-button.animation'
import { SlideButtonProvider } from './slide-button.context'
import { slideButtonRecipe } from './slide-button.recipe'
import { SlideButtonFill } from './slide-button-fill'
import { SlideButtonLabel } from './slide-button-label'
import { SlideButtonThumb } from './slide-button-thumb'
import type { SlideButtonProps } from './slide-button.type'

/**
 * A button you drag rather than tap, for the action that should not happen by accident:
 * slide the thumb to the far end and it fires once. Below the threshold it springs home.
 *
 * ```tsx
 * <SlideButton onConfirm={unlock}>Slide to confirm</SlideButton>
 *
 * <SlideButton variant="danger" onConfirm={wipe}>
 *   <SlideButton.Fill />
 *   <SlideButton.Label>Slide to delete</SlideButton.Label>
 *   <SlideButton.Thumb>
 *     <SlideButton.Icon as={TrashIcon} />
 *   </SlideButton.Thumb>
 * </SlideButton>
 * ```
 *
 * **It is the `Slider`'s gesture without the value.** The thumb runs the same pan on the
 * same optional `react-native-gesture-handler` peer, the track measures its own length
 * the same way, and the travel is inset by the thumb at each end for the same reason —
 * but there is no `min`, `max` or `step`, because the only positions that mean anything
 * are "not yet" and "done".
 *
 * **Once confirmed it stays confirmed.** Uncontrolled, a slide is a one-shot. Pass
 * `isConfirmed` to drive it — set it back to `false` and the thumb springs home, re-armed.
 *
 * **A bare string is the whole component.** `<SlideButton>Slide</SlideButton>` composes
 * the fill, the label and the thumb for you; write the slots out to put a mark in the
 * thumb or leave the fill off.
 */
export const SlideButtonRoot = forwardRef<View, SlideButtonProps>(
  function SlideButton(
    {
      children,
      variant,
      size,
      radius,
      color,
      threshold = DEFAULT_THRESHOLD,
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
    const [trackLength, setTrackLength] = useState(0)
    const offset = useSharedValue(0)
    // A caller can pass anything; the gesture divides by it and compares against it.
    const reach = Math.min(Math.max(threshold, 0), 1)

    const [confirmed, setConfirmed] = useControllableState({
      value: controlledConfirmed,
      defaultValue: defaultConfirmed,
    })

    const selection = { variant, size, radius }
    const states = { disabled: isDisabled }
    const styles = slideButtonRecipe.resolve({ theme, selection, states })
    const tint = color
      ? slideButtonRecipe.tint({ theme, color, selection, states })
      : undefined

    // Read off the resolved style rather than recomputed: the handle's width and its
    // inset are what the travel is shortened by at each end, and they have to be the same
    // numbers the recipe drew or the handle overhangs the pill.
    const thumb = StyleSheet.flatten<ViewStyle>([styles.thumb])
    const thumbSize = typeof thumb.width === 'number' ? thumb.width : 0
    const inset = typeof thumb.start === 'number' ? thumb.start : 0
    const travel = Math.max(trackLength - thumbSize - inset * 2, 0)

    const confirm = useCallback(() => {
      setConfirmed(true)
      onConfirm?.()
    }, [onConfirm, setConfirmed])

    // The thumb follows the confirmed state on the UI thread: to the end when it is set,
    // home when it is cleared. `travel` is a dependency because it is zero until the pill
    // has been laid out — a button that mounts `defaultConfirmed` has to catch up once the
    // real length arrives.
    useEffect(() => {
      offset.set(withSpring(confirmed ? travel : 0, THUMB_SPRING))
    }, [confirmed, travel, offset])

    const measure = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        setTrackLength(event.nativeEvent.layout.width)
      },
      [onLayout]
    )

    const context = useMemo(() => {
      const glyph = StyleSheet.flatten<ViewStyle>([styles.glyph, tint?.glyph])

      // The swept copy is laid out inside a clip that keeps narrowing, so it cannot take
      // the `end` inset the resting label does — it is handed the pill's own width less
      // both insets instead. Read off the resolved style for the same reason the travel is:
      // any other number and the two copies stop sitting on the same glyphs.
      const labelInset = StyleSheet.flatten<TextStyle>([styles.label]).start
      const sweptWidth = Math.max(
        trackLength - (typeof labelInset === 'number' ? labelInset : 0) * 2,
        0
      )

      return {
        fillClipStyle: styles.fillClip,
        fillStyle: tint ? [styles.fill, tint.fill] : styles.fill,
        labelStyle: tint ? [styles.label, tint.label] : styles.label,
        labelSweptStyle: [
          styles.labelSwept,
          tint?.labelSwept,
          { width: sweptWidth },
        ],
        thumbStyle: styles.thumb,
        glyphStyle: tint ? [styles.glyph, tint.glyph] : styles.glyph,
        icon: {
          size: typeof glyph.width === 'number' ? glyph.width : undefined,
          // The chevron is on the surface-coloured handle, so its colour is the theme's
          // foreground and not the variant's — `color` (R7) stays on the pill.
          color: theme.colors.foreground,
        },
        offset,
        travel,
        thumbSize,
        threshold: reach,
        isDisabled,
        isConfirmed: confirmed,
        confirm,
        trackLength,
      }
    }, [
      styles,
      tint,
      theme.colors.foreground,
      offset,
      travel,
      thumbSize,
      reach,
      isDisabled,
      confirmed,
      confirm,
      trackLength,
    ])

    const text = childrenToString(children)

    // No `asChild`, for the reason the `Slider` root has none: this is a structural
    // container — a fixed-height bar that measures itself, holds absolutely-placed
    // children and owns the pan's shared value — not a single node to merge into a
    // caller's element. `style` and the R14 props are the way to reshape it.
    return (
      <SlideButtonProvider value={context}>
        <View
          ref={ref}
          accessibilityRole={accessibilityRole}
          accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
          // Someone using a screen reader cannot drag. The activate action is the way in,
          // and it is an action rather than an `onPress` so the control is still not
          // tappable-to-confirm for everyone else — which is the whole point of it.
          accessibilityActions={[{ name: 'activate' }]}
          onAccessibilityAction={event => {
            if (event.nativeEvent.actionName === 'activate' && !isDisabled) confirm()
          }}
          {...rest}
          onLayout={measure}
          style={[styles.root, tint?.root, styleProps, style]}
        >
          {text !== null ? (
            <>
              <SlideButtonFill />
              <SlideButtonLabel>{text}</SlideButtonLabel>
              <SlideButtonThumb />
            </>
          ) : (
            children
          )}
        </View>
      </SlideButtonProvider>
    )
  }
)

SlideButtonRoot.displayName = 'XAUI.SlideButton.Root'
