'use client'

import React from 'react'
import { resolveAlignment } from '../container/container.utils'
import type { AspectRatioProps } from './aspect-ratio.type'
export const AspectRatio: React.FC<AspectRatioProps> = ({
  children,
  ratio,
  alignment,
  clip,
  style,
  testID,
}) => {
  const alignStyle = alignment ? resolveAlignment(alignment) : {}

  return (
    <div
      data-testid={testID}
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        aspectRatio: String(ratio),
        overflow: clip ? 'hidden' : 'visible',
        ...alignStyle,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

AspectRatio.displayName = 'AspectRatio'
