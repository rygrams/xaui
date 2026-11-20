import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useMorphButton } from './morph-button.context'
import type {
  MorphButtonContextValue,
  MorphButtonTextProps,
} from './morph-button.type'

type TextSlot = Extract<
  keyof MorphButtonContextValue,
  'labelStyle' | 'titleStyle' | 'descriptionStyle'
>

/**
 * The three words of the component, which differ only in which resolved style they read
 * and whether they may wrap. None carries a margin: the gap between a title and the
 * sentence under it is the face's. The case is the app's — never transformed.
 */
function text(slot: TextSlot, lines: number | undefined, name: string) {
  const Component = forwardRef<Text, MorphButtonTextProps>(function MorphButtonText(
    { children, style, numberOfLines = lines, ...props },
    ref
  ) {
    const context = useMorphButton()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        style={[context[slot], styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  })

  Component.displayName = name
  return Component
}

/** The button's word, one line: the closed shape has the `Button`'s fixed height. */
export const MorphButtonLabel = text('labelStyle', 1, 'XAUI.Tram.MorphButton.Label')

/** The card's heading, Light. Free to wrap — the open shape is as tall as its content. */
export const MorphButtonTitle = text(
  'titleStyle',
  undefined,
  'XAUI.Tram.MorphButton.Title'
)

/** The sentence under it, in the same ink turned down. Free to wrap. */
export const MorphButtonDescription = text(
  'descriptionStyle',
  undefined,
  'XAUI.Tram.MorphButton.Description'
)
