import React from 'react'
import { LinearProgressIndicator } from './linear-progress-indicator'
import { CircularProgressIndicator } from './circular-progress-indicator'
import type { ProgressIndicatorProps } from './progress.type'

export const Progress: React.FC<ProgressIndicatorProps> = props => {
  const { variant = 'linear', ...rest } = props

  if (variant === 'circular') {
    return <CircularProgressIndicator {...rest} />
  }

  return <LinearProgressIndicator {...rest} />
}
