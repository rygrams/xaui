import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  CloseButtonBaseProps,
  IconContextValue,
  IconProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type AlertSlot =
  | 'root'
  | 'icon'
  | 'iconGlyph'
  | 'content'
  | 'title'
  | 'description'
  | 'close'
  | 'closeGlyph'

/**
 * Native's nine names, as on the Tram `Toast`: an alert reports, so the statuses are
 * names. Each is one flat fill, and the icon square says the rest.
 *
 * | Variant                        | Ground                 | Icon square                 |
 * | ------------------------------ | ---------------------- | --------------------------- |
 * | `default`                      | the discreet `surface` | the accent, filled          |
 * | `secondary`                    | the accent's soft slice| the accent, filled          |
 * | `*-soft`                       | the status's soft slice| the status colour, filled   |
 * | `primary`, `success`, …        | the full colour        | the ink's line, no fill     |
 *
 * No shadow on `default`, where Native has one.
 */
export type AlertVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'success-soft'
  | 'warning'
  | 'warning-soft'
  | 'danger'
  | 'danger-soft'

export type AlertSize = TramSize

type AlertOwnProps = {
  variant?: AlertVariant
  size?: AlertSize
  /** Overrides the Tram corner of 2; the scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /** One of the twenty named accents, painted as `color` is. */
  accent?: TramAccentName
  /** A raw tint, never a token. It wins over `accent`. */
  color?: string
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type AlertProps = AlertOwnProps &
  Omit<ViewProps, keyof AlertOwnProps> &
  Omit<ViewStyleProps, keyof AlertOwnProps | keyof ViewProps> & {
    asChild?: boolean
  }

export type AlertContentProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & {
    children?: ReactNode
  }

type AlertTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type AlertTitleProps = AlertTextProps
export type AlertDescriptionProps = AlertTextProps

type AlertIconGlyphKey = 'as' | 'children' | 'source' | 'size' | 'color'

/** `Icon`'s union, kept a union: `as` and `source` are never handed over together. */
type AlertIconGlyphProps<T = IconProps> = T extends IconProps
  ? Pick<T, AlertIconGlyphKey>
  : never

type AlertIconBoxProps = {
  style?: StyleProp<ViewStyle>
} & Omit<ViewStyleProps, AlertIconGlyphKey | 'style'>

export type AlertIconProps = AlertIconGlyphProps & AlertIconBoxProps

export type AlertCloseProps = Omit<
  CloseButtonBaseProps,
  'name' | 'baseStyle' | 'glyphStyle'
>

/** Resolved styles, not props for a slot to resolve a second time. */
export type AlertContextValue = {
  iconStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  closeStyle: StyleProp<ViewStyle>
  closeGlyphStyle: StyleProp<ViewStyle>
  /** Points the touch of `Alert.Close` reaches past its drawn glyph, to 48. */
  closeReach: number
  /** Values, not a style: `Icon` hands them to a third-party component. */
  icon: IconContextValue
  isDisabled: boolean
}
