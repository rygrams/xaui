'use client'

import React from 'react'
import type { ConstrainedBoxProps } from './constrained-box.type'

export const ConstrainedBox: React.FC<ConstrainedBoxProps> = ({
  children,
  constraints,
  style,
  testID,
}) => (
  <div
    data-testid={testID}
    style={{
      boxSizing: 'border-box',
      minWidth: constraints.minWidth,
      maxWidth: constraints.maxWidth,
      minHeight: constraints.minHeight,
      maxHeight: constraints.maxHeight,
      ...style,
    }}
  >
    {children}
  </div>
)

ConstrainedBox.displayName = 'ConstrainedBox'
