'use client'
import React from 'react'
import type { AlignProps } from './align.type'
import { resolveAlignment } from '../container/container.utils'

export const Align: React.FC<AlignProps> = ({
  children,
  alignment,
  style,
  className,
  testID,
}) => (
  <div
    data-testid={testID}
    className={className}
    style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      ...resolveAlignment(alignment),
      ...style,
    }}
  >
    {children}
  </div>
)

Align.displayName = 'Align'
