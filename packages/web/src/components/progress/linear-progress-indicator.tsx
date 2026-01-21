import React from 'react'
import { motion } from 'framer-motion'
import { progressStyles } from './progress.style'
import type { ProgressIndicatorProps } from './progress.type'

export const LinearProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  size = 4,
  color,
  backgroundColor,
  borderRadius,
  disableAnimation = false,
  className,
}) => {
  const { track, indicator } = progressStyles({ variant: 'linear' })

  const clampedValue = Math.max(0, Math.min(1, value))
  const radius = borderRadius ?? size / 2

  return (
    <div
      className={track({ className })}
      style={{
        height: size,
        backgroundColor,
        borderRadius: radius,
      }}
    >
      <motion.div
        className={indicator()}
        initial={disableAnimation ? false : { width: 0 }}
        animate={{ width: `${clampedValue * 100}%` }}
        transition={
          disableAnimation ? { duration: 0 } : { duration: 0.5, ease: [0, 0, 0.2, 1] }
        }
        style={{
          backgroundColor: color,
          borderRadius: radius,
        }}
      />
    </div>
  )
}
