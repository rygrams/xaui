import { forwardRef, useCallback, useMemo, useState } from 'react'
import type { View } from 'react-native'
import {
  canStep,
  clampNumber,
  formatNumber,
  parseNumber,
  stepNumber,
} from '@xaui/native'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramHaptic } from '../../theme/tram-haptics'
import { TextFieldRoot } from '../text-field'
import { NumberFieldProvider } from './number-field.context'
import {
  DEFAULT_SIZE,
  NUMBER_FIELD_GEOMETRY,
  numberFieldRecipe,
} from './number-field.recipe'
import { numberKeyboard } from './number-field.utils'
import type { NumberFieldProps } from './number-field.type'

/** Every fraction digit the value happens to carry, and no grouping. */
const PLAIN: Intl.NumberFormatOptions = {
  useGrouping: false,
  maximumFractionDigits: 20,
}

/**
 * A number, typed — with the two ends of its range and a pair of steppers that walk it.
 * The Native `NumberField`'s API, drawn in Metro: the `TextField`'s box with a square key
 * at each end, the value centred between them in tabular figures.
 *
 * ```tsx
 * <NumberField min={1} max={5} defaultValue={1} onValueChange={setCopies}>
 *   <NumberField.Label>exemplaires</NumberField.Label>
 *   <NumberField.Group>
 *     <NumberField.Decrement accessibilityLabel="un de moins" />
 *     <NumberField.Field />
 *     <NumberField.Increment accessibilityLabel="un de plus" />
 *   </NumberField.Group>
 * </NumberField>
 * ```
 *
 * **It is a `TextField`.** The root is the Tram `TextField`'s, unchanged, and `Label`,
 * `Description` and `Error` are its slots. Only the field differs, by reading a number out
 * of what is typed into it; on its own, outside a `Group`, it is a plain Tram field.
 *
 * **The value is a number, and the box is a string.** Out of the field it is written by
 * `Intl` with `formatOptions`; the moment the caret arrives it is rewritten plainly. The
 * bounds land when the reader leaves, and on every press of a stepper — never while they
 * type. The parse, the clamp and the step are Native's, from its root entrypoint.
 */
export const NumberFieldRoot = forwardRef<View, NumberFieldProps>(
  function NumberField(
    {
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      step = 1,
      formatOptions,
      locale = 'en-US',
      children,
      size = DEFAULT_SIZE,
      radius,
      isDisabled = false,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const haptic = useTramHaptic()
    const bounds = useMemo(() => ({ min, max }), [min, max])

    const write = useCallback(
      (next: number) => formatNumber(next, locale, formatOptions),
      [locale, formatOptions]
    )
    const writePlain = useCallback(
      (next: number) => formatNumber(next, locale, PLAIN),
      [locale]
    )

    const [own, setOwn] = useState<number | null>(defaultValue ?? null)
    // The reader's own characters, verbatim while the caret is in the box: re-formatting
    // mid-edit is what moves the caret to the end on every keystroke.
    const [typed, setTyped] = useState<string | null>(null)

    const isControlled = value !== undefined
    const current = isControlled ? (value ?? null) : own
    const text = typed ?? (current === null ? '' : write(current))

    // Said only when it differs from the value as it stands — the parent's when
    // controlled, so a value the parent set itself is still moved away from.
    const report = useCallback(
      (next: number | null) => {
        if (!isControlled) setOwn(next)
        if (next === current) return
        onValueChange?.(next)
      },
      [current, isControlled, onValueChange]
    )

    const onType = useCallback(
      (input: string) => {
        setTyped(input)
        report(parseNumber(input, locale))
      },
      [locale, report]
    )

    const onEditStart = useCallback(() => {
      setTyped(current === null ? '' : writePlain(current))
    }, [current, writePlain])

    const onEditEnd = useCallback(() => {
      const parsed = typed === null ? current : parseNumber(typed, locale)

      setTyped(null)
      report(parsed === null ? null : clampNumber(parsed, bounds))
    }, [bounds, current, locale, report, typed])

    const move = useCallback(
      (by: number) => {
        const next = stepNumber(current, by, bounds)

        haptic('selection')
        // The box follows the press even while the caret is still in it.
        setTyped(previous => (previous === null ? null : writePlain(next)))
        report(next)
      },
      [bounds, current, haptic, report, writePlain]
    )

    const increment = useCallback(() => move(step), [move, step])
    const decrement = useCallback(() => move(-step), [move, step])

    const styles = numberFieldRecipe.resolve({
      theme,
      selection: { size, radius },
      states: { disabled: isDisabled },
    })

    const keyboard = numberKeyboard(step, formatOptions)
    const { cell } = NUMBER_FIELD_GEOMETRY[size]

    const context = useMemo(
      () => ({
        text,
        onType,
        onEditStart,
        onEditEnd,
        keyboard,
        increment,
        decrement,
        canIncrement: canStep(current, step, bounds),
        canDecrement: canStep(current, -step, bounds),
        cell,
        groupStyle: styles.group,
        groupFieldStyle: styles.groupField,
        stepStyle: styles.step,
        pressStyle: styles.press,
        ruleStyle: styles.rule,
        ruleStartStyle: styles.ruleStart,
        ruleEndStyle: styles.ruleEnd,
        glyphStyle: styles.glyph,
        glyphSpentStyle: styles.glyphSpent,
      }),
      [
        text,
        onType,
        onEditStart,
        onEditEnd,
        keyboard,
        increment,
        decrement,
        current,
        step,
        bounds,
        cell,
        styles,
      ]
    )

    return (
      <NumberFieldProvider value={context}>
        <TextFieldRoot
          ref={ref}
          size={size}
          radius={radius}
          isDisabled={isDisabled}
          {...props}
        >
          {children}
        </TextFieldRoot>
      </NumberFieldProvider>
    )
  }
)

NumberFieldRoot.displayName = 'XAUI.Tram.NumberField.Root'
