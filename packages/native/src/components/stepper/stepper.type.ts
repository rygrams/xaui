import type { ReactNode } from 'react'
import type { StyleProp, TextProps, TextStyle, ViewProps } from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { Size } from '../../theme/theme.type'

export type StepperSlot =
  | 'root'
  | 'item'
  | 'track'
  | 'connector'
  | 'connectorDone'
  | 'indicator'
  | 'indicatorCurrent'
  | 'indicatorCompleted'
  | 'mark'
  | 'markCurrent'
  | 'check'
  | 'content'
  | 'title'
  | 'titleUpcoming'
  | 'description'

/**
 * Where a step stands relative to the one the stepper is on.
 *
 * Three, and they are an order rather than three independent flags: every step before the
 * current one is `completed` and every step after it is `upcoming`. A stepper with two
 * current steps is not a stepper.
 */
export type StepStatus = 'completed' | 'current' | 'upcoming'

/**
 * Which way the steps run — and it changes more than the axis.
 *
 * `vertical` puts the indicator beside a title and a description, aligned to the top of
 * them, with the connector running down through whatever height the text takes. That is
 * the layout that can carry a description at all.
 *
 * `horizontal` centres each indicator over a label and gives every step the same width,
 * so the row reads as a scale. There is no room under a label for a second line, which is
 * why `Stepper.Description` is a vertical affair.
 */
export type StepperOrientation = 'vertical' | 'horizontal'

export type StepperSize = Size

/** One: a stepper reports where you are, and has no emphasis to add to it. */
export type StepperVariant = 'default'

type StepperOwnProps = {
  children?: ReactNode
  /**
   * Which step the stepper is on, counted from **one**.
   *
   * There is no `defaultValue` and no `onValueChange`. A step is not a control — nothing
   * inside a stepper can move it — so the value is the caller's, always: it comes from the
   * form, the wizard or the route that actually knows. Making a step pressable is
   * `asChild` on the item.
   */
  value?: number
  orientation?: StepperOrientation
  size?: StepperSize
  /** The tint (R7) — a raw value, never a token. It paints the progress, not the track. */
  color?: string
  /** Whether the line between the steps is drawn. */
  hasConnector?: boolean
  asChild?: boolean
}

export type StepperProps = StepperOwnProps &
  Omit<ViewProps, keyof StepperOwnProps> &
  Omit<ViewStyleProps, keyof StepperOwnProps | keyof ViewProps>

type StepperItemOwnProps = {
  /** A function child receives the step's own standing, so it can branch on it. */
  children?: ReactNode | ((step: StepContextValue) => ReactNode)
  asChild?: boolean
}

export type StepperItemProps = StepperItemOwnProps &
  Omit<ViewProps, keyof StepperItemOwnProps> &
  Omit<ViewStyleProps, keyof StepperItemOwnProps | keyof ViewProps>

type StepperIndicatorOwnProps = {
  /** Replaces the number, and the check a completed step draws in its place. */
  children?: ReactNode
}

export type StepperIndicatorProps = StepperIndicatorOwnProps &
  Omit<ViewProps, keyof StepperIndicatorOwnProps> &
  Omit<ViewStyleProps, keyof StepperIndicatorOwnProps | keyof ViewProps>

type StepperContentOwnProps = {
  children?: ReactNode
}

export type StepperContentProps = StepperContentOwnProps &
  Omit<ViewProps, keyof StepperContentOwnProps> &
  Omit<ViewStyleProps, keyof StepperContentOwnProps | keyof ViewProps>

type StepperTextOwnProps = {
  children?: ReactNode
}

export type StepperTitleProps = StepperTextOwnProps &
  Omit<TextProps, keyof StepperTextOwnProps> &
  Omit<TextStyleProps, keyof StepperTextOwnProps | keyof TextProps>

export type StepperDescriptionProps = StepperTitleProps

/** R5 — resolved style ids and the orientation, never a token to resolve again. */
export type StepperContextValue = {
  orientation: StepperOrientation
  hasConnector: boolean
  itemStyle: StyleProp<TextStyle>
  trackStyle: StyleProp<TextStyle>
  connectorStyle: StyleProp<TextStyle>
  connectorDoneStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<TextStyle>
  indicatorCurrentStyle: StyleProp<TextStyle>
  indicatorCompletedStyle: StyleProp<TextStyle>
  markStyle: StyleProp<TextStyle>
  markCurrentStyle: StyleProp<TextStyle>
  checkStyle: StyleProp<TextStyle>
  contentStyle: StyleProp<TextStyle>
  titleStyle: StyleProp<TextStyle>
  titleUpcomingStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
}

/**
 * What one step knows about itself, given to it by the root rather than declared on it.
 *
 * JSX order is step order (R4), so an item carries no `index` and no `value` prop: the
 * root numbers its children, and a step inserted in the middle renumbers the rest by
 * being there.
 */
export type StepContextValue = {
  /** Counted from zero; the mark shows `index + 1`. */
  index: number
  status: StepStatus
  isFirst: boolean
  isLast: boolean
}
