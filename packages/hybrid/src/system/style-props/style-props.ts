import type { CSSObject } from '@emotion/react'
import type { StyleProp, TextStyle } from './style-props.type'

const STYLE_PROP_KEYS = [
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
  'height',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'width',
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
  'rotation',
  'scaleX',
  'scaleY',
  'transform',
  'transformMatrix',
  'transformOrigin',
  'translateX',
  'translateY',
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
  'objectFit',
  'overlayColor',
  'resizeMode',
  'tintColor',
] as const

export type StylePropKey = (typeof STYLE_PROP_KEYS)[number]

const STYLE_PROP_KEY_SET: ReadonlySet<string> = new Set(STYLE_PROP_KEYS)

export type StylePropsOf<Props> = Pick<Props, Extract<keyof Props, StylePropKey>>
export type RestPropsOf<Props> = Omit<Props, StylePropKey>

const WEB_PROPERTY: Partial<Record<StylePropKey, string>> = {
  end: 'insetInlineEnd',
  start: 'insetInlineStart',
  marginEnd: 'marginInlineEnd',
  marginHorizontal: 'marginInline',
  marginStart: 'marginInlineStart',
  marginVertical: 'marginBlock',
  paddingEnd: 'paddingInlineEnd',
  paddingHorizontal: 'paddingInline',
  paddingStart: 'paddingInlineStart',
  paddingVertical: 'paddingBlock',
  borderEndColor: 'borderInlineEndColor',
  borderEndWidth: 'borderInlineEndWidth',
  borderStartColor: 'borderInlineStartColor',
  borderStartWidth: 'borderInlineStartWidth',
  experimental_backgroundImage: 'backgroundImage',
  resizeMode: 'objectFit',
  textAlignVertical: 'verticalAlign',
  writingDirection: 'direction',
}

const LENGTH_PROPERTIES: ReadonlySet<string> = new Set([
  'bottom',
  'borderBottomEndRadius',
  'borderBottomStartRadius',
  'borderBottomWidth',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderInlineEndWidth',
  'borderRadius',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderInlineStartWidth',
  'borderTopEndRadius',
  'borderTopStartRadius',
  'borderTopWidth',
  'borderWidth',
  'columnGap',
  'flexBasis',
  'fontSize',
  'gap',
  'height',
  'inset',
  'insetBlock',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInline',
  'insetInlineEnd',
  'insetInlineStart',
  'letterSpacing',
  'lineHeight',
  'margin',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'outlineOffset',
  'outlineWidth',
  'padding',
  'paddingBlock',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingInline',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingTop',
  'rowGap',
  'top',
  'translateX',
  'translateY',
  'width',
])

/** One Native point becomes one CSS logical pixel at a 16px root. */
export function toWebUnit(value: number): string {
  return `${value / 16}rem`
}

export function splitStyleProps<Props extends object>(
  props: Props
): [StylePropsOf<Props>, RestPropsOf<Props>] {
  const styleProps: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(props)) {
    if (STYLE_PROP_KEY_SET.has(key)) styleProps[key] = value
    else rest[key] = value
  }

  return [styleProps as StylePropsOf<Props>, rest as RestPropsOf<Props>]
}

/** Flattens Native-style arrays, maps logical aliases and converts fixed lengths. */
export function toWebStyle(style: StyleProp<TextStyle>): CSSObject {
  const source: Record<string, unknown> = {}
  flattenStyle(style, source)
  const web: Record<string, unknown> = {}

  for (const [nativeProperty, value] of Object.entries(source)) {
    if (value === null || value === undefined) continue
    if (
      nativeProperty === 'includeFontPadding' ||
      nativeProperty === 'borderCurve'
    ) {
      continue
    }
    if (
      isShadowProperty(nativeProperty) ||
      isTextShadowProperty(nativeProperty) ||
      isTransformProperty(nativeProperty)
    ) {
      continue
    }

    const property = WEB_PROPERTY[nativeProperty as StylePropKey] ?? nativeProperty
    web[property] = convertValue(property, value)
  }

  if (web.boxShadow === undefined) {
    const shadow = shadowValue(source)
    if (shadow) web.boxShadow = shadow
  }
  const textShadow = textShadowValue(source)
  if (textShadow) web.textShadow = textShadow
  const transform = composedTransformValue(source)
  if (transform) web.transform = transform

  return web as CSSObject
}

function flattenStyle(
  style: StyleProp<TextStyle>,
  target: Record<string, unknown>
): void {
  if (!style) return
  if (Array.isArray(style)) {
    for (const entry of style) flattenStyle(entry, target)
    return
  }
  Object.assign(target, style)
}

function convertValue(property: string, value: unknown): unknown {
  if (property === 'fontVariant' && Array.isArray(value)) return value.join(' ')
  if (property === 'fontWeight') return fontWeightValue(value)
  if (property === 'textAlign' && value === 'auto') return 'start'
  if (property === 'direction' && value === 'auto') return 'inherit'
  if (LENGTH_PROPERTIES.has(property) && typeof value === 'number') {
    return toWebUnit(value)
  }
  return value
}

function transformValue(value: ReadonlyArray<unknown>): string {
  return value
    .flatMap(transform => Object.entries(transform as Record<string, unknown>))
    .map(([name, amount]) => {
      const resolved =
        (name === 'translateX' || name === 'translateY') &&
        typeof amount === 'number'
          ? toWebUnit(amount)
          : amount
      return `${name}(${String(resolved)})`
    })
    .join(' ')
}

function isShadowProperty(property: string): boolean {
  return (
    property === 'shadowColor' ||
    property === 'shadowOffset' ||
    property === 'shadowOpacity' ||
    property === 'shadowRadius' ||
    property === 'elevation'
  )
}

function isTextShadowProperty(property: string): boolean {
  return (
    property === 'textShadowColor' ||
    property === 'textShadowOffset' ||
    property === 'textShadowRadius'
  )
}

function isTransformProperty(property: string): boolean {
  return (
    property === 'rotation' ||
    property === 'scaleX' ||
    property === 'scaleY' ||
    property === 'transform' ||
    property === 'transformMatrix' ||
    property === 'translateX' ||
    property === 'translateY'
  )
}

function composedTransformValue(style: Record<string, unknown>): string | undefined {
  const transforms: string[] = []
  if (typeof style.transform === 'string') transforms.push(style.transform)
  else if (Array.isArray(style.transform))
    transforms.push(transformValue(style.transform))

  if (Array.isArray(style.transformMatrix)) {
    transforms.push(`matrix(${style.transformMatrix.join(', ')})`)
  }
  if (style.rotation !== undefined)
    transforms.push(`rotate(${String(style.rotation)})`)
  if (style.scaleX !== undefined) transforms.push(`scaleX(${String(style.scaleX)})`)
  if (style.scaleY !== undefined) transforms.push(`scaleY(${String(style.scaleY)})`)
  if (style.translateX !== undefined) {
    transforms.push(`translateX(${transformLength(style.translateX)})`)
  }
  if (style.translateY !== undefined) {
    transforms.push(`translateY(${transformLength(style.translateY)})`)
  }
  return transforms.length === 0 ? undefined : transforms.join(' ')
}

function transformLength(value: unknown): string {
  return typeof value === 'number' ? toWebUnit(value) : String(value)
}

function fontWeightValue(value: unknown): unknown {
  const nativeWeights: Record<string, number> = {
    ultralight: 100,
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    condensed: 400,
    condensedBold: 700,
    heavy: 800,
    black: 900,
  }
  return typeof value === 'string' ? (nativeWeights[value] ?? value) : value
}

function shadowValue(style: Record<string, unknown>): string | undefined {
  const offset = style.shadowOffset as
    | { width?: number; height?: number }
    | undefined
  const opacity = typeof style.shadowOpacity === 'number' ? style.shadowOpacity : 0
  const radius = typeof style.shadowRadius === 'number' ? style.shadowRadius : 0
  if (!offset && opacity === 0 && radius === 0) return undefined

  const color = withOpacity(String(style.shadowColor ?? '#000000'), opacity)
  return `${toWebUnit(offset?.width ?? 0)} ${toWebUnit(offset?.height ?? 0)} ${toWebUnit(radius)} ${color}`
}

function textShadowValue(style: Record<string, unknown>): string | undefined {
  const offset = style.textShadowOffset as
    | { width?: number; height?: number }
    | undefined
  const radius =
    typeof style.textShadowRadius === 'number' ? style.textShadowRadius : 0
  if (!offset && radius === 0 && style.textShadowColor === undefined)
    return undefined

  return `${toWebUnit(offset?.width ?? 0)} ${toWebUnit(offset?.height ?? 0)} ${toWebUnit(radius)} ${String(style.textShadowColor ?? 'currentColor')}`
}

function withOpacity(color: string, opacity: number): string {
  if (opacity >= 1 || color !== '#000000') return color
  return `rgba(0, 0, 0, ${opacity})`
}
