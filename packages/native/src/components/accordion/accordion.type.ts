import type { ComponentType, ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconComponentProps, IconContextValue } from '../../system/icon'
import type { ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type AccordionSlot =
  | 'root'
  /** The clipping layer inside the root. See the recipe for why it is not the root. */
  | 'container'
  | 'separator'
  | 'item'
  | 'trigger'
  | 'indicator'
  | 'content'

/**
 * Four emphasis levels, no intent — `danger` on a list of expandable rows would be
 * colouring a container rather than reporting a meaning.
 *
 * The ladder descends without a gap: `primary` is the strong fill, `secondary` the
 * quieter one, `tertiary` an edge with nothing behind it, `ghost` nothing at all. Neither
 * the `Button`'s five nor the `Card`'s four read that cleanly — both put `default`
 * somewhere in the middle of an order it does not name a position in.
 *
 * `ghost` is the default here, and it is HeroUI's own `default`: rows separated by
 * hairlines, on whatever page they sit on. `primary` is their `surface`.
 */
export type AccordionVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type AccordionSize = Size

/** One open at a time, or as many as the reader wants. */
export type AccordionSelectionMode = 'single' | 'multiple'

/** A string in `single` mode, a list of them in `multiple`. */
export type AccordionValue = string | readonly string[]

type AccordionOwnProps = {
  children?: ReactNode
  variant?: AccordionVariant
  size?: AccordionSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. */
  color?: string
  selectionMode?: AccordionSelectionMode
  /** Controlled. Leave unset and the root owns it. */
  value?: AccordionValue
  defaultValue?: AccordionValue
  onValueChange?: (value: AccordionValue) => void
  isDisabled?: boolean
  /**
   * Whether an open item can be closed by pressing it again. Off, the accordion always
   * has one item open — which is what a set of tabs pretending to be an accordion needs.
   *
   * @default true
   */
  isCollapsible?: boolean
  /** The hairline between rows. It is the only thing separating them in `ghost`. */
  hasSeparator?: boolean
  asChild?: boolean
}

export type AccordionProps = AccordionOwnProps &
  Omit<ViewProps, keyof AccordionOwnProps> &
  Omit<ViewStyleProps, keyof AccordionOwnProps | keyof ViewProps>

type AccordionItemOwnProps = {
  /** What identifies this row in the root's value. */
  value: string
  isDisabled?: boolean
  children?: ReactNode | ((state: AccordionItemRenderState) => ReactNode)
}

export type AccordionItemProps = AccordionItemOwnProps &
  Omit<ViewProps, keyof AccordionItemOwnProps> &
  Omit<ViewStyleProps, keyof AccordionItemOwnProps | keyof ViewProps>

/** What an item's render function is handed, so a row can paint its own open state. */
export type AccordionItemRenderState = {
  isExpanded: boolean
  isDisabled: boolean
  value: string
}

type AccordionTriggerOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

export type AccordionTriggerProps = AccordionTriggerOwnProps &
  Omit<PressableProps, keyof AccordionTriggerOwnProps> &
  Omit<ViewStyleProps, keyof AccordionTriggerOwnProps | keyof PressableProps>

/** The chevron, turning with the panel. */
export type AccordionIndicatorProps = {
  /** The glyph. Defaults to the chevron the library ships. */
  as?: ComponentType<IconComponentProps>
  size?: number
  /** A raw value (R7), never a token. */
  color?: string
}

type AccordionContentOwnProps = { children?: ReactNode }

export type AccordionContentProps = AccordionContentOwnProps &
  Omit<ViewProps, keyof AccordionContentOwnProps> &
  Omit<ViewStyleProps, keyof AccordionContentOwnProps | keyof ViewProps>

/** R5 — resolved style ids and the state the slots read. No slot re-resolves anything. */
export type AccordionContextValue = {
  separatorStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<ViewStyle>
  triggerStyle: StyleProp<ViewStyle>
  triggerPressedStyle: StyleProp<ViewStyle>
  indicatorStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  /** Text colour for a stringifiable trigger child, wrapped the way R3 asks. */
  labelStyle: StyleProp<TextStyle>
  glyph: IconContextValue
  isDisabled: boolean
  isExpanded: (value: string) => boolean
  toggle: (value: string) => void
}

/** One row's own state. Everything visual still comes from `useAccordion()`. */
export type AccordionItemContextValue = {
  value: string
  isExpanded: boolean
  isDisabled: boolean
}
