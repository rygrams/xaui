import React from 'react'
import { motion } from 'framer-motion'
import { useXUITheme } from '../../core'
import { indicatorStyles } from './indicator.style'
import type { ActivityIndicatorProps } from './indicator.type'

const DURATION_SECONDS = 2
const PRIMARY_TRANSLATE_OFFSET = 1.45167

const toPercent = (value: number, offset: number) => `${(value - offset) * 100}%`

const buildTimes = (durations: number[]) => {
  const total = durations.reduce((sum, duration) => sum + duration, 0)
  let acc = 0
  const times = [0]

  for (let i = 0; i < durations.length - 1; i += 1) {
    acc += durations[i]
    times.push(acc / total)
  }

  times.push(1)
  return times
}

const primaryTranslateKeyframes = [0, 0.836714, 2.00611].map(value =>
  toPercent(value, PRIMARY_TRANSLATE_OFFSET)
)
const primaryTranslateTimes = buildTimes([783, 817])
const primaryTranslateEase = [
  [0.5, 0, 0.701732, 0.495819],
  [0.302435, 0.381352, 0.55, 0.956352],
] as const

const primaryScaleKeyframes = [0.08, 0.661479, 0.08]
const primaryScaleTimes = buildTimes([650, 617])
const primaryScaleEase = [
  [0.334731, 0.12482, 0.785844, 1],
  [0.06, 0.11, 0.6, 1],
] as const

export const LinearActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 4,
  themeColor = 'primary',
  color,
  backgroundColor,
  disableAnimation = false,
  borderRadius = 0,
  showTrack = true,
  className,
}) => {
  const { base, track } = indicatorStyles({ variant: 'linear' })
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor]
  const mainColor = color ?? colorScheme.main
  const trackColor =
    backgroundColor ?? (showTrack ? theme.colors.default.background : 'transparent')

  const radius = Math.max(0, borderRadius)

  const primaryAnimate = disableAnimation
    ? { x: primaryTranslateKeyframes[0], scaleX: primaryScaleKeyframes[0] }
    : { x: primaryTranslateKeyframes, scaleX: primaryScaleKeyframes }

  const transition = disableAnimation
    ? { x: { duration: 0 }, scaleX: { duration: 0 } }
    : {
        x: {
          duration: DURATION_SECONDS,
          ease: primaryTranslateEase,
          times: primaryTranslateTimes,
          repeat: Infinity,
          repeatType: 'loop',
        },
        scaleX: {
          duration: DURATION_SECONDS,
          ease: primaryScaleEase,
          times: primaryScaleTimes,
          repeat: Infinity,
          repeatType: 'loop',
        },
      }

  return (
    <div className={base({ className })} style={{ height: size }}>
      <div
        className={track()}
        style={{
          position: 'relative',
          height: size,
          backgroundColor: trackColor,
          borderRadius: radius,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ x: primaryTranslateKeyframes[0], scaleX: primaryScaleKeyframes[0] }}
          animate={primaryAnimate}
          transition={transition}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: size,
            backgroundColor: mainColor,
            borderRadius: radius,
            transformOrigin: '50% 50%',
          }}
        />
      </div>
    </div>
  )
}
