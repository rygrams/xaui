import { forwardRef, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { canStep, formatNumber, stepNumber } from '@xaui/native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentPaintFor } from '../../system/accent-paint'
import { useTramHaptic } from '../../theme/tram-haptics'
import { tramAccents } from '../../theme/tram-tokens'
import { NumberStepperProvider } from './number-stepper.context'
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  NUMBER_STEPPER_GEOMETRY,
  numberStepperRecipe,
} from './number-stepper.recipe'
import type { NumberStepperProps } from './number-stepper.type'

/** What a stepper holding nothing writes. An em dash, not a zero, which is a value. */
const EMPTY = '—'

/**
 * A quantity, and the two presses that move it — the Native `NumberStepper`'s API, drawn
 * in Metro: two square keys in the `Button`'s drawing and the value between them, on the
 * ground.
 *
 * ```tsx
 * <NumberStepper min={0} max={5} defaultValue={1} onValueChange={setQuantity}>
 *   <NumberStepper.Decrement accessibilityLabel="un de moins" />
 *   <NumberStepper.Value />
 *   <NumberStepper.Increment accessibilityLabel="un de plus" />
 * </NumberStepper>
 * ```
 *
 * **It is not a `NumberField` without its box**: nothing is typed, so there is no parse
 * and no late clamp — a value that can only be pressed into existence is inside its range
 * at every moment. The arithmetic is Native's, from its root entrypoint.
 *
 * **The keys are the `Button`'s**: its four drawings (`outline` by default), its line, its
 * tilt toward the finger. A key with nowhere left to go is drawn as a disabled button and
 * stops taking presses. `NumberStepper.Track` is kept for Native's markup and draws
 * nothing: Metro raises the keys off no pill.
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
      variant = DEFAULT_VARIANT,
      size = DEFAULT_SIZE,
      radius,
      accent,
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
    const haptic = useTramHaptic()
    const [styleProps, rest] = useStyleProps(props)
    const bounds = useMemo(() => ({ min, max }), [min, max])

    const [own, setOwn] = useState<number | null>(defaultValue ?? null)
    const isControlled = value !== undefined
    const current = isControlled ? (value ?? null) : own

    const move = useCallback(
      (by: number) => {
        const next = stepNumber(current, by, bounds)

        if (!isControlled) setOwn(next)
        // Said only when it moves — from the parent's value when controlled.
        if (next === current) return
        haptic('selection')
        onValueChange?.(next)
      },
      [bounds, current, haptic, isControlled, onValueChange]
    )

    const increment = useCallback(() => move(step), [move, step])
    const decrement = useCallback(() => move(-step), [move, step])

    const selection = { variant, size, radius }
    const styles = numberStepperRecipe.resolve({
      theme,
      selection,
      states: { disabled: isDisabled },
    })
    // A key at the end of its range is a disabled key, whatever the stepper is.
    const spent = numberStepperRecipe.resolve({
      theme,
      selection,
      states: { disabled: true },
    })

    // A named accent is the `Button`'s: a fill is its true colour, a line or a mark its ink.
    const named =
      accent && !color
        ? accentPaintFor(tramAccents[accent], variant, theme.colors.background)
        : undefined
    const paint = color ?? named?.tint
    // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
    const tint = paint
      ? numberStepperRecipe.tint({
          theme,
          color: paint,
          selection,
          states: { disabled: isDisabled },
        })
      : undefined
    const ink = named?.label && !isDisabled ? named.label : undefined

    const { side } = NUMBER_STEPPER_GEOMETRY[size]

    const context = useMemo(
      () => ({
        value: current,
        text:
          current === null ? EMPTY : formatNumber(current, locale, formatOptions),
        increment,
        decrement,
        canIncrement: canStep(current, step, bounds),
        canDecrement: canStep(current, -step, bounds),
        side,
        trackStyle: styles.track,
        valueStyle: styles.value,
        buttonStyle: [styles.button, tint?.button],
        buttonSpentStyle: spent.button,
        glyphStyle: [
          styles.glyph,
          tint?.glyph,
          ink ? { backgroundColor: ink } : undefined,
        ],
        glyphSpentStyle: spent.glyph,
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
        side,
        styles,
        spent,
        tint,
        ink,
        isDisabled,
      ]
    )

    const rootStyle = [styles.root, styleProps, style]
    // No role on the row: the controls are the two keys inside it, and a role here would
    // give a screen reader a third element to stop on before reaching either.
    const Root = asChild ? Slot : View

    return (
      <NumberStepperProvider value={context}>
        <Root ref={ref} {...rest} style={rootStyle}>
          {children}
        </Root>
      </NumberStepperProvider>
    )
  }
)

NumberStepperRoot.displayName = 'XAUI.Tram.NumberStepper.Root'
