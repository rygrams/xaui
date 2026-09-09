import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
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
 * and whether they are allowed a second line.
 *
 * Written once and named three times rather than copied: the root already resolved
 * everything (R5), so what is left in each of them is the same five lines — and five lines
 * written three times is five lines that drift.
 *
 * None of them carries a margin of its own (R4). The gap between a title and the sentence
 * under it belongs to the face holding them, so JSX order is screen order.
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

/**
 * The pill's word. Single-line by default, because the collapsed shape has a fixed height:
 * a label longer than the pill truncates rather than deforming the control.
 */
export const MorphButtonLabel = text('labelStyle', 1, 'XAUI.MorphButton.Label')

/** The card's heading. Free to wrap — the expanded shape is as tall as what is in it. */
export const MorphButtonTitle = text(
  'titleStyle',
  undefined,
  'XAUI.MorphButton.Title'
)

/** The sentence under it, at the same colour and less of it. Free to wrap. */
export const MorphButtonDescription = text(
  'descriptionStyle',
  undefined,
  'XAUI.MorphButton.Description'
)
