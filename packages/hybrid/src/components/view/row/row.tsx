'use client'
import React from 'react'
import { Flex } from '../flex/flex'
import type { RowProps } from '../layout-types'

export const Row: React.FC<RowProps> = (props) => (
  <Flex {...props} direction="horizontal" />
)

Row.displayName = 'Row'
