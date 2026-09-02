'use client'
import React from 'react'
import type { ExpandedProps } from './expanded.type'

export const Expanded: React.FC<ExpandedProps> = ({
  children,
  flex = 1,
  style,
  className,
  testID,
}) => (
  <div
    data-testid={testID}
    className={className}
    style={{ flex, alignSelf: 'stretch', ...style }}
  >
    {children}
  </div>
)

Expanded.displayName = 'Expanded'
