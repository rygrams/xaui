import { forwardRef, useMemo } from 'react'
import type { View } from 'react-native'
import { TextFieldRoot } from '../text-field'
import { TextAreaProvider } from './text-area.context'
import type { TextAreaProps } from './text-area.type'

/** What a designer says — "three lines tall" — rather than a number of points. */
const DEFAULT_ROWS = 3

/**
 * A field of several lines — the Native `TextArea`'s API, drawn in Metro.
 *
 * ```tsx
 * <TextArea rows={4} maxRows={8}>
 *   <TextArea.Label>message</TextArea.Label>
 *   <TextArea.Field placeholder="raconte-nous." />
 *   <TextArea.Description>trois lignes suffisent.</TextArea.Description>
 * </TextArea>
 * ```
 *
 * It is a `TextField`: the root below is the Tram `TextField`'s, unchanged — the same
 * recipe, `size`, `radius`, `accent`, `color`, `isInvalid`, `isDisabled`, `isRequired` and
 * `asChild` — and `TextArea.Label`, `.Description` and `.Error` are its slots. Only
 * `TextArea.Field` differs, by being multiline and by taking its height in lines.
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

TextAreaRoot.displayName = 'XAUI.Tram.TextArea.Root'
