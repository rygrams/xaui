import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'
import type { ListSize, ListVariant } from './list.type'

export type ListGroupSlot = 'root' | 'section' | 'header' | 'footer'

type ListGroupOwnProps = {
  /** The default for every `List` in the group. A list's own prop still wins. */
  variant?: ListVariant
  /** The sections' spacing, the headers' type and their inset. Never width. */
  size?: ListSize
  /** The default corner for every `List` in the group. */
  radius?: RadiusKey
  /** A raw tint (`'#7c3aed'`), never a token (R7), applied to every `List`. */
  color?: string
  /** Whether the lists draw a hairline between their rows. */
  hasSeparator?: boolean
  /** Dims every list in the group. A list cannot opt back in. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the group's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type ListGroupProps = ListGroupOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof ListGroupOwnProps> &
  Omit<ViewStyleProps, keyof ListGroupOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type ListGroupSectionProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type ListGroupTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/**
 * R5 — the two resolved text styles, plus the appearance a `List` inside the group takes
 * when it names none of its own.
 *
 * The appearance keys are **defaults, not resolved styles**: a list resolves its own
 * recipe, because it can be given a `variant` the group did not choose, and a group that
 * published styles would have to resolve them a second time per list anyway.
 */
export type ListGroupContextValue = {
  sectionStyle: StyleProp<ViewStyle>
  headerStyle: StyleProp<TextStyle>
  footerStyle: StyleProp<TextStyle>
  variant: ListVariant | undefined
  size: ListSize | undefined
  radius: RadiusKey | undefined
  color: string | undefined
  hasSeparator: boolean | undefined
  isDisabled: boolean
}
