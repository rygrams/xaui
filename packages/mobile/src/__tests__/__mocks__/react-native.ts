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

const EasingMock = {
  linear: () => {},
  bezier: (_x1: number, _y1: number, _x2: number, _y2: number) => (_t: number) => _t,
}

const AnimatedMock = {
  View: View,
  Value: class {
    constructor(value: number) {
      this.value = value
    }
    setValue(_value: number) {
      this.value = _value
    }
    value: number
    interpolate(_config: never) {
      return this
    }
  },
  multiply: (_a: never, _b: never) => ({
    interpolate: (_config: never) => 0,
  }),
  timing: (_value: never, _config: never) => ({
    start: () => {},
    stop: () => {},
  }),
  loop: (_animation: never) => ({
    start: () => {},
  }),
  sequence: (_animations: never[]) => ({
    start: () => {},
    stop: () => {},
  }),
  parallel: (_animations: never[]) => ({
    start: () => {},
    stop: () => {},
  }),
  Easing: EasingMock,
}

export const Animated = AnimatedMock
export const Easing = EasingMock
