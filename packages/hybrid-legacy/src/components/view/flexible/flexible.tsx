'use client'
import React from 'react'
import type { FlexibleProps } from '../layout-types'

export const Flexible: React.FC<FlexibleProps> = ({
  children,
  flex = 1,
  fit = 'loose',
  style,
  className,
  testID,
}) => (
  <div
    data-testid={testID}
    className={className}
    style={
      fit === 'tight'
        ? { flex, ...style }
        : { flexGrow: flex, flexShrink: 1, flexBasis: 'auto', ...style }
    }
  >
    {children}
  </div>
)

Flexible.displayName = 'Flexible'
