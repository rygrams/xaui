import type { CSSProperties } from 'react'
import type {
  EdgeInsets,
  Alignment,
  ShadowConfig,
  TransformConfig,
  Border,
  BorderRadius,
  BorderSide,
} from '@xaui/core'

export const resolveEdgeInsets = (
  value: EdgeInsets,
  prefix: 'padding' | 'margin'
): CSSProperties => {
  if (typeof value === 'number') {
    return prefix === 'padding' ? { padding: value } : { margin: value }
  }

  const style: CSSProperties = {}

  if (prefix === 'padding') {
    if (value.horizontal !== undefined) {
      style.paddingLeft = value.horizontal
      style.paddingRight = value.horizontal
    }
    if (value.vertical !== undefined) {
      style.paddingTop = value.vertical
      style.paddingBottom = value.vertical
    }
    if (value.top !== undefined) style.paddingTop = value.top
    if (value.bottom !== undefined) style.paddingBottom = value.bottom
    if (value.left !== undefined) style.paddingLeft = value.left
    if (value.right !== undefined) style.paddingRight = value.right
  } else {
    if (value.horizontal !== undefined) {
      style.marginLeft = value.horizontal
      style.marginRight = value.horizontal
    }
    if (value.vertical !== undefined) {
      style.marginTop = value.vertical
      style.marginBottom = value.vertical
    }
    if (value.top !== undefined) style.marginTop = value.top
    if (value.bottom !== undefined) style.marginBottom = value.bottom
    if (value.left !== undefined) style.marginLeft = value.left
    if (value.right !== undefined) style.marginRight = value.right
  }

  return style
}

type AlignmentResult = Pick<CSSProperties, 'justifyContent' | 'alignItems' | 'display'>

const ALIGNMENT_MAP: Record<string, AlignmentResult> = {
  topLeft: { display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' },
  topCenter: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
  topRight: { display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' },
  centerLeft: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  centerRight: { display: 'flex', justifyContent: 'center', alignItems: 'flex-end' },
  bottomLeft: { display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' },
  bottomCenter: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' },
  bottomRight: { display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' },
}

const toFlexPosition = (v: number): CSSProperties['justifyContent'] => {
  if (v <= 0) return 'flex-start'
  if (v >= 1) return 'flex-end'
  return 'center'
}

export const resolveAlignment = (value: Alignment): AlignmentResult => {
  if (typeof value === 'object') {
    return {
      display: 'flex',
      justifyContent: toFlexPosition(value.y),
      alignItems: toFlexPosition(value.x),
    }
  }

  return ALIGNMENT_MAP[value] ?? { display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }
}

export const resolveBorderRadius = (value: BorderRadius): CSSProperties => {
  if (typeof value === 'number') {
    return { borderRadius: value }
  }

  const style: CSSProperties = {}
  if (value.topLeft !== undefined) style.borderTopLeftRadius = value.topLeft
  if (value.topRight !== undefined) style.borderTopRightRadius = value.topRight
  if (value.bottomLeft !== undefined) style.borderBottomLeftRadius = value.bottomLeft
  if (value.bottomRight !== undefined) style.borderBottomRightRadius = value.bottomRight
  return style
}

const resolveBorderSide = (
  side: BorderSide,
  position: '' | 'Top' | 'Bottom' | 'Left' | 'Right'
): CSSProperties => {
  const style: CSSProperties = {}

  if (position === '') {
    if (side.width !== undefined) style.borderWidth = side.width
    if (side.color !== undefined) style.borderColor = side.color
    if (side.style !== undefined) style.borderStyle = side.style
    return style
  }

  if (position === 'Top') {
    if (side.width !== undefined) style.borderTopWidth = side.width
    if (side.color !== undefined) style.borderTopColor = side.color
    if (side.style !== undefined) style.borderTopStyle = side.style
  } else if (position === 'Bottom') {
    if (side.width !== undefined) style.borderBottomWidth = side.width
    if (side.color !== undefined) style.borderBottomColor = side.color
    if (side.style !== undefined) style.borderBottomStyle = side.style
  } else if (position === 'Left') {
    if (side.width !== undefined) style.borderLeftWidth = side.width
    if (side.color !== undefined) style.borderLeftColor = side.color
    if (side.style !== undefined) style.borderLeftStyle = side.style
  } else {
    if (side.width !== undefined) style.borderRightWidth = side.width
    if (side.color !== undefined) style.borderRightColor = side.color
    if (side.style !== undefined) style.borderRightStyle = side.style
  }

  return style
}

export const resolveBorder = (value: Border): CSSProperties => {
  const dir = value as {
    top?: BorderSide
    bottom?: BorderSide
    left?: BorderSide
    right?: BorderSide
  }

  if (
    dir.top !== undefined ||
    dir.bottom !== undefined ||
    dir.left !== undefined ||
    dir.right !== undefined
  ) {
    return {
      ...(dir.top ? resolveBorderSide(dir.top, 'Top') : {}),
      ...(dir.bottom ? resolveBorderSide(dir.bottom, 'Bottom') : {}),
      ...(dir.left ? resolveBorderSide(dir.left, 'Left') : {}),
      ...(dir.right ? resolveBorderSide(dir.right, 'Right') : {}),
    }
  }

  return resolveBorderSide(value as BorderSide, '')
}

export const resolveShadow = (value: ShadowConfig): CSSProperties => {
  const x = value.offset?.x ?? 0
  const y = value.offset?.y ?? 4
  const blur = value.blur ?? 4
  const spread = value.spread ?? 0
  const color = value.color ?? 'rgba(0, 0, 0, 0.1)'

  return { boxShadow: `${x}px ${y}px ${blur}px ${spread}px ${color}` }
}

export const resolveTransform = (value: TransformConfig): CSSProperties => {
  const parts: string[] = []

  if (value.translateX !== undefined) parts.push(`translateX(${value.translateX}px)`)
  if (value.translateY !== undefined) parts.push(`translateY(${value.translateY}px)`)
  if (value.scale !== undefined) parts.push(`scale(${value.scale})`)
  if (value.scaleX !== undefined) parts.push(`scaleX(${value.scaleX})`)
  if (value.scaleY !== undefined) parts.push(`scaleY(${value.scaleY})`)
  if (value.rotate !== undefined) parts.push(`rotate(${value.rotate})`)
  if (value.rotateX !== undefined) parts.push(`rotateX(${value.rotateX})`)
  if (value.rotateY !== undefined) parts.push(`rotateY(${value.rotateY})`)
  if (value.skewX !== undefined) parts.push(`skewX(${value.skewX})`)
  if (value.skewY !== undefined) parts.push(`skewY(${value.skewY})`)

  return parts.length > 0 ? { transform: parts.join(' ') } : {}
}
