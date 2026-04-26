'use client'
import React from 'react'
import type { PaddingProps } from './padding.type'
import { resolveEdgeInsets } from '../container/container.utils'

export const Padding: React.FC<PaddingProps> = ({ children, padding, style, className, testID }) => (
  <div
    data-testid={testID}
    className={className}
    style={{ ...resolveEdgeInsets(padding, 'padding'), ...style }}
  >
    {children}
  </div>
)

Padding.displayName = 'Padding'
