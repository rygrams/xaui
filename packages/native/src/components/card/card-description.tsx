import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCard } from './card.context'
import type { CardDescriptionProps } from './card.type'

/**
 * The card's prose — the slot a bare string child is wrapped into (R3).
 *
 * It sits behind the title on a fraction of the title's own colour rather than on the
 * `muted` token, which is what keeps it readable on a tinted card: see the recipe.
 */
export const CardDescription = forwardRef<Text, CardDescriptionProps>(
  function CardDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useCard()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[descriptionStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

CardDescription.displayName = 'XAUI.Card.Description'
