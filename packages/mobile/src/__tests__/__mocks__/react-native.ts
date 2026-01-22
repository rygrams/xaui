import React from 'react'

type ViewStyle =
  | React.CSSProperties
  | Array<React.CSSProperties | null | undefined>
  | null
  | undefined

type ViewProps = {
  style?: ViewStyle
  [key: string]: unknown
}

export const View: React.FC<ViewProps> = ({ style, ...props }) => {
  const normalizedStyle = Array.isArray(style)
    ? Object.assign({}, ...style.filter(Boolean))
    : style

  const {
    accessible: _accessible,
    accessibilityRole,
    accessibilityValue,
    accessibilityLabel,
    accessibilityHint: _accessibilityHint,
    accessibilityState: _accessibilityState,
    ...domProps
  } = props

  const accValue = accessibilityValue as
    | { now?: number; min?: number; max?: number }
    | undefined

  return React.createElement('div', {
    ...domProps,
    style: normalizedStyle as React.CSSProperties,
    role: accessibilityRole as React.AriaRole,
    'aria-valuenow': accValue?.now,
    'aria-valuemin': accValue?.min,
    'aria-valuemax': accValue?.max,
    'aria-label': accessibilityLabel as string,
  })
}

export const StyleSheet = {
  create: <T extends Record<string, React.CSSProperties>>(styles: T): T => styles,
}

export const Platform = {
  OS: 'web' as const,
  select: <T>(obj: Record<string, T>): T | undefined => obj.web ?? obj.default,
}
