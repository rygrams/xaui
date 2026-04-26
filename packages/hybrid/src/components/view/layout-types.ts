import type { CSSProperties, ReactNode } from 'react'

export type MainAxisAlignment =
  | 'start'
  | 'end'
  | 'center'
  | 'spaceBetween'
  | 'spaceAround'
  | 'spaceEvenly'

export type CrossAxisAlignment = 'start' | 'end' | 'center' | 'stretch'

export type MainAxisSize = 'min' | 'max'

export type Direction = 'horizontal' | 'vertical'

export type FlexProps = {
  /** Content to render inside the flex container. */
  children?: ReactNode
  /** Axis direction — `'horizontal'` for row, `'vertical'` for column. */
  direction: Direction
  /** How to place children along the main axis. @default 'start' */
  mainAxisAlignment?: MainAxisAlignment
  /** How to place children along the cross axis. @default 'center' */
  crossAxisAlignment?: CrossAxisAlignment
  /** Whether the flex takes max or min space in the main axis. @default 'max' */
  mainAxisSize?: MainAxisSize
  /** Wrap children onto multiple lines when they overflow. @default false */
  wrap?: boolean
  /** Gap in pixels between children. */
  gap?: number
  /** Reverse the layout direction. @default false */
  reversed?: boolean
  /** Flex factor applied to the container itself. */
  flex?: number
  /** Raw CSS style override. */
  style?: CSSProperties
  /** Tailwind / CSS class names. */
  className?: string
  /** Test identifier mapped to `data-testid`. */
  testID?: string
}

export type RowProps = Omit<FlexProps, 'direction'>

export type ColumnProps = Omit<FlexProps, 'direction'>
