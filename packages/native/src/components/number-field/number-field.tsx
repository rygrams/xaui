import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { useXAUITheme } from '../../theme/theme-hooks'
import { TextFieldRoot } from '../text-field'
import { NumberFieldProvider } from './number-field.context'
import { numberFieldRecipe } from './number-field.recipe'
import {
  canStep,
  clampNumber,
  formatNumber,
  parseNumber,
  stepNumber,
} from '../../utils/number'
import type { NumberFieldProps } from './number-field.type'

/** Every fraction digit the value happens to carry, and no grouping. */
const PLAIN: Intl.NumberFormatOptions = {
  useGrouping: false,
  maximumFractionDigits: 20,
}

/**
 * A number, typed — with the two ends of its range and a pair of buttons that walk it.
 *
 * ```tsx
 * <NumberField min={1} max={99} defaultValue={1} onValueChange={setQuantity}>
 *   <NumberField.Label>Quantité</NumberField.Label>
 *   <FieldGroup>
 *     <NumberField.Decrement accessibilityLabel="Retirer un article" />
 *     <NumberField.Field />
 *     <NumberField.Increment accessibilityLabel="Ajouter un article" />
 *   </FieldGroup>
 * </NumberField>
 *
 * <NumberField
 *   locale="fr-FR"
 *   formatOptions={{ style: 'currency', currency: 'EUR' }}
 *   step={0.5}
 *   onValueChange={setPrice}
 * >
 *   <NumberField.Label>Prix</NumberField.Label>
 *   <NumberField.Field />
 * </NumberField>
 * ```
 *
 * **It is a `TextField`.** The root below is the `TextField`'s, unchanged: the same recipe,
 * the same four variants, the same `size`, `radius`, `color`, `labelPlacement`, `isInvalid`
 * and `isDisabled`. `NumberField.Label`, `.Description` and `.Error` **are** the
 * `TextField`'s slots — the same components, not wrappers — and only the field differs, by
 * reading a number out of what is typed into it. The `MaskField`'s arrangement exactly.
 *
 * **The value is a number, and the box is a string.** Out of the field it is written by
 * `Intl` — `formatOptions` is that call's own options, so a currency, a unit or a fixed
 * number of decimals costs nothing here. Into it, everything that is not a digit, a sign or
 * the decimal mark is dropped rather than refused: the value the caret lands in is grouped,
 * and rejecting its separators would make the first keystroke clear the box. The moment the
 * caret arrives the value is rewritten plainly, so nobody has to type a euro sign back in.
 *
 * **The bounds land when the reader leaves, not while they type.** `min={10}` and a reader
 * on their way to `15` types a `1` first; clamping that would take the keyboard away from
 * them. Until the field is left, `onValueChange` reports what is actually in the box —
 * clamped on blur, and on every press of a stepper.
 *
 * **The steppers are `FieldGroup` decorators**, which is what lays a control over a field
 * and measures it, so the box stays the `TextInput` itself. `NumberField.Decrement` takes
 * the leading edge and `NumberField.Increment` the trailing one — the value sits between
 * them, which is the only arrangement where the two read as one control.
 *
 * For the same pair **without** a field to type into, that is `NumberStepper`; for a
 * quantity chosen on a track, `Slider`.
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
      size,
      isDisabled = false,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
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
    // The reader's own characters, kept verbatim for as long as the caret is in the box:
    // re-formatting mid-edit is what moves the caret to the end on every keystroke.
    const [typed, setTyped] = useState<string | null>(null)

    const isControlled = value !== undefined
    const current = isControlled ? (value ?? null) : own

    const text = typed ?? (current === null ? '' : write(current))

    // Not state: it is only read to decide whether the callback says anything new, and a
    // render of its own would be a render per keystroke that changes nothing on screen.
    const reported = useRef(current)

    const report = useCallback(
      (next: number | null) => {
        if (!isControlled) setOwn(next)
        if (next === reported.current) return

        reported.current = next
        onValueChange?.(next)
      },
      [isControlled, onValueChange]
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

        // The box follows the press even while the caret is still in it, which is what
        // keeps the two ways of changing the value from disagreeing on screen.
        setTyped(previous => (previous === null ? null : writePlain(next)))
        report(next)
      },
      [bounds, current, report, writePlain]
    )

    const increment = useCallback(() => move(step), [move, step])
    const decrement = useCallback(() => move(-step), [move, step])

    const styles = numberFieldRecipe.resolve({
      theme,
      selection: { size },
      states: { disabled: isDisabled },
    })

    // A pad with no decimal point on it is the right keyboard for a whole number and the
    // wrong one for a price, and the shape says which: a fractional step, or a format that
    // asks for decimals. A field that also has to take a minus sign passes its own
    // `keyboardType` — which is why the field does not claim that prop.
    const keyboard =
      !Number.isInteger(step) || (formatOptions?.maximumFractionDigits ?? 0) > 0
        ? ('decimal-pad' as const)
        : ('number-pad' as const)

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
        stepButtonStyle: styles.stepButton,
        stepGlyphStyle: styles.stepGlyph,
        stepExhaustedStyle: styles.stepExhausted,
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
        styles,
      ]
    )

    return (
      <NumberFieldProvider value={context}>
        <TextFieldRoot ref={ref} size={size} isDisabled={isDisabled} {...props}>
          {children}
        </TextFieldRoot>
      </NumberFieldProvider>
    )
  }
)

NumberFieldRoot.displayName = 'XAUI.NumberField.Root'
