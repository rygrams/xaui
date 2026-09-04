import { forwardRef } from 'react'
import { Image, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { markBackground } from './card.utils'
import { useCard } from './card.context'
import { cardSheet } from './card.style'
import type { CardBackgroundProps } from './card.type'

/**
 * What the card sits on — a photo, a gradient, a video.
 *
 * ```tsx
 * <Card variant="ghost">
 *   <Card.Background source={{ uri: cover }} />
 *   <Card.Header>
 *     <Card.Title>Marrakech</Card.Title>
 *   </Card.Header>
 * </Card>
 * ```
 *
 * **The root paints it first, wherever it is written.** JSX order decides stacking for
 * absolutely positioned siblings, so a background written after the header would cover it;
 * the root hoists this slot instead, the way `PressableFeedback` hoists its overlays. That
 * is why it is a marked component rather than a plain `View` the caller positions.
 *
 * **The clip lives here, not on the root.** React Native's `overflow: 'hidden'` cuts the
 * node's own shadow on iOS, so putting it on the card would cost a `default` card the
 * elevation its variant just gave it. This layer carries its own `overflow` and the card's
 * radius, which rounds the image without touching the shadow — where HeroUI clips on both
 * and loses it.
 *
 * Two forms, like `Icon`: `source` renders the image, and anything else is a layer of the
 * caller's own, already positioned and clipped.
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
        // Decoration behind the content. What a screen reader reads is the title and the
        // description on top of it, so the layer itself is not a stop — R9 keeps both
        // overridable for the background that really carries the meaning.
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[backgroundStyle, styleProps, style]}
      >
        {source ? (
          <Image source={source} style={cardSheet.backgroundImage} />
        ) : (
          children
        )}
      </View>
    )
  })
)

CardBackground.displayName = 'XAUI.Card.Background'
