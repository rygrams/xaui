import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { maskInput, resolveMask } from '@xaui/native'
import { TextFieldRoot } from '../text-field'
import { MaskFieldProvider } from './mask-field.context'
import type { MaskFieldProps } from './mask-field.type'

/**
 * A value typed into a shape — the Native `MaskField`'s API, in the Tram `TextField`'s box.
 *
 * ```tsx
 * <MaskField mask="credit-card" onValueChange={setCard}>
 *   <MaskField.Label>numéro de carte</MaskField.Label>
 *   <MaskField.Field />
 * </MaskField>
 *
 * <MaskField
 *   mask="date"
 *   locale="fr-FR"
 *   segmentLabels={{ day: 'JJ', month: 'MM', year: 'AAAA' }}
 *   convert={text => parseMaskedDate(text, 'fr-FR')}
 *   onValueChange={(text, value) => setDay(value as Date | null)}
 * >
 *   <MaskField.Label>date de livraison</MaskField.Label>
 *   <MaskField.Field />
 * </MaskField>
 * ```
 *
 * **It is a `TextField`.** The root below is the Tram `TextField`'s, unchanged, and
 * `MaskField.Label`, `.Description` and `.Error` **are** its slots: only `MaskField.Field`
 * differs, by masking what is typed into it — Native's arrangement exactly.
 *
 * **The mask is Native's.** `resolveMask` turns the preset or the pattern into parts and
 * `maskInput` is the only thing that turns keystrokes into text, so the two packages
 * accept, clamp and put back the same characters. Tram adds one thing, in the drawing:
 * what is left of the shape stays in grey behind the typed text (`showMask`).
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
    showMask = true,
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

  // Kept in step with what is shown, not only with what was typed: a controlled value the
  // app replaces is what the next keystroke is compared with, or clearing a pre-filled
  // field would read as no change and snap back.
  useEffect(() => {
    reported.current = text
  }, [text])

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
      showMask,
    }),
    [text, onType, mask, showMask]
  )

  return (
    <MaskFieldProvider value={context}>
      <TextFieldRoot ref={ref} {...props}>
        {children}
      </TextFieldRoot>
    </MaskFieldProvider>
  )
})

MaskFieldRoot.displayName = 'XAUI.Tram.MaskField.Root'
