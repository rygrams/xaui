import { CardBody } from './card-body'
import { CardDescription } from './card-description'
import { CardFooter } from './card-footer'
import { CardHeader } from './card-header'
import { CardTitle } from './card-title'
import { CardRoot } from './card'

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})

export { useCard } from './card.context'
export { cardRecipe } from './card.recipe'
export type {
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
