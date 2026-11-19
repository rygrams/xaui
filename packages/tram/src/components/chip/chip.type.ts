import type { ReactNode } from 'react'
import type {
  ImageSourcePropType,
  PressableStateCallbackType,
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
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { ReportVariant } from '../../system/report-tokens'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type ChipSlot =
  | 'root'
  | 'label'
  | 'icon'
  | 'dot'
  | 'avatar'
  | 'close'
  | 'closeGlyph'

/** Native's eleven names, each a flat fill — `ReportVariant` has the table. */
export type ChipVariant = ReportVariant

/** 24, 32, 40 tall. */
export type ChipSize = TramSize

type ChipOwnProps = {
  variant?: ChipVariant
  size?: ChipSize
  /** Overrides the Tram corner of 2; the scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents, painted as `color` is: the true colour as a fill, the
   * mode's ink where the chip has none (`tertiary`, `ghost`).
   */
  accent?: TramAccentName
  /** A raw tint, never a token. It wins over `accent`. */
  color?: string
  isDisabled?: boolean
  /**
   * Makes the whole chip a control — a filter that toggles. It then tilts toward the
   * finger like the `Button`. A `Chip.Close` is its own control and needs neither.
   */
  isPressable?: boolean
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

type ChipBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
>

export type ChipProps = ChipOwnProps &
  ChipBehaviourProps &
  Omit<ViewStyleProps, keyof ChipOwnProps>

export type ChipLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type ChipIconProps = IconProps

export type ChipDotProps = ViewProps & Omit<ViewStyleProps, keyof ViewProps>

type ChipAvatarOwnProps = {
  /** A photo, laid over the square. Without one, the children are the square's content. */
  source?: ImageSourcePropType
  children?: ReactNode
}

export type ChipAvatarProps = ChipAvatarOwnProps &
  ViewProps &
  Omit<ViewStyleProps, keyof ViewProps | keyof ChipAvatarOwnProps>

export type ChipCloseProps = Omit<
  CloseButtonBaseProps,
  'name' | 'baseStyle' | 'glyphStyle'
>

/** Resolved styles, not props for a slot to resolve a second time. */
export type ChipContextValue = {
  labelStyle: StyleProp<TextStyle>
  dotStyle: StyleProp<ViewStyle>
  avatarStyle: StyleProp<ViewStyle>
  closeStyle: StyleProp<ViewStyle>
  closeGlyphStyle: StyleProp<ViewStyle>
  /** Points the touch of `Chip.Close` reaches past its drawn glyph, to 48. */
  closeReach: number
  /** Values, not a style: `Icon` hands them to a third-party component. */
  icon: IconContextValue
  isDisabled: boolean
}
