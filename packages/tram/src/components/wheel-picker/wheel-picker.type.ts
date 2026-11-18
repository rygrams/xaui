import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { ViewStyleProps } from '@xaui/native/system'
import type { WheelShape } from '../../system/wheel'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type WheelPickerSlot =
  | 'root'
  | 'column'
  | 'cell'
  | 'item'
  | 'fill'
  | 'label'
  | 'current'
  | 'currentLabel'

/** Three. `size` is the square's side and the type in it. */
export type WheelPickerSize = TramSize

/** A wheel's measurements, from its size and the count a caller gives. */
export type WheelGeometry = {
  /** A square's side. */
  side: number
  /** From one square to the next: a side and the gap. */
  step: number
  /** Always odd, always at least three. */
  visibleCount: number
  /** A column's own height: every visible square and the gaps between them. */
  height: number
}

type WheelPickerOwnProps = {
  /** The square's side — 64 / 84 / 104 — and the type in it. */
  size?: WheelPickerSize
  /**
   * One of the twenty named accents — `accent="lime"` — for a wheel that is not in the
   * theme's accent. It fills the current square; `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token: the fill of the current square. It is the
   * caller's word and is never corrected.
   */
  color?: string
  /**
   * How many squares are visible at once — **forced odd**, the current one in the middle.
   * A raw number, so it lives outside the style cache. @default 5
   */
  visibleCount?: number
  /** Greys every column and stops the wheel. A column cannot opt back in. */
  isDisabled?: boolean
  /**
   * Keeps the neighbours on screen. Left out, a wheel nobody touches shows its current
   * squares alone, and the others come back at the first touch.
   */
  isAwake?: boolean
  /**
   * Renders the caller's one child element as the root, with the wheel's props, style
   * and ref merged into it. The columns go inside that element.
   */
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The Native `WheelPicker`'s props, with the Tram vocabulary: no `variant` and no
 * `radius` — there is no band, the current square is the mark — `accent` beside `color`,
 * and `isAwake`.
 */
export type WheelPickerProps = WheelPickerOwnProps &
  Omit<ViewProps, keyof WheelPickerOwnProps> &
  Omit<ViewStyleProps, keyof WheelPickerOwnProps | keyof ViewProps>

type WheelPickerColumnOwnProps = {
  /** The chosen square's value. Controlled — leave it out and the column holds its own. */
  value?: string
  /** The square it starts on. Unset, and with no `value`, that is the first one. */
  defaultValue?: string
  /**
   * Fired when the wheel comes to **rest** on a new square, never while it is turning:
   * one throw passes nine squares, and each is a value a caller would have written.
   */
  onValueChange?: (value: string) => void
  /** Greys this column and stops it. The others still turn. */
  isDisabled?: boolean
  /**
   * The last square is followed by the first, and the column turns without end. It takes
   * one square more than are visible; with fewer the column has ends. @default false
   */
  isLooping?: boolean
  children?: ReactNode
}

/** It renders a `View` moved by a gesture — Native's is a `ScrollView`. */
export type WheelPickerColumnProps = WheelPickerColumnOwnProps &
  Omit<ViewProps, keyof WheelPickerColumnOwnProps> &
  Omit<ViewStyleProps, keyof WheelPickerColumnOwnProps | keyof ViewProps>

type WheelPickerItemOwnProps = {
  /** What this square stands for. The column reports it; it is not the text. */
  value: string
  /** Text, set at the bottom of the square. A nested `Text` makes a second line. */
  children?: ReactNode
}

/** A pressable square with its text inside — Native's is the `Text` alone. */
export type WheelPickerItemProps = WheelPickerItemOwnProps &
  Omit<PressableProps, keyof WheelPickerItemOwnProps | 'style'> &
  Omit<ViewStyleProps, keyof WheelPickerItemOwnProps | keyof PressableProps> & {
    style?: StyleProp<ViewStyle>
  }

/**
 * The colours a square moves between as it nears the middle. Plain strings: they are
 * mixed on the UI thread.
 */
export type WheelPaint = {
  /** The current square's fill, and its line. */
  fill: string
  /** The text on that fill. */
  ink: string
  /** A neighbour's fill: the ground. */
  ground: string
  /** A neighbour's line. */
  line: string
  /** A neighbour's text. */
  text: string
}

/** R5 — resolved styles, the colours, and the geometry every column is measured by. */
export type WheelPickerContextValue = {
  columnStyle: StyleProp<ViewStyle>
  /** Where a square is placed in its column, before the wheel moves it. */
  cellStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<ViewStyle>
  /** The painted layer of a square, under its text. */
  fillStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  paint: WheelPaint
  /** What a disabled column is painted in while the rest of the wheel is not. */
  disabledPaint: WheelPaint
  geometry: WheelGeometry
  isDisabled: boolean
  isAwake: boolean
  /** `true` under an ancestor's `disable-all`: everything is placed, nothing moves. */
  isStill: boolean
  /** The column whose touch woke the wheel, or `''` while it rests. */
  stirredBy: SharedValue<string>
  /** A column says it is touched or turning, then that it has come to rest. */
  setBusy: (column: string, isBusy: boolean) => void
}

/**
 * What one column publishes to its squares. The offset and the wake are **shared
 * values**: a square's place, fill and fade are read on the UI thread.
 */
export type WheelPickerColumnContextValue = {
  /** How far the column has turned, in points. Unbounded on a looping column. */
  offset: SharedValue<number>
  /** 0 at rest, 1 once touched: how much of the neighbours is shown. */
  awake: SharedValue<number>
  shape: WheelShape
  /** The index the column has come to rest on. Rendered state, not the live turn. */
  selectedIndex: number
  /** Its own position, handed down so a square need not count its siblings. */
  indexOf: (value: string) => number
  paint: WheelPaint
  isDisabled: boolean
}
