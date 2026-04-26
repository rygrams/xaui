export type LinearGradientConfig = {
  type: 'linear'
  colors: string[]
  angle?: number
  locations?: number[]
  start?: { x: number; y: number }
  end?: { x: number; y: number }
}

export type RadialGradientConfig = {
  type: 'radial'
  colors: string[]
  center?: { x: number; y: number }
  radius?: number
  locations?: number[]
}

export type SweepGradientConfig = {
  type: 'sweep'
  colors: string[]
  center?: { x: number; y: number }
  startAngle?: number
  endAngle?: number
  locations?: number[]
}

export type GradientConfig =
  | LinearGradientConfig
  | RadialGradientConfig
  | SweepGradientConfig
