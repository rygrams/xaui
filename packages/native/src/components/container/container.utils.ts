import type { ViewStyle } from 'react-native'
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
): ViewStyle => {
  if (typeof value === 'number') {
    return prefix === 'padding' ? { padding: value } : { margin: value }
  }

  const style: ViewStyle = {}

  if (prefix === 'padding') {
    if (value.horizontal !== undefined) style.paddingHorizontal = value.horizontal
    if (value.vertical !== undefined) style.paddingVertical = value.vertical
    if (value.top !== undefined) style.paddingTop = value.top
    if (value.bottom !== undefined) style.paddingBottom = value.bottom
    if (value.left !== undefined) style.paddingLeft = value.left
    if (value.right !== undefined) style.paddingRight = value.right
  } else {
    if (value.horizontal !== undefined) style.marginHorizontal = value.horizontal
    if (value.vertical !== undefined) style.marginVertical = value.vertical
    if (value.top !== undefined) style.marginTop = value.top
    if (value.bottom !== undefined) style.marginBottom = value.bottom
    if (value.left !== undefined) style.marginLeft = value.left
    if (value.right !== undefined) style.marginRight = value.right
  }

  return style
}

type AlignmentResult = {
  justifyContent: ViewStyle['justifyContent']
  alignItems: ViewStyle['alignItems']
}

const ALIGNMENT_MAP: Record<string, AlignmentResult> = {
  topLeft: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  topCenter: { justifyContent: 'flex-start', alignItems: 'center' },
  topRight: { justifyContent: 'flex-start', alignItems: 'flex-end' },
  centerLeft: { justifyContent: 'center', alignItems: 'flex-start' },
  center: { justifyContent: 'center', alignItems: 'center' },
  centerRight: { justifyContent: 'center', alignItems: 'flex-end' },
  bottomLeft: { justifyContent: 'flex-end', alignItems: 'flex-start' },
  bottomCenter: { justifyContent: 'flex-end', alignItems: 'center' },
  bottomRight: { justifyContent: 'flex-end', alignItems: 'flex-end' },
}

const toFlexPosition = (v: number): 'flex-start' | 'flex-end' | 'center' => {
  if (v <= 0) return 'flex-start'
  if (v >= 1) return 'flex-end'
  return 'center'
}

export const resolveAlignment = (value: Alignment): AlignmentResult => {
  if (typeof value === 'object') {
    return {
      justifyContent: toFlexPosition(value.y),
      alignItems: toFlexPosition(value.x),
    }
  }

  return (
    ALIGNMENT_MAP[value] ?? {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }
  )
}

export const resolveBorderRadius = (value: BorderRadius): ViewStyle => {
  if (typeof value === 'number') {
    return { borderRadius: value }
  }

  const style: ViewStyle = {}
  if (value.topLeft !== undefined) style.borderTopLeftRadius = value.topLeft
  if (value.topRight !== undefined) style.borderTopRightRadius = value.topRight
  if (value.bottomLeft !== undefined) style.borderBottomLeftRadius = value.bottomLeft
  if (value.bottomRight !== undefined)
    style.borderBottomRightRadius = value.bottomRight
  return style
}

const resolveBorderSide = (
  side: BorderSide,
  position: '' | 'Top' | 'Bottom' | 'Left' | 'Right'
): ViewStyle => {
  const style: ViewStyle = {}

  if (position === '') {
    if (side.width !== undefined) style.borderWidth = side.width
    if (side.color !== undefined) style.borderColor = side.color
    if (side.style !== undefined) style.borderStyle = side.style
    return style
  }

  if (position === 'Top') {
    if (side.width !== undefined) style.borderTopWidth = side.width
    if (side.color !== undefined) style.borderTopColor = side.color
  } else if (position === 'Bottom') {
    if (side.width !== undefined) style.borderBottomWidth = side.width
    if (side.color !== undefined) style.borderBottomColor = side.color
  } else if (position === 'Left') {
    if (side.width !== undefined) style.borderLeftWidth = side.width
    if (side.color !== undefined) style.borderLeftColor = side.color
  } else {
    if (side.width !== undefined) style.borderRightWidth = side.width
    if (side.color !== undefined) style.borderRightColor = side.color
  }

  return style
}

export const resolveBorder = (value: Border): ViewStyle => {
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

export const resolveShadow = (value: ShadowConfig): ViewStyle => ({
  shadowColor: value.color ?? '#000000',
  shadowOffset: {
    width: value.offset?.x ?? 0,
    height: value.offset?.y ?? 4,
  },
  shadowOpacity: value.opacity ?? 0.1,
  shadowRadius: value.blur ?? 4,
  elevation: value.elevation ?? 2,
})

export const resolveTransform = (
  value: TransformConfig
): NonNullable<ViewStyle['transform']> => {
  const transforms: NonNullable<ViewStyle['transform']>[number][] = []

  if (value.rotate !== undefined) transforms.push({ rotate: value.rotate })
  if (value.rotateX !== undefined) transforms.push({ rotateX: value.rotateX })
  if (value.rotateY !== undefined) transforms.push({ rotateY: value.rotateY })
  if (value.scale !== undefined) transforms.push({ scale: value.scale })
  if (value.scaleX !== undefined) transforms.push({ scaleX: value.scaleX })
  if (value.scaleY !== undefined) transforms.push({ scaleY: value.scaleY })
  if (value.translateX !== undefined)
    transforms.push({ translateX: value.translateX })
  if (value.translateY !== undefined)
    transforms.push({ translateY: value.translateY })
  if (value.skewX !== undefined) transforms.push({ skewX: value.skewX })
  if (value.skewY !== undefined) transforms.push({ skewY: value.skewY })

  return transforms as NonNullable<ViewStyle['transform']>
}
