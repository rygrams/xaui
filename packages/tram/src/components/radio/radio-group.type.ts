import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { AsChildProps, ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName } from '../../theme/tram-tokens'
import type { RadioSize } from './radio.type'

/**
 * Which way the options run. `vertical` is the default: a set of options is read down a
 * column. `horizontal` wraps rather than overflowing.
 */
export type RadioGroupOrientation = 'vertical' | 'horizontal'

export type RadioGroupSlot = 'root'

type RadioGroupOwnProps = {
  /** The chosen option's `value`. Controlled — leave it out and the group holds its own. */
  value?: string
  /** The option chosen at first mount, when uncontrolled. */
  defaultValue?: string
  /**
   * Fired with the newly chosen option's `value`. Never with `undefined`: a press selects
   * and never clears, so a group that has a chosen option keeps one.
   */
  onValueChange?: (value: string) => void
  orientation?: RadioGroupOrientation
  /** The options' scale, and the gap between them. Never width. */
  size?: RadioSize
  /** A named accent for every option in the set. An option's own paint still wins. */
  accent?: TramAccentName
  /** A raw `#RRGGBB` tint for every option in the set; it wins over the set's `accent`. */
  color?: string
  /** Greys every option and stops the press. An option cannot opt back in. */
  isDisabled?: boolean
  /** Draws every option in `danger` — the set is wrong, not one row of it. */
  isInvalid?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The group's own props, `View`'s, and every `ViewStyle` key neither claims. As on the
 * option, there is no `variant` and no `radius` to hand down.
 */
export type RadioGroupProps = RadioGroupOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof RadioGroupOwnProps> &
  Omit<ViewStyleProps, keyof RadioGroupOwnProps | keyof ViewProps>

/**
 * What an option reads off its set. The appearance keys are defaults, not resolved
 * styles: an option resolves its own recipe, since it can be given a size or a paint of
 * its own. The one value no option can compute is `value`.
 */
export type RadioGroupContextValue = {
  /** The chosen option's value, or `undefined` while none is. */
  value: string | undefined
  /** Makes `value` the chosen one. Named `select` because it never clears. */
  select: (value: string) => void
  size: RadioSize | undefined
  accent: TramAccentName | undefined
  color: string | undefined
  isDisabled: boolean
  isInvalid: boolean
}
