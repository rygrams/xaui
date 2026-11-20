import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import type { GestureResponderEvent, TextStyle, View } from 'react-native'
import { useControllableState, usePressState } from '@xaui/native'
import {
  PressableFeedback,
  containsElementOfType,
  useAnimationDisabled,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentPaintFor } from '../../system/accent-paint'
import { PressTilt } from '../../system/press-tilt'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { tramAccents } from '../../theme/tram-tokens'
import { DEFAULT_SIZE, DEFAULT_VARIANT } from '../button/button.recipe'
import { MorphButtonCollapsed, MorphButtonExpanded } from './morph-button-face'
import { MorphButtonProvider } from './morph-button.context'
import { useMorphMotion } from './morph-button.hook'
import { morphButtonRecipe } from './morph-button.recipe'
import type { MorphButtonProps } from './morph-button.type'

/**
 * A Tram `Button` that opens into a card: the same box grows to the width it is given and
 * keeps its fill, the title Light inside it.
 *
 * ```tsx
 * <MorphButton alignSelf="flex-start">
 *   <MorphButton.Collapsed>
 *     <MorphButton.Label>nouveau thème</MorphButton.Label>
 *   </MorphButton.Collapsed>
 *
 *   <MorphButton.Expanded>
 *     <MorphButton.Title>nouveau thème</MorphButton.Title>
 *     <MorphButton.Description>
 *       Partir de l'accent actuel, puis tout régler page par page.
 *     </MorphButton.Description>
 *   </MorphButton.Expanded>
 * </MorphButton>
 * ```
 *
 * **One box, two contents.** The pressable is the shape that travels, exactly one face is
 * mounted, and a layout transition carries the box between the two sizes. Nothing is
 * measured. The press is the Tram tilt; the colours never change.
 *
 * **No `childrenToString`**, as in Native: a bare string could belong to either face, and
 * wrapping it into the closed one would build a button that opens onto an empty card.
 */
export const MorphButtonRoot = forwardRef<View, MorphButtonProps>(
  function MorphButton(
    {
      children,
      variant = DEFAULT_VARIANT,
      size = DEFAULT_SIZE,
      radius,
      accent,
      color,
      isExpanded: controlledExpanded,
      defaultExpanded = false,
      onExpandedChange,
      animation = true,
      isDisabled = false,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      hitSlop,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const [isPressed, press] = usePressState({
      // Felt as the finger lands, with the tilt — not on release, when it is already over.
      onPressIn: event => {
        haptic('press')
        onPressIn?.(event)
      },
      onPressOut,
    })
    const [isExpanded, setExpanded] = useControllableState({
      value: controlledExpanded,
      defaultValue: defaultExpanded,
      onChange: onExpandedChange,
    })

    const selection = { variant, size, radius }
    // No `pressed` state: the colours do not move under the finger.
    const states = { disabled: isDisabled }

    const styles = morphButtonRecipe.resolve({ theme, selection, states })
    // The `Button`'s rule: a named accent is the true colour where it fills and the mode's
    // ink where it is read; a raw `color` is the caller's word and is never corrected.
    const named =
      accent && !color
        ? accentPaintFor(tramAccents[accent], variant, theme.colors.background)
        : undefined
    const paint = color ?? named?.tint
    // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
    const tint = paint
      ? morphButtonRecipe.tint({ theme, color: paint, selection, states })
      : undefined
    const ink = isDisabled ? undefined : named?.label

    // An ancestor's `disable-all` stills it as `animation={false}` does.
    const isDisableAll = useAnimationDisabled()
    const isStill = animation === false || isDisableAll
    const motion = useMorphMotion(animation, isStill)

    /**
     * Reanimated plays `entering` on the first mount as well, so without this every
     * button on a screen would fade its face in as the screen arrived — and on the web
     * render hidden until the worklet started. A face animates from the second shape on.
     * A ref, not state: the only render that must read it right is the one the shape's
     * own change caused.
     */
    const hasMorphed = useRef(false)

    useEffect(() => {
      hasMorphed.current = true
    }, [isExpanded])

    const toggle = useCallback(() => {
      if (isDisabled) return
      setExpanded(current => !current)
    }, [isDisabled, setExpanded])

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        toggle()
      },
      [onPress, toggle]
    )

    const hasFaceMotion = !isStill && hasMorphed.current

    const context = useMemo(() => {
      const inked = ink ? { color: ink } : undefined
      const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon, inked])

      return {
        collapsedStyle: styles.collapsed,
        expandedStyle: styles.expanded,
        labelStyle: [styles.label, tint?.label, inked],
        titleStyle: [styles.title, tint?.title, inked],
        descriptionStyle: [styles.description, tint?.description, inked],
        icon: {
          size: icon.fontSize,
          color: typeof icon.color === 'string' ? icon.color : undefined,
        },
        isExpanded,
        toggle,
        isDisabled,
        animation: hasFaceMotion,
        motion: motion.faces,
      }
    }, [styles, tint, ink, isExpanded, toggle, isDisabled, hasFaceMotion, motion])

    // Most general to most specific: the cached recipe, the tint, the style props, `style`.
    const rootStyle = [
      styles.root,
      tint?.root,
      styleProps,
      typeof style === 'function' ? style({ pressed: isPressed }) : style,
    ]

    if (
      !asChild &&
      !containsElementOfType(children, MorphButtonCollapsed) &&
      !containsElementOfType(children, MorphButtonExpanded)
    ) {
      warnDev(
        'Tram MorphButton: neither a `MorphButton.Collapsed` nor a ' +
          '`MorphButton.Expanded` is composed, so both shapes are empty. The two faces ' +
          'are the API — a bare string cannot be wrapped, it could belong to either.'
      )
    }

    // Closed it is drawn at the `Button`'s height; `sm` is under the 48 touch target.
    const reach = touchReach(theme.controlHeights[size])

    const rootProps = {
      ref,
      isPressed,
      isDisabled,
      asChild,
      // Native's scale, highlight and ripple stay off: the press is the Tram tilt.
      animation: false,
      accessibilityRole,
      // Merged, not spread over: a caller adding `selected` must not drop `expanded`.
      accessibilityState: {
        expanded: isExpanded,
        disabled: isDisabled,
        ...accessibilityState,
      },
      hitSlop: hitSlop ?? reach,
      ...rest,
      style: rootStyle,
      onPress: handlePress,
      // After `rest`, and composed: the caller's handlers run inside these.
      onPressIn: press.onPressIn,
      onPressOut: press.onPressOut,
      children,
    }

    return (
      <MorphButtonProvider value={context}>
        {isStill ? (
          // Still, it is a plain pressable: no tilt and no travel.
          <PressableFeedback {...rootProps} />
        ) : (
          <PressTilt
            {...rootProps}
            // The box that travels is this node: a transition on a wrapper would animate
            // the wrapper while the pressable inside it already sat at its final size.
            layout={motion.layout}
            // A face may hold a control of its own — a button that closes the card — so
            // the box lets a touch through to it and measures the lean from the page.
            hasInteractiveContent
          />
        )}
      </MorphButtonProvider>
    )
  }
)

MorphButtonRoot.displayName = 'XAUI.Tram.MorphButton.Root'
