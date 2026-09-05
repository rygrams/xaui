import { forwardRef, useMemo } from 'react'
import type { View } from 'react-native'
import { TextFieldRoot } from '../text-field'
import { TextAreaProvider } from './text-area.context'
import type { TextAreaProps } from './text-area.type'

/** What a designer says — "three lines tall" — rather than a number of points. */
const DEFAULT_ROWS = 3

/**
 * A multiline field, with the label, the hint and the error that make it usable.
 *
 * ```tsx
 * <TextArea rows={4} maxRows={8}>
 *   <TextArea.Label>Message</TextArea.Label>
 *   <TextArea.Field placeholder="Racontez-nous." />
 *   <TextArea.Description>Trois lignes suffisent.</TextArea.Description>
 * </TextArea>
 * ```
 *
 * **It is a `TextField`.** The root below is the `TextField`'s root, unchanged: the same recipe,
 * the same resolved context, the same four variants, the same `size`, `radius`, `color`,
 * `labelPlacement`, `isInvalid` and `isDisabled`. `TextArea.Label`, `.Description` and
 * `.Error` **are** the `TextField`'s slots — not wrappers around them, the same components —
 * and only `TextArea.Field` differs, by being multiline and by taking its height in lines.
 *
 * That is also HeroUI's answer: their `TextArea` renders their `TextField` with three defaults.
 * A component of its own is what a caller looks for; sharing every line of it is what
 * keeps the two from drifting.
 *
 * `rows` and `maxRows` are the only props this adds, and they are here rather than on the
 * field for the reason `size` is: the root is where the field's shape is decided.
 */
export const TextAreaRoot = forwardRef<View, TextAreaProps>(function TextArea(
  { rows = DEFAULT_ROWS, maxRows, children, ...props },
  ref
) {
  const context = useMemo(() => ({ rows, maxRows }), [rows, maxRows])

  return (
    <TextAreaProvider value={context}>
      <TextFieldRoot ref={ref} {...props}>
        {children}
      </TextFieldRoot>
    </TextAreaProvider>
  )
})

TextAreaRoot.displayName = 'XAUI.TextArea.Root'
