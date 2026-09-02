export type BorderRadius =
  | number
  | {
      topLeft?: number
      topRight?: number
      bottomLeft?: number
      bottomRight?: number
    }

export type BorderSide = {
  width?: number
  color?: string
  style?: 'solid' | 'dashed' | 'dotted'
}

export type Border =
  | BorderSide
  | {
      top?: BorderSide
      bottom?: BorderSide
      left?: BorderSide
      right?: BorderSide
    }
