import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCard } from './card.context'
import type { CardTitleProps } from './card.type'

/**
 * The card's heading. Three lines, because the root already resolved everything (R5):
 * this reads the style it published and merges the caller's over it (R2).
 *
 * It wraps, where `Button.Label` truncates. The reason is the difference between the two
 * components: a button has a fixed height and deforms if its text does not fit, and a
 * card is as tall as what it holds. `numberOfLines` is still a prop for a title that has
 * to fit a grid.
 */
export const CardTitle = forwardRef<Text, CardTitleProps>(function CardTitle(
  { children, style, ...props },
  ref
) {
  const { titleStyle } = useCard()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} style={[titleStyle, styleProps, style]} {...rest}>
      {children}
    </Text>
  )
})

CardTitle.displayName = 'XAUI.Card.Title'
