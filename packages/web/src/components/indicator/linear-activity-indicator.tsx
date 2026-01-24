import React from 'react'
import { motion } from 'framer-motion'
import { useXUITheme } from '../../core'
import { indicatorStyles } from './indicator.style'
import type { ActivityIndicatorProps } from './indicator.type'
import { getSafeThemeColor } from '@xaui/core'

const DURATION_SECONDS = 2
const PRIMARY_TRANSLATE_OFFSET = 1.45167
const SECONDARY_TRANSLATE_OFFSET = 0.548889

const toPercent = (value: number, offset: number) => `${(value - offset) * 100}%`

const buildTimes = (durations: number[]) => {
  const total = durations.reduce((sum, duration) => sum + duration, 0)
  let acc = 0

  const intermediateTimes = durations.slice(0, -1).map(duration => {
    acc += duration
    return acc / total
  })

  return [0, ...intermediateTimes, 1]
}

const primaryTranslateKeyframes = [0, 0, 0.836714, 2.00611].map(value =>
  toPercent(value, PRIMARY_TRANSLATE_OFFSET)
)
const primaryTranslateTimes = buildTimes([400, 783, 817])
const primaryTranslateEase = [
  'linear',
  [0.5, 0, 0.701732, 0.495819],
  [0.302435, 0.381352, 0.55, 0.956352],
] as const

const primaryScaleKeyframes = [0.08, 0.08, 0.661479, 0.08]
const primaryScaleTimes = buildTimes([733, 650, 617])
const primaryScaleEase = [
  'linear',
  [0.334731, 0.12482, 0.785844, 1],
  [0.06, 0.11, 0.6, 1],
] as const

const secondaryTranslateKeyframes = [0, 0.376519, 0.843862, 1.60278].map(value =>
  toPercent(value, SECONDARY_TRANSLATE_OFFSET)
)
const secondaryTranslateTimes = buildTimes([500, 467, 1033])
const secondaryTranslateEase = [
  [0.15, 0, 0.515058, 0.409685],
  [0.31033, 0.284058, 0.8, 0.733712],
  [0.4, 0.627035, 0.6, 0.902026],
] as const

const secondaryScaleKeyframes = [0.08, 0.457104, 0.72796, 0.08]
const secondaryScaleTimes = buildTimes([383, 500, 1117])
const secondaryScaleEase = [
  [0.205028, 0.057051, 0.57661, 0.453971],
  [0.152313, 0.196432, 0.648374, 1.00432],
  [0.257759, -0.003163, 0.211762, 1.38179],
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
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const mainColor = color ?? colorScheme.main
  const trackColor =
    backgroundColor ?? (showTrack ? colorScheme.background : 'transparent')

  const radius = Math.max(0, borderRadius)

  const primaryAnimate = disableAnimation
    ? { x: primaryTranslateKeyframes[0], scaleX: primaryScaleKeyframes[0] }
    : { x: primaryTranslateKeyframes, scaleX: primaryScaleKeyframes }

  const secondaryAnimate = disableAnimation
    ? { x: secondaryTranslateKeyframes[0], scaleX: secondaryScaleKeyframes[0] }
    : { x: secondaryTranslateKeyframes, scaleX: secondaryScaleKeyframes }

  const primaryTransition = disableAnimation
    ? { x: { duration: 0 }, scaleX: { duration: 0 } }
    : {
        x: {
          duration: DURATION_SECONDS,
          ease: primaryTranslateEase,
          times: primaryTranslateTimes,
          repeat: Infinity,
          repeatType: 'loop' as const,
        },
        scaleX: {
          duration: DURATION_SECONDS,
          ease: primaryScaleEase,
          times: primaryScaleTimes,
          repeat: Infinity,
          repeatType: 'loop' as const,
        },
      }

  const secondaryTransition = disableAnimation
    ? { x: { duration: 0 }, scaleX: { duration: 0 } }
    : {
        x: {
          duration: DURATION_SECONDS,
          ease: secondaryTranslateEase,
          times: secondaryTranslateTimes,
          repeat: Infinity,
          repeatType: 'loop' as const,
        },
        scaleX: {
          duration: DURATION_SECONDS,
          ease: secondaryScaleEase,
          times: secondaryScaleTimes,
          repeat: Infinity,
          repeatType: 'loop' as const,
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
          transition={primaryTransition}
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
        <motion.div
          initial={{
            x: secondaryTranslateKeyframes[0],
            scaleX: secondaryScaleKeyframes[0],
          }}
          animate={secondaryAnimate}
          transition={secondaryTransition}
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
