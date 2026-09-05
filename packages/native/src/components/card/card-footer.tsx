import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCard } from './card.context'
import type { CardFooterProps } from './card.type'

/**
 * The card's bottom section — the actions.
 *
 * A row, unlike the header: a footer holding two buttons side by side is the case worth
 * making free, and `flexDirection="column"` is one prop away for the rest. Like every
 * other slot it carries no margin (R4); the root's `gap` is what lifts it off the body.
 */
export const CardFooter = forwardRef<View, CardFooterProps>(function CardFooter(
  { children, style, ...props },
  ref
) {
  const { footerStyle } = useCard()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} style={[footerStyle, styleProps, style]} {...rest}>
      {children}
    </View>
  )
})

CardFooter.displayName = 'XAUI.Card.Footer'
