import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCard } from './card.context'
import type { CardHeaderProps } from './card.type'

/**
 * The card's top section — a badge, an icon, a title block.
 *
 * A column pinned to the leading edge, because that is what a header holds most often;
 * `flexDirection="row"` turns it into a title-and-action bar in one prop (R14). It has no
 * margin of its own (R4): what separates it from the body is the root's `gap`, so JSX
 * order is screen order and nothing has to be undone to reorder the sections.
 */
export const CardHeader = forwardRef<View, CardHeaderProps>(function CardHeader(
  { children, style, ...props },
  ref
) {
  const { headerStyle } = useCard()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} style={[headerStyle, styleProps, style]} {...rest}>
      {children}
    </View>
  )
})

CardHeader.displayName = 'XAUI.Card.Header'
