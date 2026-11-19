import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useCard } from './card.context'
import type {
  CardBodyProps,
  CardContextValue,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardTitleProps,
} from './card.type'

type SectionStyle = 'headerStyle' | 'bodyStyle' | 'footerStyle'

type TextStyleKey = 'titleStyle' | 'descriptionStyle'

/**
 * A section of the card: a `View` that reads its resolved style and lays the caller's
 * over it. No margin of its own — what separates two sections is the root's `gap`, so the
 * JSX order is the screen order.
 */
function cardSection<Props extends CardHeaderProps>(
  key: SectionStyle,
  displayName: string
) {
  const Section = forwardRef<View, Props>(function CardSection(
    { children, style, ...props },
    ref
  ) {
    const context: CardContextValue = useCard()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[context[key], styleProps, style]}>
        {children}
      </View>
    )
  })

  Section.displayName = displayName
  return Section
}

/** A line of the card's text, on the Tram scale the root resolved for its size. */
function cardText<Props extends CardTitleProps>(
  key: TextStyleKey,
  displayName: string
) {
  const Line = forwardRef<Text, Props>(function CardText(
    { children, style, ...props },
    ref
  ) {
    const context: CardContextValue = useCard()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[context[key], styleProps, style]}>
        {children}
      </Text>
    )
  })

  Line.displayName = displayName
  return Line
}

/** The top of the card: its title and what describes it, in a column. */
export const CardHeader = cardSection<CardHeaderProps>(
  'headerStyle',
  'XAUI.Tram.Card.Header'
)

export const CardBody = cardSection<CardBodyProps>(
  'bodyStyle',
  'XAUI.Tram.Card.Body'
)

/** The card's actions, in a row: the space between them is their only frame. */
export const CardFooter = cardSection<CardFooterProps>(
  'footerStyle',
  'XAUI.Tram.Card.Footer'
)

/** The heading. It wraps: a card is as tall as what it holds. */
export const CardTitle = cardText<CardTitleProps>(
  'titleStyle',
  'XAUI.Tram.Card.Title'
)

/** The detail under the title, one role down and faded behind it. */
export const CardDescription = cardText<CardDescriptionProps>(
  'descriptionStyle',
  'XAUI.Tram.Card.Description'
)
