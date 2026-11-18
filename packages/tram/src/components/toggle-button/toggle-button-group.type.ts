import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { AsChildProps, ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { RovingStop } from '../../system/roving-stop'
import type { Point } from '../../system/tilt'
import type { TramAccentName } from '../../theme/tram-tokens'
import type { ToggleButtonSize } from './toggle-button.type'

export type ToggleButtonGroupOrientation = 'horizontal' | 'vertical'

export type ToggleButtonGroupSlot = 'root' | 'bar'

type ToggleButtonGroupOwnProps = {
  /** The chosen button's value. Leave it out for an uncontrolled group. */
  value?: string
  /** The chosen button on first mount, when the group is uncontrolled. */
  defaultValue?: string
  /** Fired when a button is chosen. Never with `undefined`: a press chooses, never clears. */
  onValueChange?: (value: string) => void
  /** Which way the buttons run, and the bars between them. @default 'horizontal' */
  orientation?: ToggleButtonGroupOrientation
  /** Defaults handed to every button; a button's own value wins. */
  size?: ToggleButtonSize
  /** The corner of the group's box, square by default and capped at 2. */
  radius?: RadiusKey
  accent?: TramAccentName
  color?: string
  /** Greys the frame, the bars and every button, and stops the press. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type ToggleButtonGroupProps = ToggleButtonGroupOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof ToggleButtonGroupOwnProps> &
  Omit<ViewStyleProps, keyof ToggleButtonGroupOwnProps | keyof ViewProps>

/** Where a button lies in the group's box, from its top-start corner. */
export type CellSpan = { x: number; y: number; width: number; height: number }

/** A button as its group knows it: to go to it by the keyboard, and to lean toward it. */
export type CellEntry = {
  isDisabled: boolean
  focus: () => void
  span?: CellSpan
}

/** The group's record of its buttons, in the order they were written. */
export type CellRow = {
  register: (value: string, entry: CellEntry) => () => void
  stops: () => RovingStop[]
  focus: (value: string) => void
  spanOf: (value: string) => CellSpan | undefined
  /** The row runs from the right, as under RTL. */
  isReversed: () => boolean
}

export type ToggleButtonGroupContextValue = {
  /** The one value no button can determine by itself. */
  value: string | undefined
  /** Makes `value` the chosen one. Named `select` because it never clears. */
  select: (value: string) => void
  /** Appearance defaults, which a button may override. */
  size: ToggleButtonSize | undefined
  accent: TramAccentName | undefined
  color: string | undefined
  isDisabled: boolean
  orientation: ToggleButtonGroupOrientation
  /** The group is wider than its content: its buttons share the width equally. */
  isStretched: boolean
  /** Leans the whole box toward a point of one button, measured from that button. */
  lean: (value: string, at: Point) => void
  settle: () => void
  row: CellRow
}
