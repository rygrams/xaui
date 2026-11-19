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
 * Three of the `Button`'s drawings, in the accent — or in `color` — with the icon square
 * saying the rest:
 *
 * | Variant     | Ground                          | Icon square                 |
 * | ----------- | ------------------------------- | --------------------------- |
 * | `contained` | the true colour                 | the ink's line, no fill     |
 * | `flat`      | its soft slice (default)        | the true colour, filled     |
 * | `outline`   | the page, in the `Button`'s line| the true colour, filled     |
 *
 * **Not Native's nine names**, as on the `Button`: a variant says how the box is drawn,
 * and a status is a colour — `accent="green"` for what Native calls `success`, `amber`
 * for `warning`, `red` for `danger`. No `text`: an alert with no box is a paragraph.
 */
export type AlertVariant = 'contained' | 'flat' | 'outline'

export type AlertSize = TramSize

type AlertOwnProps = {
  variant?: AlertVariant
  size?: AlertSize
  /** Overrides the Tram corner of 2; the scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /** One of the twenty named accents, painted as the `Button` paints it. */
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
