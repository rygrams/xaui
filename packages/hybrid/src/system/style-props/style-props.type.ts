import type { CSSProperties } from 'react'
import type { StylePropKey } from './style-props'

export type DirectionalStyleKey =
  | 'left'
  | 'right'
  | 'paddingLeft'
  | 'paddingRight'
  | 'marginLeft'
  | 'marginRight'
  | 'borderLeftWidth'
  | 'borderRightWidth'
  | 'borderLeftColor'
  | 'borderRightColor'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'

type NativeLength = number | string
type NativeColor = string
type NativeOffset = { width: number; height: number }

export type NativeFontWeight =
  | CSSProperties['fontWeight']
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'medium'
  | 'regular'
  | 'semibold'
  | 'condensedBold'
  | 'condensed'
  | 'heavy'
  | 'black'

type CSSStyleKey = Extract<StylePropKey, keyof CSSProperties>

type NativeBoxStyleOverrides = {
  borderBottomEndRadius?: NativeLength
  borderBottomStartRadius?: NativeLength
  borderTopEndRadius?: NativeLength
  borderTopStartRadius?: NativeLength
  end?: NativeLength
  start?: NativeLength
  marginEnd?: NativeLength
  marginHorizontal?: NativeLength
  marginStart?: NativeLength
  marginVertical?: NativeLength
  paddingEnd?: NativeLength
  paddingHorizontal?: NativeLength
  paddingStart?: NativeLength
  paddingVertical?: NativeLength
  borderEndColor?: NativeColor
  borderEndWidth?: NativeLength
  borderStartColor?: NativeColor
  borderStartWidth?: NativeLength
  borderCurve?: 'circular' | 'continuous'
  elevation?: number
  experimental_backgroundImage?: string
  shadowColor?: NativeColor
  shadowOffset?: NativeOffset
  shadowOpacity?: number
  shadowRadius?: number
  rotation?: string
  scaleX?: number
  scaleY?: number
  transform?: ReadonlyArray<Record<string, string | number>> | string
  transformMatrix?: ReadonlyArray<number>
  translateX?: NativeLength
  translateY?: NativeLength
}

type NativeTextOnlyOverrides = {
  fontVariant?: CSSProperties['fontVariant'] | ReadonlyArray<string>
  fontWeight?: NativeFontWeight
  includeFontPadding?: boolean
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center'
  textShadowColor?: NativeColor
  textShadowOffset?: NativeOffset
  textShadowRadius?: number
  writingDirection?: 'auto' | 'ltr' | 'rtl'
}

type NativeImageOnlyOverrides = {
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  overlayColor?: NativeColor
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
  tintColor?: NativeColor
}

type ImageOnlyStyleKey = keyof NativeImageOnlyOverrides

/** Keys a text node has and an image node does not — `fontWeight` on an image is a lie. */
type TextOnlyStyleKey =
  | keyof NativeTextOnlyOverrides
  | 'color'
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
  | 'textDecorationColor'
  | 'textDecorationLine'
  | 'textDecorationStyle'
  | 'textTransform'
  | 'userSelect'
  | 'verticalAlign'

type BoxStyle = Omit<
  Pick<CSSProperties, CSSStyleKey>,
  keyof NativeBoxStyleOverrides | ImageOnlyStyleKey
> &
  NativeBoxStyleOverrides

/** React Native-shaped text styles, without taking a dependency on React Native. */
export type TextStyle = Omit<BoxStyle, keyof NativeTextOnlyOverrides> &
  NativeTextOnlyOverrides

/** React Native-shaped image styles — `resizeMode`, `tintColor`, and no typography. */
export type ImageStyle = Omit<BoxStyle, TextOnlyStyleKey> & NativeImageOnlyOverrides

export type StyleProp<Style> =
  | Style
  | false
  | null
  | undefined
  | ReadonlyArray<StyleProp<Style>>

/**
 * R13 and R14: every style key of a node, exposed as props, minus the physical directions
 * R13 bans and `pointerEvents`, which stays the component's own prop.
 */
export type StyleProps<Style> = Omit<Style, DirectionalStyleKey | 'pointerEvents'>

/** A text node — `color`, `fontSize`, `letterSpacing`… */
export type TextStyleProps = StyleProps<TextStyle>
/** An image node — `resizeMode`, `tintColor`… */
export type ImageStyleProps = StyleProps<ImageStyle>
