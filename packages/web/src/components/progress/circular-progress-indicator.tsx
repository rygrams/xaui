import React from 'react'
import { motion } from 'framer-motion'
import { useXUITheme } from '../../core'
import { useProgressAnimation } from './progress.hook'
import { progressStyles } from './progress.style'
import type { ProgressIndicatorProps } from './progress.type'

export const CircularProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  size = 40,
  themeColor = 'primary',
  color,
  backgroundColor,
  borderRadius,
  disableAnimation = false,
  className,
}) => {
  const { base, track, indicator } = progressStyles({ variant: 'circular' })
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor]
  const resolvedColor = color ?? colorScheme.main
  const resolvedBackground = backgroundColor ?? colorScheme.background

  const progressValue = useProgressAnimation(value, disableAnimation)
  const strokeWidth = size * 0.1
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2
  const strokeCap = borderRadius && borderRadius > 0 ? 'round' : 'butt'

  return (
    <div className={base({ className })} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          className={track()}
          stroke={resolvedBackground}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          className={indicator()}
          stroke={resolvedColor}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeCap}
          strokeDasharray={circumference}
          initial={disableAnimation ? false : { strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - progressValue) }}
          transition={
            disableAnimation ? { duration: 0 } : { duration: 0.5, ease: [0, 0, 0.2, 1] }
          }
        />
      </svg>
    </div>
  )
}
