'use client'

import React from 'react'
import type { CSSProperties } from 'react'
import type { SizedBoxProps } from './sized-box.type'

export const SizedBox: React.FC<SizedBoxProps> = ({
  children,
  width,
  height,
  expand,
  shrink,
  style,
  testID,
}) => {
  let resolvedStyle: CSSProperties

  if (shrink) {
    resolvedStyle = { width: 0, height: 0, overflow: 'hidden' }
  } else if (expand) {
    resolvedStyle = { flex: 1, alignSelf: 'stretch' }
  } else {
    resolvedStyle = {
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
    }
  }

  return (
    <div
      data-testid={testID}
      style={{ boxSizing: 'border-box', ...resolvedStyle, ...style }}
    >
      {children}
    </div>
  )
}

SizedBox.displayName = 'SizedBox'
