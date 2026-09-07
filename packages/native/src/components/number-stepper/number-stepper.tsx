import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { canStep, formatNumber, stepNumber } from '../../utils/number'
import { NumberStepperProvider } from './number-stepper.context'
import { numberStepperRecipe } from './number-stepper.recipe'
import type { NumberStepperProps } from './number-stepper.type'

/** What a stepper holding nothing writes. An em dash, not a zero, which is a value. */
const EMPTY = '—'

/**
 * A quantity, and the two presses that move it.
 *
 * ```tsx
 * <NumberStepper min={0} max={99} defaultValue={1} onValueChange={setQuantity}>
 *   <NumberStepper.Track />
 *   <NumberStepper.Decrement accessibilityLabel="Un de moins" />
 *   <NumberStepper.Value />
 *   <NumberStepper.Increment accessibilityLabel="Un de plus" />
 * </NumberStepper>
 * ```
 *
 * **It is not a `NumberField` without its box.** A field is typed into and this is not: it
 * has no keyboard, no caret, no parse, no `isInvalid` and no bounds to apply late, because
 * a value that can only be pressed into existence is inside its range at every moment. What
 * they share is the arithmetic — `stepNumber` and its rounding — and nothing else, which is
 * why that lives in `utils/` and neither owns it.
 *
 * Use it where the number is small and the presses are the point: a quantity in a basket, a
 * count of guests, a serving size. Use a `NumberField` where the number can be long enough
 * that pressing to it is absurd, and a `Slider` where the exact value matters less than
 * where it sits in its range.
 *
 * **The pill is a slot, and it is written first.** It is out of flow and painted behind
 * everything after it, which is what lets the two circles stand proud of it — a pill as
 * tall as its buttons is a segmented control, which says "pick one" rather than "more of
 * it". `Slider.Track`'s arrangement, and its reason: a ground a caller cannot leave out is
 * a ground a caller cannot replace either.
 *
 * **The two buttons are the same component**, and the variant paints them because they are
 * what a finger is aimed at. Each owns its own press state, so pressing one does not light
 * the other, and each goes flat when the value has nowhere left to go.
 *
 * **A `Decrement` that becomes a bin at the floor is `children` and a ternary**, not a prop:
 *
 * ```tsx
 * <NumberStepper.Decrement
 *   accessibilityLabel={quantity === 1 ? 'Retirer du panier' : 'Un de moins'}
 *   onPress={quantity === 1 ? remove : undefined}
 * >
 *   {quantity === 1 ? <Icon as={TrashIcon} color="#ef4444" /> : undefined}
 * </NumberStepper.Decrement>
 * ```
 */
export const NumberStepperRoot = forwardRef<View, NumberStepperProps>(
  function NumberStepper(
    {
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      step = 1,
      formatOptions,
      locale = 'en-US',
      variant,
      size,
      radius,
      color,
      isDisabled = false,
      asChild = false,
      style,
      children,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    // R14 — what is left is `View`'s own props plus whatever style keys the caller wrote.
    const [styleProps, rest] = useStyleProps(props)

    const bounds = useMemo(() => ({ min, max }), [min, max])

    const [own, setOwn] = useState<number | null>(defaultValue ?? null)
    const isControlled = value !== undefined
    const current = isControlled ? (value ?? null) : own

    // Not state: it is only read to decide whether the callback says anything new.
    const reported = useRef(current)

    const move = useCallback(
      (by: number) => {
        const next = stepNumber(current, by, bounds)

        if (!isControlled) setOwn(next)
        if (next === reported.current) return

        reported.current = next
        onValueChange?.(next)
      },
      [bounds, current, isControlled, onValueChange]
    )

    const increment = useCallback(() => move(step), [move, step])
    const decrement = useCallback(() => move(-step), [move, step])

    const selection = { variant, size, radius }
    const styles = numberStepperRecipe.resolve({
      theme,
      selection,
      states: { disabled: isDisabled },
    })
    // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
    // letting one into the key would grow the table with the colours users invent.
    const tint = color
      ? numberStepperRecipe.tint({ theme, color, selection })
      : undefined

    const context = useMemo(
      () => ({
        value: current,
        text:
          current === null ? EMPTY : formatNumber(current, locale, formatOptions),
        increment,
        decrement,
        canIncrement: canStep(current, step, bounds),
        canDecrement: canStep(current, -step, bounds),
        trackStyle: styles.track,
        valueStyle: styles.value,
        buttonStyle: tint ? [styles.button, tint.button] : styles.button,
        buttonGlyphStyle: tint
          ? [styles.buttonGlyph, tint.buttonGlyph]
          : styles.buttonGlyph,
        buttonExhaustedStyle: styles.buttonExhausted,
        isDisabled,
      }),
      [
        current,
        locale,
        formatOptions,
        increment,
        decrement,
        step,
        bounds,
        styles,
        tint,
        isDisabled,
      ]
    )

    // The resolution order of §2 ter, most general to most specific: the cached recipe, the
    // uncached tint, the style props, then `style` — the last word.
    const rootStyle = [styles.root, styleProps, style]

    // No `accessibilityRole` on the wrapper: the controls are the two buttons inside it,
    // and a role here would give a screen reader a third element to stop on before
    // reaching either.
    const surface = asChild ? (
      // R12 — the caller's element *is* the row.
      <Slot ref={ref} {...rest} style={rootStyle}>
        {children}
      </Slot>
    ) : (
      <View ref={ref} {...rest} style={rootStyle}>
        {children}
      </View>
    )

    return <NumberStepperProvider value={context}>{surface}</NumberStepperProvider>
  }
)

NumberStepperRoot.displayName = 'XAUI.NumberStepper.Root'
