import React from 'react'
import { CircularActivityIndicator } from './circular-activity-indicator'
import { LinearActivityIndicator } from './linear-activity-indicator'
import type { ActivityIndicatorProps } from './indicator.type'

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = props => {
  const { variant = 'circular', ...rest } = props

  if (variant === 'circular') {
    return (
      <div role="progressbar" aria-label="Loading">
        <CircularActivityIndicator {...rest} />
      </div>
    )
  }

  return (
    <div role="progressbar" aria-label="Loading" className="w-full">
      <LinearActivityIndicator {...rest} />
    </div>
  )
}
