import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { CloseButtonProps } from '../../system/close-button'
import type { IconContextValue, IconProps } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

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
 * Nine names: the surface, the accent in two weights, and the three status families in
 * theirs. An alert is the one component in the library that is **both** a surface and a
 * report, so it takes the emphasis vocabulary of the `Card` for its neutral level and the
 * status vocabulary of the `Chip` for the rest.
 *
 * - **`default`** — the `surface` fill and the surface shadow, exactly the `Card`'s
 *   `default`. This is HeroUI's alert: a neutral card, with the status carried by the icon
 *   rather than by the background.
 * - **`primary` / `secondary`** — the full accent and its soft slice, for the
 *   informational alert that is not an outcome.
 * - **`success` / `warning` / `danger`**, each with a `-soft` slice — the tinted surface
 *   most alerts want, and the solid fill for the banner that has to stop the reader.
 *
 * `tertiary` and `ghost` are absent: an alert without a surface is a paragraph, and the
 * outline case is `default` with `borderWidth` and `borderColor` as style props (R14).
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

export type AlertSize = Size

/**
 * What the `Alert` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the alert's scale and never
 * `ViewStyle`'s, and `color` is R7's tint.
 */
type AlertOwnProps = {
  variant?: AlertVariant
  /**
   * Padding, gaps, radius and the type of `Title` and `Description`. **Never a height**:
   * an alert is a surface, and it is as tall as the message it carries.
   */
  size?: AlertSize
  /** Overrides the radius `size` chose. */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). It paints the fill and, through its
   * OKLab-contrasted slice, the title and the icon — so a brand-coloured alert stays
   * readable without being told a second colour.
   */
  color?: string
  /** Dims the alert, and reaches the close inside it. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * R14 — the alert's own props, `View`'s, and every `ViewStyle` key neither already
 * claims. There is no press behaviour here, deliberately: an alert reports, it is not a
 * control. A dismissible one carries an `Alert.Close`, which is the control.
 */
export type AlertProps = AlertOwnProps &
  Omit<ViewProps, keyof AlertOwnProps> &
  Omit<ViewStyleProps, keyof AlertOwnProps | keyof ViewProps> & {
    /** R12 — merge into the single child instead of rendering a `View`. */
    asChild?: boolean
  }

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type AlertContentProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & {
    children?: ReactNode
  }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
type AlertTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type AlertTitleProps = AlertTextProps
export type AlertDescriptionProps = AlertTextProps

/**
 * `Icon`'s three forms, plus the `ViewStyle` keys of the box around them (R14).
 *
 * Unlike `Button.Icon` and `Chip.Icon`, this slot **renders a view of its own**. It has
 * to: an alert's icon sits beside a block of text rather than on one line with it, and
 * lining the glyph up with the first line's cap-height means offsetting it by half the
 * leading — which needs a node. That node is also what lets the slot carry style props at
 * all, which the other two cannot.
 */
type AlertIconGlyphKey = 'as' | 'children' | 'source' | 'size' | 'color'

/**
 * `Pick`, distributed over `Icon`'s three forms rather than applied to the union as a
 * whole. Applied as a whole it merges them into one shape where `as` and `source` are both
 * optional — which is the boundary `IconProps` was turned into a union to keep, so
 * `<Alert.Icon as={Check} source={png} />` would compile again and one of the two would be
 * silently dropped.
 */
type AlertIconGlyphProps<T = IconProps> = T extends IconProps
  ? Pick<T, AlertIconGlyphKey>
  : never

type AlertIconBoxProps = {
  /** The box, not the glyph — `size` and `color` are what shape the icon itself. */
  style?: StyleProp<ViewStyle>
} & Omit<ViewStyleProps, AlertIconGlyphKey | 'style'>

export type AlertIconProps = AlertIconGlyphProps & AlertIconBoxProps

/**
 * Everything the shared `CloseButton` accepts, minus the three the alert supplies itself:
 * the warning's name and the two resolved styles its recipe already decided (R5).
 */
export type AlertCloseProps = Omit<
  CloseButtonProps,
  'name' | 'baseStyle' | 'glyphStyle'
>

/**
 * R5 — resolved styles, not props for a slot to resolve a second time. Each entry is the
 * cached `StyleSheet` reference with the uncached tint pass layered over it, so a slot
 * merges its own `style` on top and does no work of its own.
 */
export type AlertContextValue = {
  iconStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  closeStyle: StyleProp<ViewStyle>
  closeGlyphStyle: StyleProp<ViewStyle>
  /**
   * Values, not a style: `Icon` hands `size` and `color` to a third-party component, so
   * the root flattens its icon slot once here rather than in every icon it contains.
   */
  icon: IconContextValue
  isDisabled: boolean
}
