import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type { StylePropKey } from '../../utils/style-props'

/**
 * R13 — React Native mirrors a layout under RTL through the Start/End properties and only
 * those. A props API is exactly where someone writes `paddingLeft` without thinking, so
 * the type removes the temptation instead of leaving it to a review.
 */
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

/**
 * `pointerEvents` is a style key *and* a `View` prop. R14 says the component's own prop
 * wins, so it stays the prop it has always been and is not exposed twice — the one name
 * where the two vocabularies collide.
 */
type ComponentOwnedStyleKey = 'pointerEvents'

/**
 * The style keys of a node, exposed as props (R14). Not a maintained list: it derives
 * from the React Native type, minus what R13 forbids.
 *
 * ```ts
 * type CardProps = ViewStyleProps & { variant?: CardVariant }
 * ```
 */
export type StyleProps<Style> = Omit<
  Style,
  DirectionalStyleKey | ComponentOwnedStyleKey
>

/** A root, or any slot that renders a view. */
export type ViewStyleProps = StyleProps<ViewStyle>
/** A text slot — `color`, `fontSize`, `letterSpacing`… */
export type TextStyleProps = StyleProps<TextStyle>
/** An image slot — `resizeMode`, `tintColor`… */
export type ImageStyleProps = StyleProps<ImageStyle>

/**
 * The type and the runtime table in `utils/style-props.ts` describe the same set, and
 * nothing but this pins them together. A React Native upgrade that adds a style key, or
 * an edit that misspells one, fails `type-check` naming the key rather than shipping a
 * prop that types fine and is dropped on the floor at runtime.
 */
type Assert<Drift extends never> = Drift
type ExposedStyleKey = keyof StyleProps<ViewStyle & TextStyle & ImageStyle>

type _MissingFromTable = Assert<Exclude<ExposedStyleKey, StylePropKey>>
type _AbsentFromReactNative = Assert<Exclude<StylePropKey, ExposedStyleKey>>
