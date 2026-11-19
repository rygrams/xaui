import type { ComponentProps, ComponentType, ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type Animated from 'react-native-reanimated'
import type {
  IconComponentProps,
  IconContextValue,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type AccordionSlot =
  | 'root'
  /** The layer inside the root the rows sit in — Native's, kept for its name. */
  | 'container'
  /** Kept for Native's name; Tram draws no line between rows, so it is never rendered. */
  | 'separator'
  | 'item'
  | 'trigger'
  | 'indicator'
  /** One of the two bars the plus is drawn from. Tram's own: Native's glyph is an icon. */
  | 'indicatorBar'
  | 'content'

/**
 * Native's four names, drawn with **no border anywhere** — Metro separated rows by space,
 * never by a line:
 *
 * | Variant     | Ground                                       |
 * | ----------- | -------------------------------------------- |
 * | `ghost`     | the page (default)                           |
 * | `primary`   | the discreet surface, as the `Card`          |
 * | `secondary` | the accent's soft slice, the `Button`'s flat |
 * | `tertiary`  | drawn as `ghost`                             |
 *
 * `tertiary` was Native's outline. It stays a valid name so that swapping the import is
 * the whole migration, and it draws exactly what `ghost` draws.
 */
export type AccordionVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type AccordionSize = TramSize

/** One open at a time, or as many as the reader wants. */
export type AccordionSelectionMode = 'single' | 'multiple'

/** A string in `single` mode, a list of them in `multiple`. */
export type AccordionValue = string | readonly string[]

type AccordionOwnProps = {
  children?: ReactNode
  variant?: AccordionVariant
  size?: AccordionSize
  /** Overrides the Tram corner of 2; the scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents: the open row's title in it, as ink, and the ground
   * of `secondary`.
   */
  accent?: TramAccentName
  /** A raw tint, never a token. It wins over `accent`, and is never corrected. */
  color?: string
  selectionMode?: AccordionSelectionMode
  /** Controlled. Leave unset and the root owns it. */
  value?: AccordionValue
  defaultValue?: AccordionValue
  onValueChange?: (value: AccordionValue) => void
  isDisabled?: boolean
  /**
   * Whether an open item can be closed by pressing it again. Off, the accordion always
   * has one item open once one has been.
   *
   * @default true
   */
  isCollapsible?: boolean
  /**
   * Kept for Native's API, and draws nothing: Tram has no line between rows. Setting it
   * changes no pixel.
   */
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

/** The plus, drawn from two bars, that lies down into a minus as the row opens. */
export type AccordionIndicatorProps = {
  /** A glyph in place of the plus. It turns half a turn as the row opens, as Native's. */
  as?: ComponentType<IconComponentProps>
  /** The plus's span, or the glyph's size. */
  size?: number
  /** A raw value, never a token. */
  color?: string
}

type AccordionContentOwnProps = { children?: ReactNode }

export type AccordionContentProps = AccordionContentOwnProps &
  Omit<ViewProps, keyof AccordionContentOwnProps> &
  Omit<ViewStyleProps, keyof AccordionContentOwnProps | keyof ViewProps>

type AnimatedViewProps = ComponentProps<typeof Animated.View>

/** How the rows move: `undefined` where motion is reduced to nothing. */
export type AccordionMotion = {
  layout: AnimatedViewProps['layout']
  entering: AnimatedViewProps['entering']
  exiting: AnimatedViewProps['exiting']
}

/** Resolved styles and the state the slots read. No slot resolves the recipe again. */
export type AccordionContextValue = {
  separatorStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<ViewStyle>
  triggerStyle: StyleProp<ViewStyle>
  /** On a disabled row — the root's or its own. Its colours otherwise stay. */
  triggerDisabledStyle: StyleProp<ViewStyle>
  indicatorStyle: StyleProp<ViewStyle>
  indicatorBarStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  /** The type of a stringifiable trigger child, wrapped in its own `Text`. */
  labelStyle: StyleProp<TextStyle>
  /** The same, on an open row: the title in the accent, as ink. */
  labelOpenStyle: StyleProp<TextStyle>
  glyph: IconContextValue
  motion: AccordionMotion
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
