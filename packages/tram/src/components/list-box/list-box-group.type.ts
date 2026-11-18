import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  AsChildProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { TramAccentName } from '../../theme/tram-tokens'
import type { ListBoxSize } from './list-box.type'

export type ListBoxGroupSlot = 'root' | 'section' | 'header' | 'footer'

type ListBoxGroupOwnProps = {
  /** The default for every `ListBox` in the group, and the gap between sections. */
  size?: ListBoxSize
  /** The default accent of every list's squares. A list's own still wins. */
  accent?: TramAccentName
  /** A raw tint, never a token, for every list's squares. */
  color?: string
  /** Whether the lists draw a line between their rows. */
  hasSeparator?: boolean
  /** Greys every list in the group. A list cannot opt back in. */
  isDisabled?: boolean
  /**
   * Whether the headers, rows and footers arrive in one cascade, through every section,
   * when the group mounts. @default true
   */
  hasEntrance?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the group's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type ListBoxGroupProps = ListBoxGroupOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof ListBoxGroupOwnProps> &
  Omit<ViewStyleProps, keyof ListBoxGroupOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type ListBoxGroupSectionProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type ListBoxGroupTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/**
 * R5 — the resolved styles of the group's slots, and the defaults a `ListBox` inside it
 * takes when it names none of its own.
 */
export type ListBoxGroupContextValue = {
  sectionStyle: StyleProp<ViewStyle>
  headerStyle: StyleProp<TextStyle>
  footerStyle: StyleProp<TextStyle>
  size: ListBoxSize | undefined
  accent: TramAccentName | undefined
  color: string | undefined
  hasSeparator: boolean | undefined
  isDisabled: boolean
}
