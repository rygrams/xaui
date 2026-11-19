import type { ReactNode } from 'react'
import type {
  AccessibilityActionEvent,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'

export type PanoramaSlot =
  | 'root'
  | 'backdrop'
  | 'titleRow'
  | 'title'
  | 'track'
  | 'section'
  | 'header'

type PanoramaOwnProps = {
  children?: ReactNode
  /** The section on screen, by its `value`. Present means controlled. */
  value?: string
  /** The section shown first. Left out, the first one. */
  defaultValue?: string
  /** Called when a swipe — or a screen reader's adjust — settles on another section. */
  onValueChange?: (value: string) => void
  /**
   * The caller's one element is the Panorama's frame: the slots are written inside it,
   * and its props and ref merge with the root's.
   */
  asChild?: boolean
}

export type PanoramaProps = PanoramaOwnProps &
  Omit<ViewProps, keyof PanoramaOwnProps> &
  Omit<ViewStyleProps, keyof PanoramaOwnProps | keyof ViewProps>

type PanoramaSlotOwnProps = { children?: ReactNode }

/** What lies behind everything, wider than the screen: a picture, a flat block of colour. */
export type PanoramaBackgroundProps = PanoramaSlotOwnProps &
  Omit<ViewProps, keyof PanoramaSlotOwnProps> &
  Omit<ViewStyleProps, keyof PanoramaSlotOwnProps | keyof ViewProps>

export type PanoramaTitleProps = PanoramaSlotOwnProps &
  Omit<TextProps, keyof PanoramaSlotOwnProps> &
  Omit<TextStyleProps, keyof PanoramaSlotOwnProps | keyof TextProps>

type PanoramaSectionOwnProps = PanoramaSlotOwnProps & {
  /** What names the section in `value` and `onValueChange`. */
  value: string
}

export type PanoramaSectionProps = PanoramaSectionOwnProps &
  Omit<ViewProps, keyof PanoramaSectionOwnProps> &
  Omit<ViewStyleProps, keyof PanoramaSectionOwnProps | keyof ViewProps>

export type PanoramaHeaderProps = PanoramaTitleProps

/**
 * How a screen reader moves through the sections: the slot that carries it is an
 * `adjustable` whose value is the section on screen.
 */
export type PanoramaAdjust = {
  /** The section on screen, as its header reads — or its `value` without one. */
  valueText: string | undefined
  /** `increment` moves to the next section, `decrement` to the previous one. */
  onAction: (event: AccessibilityActionEvent) => void
}

/** R5 — resolved styles, and what a section reads of the track. */
export type PanoramaContextValue = {
  sectionStyle: StyleProp<ViewStyle>
  headerStyle: StyleProp<TextStyle>
  titleStyle: StyleProp<TextStyle>
  backdropStyle: StyleProp<ViewStyle>
  /** A section's width: the screen less what shows of the next one. 0 until measured. */
  sectionWidth: number
  /** The section on screen: the others are hidden from a screen reader. */
  current: string | undefined
  /** Where a section lies in the track, as its layout says. */
  placeSection: (value: string, x: number, width: number) => void
  /** The title's natural width, as its layout says. */
  measureTitle: (width: number) => void
  /** What the slot carrying the screen reader's adjust reads and does. */
  adjust: PanoramaAdjust
  /** A `Panorama.Title` carries the adjust; without one, the current section's header. */
  hasTitle: boolean
}
