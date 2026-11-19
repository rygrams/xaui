import { CardBackground } from './card-background'
import {
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card-sections'
import { CardRoot } from './card'

export const Card = Object.assign(CardRoot, {
  Background: CardBackground,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})

export { useCard } from './card.context'
export { CARD_BACKGROUND, markBackground } from './card.layers'
export { cardRecipe } from './card.recipe'
export type {
  CardBackgroundProps,
  CardBodyProps,
  CardContextValue,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardSize,
  CardSlot,
  CardTitleProps,
  CardVariant,
} from './card.type'
