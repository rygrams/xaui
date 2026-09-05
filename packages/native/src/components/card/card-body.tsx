import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCard } from './card.context'
import type { CardBodyProps } from './card.type'

/**
 * The card's main section, and the one that grows: given a card with a height, the body
 * takes what the header and the footer leave, which is what pins a footer to the bottom
 * of a fixed-height card without a spacer.
 *
 * It grows rather than flexing — `flex: 1` would measure it as empty in a card sized by
 * its own content, which is the usual case.
 */
export const CardBody = forwardRef<View, CardBodyProps>(function CardBody(
  { children, style, ...props },
  ref
) {
  const { bodyStyle } = useCard()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} style={[bodyStyle, styleProps, style]} {...rest}>
      {children}
    </View>
  )
})

CardBody.displayName = 'XAUI.Card.Body'
