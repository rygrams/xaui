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

  return React.createElement('div', {
    ...props,
    style: normalizedStyle as React.CSSProperties,
  })
}

export const StyleSheet = {
  create: <T extends Record<string, React.CSSProperties>>(styles: T): T => styles,
}

export const Platform = {
  OS: 'web' as const,
  select: <T>(obj: Record<string, T>): T | undefined => obj.web ?? obj.default,
}
