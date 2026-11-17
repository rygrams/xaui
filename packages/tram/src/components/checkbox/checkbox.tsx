import { forwardRef, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { useControllableState, usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramHaptic } from '../../theme/tram-haptics'
import { TRAM_TOUCH_TARGET, tramAccents } from '../../theme/tram-tokens'
import { CheckboxIndicator } from './checkbox-indicator'
import { CheckboxLabel } from './checkbox-label'
import { PressRow } from './checkbox-press-row'
import { CheckboxProvider } from './checkbox.context'
import { nextSelected } from './checkbox.mark'
import { CHECKBOX_GEOMETRY, DEFAULT_SIZE, checkboxRecipe } from './checkbox.recipe'
import type { CheckboxProps } from './checkbox.type'

/**
 * A box that is ticked or not — the Native `Checkbox`'s API, drawn in Metro: a square
 * with a line around it, and a square of the accent inside once it is ticked.
 *
 * ```tsx
 * <Checkbox isSelected={accepted} onSelectedChange={setAccepted}>
 *   j'accepte les conditions
 * </Checkbox>
 *
 * <Checkbox size="lg" accent="lime" defaultSelected>
 *   <Checkbox.Indicator />
 *   <Checkbox.Label>recevoir la lettre</Checkbox.Label>
 * </Checkbox>
 * ```
 *
 * The root is the row, so a tap on the label ticks the box too. A text child is the
 * label, and the root supplies the box; with no children it is the box alone. A tick is
 * felt through `TramProvider`'s `onHaptic`, as a `selection`.
 */
export const CheckboxRoot = forwardRef<View, CheckboxProps>(function Checkbox(
  {
    children,
    size = DEFAULT_SIZE,
    radius,
    accent,
    color,
    isSelected,
    defaultSelected = false,
    onSelectedChange,
    isIndeterminate = false,
    isInvalid = false,
    isDisabled = false,
    asChild = false,
    animation,
    accessibilityRole = 'checkbox',
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
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const [selected, setSelected] = useControllableState({
    value: isSelected,
    defaultValue: defaultSelected,
    onChange: onSelectedChange,
  })

  const handlePress = (event: GestureResponderEvent) => {
    const next = nextSelected(selected, isIndeterminate)
    if (next !== selected) {
      haptic('selection')
      setSelected(next)
    }
    // Composed, never replaced: a caller's `onPress` runs, and the tick still happens.
    onPress?.(event)
  }

  const selection = {
    size,
    radius,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }
  const states = { disabled: isDisabled }

  const styles = checkboxRecipe.resolve({ theme, selection, states })
  // The mark is flat, so a named accent is the true colour. Uncached: a raw tint must
  // stay out of the cache key. Dropped while invalid — the tint pass repaints the mark,
  // and a box that is wrong has to read as wrong rather than as branded.
  const paint = isInvalid ? undefined : (color ?? (accent && tramAccents[accent]))
  const tint = paint
    ? checkboxRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  // Native's scale, highlight and ripple stay off: the press is the row shrinking. An
  // ancestor's `disable-all` stops that and the mark's spring, and is handed down.
  const motion = resolveAnimation(animation, useAnimationDisabled())
  const Root = motion.scale ? PressRow : PressableFeedback

  const geometry = CHECKBOX_GEOMETRY[size]

  const context = useMemo(
    () => ({
      indicatorStyle: styles.indicator,
      markStyle: [styles.mark, tint?.mark],
      labelStyle: styles.label,
      geometry,
      isSelected: selected,
      isIndeterminate,
      isDisabled,
      isInvalid,
      isStill: motion.disableAll,
    }),
    [
      styles,
      tint,
      geometry,
      selected,
      isIndeterminate,
      isDisabled,
      isInvalid,
      motion.disableAll,
    ]
  )

  // Most general to most specific: the cached recipe, the style props, `style`. The tint
  // is the mark's alone — nothing on the row changes colour.
  const rootStyle = [
    styles.root,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  const checked = isIndeterminate ? ('mixed' as const) : selected
  const text = childrenToString(children)

  return (
    <CheckboxProvider value={context}>
      <Root
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        animation={motion.disableAll ? 'disable-all' : false}
        accessibilityRole={accessibilityRole}
        // Merged, not spread over: a caller naming another state must not drop these two.
        accessibilityState={{ checked, disabled: isDisabled, ...accessibilityState }}
        // The web reads the ARIA attributes and not the state object above.
        aria-checked={checked}
        aria-invalid={isInvalid}
        // Every size is drawn under the 48 touch target; the slop makes it up.
        hitSlop={hitSlop ?? Math.max(0, (TRAM_TOUCH_TARGET - geometry.box) / 2)}
        {...rest}
        style={rootStyle}
        // After `rest`, and composed: the caller's handlers run inside these.
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {/* Under `asChild` the caller's element is the row: one child, theirs. */}
        {asChild ? (
          children
        ) : text !== null ? (
          <>
            <CheckboxIndicator />
            <CheckboxLabel>{text}</CheckboxLabel>
          </>
        ) : (
          (children ?? <CheckboxIndicator />)
        )}
      </Root>
    </CheckboxProvider>
  )
})

CheckboxRoot.displayName = 'XAUI.Tram.Checkbox.Root'
