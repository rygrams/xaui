import type { ReactNode } from 'react'
import type {
  ScrollViewProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { WheelGeometry } from './wheel-picker.geometry'

export type WheelPickerSlot = 'root' | 'band' | 'column' | 'item' | 'itemSelected'

/**
 * Four emphasis levels and no intent — a wheel reports a choice, and a choice is neither a
 * success nor a danger. What the variant names is **the band**: the shape behind the middle
 * row that says which row the middle one is.
 */
export type WheelPickerVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

/** Three. `size` is the row's height and the type in it. Never width. */
export type WheelPickerSize = Exclude<Size, 'xs'>

type WheelPickerOwnProps = {
  variant?: WheelPickerVariant
  /** The row's height and its type. The wheel's width is its parent's business. */
  size?: WheelPickerSize
  /** The band's corner. */
  radius?: RadiusKey
  /** A raw tint (`'#7c3aed'`), never a token (R7). It lands on the band. */
  color?: string
  /**
   * How many rows are visible at once — **forced odd**, because the whole control is built
   * on there being a middle row. A raw number, so it lives outside the style cache: it is
   * a count rather than a token, and the wheel's height falls out of it. @default 5
   */
  visibleCount?: number
  /** Dims every column and stops the scroll. A column cannot opt back in. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the wheel's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type WheelPickerProps = WheelPickerOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof WheelPickerOwnProps> &
  Omit<ViewStyleProps, keyof WheelPickerOwnProps | keyof ViewProps>

type WheelPickerColumnOwnProps = {
  /** The chosen row's value. Controlled — leave it out and the column holds its own. */
  value?: string
  /** The row it starts on. Unset, and with no `value`, that is the first one. */
  defaultValue?: string
  /**
   * Fired when the wheel comes to **rest** on a new row, never while it is turning: a
   * column that reported every row it passed would fire nine times on one flick, and each
   * of those is a value some caller would have written to a form.
   */
  onValueChange?: (value: string) => void
  /** Dims this column and stops its scroll. */
  isDisabled?: boolean
  children?: ReactNode
}

/** It renders a `ScrollView`, so it carries that node's props and its style keys. */
export type WheelPickerColumnProps = WheelPickerColumnOwnProps &
  Omit<ScrollViewProps, keyof WheelPickerColumnOwnProps> &
  Omit<ViewStyleProps, keyof WheelPickerColumnOwnProps | keyof ScrollViewProps>

type WheelPickerItemOwnProps = {
  /** What this row stands for. The column reports it; it is not the text. */
  value: string
  children?: ReactNode
}

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type WheelPickerItemProps = WheelPickerItemOwnProps &
  Omit<TextStyleProps, keyof WheelPickerItemOwnProps> & {
    style?: StyleProp<TextStyle>
  }

/** R5 — resolved styles, plus the geometry every column measures itself against. */
export type WheelPickerContextValue = {
  bandStyle: StyleProp<ViewStyle>
  columnStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<TextStyle>
  itemSelectedStyle: StyleProp<TextStyle>
  geometry: WheelGeometry
  isDisabled: boolean
}

/**
 * What one column publishes to its rows: where it has scrolled to, and which row is at the
 * middle. The offset is a **shared value**, because a row's fade and turn are read on the
 * UI thread — a scroll position that crossed the bridge per frame would animate at the rate
 * React re-renders rather than at the rate the finger moves.
 */
export type WheelPickerColumnContextValue = {
  offset: SharedValue<number>
  rowHeight: number
  /** The index the column has come to rest on. Rendered state, not the live scroll. */
  selectedIndex: number
  /** Its own position, handed down so a row need not count its siblings. */
  indexOf: (value: string) => number
  isDisabled: boolean
}
