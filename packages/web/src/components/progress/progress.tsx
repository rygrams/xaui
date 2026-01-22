import React from 'react'
import { useXUITheme } from '../../core'
import { CircularProgressIndicator } from './circular-progress-indicator'
import { LinearProgressIndicator } from './linear-progress-indicator'
import { clampProgress } from './progress.hook'
import type { ProgressIndicatorProps } from './progress.type'

export const Progress: React.FC<ProgressIndicatorProps> = props => {
  const {
    variant = 'linear',
    themeColor = 'primary',
    value,
    color,
    backgroundColor,
    size,
    disableAnimation = false,
    className,
    borderRadius,
  } = props

  const theme = useXUITheme()

  const colorScheme = theme.colors[themeColor]
  const mainColor = color ?? colorScheme.main
  const trackColor = backgroundColor ?? colorScheme.background
  const clampedValue = clampProgress(value)

  const ariaValue = clampedValue * 100

  if (variant === 'circular') {
    const circleSize = size ?? 40

    return (
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaValue}
      >
        <CircularProgressIndicator
          size={circleSize}
          color={mainColor}
          backgroundColor={trackColor}
          value={clampedValue}
          borderRadius={borderRadius}
          disableAnimation={disableAnimation}
          className={className}
        />
      </div>
    )
  }

  const linearSize = size ?? 4

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValue}
    >
      <LinearProgressIndicator
        size={linearSize}
        color={mainColor}
        backgroundColor={trackColor}
        value={clampedValue}
        borderRadius={borderRadius}
        disableAnimation={disableAnimation}
        className={className}
      />
    </div>
  )
}
