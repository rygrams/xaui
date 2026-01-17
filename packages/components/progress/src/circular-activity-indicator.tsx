import React from 'react'
import type { CircularActivityIndicatorProps } from './progress-types'
import { TickActivityIndicator } from './components/tick-activity-indicator'
import { BulletActivityIndicator } from './components/bullet-activity-indicator'
import { SpinnerActivityIndicator } from './components/spinner-activity-indicator'

export const CircularActivityIndicator: React.FC<CircularActivityIndicatorProps> = ({
  variant = 'spinner',
  ...props
}) => {
  switch (variant) {
    case 'ticks':
      return <TickActivityIndicator {...props} />
    case 'bullets':
      return <BulletActivityIndicator {...props} />
    case 'spinner':
      return <SpinnerActivityIndicator {...props} />
    default:
      return <SpinnerActivityIndicator {...props} />
  }
}
