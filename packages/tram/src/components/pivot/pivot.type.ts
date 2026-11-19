import type { MutableRefObject, ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'

export type PivotSlot = 'root' | 'title' | 'headers' | 'header' | 'body' | 'section'

type PivotOwnProps = {
  children?: ReactNode
  /** The section on screen, by its `value`. Present means controlled. */
  value?: string
  /** The section shown first. Left out, the first one. */
  defaultValue?: string
  /** Called when a swipe, a title pressed or an arrow key settles on another section. */
  onValueChange?: (value: string) => void
  /**
   * The caller's one element is the Pivot's frame: the slots are written inside it, and
   * its props and ref merge with the root's.
   */
  asChild?: boolean
}

export type PivotProps = PivotOwnProps &
  Omit<ViewProps, keyof PivotOwnProps> &
  Omit<ViewStyleProps, keyof PivotOwnProps | keyof ViewProps>

type PivotSlotOwnProps = { children?: ReactNode }

/** The app's name above the titles. Its case is the app's. */
export type PivotTitleProps = PivotSlotOwnProps &
  Omit<TextProps, keyof PivotSlotOwnProps> &
  Omit<TextStyleProps, keyof PivotSlotOwnProps | keyof TextProps>

type PivotHeaderOwnProps = PivotSlotOwnProps & {
  /** The section this title names, by its `value`. */
  value: string
}

/** A title of the row: written beside the sections, laid by the root in its loop. */
export type PivotHeaderProps = PivotHeaderOwnProps &
  Omit<TextProps, keyof PivotHeaderOwnProps> &
  Omit<TextStyleProps, keyof PivotHeaderOwnProps | keyof TextProps>

type PivotSectionOwnProps = PivotSlotOwnProps & {
  /** What names the section in `value` and `onValueChange`, and ties it to its title. */
  value: string
}

export type PivotSectionProps = PivotSectionOwnProps &
  Omit<ViewProps, keyof PivotSectionOwnProps> &
  Omit<ViewStyleProps, keyof PivotSectionOwnProps | keyof ViewProps>

/** R5 — resolved styles, and what the titles and sections read of the loop. */
export type PivotContextValue = {
  titleStyle: StyleProp<TextStyle>
  headerStyle: StyleProp<TextStyle>
  sectionStyle: StyleProp<ViewStyle>
  /** The two ends of a title's fade: every title but the current one, and the current one. */
  tones: { rest: string; current: string }
  /** The sections' values, in the order they are written: the loop's order. */
  values: readonly string[]
  /** The section on screen. */
  current: string | undefined
  /** Where the loop stands, in sections; a drag is the fraction between two. */
  position: SharedValue<number>
  /** Each title's width plus the gap after it, in the loop's order. Empty until measured. */
  advances: SharedValue<number[]>
  /** The screen's width — a section's. 0 until measured. */
  viewport: SharedValue<number>
  /** How far the current title rests from the screen's start. */
  margin: number
  /** 1, or -1 when the row runs right to left. */
  way: 1 | -1
  isStill: boolean
  /** A title was pressed: the loop goes forward to it. */
  select: (value: string) => void
  /** An arrow key: one section forward or back, the title it lands on focused. */
  step: (by: 1 | -1) => void
  /** The title to focus once it is the current one — set by `step`, cleared by the title. */
  focusNext: MutableRefObject<string | undefined>
  /** A title's size, as its layout says. */
  measureHeader: (value: string, width: number, height: number) => void
  tabId: (value: string) => string
  panelId: (value: string) => string
}
