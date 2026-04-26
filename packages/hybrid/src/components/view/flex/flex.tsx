'use client'
import React from 'react'
import type { FlexProps } from '../layout-types'
import {
  resolveCrossAxisAlignment,
  resolveMainAxisAlignment,
  resolveMainAxisSize,
} from '../layout-utils'

export const Flex: React.FC<FlexProps> = ({
  children,
  direction,
  mainAxisAlignment,
  crossAxisAlignment,
  mainAxisSize,
  wrap = false,
  gap,
  reversed = false,
  flex,
  style,
  className,
  testID,
}) => {
  const flexDir =
    direction === 'horizontal'
      ? reversed
        ? 'row-reverse'
        : 'row'
      : reversed
        ? 'column-reverse'
        : 'column'

  return (
    <div
      data-testid={testID}
      className={className}
      style={{
        display: 'flex',
        ...resolveMainAxisSize(mainAxisSize, direction),
        flexDirection: flexDir,
        justifyContent: resolveMainAxisAlignment(mainAxisAlignment),
        alignItems: resolveCrossAxisAlignment(crossAxisAlignment),
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...(gap !== undefined && { gap }),
        ...(flex !== undefined && { flex }),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

Flex.displayName = 'Flex'
