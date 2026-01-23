import React from 'react'
import { motion } from 'framer-motion'
import { useXUITheme } from '../../core'
import type { ActivityIndicatorProps } from './indicator.type'

const PRIMARY_OFFSET = 1.45167
const SECONDARY_OFFSET = 0.548889

const toPercentage = (value: number, offset: number) => `${(value - offset) * 100}%`

export const LinearActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 4,
  themeColor = 'primary',
  color,
  backgroundColor,
  borderRadius = 0,
  disableAnimation = false,
  showTrack = true,
  className,
}) => {
  const { colors } = useXUITheme()
  const colorScheme = colors[themeColor]
  const resolvedColor = color ?? colorScheme.main
  const resolvedBackground =
    backgroundColor ?? (showTrack ? colorScheme.background : 'transparent')

  const heightPx = Math.max(1, Math.round(size))
  const radiusPx = Math.max(0, Math.round(borderRadius))

  const totalDuration = 2

  const primaryTranslateValues = [0, 0, 0.836714, 2.00611]
  const primaryTranslate = primaryTranslateValues.map((v) => toPercentage(v, PRIMARY_OFFSET))
  const primaryTranslateTimes = [0, 0.2, 0.5915, 1]
  const primaryTranslateEases = [
    'linear',
    [0.5, 0, 0.701732, 0.495819],
    [0.302435, 0.381352, 0.55, 0.956352],
  ]

  const primaryScale = [0.08, 0.08, 0.661479, 0.08]
  const primaryScaleTimes = [0, 0.3665, 0.6915, 1]
  const primaryScaleEases = [
    'linear',
    [0.334731, 0.12482, 0.785844, 1],
    [0.06, 0.11, 0.6, 1],
  ]

  const secondaryTranslateValues = [0, 0.376519, 0.843862, 1.60278]
  const secondaryTranslate = secondaryTranslateValues.map((v) =>
    toPercentage(v, SECONDARY_OFFSET)
  )
  const secondaryTranslateTimes = [0, 0.25, 0.4835, 1]
  const secondaryTranslateEases = [
    [0.15, 0, 0.515058, 0.409685],
    [0.31033, 0.284058, 0.8, 0.733712],
    [0.4, 0.627035, 0.6, 0.902026],
  ]

  const secondaryScale = [0.08, 0.457104, 0.72796, 0.08]
  const secondaryScaleTimes = [0, 0.1915, 0.4415, 1]
  const secondaryScaleEases = [
    [0.205028, 0.057051, 0.57661, 0.453971],
    [0.152313, 0.196432, 0.648374, 1.00432],
    [0.257759, -0.003163, 0.211762, 1.38179],
  ]

  return (
    <div
      className={['relative flex min-w-[80px] overflow-hidden', className ?? ''].join(' ')}
      style={{
        height: `${heightPx}px`,
        borderRadius: `${radiusPx}px`,
        background: resolvedBackground,
      }}
      role="progressbar"
      aria-busy="true"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: `${radiusPx}px` }}>
        <motion.div
          className="absolute left-0 top-0 h-full w-full"
          style={{ transformOrigin: 'left center' }}
          animate={
            disableAnimation ? { x: primaryTranslate[0] } : { x: primaryTranslate }
          }
          transition={
            disableAnimation
              ? { duration: 0 }
              : {
                  duration: totalDuration,
                  times: primaryTranslateTimes,
                  ease: primaryTranslateEases,
                  repeat: Infinity,
                  repeatType: 'loop',
                }
          }
        >
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: 'left center', background: resolvedColor }}
            animate={disableAnimation ? { scaleX: 0.08 } : { scaleX: primaryScale }}
            transition={
              disableAnimation
                ? { duration: 0 }
                : {
                    duration: totalDuration,
                    times: primaryScaleTimes,
                    ease: primaryScaleEases,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }
            }
          />
        </motion.div>

        <motion.div
          className="absolute left-0 top-0 h-full w-full"
          style={{ transformOrigin: 'left center' }}
          animate={
            disableAnimation
              ? { x: secondaryTranslate[0] }
              : { x: secondaryTranslate }
          }
          transition={
            disableAnimation
              ? { duration: 0 }
              : {
                  duration: totalDuration,
                  times: secondaryTranslateTimes,
                  ease: secondaryTranslateEases,
                  repeat: Infinity,
                  repeatType: 'loop',
                }
          }
        >
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: 'left center', background: resolvedColor }}
            animate={disableAnimation ? { scaleX: 0.08 } : { scaleX: secondaryScale }}
            transition={
              disableAnimation
                ? { duration: 0 }
                : {
                    duration: totalDuration,
                    times: secondaryScaleTimes,
                    ease: secondaryScaleEases,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }
            }
          />
        </motion.div>
      </div>
    </div>
  )
}
