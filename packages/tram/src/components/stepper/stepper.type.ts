import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { StepStatus, StepperOrientation } from '@xaui/native'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type { StepStatus, StepperOrientation }

export type StepperSlot =
  | 'root'
  | 'item'
  | 'indicator'
  | 'bar'
  | 'barCompleted'
  | 'barCurrent'
  | 'numeral'
  | 'numeralUpcoming'
  | 'content'
  | 'title'
  | 'titleCurrent'
  | 'titleUpcoming'
  | 'description'

export type StepperSize = TramSize

type StepperOwnProps = {
  children?: ReactNode
  /** Which step the stepper is on, counted from one. The caller's, always. @default 1 */
  value?: number
  /** @default 'vertical' */
  orientation?: StepperOrientation
  /** The numeral — 24, 28, 34 — and the title of the step in progress. */
  size?: StepperSize
  /**
   * One of the twenty named accents, for the bars of the steps done. `color` wins when
   * both are set.
   */
  accent?: TramAccentName
  /** A raw tint for the bars of the steps done. */
  color?: string
  /** Whether the bars are drawn. Without them a step is its numeral and its words. */
  hasConnector?: boolean
}

/** Its own props, `View`'s, and its `ViewStyle` keys. No `xs`, no `asChild` on the root. */
export type StepperProps = StepperOwnProps &
  Omit<ViewProps, keyof StepperOwnProps> &
  Omit<ViewStyleProps, keyof StepperOwnProps | keyof ViewProps>

type StepperItemOwnProps = {
  /** A function child receives the step's own standing. */
  children?: ReactNode | ((step: StepContextValue) => ReactNode)
  /** Merges into the one child — how a step done is made to take you back. */
  asChild?: boolean
}

export type StepperItemProps = StepperItemOwnProps &
  Omit<ViewProps, keyof StepperItemOwnProps> &
  Omit<ViewStyleProps, keyof StepperItemOwnProps | keyof ViewProps>

export type StepperIndicatorProps = {
  /** Replaces the numeral. The bar stays. */
  children?: ReactNode
} & Omit<ViewProps, 'children'> &
  Omit<ViewStyleProps, keyof ViewProps>

export type StepperContentProps = { children?: ReactNode } & Omit<
  ViewProps,
  'children'
> &
  Omit<ViewStyleProps, keyof ViewProps>

export type StepperTitleProps = { children?: ReactNode } & Omit<
  TextProps,
  'children'
> &
  Omit<TextStyleProps, keyof TextProps>

export type StepperDescriptionProps = StepperTitleProps

/** Resolved styles, decided once on the root. */
export type StepperContextValue = {
  orientation: StepperOrientation
  hasConnector: boolean
  itemStyle: StyleProp<ViewStyle>
  indicatorStyle: StyleProp<ViewStyle>
  barStyle: StyleProp<ViewStyle>
  barCompletedStyle: StyleProp<ViewStyle>
  barCurrentStyle: StyleProp<ViewStyle>
  numeralStyle: StyleProp<TextStyle>
  numeralUpcomingStyle: StyleProp<TextStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  titleCurrentStyle: StyleProp<TextStyle>
  titleUpcomingStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
}

/** What one step knows about itself, handed to it by the root. */
export type StepContextValue = {
  index: number
  status: StepStatus
  isFirst: boolean
  isLast: boolean
}
