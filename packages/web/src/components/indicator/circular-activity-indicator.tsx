import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useXUITheme } from '../../core'
import { indicatorStyles } from './indicator.style'
import type { ActivityIndicatorProps } from './indicator.type'
import { getSafeThemeColor } from '@xaui/core'

const DURATION = 1.5
const EASING = [0.4, 0, 0.7, 1] as const

const bezierEasing = (t: number): number => {
  const [x1, y1, x2, y2] = EASING
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by

  const sampleCurveX = (u: number) => ((ax * u + bx) * u + cx) * u
  const sampleCurveY = (u: number) => ((ay * u + by) * u + cy) * u

  let u = t
  for (let i = 0; i < 8; i++) {
    const x = sampleCurveX(u) - t
    if (Math.abs(x) < 0.001) break
    const slope = 3 * ax * u * u + 2 * bx * u + cx
    if (Math.abs(slope) < 0.000001) break
    u -= x / slope
  }
  return sampleCurveY(u)
}

const generateKeyframes = (index: number, frames: number) => {
  const rotationValue = index ? 360 - 15 : -(180 - 15)
  const direction = index ? -1 : 1

  return Array.from({ length: frames }, (_, frameIndex) => {
    let progress = (2 * frameIndex) / (frames - 1)
    if (progress > 1) progress = 2 - progress
    return direction * (180 - 30) * bezierEasing(progress) + rotationValue
  })
}

export const CircularActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 40,
  themeColor = 'primary',
  color,
  backgroundColor,
  disableAnimation = false,
  showTrack = true,
  className,
}) => {
  const { base } = indicatorStyles({ variant: 'circular' })

  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const resolvedColor = color ?? colorScheme.main
  const resolvedBackground = showTrack
    ? (backgroundColor ?? colorScheme.background)
    : 'transparent'

  const strokeWidth = size * 0.1

  const frames = Math.round(60 * DURATION)
  const times = useMemo(
    () => Array.from({ length: frames }, (_, i) => i / (frames - 1)),
    [frames]
  )

  const outerStart = 0 + 30 + 15
  const outerEnd = 2 * 360 + 30 + 15

  return (
    <div
      className={base({ className })}
      style={{ width: size, height: size, position: 'relative' }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderStyle: 'solid',
          borderColor: resolvedBackground,
          boxSizing: 'border-box',
        }}
      />

      <div
        style={{
          width: size,
          height: size,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {[0, 1].map(index => {
          const keyframes = generateKeyframes(index, frames)

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: size,
                height: size,
              }}
            >
              <motion.div
                style={{
                  width: size,
                  height: size,
                  transformOrigin: '50% 50%',
                }}
                initial={{ rotate: outerStart }}
                animate={disableAnimation ? { rotate: outerStart } : { rotate: outerEnd }}
                transition={
                  disableAnimation
                    ? { duration: 0 }
                    : {
                        type: 'tween',
                        duration: DURATION,
                        ease: 'linear',
                        repeat: Infinity,
                        repeatType: 'loop',
                        repeatDelay: 0,
                      }
                }
              >
                <div
                  style={{
                    width: size,
                    height: size / 2,
                    overflow: 'hidden',
                    position: 'absolute',
                    ...(index ? { top: size / 2 } : {}),
                  }}
                >
                  <motion.div
                    style={{
                      width: size,
                      height: size,
                      transformOrigin: '50% 50%',
                    }}
                    initial={{
                      y: index ? -size / 2 : 0,
                      rotate: keyframes[0],
                    }}
                    animate={
                      disableAnimation
                        ? { y: index ? -size / 2 : 0, rotate: keyframes[0] }
                        : { y: index ? -size / 2 : 0, rotate: keyframes }
                    }
                    transition={
                      disableAnimation
                        ? { duration: 0 }
                        : {
                            type: 'tween',
                            duration: DURATION,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatType: 'loop',
                            repeatDelay: 0,
                            times,
                          }
                    }
                  >
                    <div
                      style={{
                        width: size,
                        height: size / 2,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: size,
                          height: size,
                          borderColor: resolvedColor,
                          borderWidth: strokeWidth,
                          borderStyle: 'solid',
                          borderRadius: size / 2,
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
