'use client'
import React from 'react'
import type { SpacerProps } from '../layout-types'

export const Spacer: React.FC<SpacerProps> = ({ flex = 1, style }) => (
  <div
    style={{
      flexGrow: flex,
      flexShrink: 1,
      flexBasis: 0,
      ...style,
    }}
  />
)

Spacer.displayName = 'Spacer'
