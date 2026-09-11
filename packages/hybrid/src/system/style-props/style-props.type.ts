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

type NativeTextStyleOverrides = {
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
  fontVariant?: CSSProperties['fontVariant'] | ReadonlyArray<string>
  fontWeight?: NativeFontWeight
  includeFontPadding?: boolean
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center'
  textShadowColor?: NativeColor
  textShadowOffset?: NativeOffset
  textShadowRadius?: number
  writingDirection?: 'auto' | 'ltr' | 'rtl'
}

type ImageOnlyStyleKey = 'objectFit' | 'overlayColor' | 'resizeMode' | 'tintColor'

/** React Native-shaped text styles, without taking a dependency on React Native. */
export type TextStyle = Omit<
  Pick<CSSProperties, CSSStyleKey>,
  keyof NativeTextStyleOverrides | ImageOnlyStyleKey
> &
  NativeTextStyleOverrides

export type StyleProp<Style> =
  | Style
  | false
  | null
  | undefined
  | ReadonlyArray<StyleProp<Style>>

/** R13 and R14: every Native text style key except physical directions. */
export type TextStyleProps = Omit<TextStyle, DirectionalStyleKey | 'pointerEvents'>
