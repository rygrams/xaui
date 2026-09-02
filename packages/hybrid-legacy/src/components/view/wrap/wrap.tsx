'use client'
import React from 'react'
import type { WrapProps } from '../layout-types'
import { resolveMainAxisAlignment } from '../layout-utils'

export const Wrap: React.FC<WrapProps> = ({
  children,
  direction = 'horizontal',
  alignment,
  runAlignment,
  spacing = 0,
  runSpacing = 0,
  style,
  className,
  testID,
}) => (
  <div
    data-testid={testID}
    className={className}
    style={{
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      flexWrap: 'wrap',
      justifyContent: resolveMainAxisAlignment(alignment),
      alignContent: resolveMainAxisAlignment(runAlignment),
      columnGap: direction === 'horizontal' ? spacing : runSpacing,
      rowGap: direction === 'horizontal' ? runSpacing : spacing,
      ...style,
    }}
  >
    {children}
  </div>
)

Wrap.displayName = 'Wrap'
