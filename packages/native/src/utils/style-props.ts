/**
 * The runtime half of R14. The type half lives in `system/style-props/`, and the two are
 * pinned to each other by a compile-time check there: a React Native upgrade that adds or
 * removes a style key fails `type-check` with the key's name rather than drifting.
 *
 * One set for the three style types rather than one per node. A caller cannot write
 * `fontSize` on a view slot — that slot's props are typed `ViewStyleProps` — so the split
 * never has to know which node it runs for, and every component shares one table.
 */
const STYLE_PROP_KEYS = [
  // Flex and layout
  'alignContent',
  'alignItems',
  'alignSelf',
  'aspectRatio',
  'boxSizing',
  'columnGap',
  'direction',
  'display',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'gap',
  'justifyContent',
  'overflow',
  'rowGap',

  // Position
  'bottom',
  'end',
  'inset',
  'insetBlock',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInline',
  'insetInlineEnd',
  'insetInlineStart',
  'position',
  'start',
  'top',
  'zIndex',

  // Margin
  'margin',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'marginStart',
  'marginTop',
  'marginVertical',

  // Padding
  'padding',
  'paddingBlock',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingInline',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingStart',
  'paddingTop',
  'paddingVertical',

  // Size
  'height',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'width',

  // Border
  'borderBlockColor',
  'borderBlockEndColor',
  'borderBlockStartColor',
  'borderBottomColor',
  'borderBottomEndRadius',
  'borderBottomStartRadius',
  'borderBottomWidth',
  'borderColor',
  'borderCurve',
  'borderEndColor',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderEndWidth',
  'borderRadius',
  'borderStartColor',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderStartWidth',
  'borderStyle',
  'borderTopColor',
  'borderTopEndRadius',
  'borderTopStartRadius',
  'borderTopWidth',
  'borderWidth',

  // Fill, shadow, and the rest of a box's paint
  'backfaceVisibility',
  'backgroundColor',
  'boxShadow',
  'cursor',
  'elevation',
  'experimental_backgroundImage',
  'filter',
  'isolation',
  'mixBlendMode',
  'opacity',
  'outlineColor',
  'outlineOffset',
  'outlineStyle',
  'outlineWidth',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',

  // Transform
  'rotation',
  'scaleX',
  'scaleY',
  'transform',
  'transformMatrix',
  'transformOrigin',
  'translateX',
  'translateY',

  // Text — a text slot only
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'includeFontPadding',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textAlignVertical',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationStyle',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform',
  'userSelect',
  'verticalAlign',
  'writingDirection',

  // Image — an image slot only
  'objectFit',
  'overlayColor',
  'resizeMode',
  'tintColor',
] as const

export type StylePropKey = (typeof STYLE_PROP_KEYS)[number]

const STYLE_PROP_KEY_SET: ReadonlySet<string> = new Set(STYLE_PROP_KEYS)

/** What `splitStyleProps` takes out of a props object. */
export type StylePropsOf<P> = Pick<P, Extract<keyof P, StylePropKey>>
/** What it leaves in it. */
export type RestPropsOf<P> = Omit<P, StylePropKey>

/**
 * Separates the style keys from everything else, transforming neither:
 *
 * ```ts
 * splitStyleProps({ padding: 16, onPress })   // → [{ padding: 16 }, { onPress }]
 * ```
 *
 * A component destructures its own vocabulary — `variant`, `size`, `color` — before
 * calling this, which is what keeps the two apart with no list of exceptions: `color` on
 * a root is R7's tint and never reaches here, while on a text slot it is `TextStyle`'s
 * and does.
 *
 * A key written as `undefined` still counts as written and lands in the style half.
 * Dropping it would be a transformation, and `undefined` in a style is already a no-op.
 */
export function splitStyleProps<P extends object>(
  props: P
): [StylePropsOf<P>, RestPropsOf<P>] {
  const styleProps: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(props)) {
    if (STYLE_PROP_KEY_SET.has(key)) styleProps[key] = value
    else rest[key] = value
  }

  return [styleProps as StylePropsOf<P>, rest as RestPropsOf<P>]
}
