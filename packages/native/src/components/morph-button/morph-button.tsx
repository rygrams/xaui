import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import type { GestureResponderEvent, TextStyle, View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { containsElementOfType } from '../../utils/children'
import { warnDev } from '../../utils/warn-dev'
import { MORPH_SPRING, morphTransition } from './morph-button.animation'
import { MorphButtonCollapsed, MorphButtonExpanded } from './morph-button-face'
import { MorphButtonProvider } from './morph-button.context'
import { morphButtonRecipe } from './morph-button.recipe'
import type { MorphButtonProps } from './morph-button.type'

/**
 * A button that changes shape: a pill at rest, a card once it is open.
 *
 * ```tsx
 * <MorphButton alignSelf="flex-start">
 *   <MorphButton.Collapsed>
 *     <MorphButton.Label>Primary</MorphButton.Label>
 *   </MorphButton.Collapsed>
 *
 *   <MorphButton.Expanded>
 *     <MorphButton.Title>Primary</MorphButton.Title>
 *     <MorphButton.Description>
 *       High-contrast inverted surface for floating buttons over app content.
 *     </MorphButton.Description>
 *   </MorphButton.Expanded>
 * </MorphButton>
 * ```
 *
 * **One box, two contents.** The pressable is the shape that travels, and exactly one face
 * is mounted at a time — so the box takes its size from whichever that is, and Reanimated's
 * layout transition animates it between the two. Nothing is measured, which is what lets a
 * card whose sentence arrives from the network grow with it.
 *
 * **One corner for both shapes**, half the collapsed height: at that height it is exactly a
 * pill, and on the taller card it is a corner in proportion to the control's scale.
 *
 * **No `childrenToString`** (R3), and it is the one component that legitimately skips it: a
 * bare string could belong to either face, and auto-wrapping it into the collapsed one
 * would build a button that morphs into an empty card. The two faces are the API.
 *
 * `useMorphButton().toggle` is what a control *inside* a face is written against — a close
 * button on the card that costs no state of its own.
 */
export const MorphButtonRoot = forwardRef<View, MorphButtonProps>(
  function MorphButton(
    {
      children,
      variant,
      size,
      radius,
      color,
      isExpanded: controlledExpanded,
      defaultExpanded = false,
      onExpandedChange,
      animation = true,
      isDisabled = false,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
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
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })
    const [isExpanded, setExpanded] = useControllableState({
      value: controlledExpanded,
      defaultValue: defaultExpanded,
      onChange: onExpandedChange,
    })

    const selection = { variant, size, radius }
    const states = { pressed: isPressed, disabled: isDisabled }

    const styles = morphButtonRecipe.resolve({ theme, selection, states })
    // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
    // letting one into the key would grow the table with the colours users invent.
    const tint = color
      ? morphButtonRecipe.tint({ theme, color, selection, states })
      : undefined

    /**
     * Reanimated runs an `entering` animation on the **first** mount as well as on every
     * later one, so without this every button on a screen would fade its collapsed face in
     * as the screen arrived — and on the web it would render `visibility: hidden` until the
     * worklet started. A face fades from the second shape onwards; the first one is simply
     * there.
     *
     * A ref rather than state: the value is read while rendering the context, and the only
     * render it needs to be correct in is the one where the shape changes — which is a
     * render the shape's own state already caused.
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

    /**
     * The builder, rebuilt only when the caller retunes it — a new one on every render
     * would hand Reanimated a different transition each time the press state moved.
     *
     * The three named one by one rather than spread: the builder takes them as calls, and
     * a partial object has no arm of that chain to match.
     */
    const transition = useMemo(() => {
      if (animation === false) return undefined

      const tuned =
        animation === true ? MORPH_SPRING : { ...MORPH_SPRING, ...animation }

      return morphTransition(tuned)
    }, [animation])

    const context = useMemo(() => {
      const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon])

      return {
        collapsedStyle: styles.collapsed,
        expandedStyle: styles.expanded,
        labelStyle: tint ? [styles.label, tint.label] : styles.label,
        titleStyle: tint ? [styles.title, tint.title] : styles.title,
        descriptionStyle: tint
          ? [styles.description, tint.description]
          : styles.description,
        icon: {
          size: icon.fontSize,
          // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot
          // hand to a third-party component expecting a string.
          color: typeof icon.color === 'string' ? icon.color : undefined,
        },
        isExpanded,
        toggle,
        isDisabled,
        animation: animation !== false && hasMorphed.current,
      }
    }, [styles, tint, isExpanded, toggle, isDisabled, animation])

    // The resolution order of §2 ter, most general to most specific: the cached recipe, the
    // uncached tint, the style props, then `style` — the last word.
    //
    // R9 — `style` may be `Pressable`'s function form. The root owns the press state, so it
    // resolves the function here instead of forwarding it and losing the styles inside.
    const rootStyle = [
      styles.root,
      tint?.root,
      styleProps,
      typeof style === 'function' ? style({ pressed: isPressed }) : style,
    ]

    // A button with one face is a button that morphs into nothing, and the box it leaves
    // behind is empty rather than broken — so it renders, and says nothing, unless this
    // does. Under `asChild` the single child is the caller's, and the faces are inside it.
    if (
      !asChild &&
      !containsElementOfType(children, MorphButtonCollapsed) &&
      !containsElementOfType(children, MorphButtonExpanded)
    ) {
      warnDev(
        'MorphButton: neither a `MorphButton.Collapsed` nor a `MorphButton.Expanded` is ' +
          'composed, so one of the two shapes is empty. The two faces are the API — a ' +
          'bare string cannot be auto-wrapped, because it could belong to either.'
      )
    }

    return (
      <MorphButtonProvider value={context}>
        {/* No `PressableFeedback.Highlight` and no `.Ripple`: the recipe's `pressed` state
            already paints the variant's own pressed colour, and an overlay on top of it
            would darken the control twice. The scale is the root's own. */}
        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          // The box that travels is this node. A transition on a wrapper would animate the
          // wrapper while the pressable inside it sat at its final size.
          layout={transition}
          accessibilityRole={accessibilityRole}
          // Merged, not spread over: a caller adding `selected` must not silently drop the
          // `expanded` a screen reader depends on to know which shape it is in.
          accessibilityState={{
            expanded: isExpanded,
            disabled: isDisabled,
            ...accessibilityState,
          }}
          {...rest}
          style={rootStyle}
          onPress={handlePress}
          // After `rest`, and composed rather than replacing: a caller's `onPressIn` runs,
          // and the pressed state its own styles depend on still happens.
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {children}
        </PressableFeedback>
      </MorphButtonProvider>
    )
  }
)

MorphButtonRoot.displayName = 'XAUI.MorphButton.Root'
