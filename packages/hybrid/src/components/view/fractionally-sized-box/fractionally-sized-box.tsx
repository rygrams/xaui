'use client'

import React from 'react'
import type { Alignment } from '@xaui/core'
import type { FractionallySizedBoxProps } from './fractionally-sized-box.type'

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

export const FractionallySizedBox: React.FC<FractionallySizedBoxProps> = ({
  children,
  widthFactor,
  heightFactor,
  alignment,
  style,
  testID,
}) => {
  const sizedStyle: React.CSSProperties = {}
  if (widthFactor !== undefined) sizedStyle.width = `${widthFactor * 100}%`
  if (heightFactor !== undefined) sizedStyle.height = `${heightFactor * 100}%`

  const alignStyle = alignment ? resolveAlignment(alignment) : {}

  return (
    <div
      data-testid={testID}
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        ...sizedStyle,
        ...alignStyle,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

FractionallySizedBox.displayName = 'FractionallySizedBox'
