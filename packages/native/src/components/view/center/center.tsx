import React from 'react'
import { Align } from '../align/align'
import type { CenterProps } from './center.type'

export const Center: React.FC<CenterProps> = ({ children, style }) => (
  <Align alignment="center" style={style}>{children}</Align>
)

Center.displayName = 'Center'
