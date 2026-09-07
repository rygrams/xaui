import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { AsChildProps } from '../../system/slot'
import type { ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'
import type { RadioSize, RadioVariant } from './radio.type'

/**
 * Which way the options run. `vertical` is the default because a set of options is read
 * down a column; `horizontal` wraps, so a row of three short labels stays one row on a
 * phone and becomes two on a watch rather than overflowing.
 */
export type RadioGroupOrientation = 'vertical' | 'horizontal'

export type RadioGroupSlot = 'root'

type RadioGroupOwnProps = {
  /** The chosen option's `value`. Controlled — leave it out and the group holds its own. */
  value?: string
  /** The option chosen at first mount, when uncontrolled. */
  defaultValue?: string
  /**
   * Fired with the newly chosen option's `value`. It never fires with `undefined`: a
   * press selects and never clears, so a group that has a chosen option keeps one.
   */
  onValueChange?: (value: string) => void
  orientation?: RadioGroupOrientation
  /** The default for every option in the set. An option's own prop still wins. */
  variant?: RadioVariant
  /** The options' scale, and the gap between them. Never width. */
  size?: RadioSize
  /** The default corner for every option in the set. */
  radius?: RadiusKey
  /** A raw tint (`'#7c3aed'`), never a token (R7), applied to every option. */
  color?: string
  /** Dims every option and stops the press. An option cannot opt back in. */
  isDisabled?: boolean
  /** Paints every option in `danger` — the set is wrong, not one row of it. */
  isInvalid?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * R14 — the group's own props, `View`'s, and every `ViewStyle` key neither claims.
 * `View`'s own props win over the style keys of the same name.
 */
export type RadioGroupProps = RadioGroupOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof RadioGroupOwnProps> &
  Omit<ViewStyleProps, keyof RadioGroupOwnProps | keyof ViewProps>

/**
 * R5 — what an option reads off its set. The appearance keys are **defaults, not resolved
 * styles**: an option resolves its own recipe because it can be given a `variant` of its
 * own, and a group that published styles would have to re-resolve them per option anyway.
 *
 * The one value no option can compute is `value` — which of them is the chosen one.
 */
export type RadioGroupContextValue = {
  /** The chosen option's value, or `undefined` while none is. */
  value: string | undefined
  /** Makes `value` the chosen one. Named `select` because it never clears. */
  select: (value: string) => void
  variant: RadioVariant | undefined
  size: RadioSize | undefined
  radius: RadiusKey | undefined
  color: string | undefined
  isDisabled: boolean
  isInvalid: boolean
}
