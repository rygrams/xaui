'use client'
import React from 'react'
import { Align } from '../align/align'
import type { CenterProps } from './center.type'

export const Center: React.FC<CenterProps> = ({
  children,
  style,
  className,
  testID,
}) => (
  <Align alignment="center" style={style} className={className} testID={testID}>
    {children}
  </Align>
)

Center.displayName = 'Center'
