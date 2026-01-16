import React from 'react'

type SvgProps = {
  children?: React.ReactNode
  width?: number
  height?: number
  style?: Record<string, unknown> | Array<Record<string, unknown>>
  [key: string]: unknown
}

type CircleProps = {
  children?: React.ReactNode
  cx?: number
  cy?: number
  r?: number
  stroke?: string
  strokeWidth?: number
  strokeLinecap?: 'butt' | 'round' | 'square'
  strokeDasharray?: number
  strokeDashoffset?: number
  fill?: string
  [key: string]: unknown
}

type PathProps = {
  children?: React.ReactNode
  d?: string
  fill?: string
  stroke?: string
  [key: string]: unknown
}

type GProps = {
  children?: React.ReactNode
  [key: string]: unknown
}

export const Svg = ({ children, ...props }: SvgProps) =>
  React.createElement('svg', { ...props, 'data-testid': 'svg' }, children)

export const Circle = ({ children, ...props }: CircleProps) =>
  React.createElement('circle', { ...props, 'data-testid': 'circle' }, children)

export const Path = ({ children, ...props }: PathProps) =>
  React.createElement('path', { ...props, 'data-testid': 'path' }, children)

export const G = ({ children, ...props }: GProps) =>
  React.createElement('g', { ...props, 'data-testid': 'g' }, children)

export default Svg
