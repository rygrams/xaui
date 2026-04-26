'use client'
import React from 'react'
import { Flex } from '../flex/flex'
import type { ColumnProps } from '../layout-types'

export const Column: React.FC<ColumnProps> = (props) => (
  <Flex {...props} direction="vertical" />
)

Column.displayName = 'Column'
