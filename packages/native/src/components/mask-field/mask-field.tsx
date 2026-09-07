import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { TextFieldRoot } from '../text-field'
import { maskInput, resolveMask } from '../../utils/mask'
import { MaskFieldProvider } from './mask-field.context'
import type { MaskFieldProps } from './mask-field.type'

/**
 * A value typed into a shape.
 *
 * ```tsx
 * <MaskField mask="credit-card" onValueChange={setCard}>
 *   <MaskField.Label>Card number</MaskField.Label>
 *   <MaskField.Field />
 * </MaskField>
 *
 * <MaskField
 *   mask="date"
 *   locale="fr-FR"
 *   convert={text => parseMaskedDate(text, 'fr-FR')}
 *   onValueChange={(text, value) => setBirthday(value as Date | null)}
 * >
 *   <MaskField.Label>Date de naissance</MaskField.Label>
 *   <MaskField.Field />
 * </MaskField>
 * ```
 *
 * **It is a `TextField`.** The root below is the `TextField`'s, unchanged: the same recipe,
 * the same four variants, the same `size`, `radius`, `color`, `labelPlacement`, `isInvalid`
 * and `isDisabled`. `MaskField.Label`, `.Description` and `.Error` **are** the `TextField`'s
 * slots — the same components, not wrappers — and only `MaskField.Field` differs, by masking
 * what is typed into it. The `TextArea`'s arrangement exactly.
 *
 * **It is a mask, not a set of segments.** There is one representation — the accepted
 * characters, in order — and `maskInput` is the only thing that turns them into text. That
 * is what makes the field survive a paste, a keyboard that offers its own punctuation, and a
 * backspace over a separator, none of which a segmented field survives without a rule each.
 *
 * **`mask` is a preset or a pattern.** `'date'`, `'time'`, `'datetime'` and `'credit-card'`
 * carry their own rules — the date order and separator from `locale`, and a part clamped as
 * it completes and never raised. Anything else is a pattern string: `#` a digit, `A` a
 * letter, `*` either, every other character a literal put back in as the parts fill.
 *
 * **The value is the masked string.** `convert` is the one plug that turns it into a value
 * of your own — `parseMaskedDate`, `parseMaskedTime`, or your own function. Without it,
 * `onValueChange`'s second argument is the string itself.
 *
 * For a date **chosen** rather than typed, that is `DatePicker`; for the month itself,
 * `Calendar`.
 */
export const MaskFieldRoot = forwardRef<View, MaskFieldProps>(function MaskField(
  {
    mask: maskProp,
    value,
    defaultValue,
    onValueChange,
    convert,
    order,
    locale = 'en-US',
    separator,
    segmentLabels,
    children,
    ...props
  },
  ref
) {
  const mask = useMemo(
    () => resolveMask(maskProp, { locale, order, separator, labels: segmentLabels }),
    [maskProp, locale, order, separator, segmentLabels]
  )

  const [typed, setTyped] = useState(() => maskInput(defaultValue ?? '', mask))

  // The value is the masked string, so a controlled field is a plain controlled input:
  // `value` *is* the text, re-masked in case the caller handed it a raw one.
  const isControlled = value !== undefined
  const text = isControlled ? maskInput(value ?? '', mask) : typed

  // Not state: it is only read to decide whether the callback says anything new, and a
  // render of its own would be a render per keystroke that changes nothing on screen.
  const reported = useRef(text)

  const onType = useCallback(
    (input: string) => {
      const next = maskInput(input, mask)
      setTyped(next)

      if (next === reported.current) return
      reported.current = next
      onValueChange?.(next, convert ? convert(next) : next)
    },
    [mask, convert, onValueChange]
  )

  const context = useMemo(
    () => ({
      text,
      onType,
      placeholder: mask.placeholder,
      keyboard: mask.keyboard,
      length: mask.length,
    }),
    [text, onType, mask]
  )

  return (
    <MaskFieldProvider value={context}>
      <TextFieldRoot ref={ref} {...props}>
        {children}
      </TextFieldRoot>
    </MaskFieldProvider>
  )
})

MaskFieldRoot.displayName = 'XAUI.MaskField.Root'
