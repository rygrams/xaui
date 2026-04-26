'use client'
import React from 'react'
import type { MarginProps } from './margin.type'
import { resolveEdgeInsets } from '../container/container.utils'

export const Margin: React.FC<MarginProps> = ({ children, margin, style, className, testID }) => (
  <div
    data-testid={testID}
    className={className}
    style={{ ...resolveEdgeInsets(margin, 'margin'), ...style }}
  >
    {children}
  </div>
)

Margin.displayName = 'Margin'
