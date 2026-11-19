import { forwardRef } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useCard } from './card.context'
import { markBackground } from './card.layers'
import type { CardBackgroundProps } from './card.type'

/**
 * What the card sits on — a photo across the whole of it, under its text. The root paints
 * it first wherever it is written, and it is clipped to the card's corner.
 *
 * ```tsx
 * <Card variant="ghost">
 *   <Card.Background source={{ uri: cover }} />
 *   <Card.Title>marrakech</Card.Title>
 * </Card>
 * ```
 */
export const CardBackground = markBackground(
  forwardRef<View, CardBackgroundProps>(function CardBackground(
    { children, source, style, ...props },
    ref
  ) {
    const { backgroundStyle } = useCard()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        // Decoration: a screen reader reads the title on top of it.
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[backgroundStyle, styleProps, style]}
      >
        {source ? <Image source={source} style={sheet.image} /> : children}
      </View>
    )
  })
)

CardBackground.displayName = 'XAUI.Tram.Card.Background'

const sheet = StyleSheet.create({
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
})
