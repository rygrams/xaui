import React from 'react'
import { LinearProgressIndicator } from './linear-progress-indicator'
import { CircularProgressIndicator } from './circular-progress-indicator'
import type { ProgressProps } from './progress.type'

/**
 * Progress component displays an indicator of the progress of a task.
 */
export const Progress: React.FC<ProgressProps> = (props) => {
  const { variant = 'linear', ...rest } = props

  if (variant === 'circular') {
    return <CircularProgressIndicator {...rest} />
  }

  return <LinearProgressIndicator {...rest} />
}
