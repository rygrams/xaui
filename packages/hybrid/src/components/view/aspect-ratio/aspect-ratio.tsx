'use client'

import React from 'react'
import type { Alignment } from '@xaui/core'
import type { AspectRatioProps } from './aspect-ratio.type'

const ALIGNMENT_MAP: Record<string, React.CSSProperties> = {
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

function resolveAlignment(value: Alignment): React.CSSProperties {
  if (typeof value === 'object') {
    const x = value.x <= 0 ? 'flex-start' : value.x >= 1 ? 'flex-end' : 'center'
    const y = value.y <= 0 ? 'flex-start' : value.y >= 1 ? 'flex-end' : 'center'
    return { justifyContent: y, alignItems: x }
  }
  return (
    ALIGNMENT_MAP[value] ?? {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }
  )
}

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
