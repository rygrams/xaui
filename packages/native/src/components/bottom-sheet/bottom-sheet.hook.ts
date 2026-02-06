import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Dimensions, PanResponder } from 'react-native'
import { useXUITheme } from '../../core'
import { getSafeThemeColor } from '@xaui/core'
import { runCloseAnimation, runOpenAnimation, runSnapAnimation } from './bottom-sheet.animation'
import type { BottomSheetProps } from './bottom-sheet.type'
import type { Radius, ThemeColor } from '../../types'

const DISMISS_VELOCITY_THRESHOLD = 0.5
const DISMISS_DISTANCE_FRACTION = 0.3
const SCREEN_HEIGHT = Dimensions.get('window').height

type UseBottomSheetAnimationArgs = {
  isOpen: boolean
  snapPoints: [number, ...number[]]
  initialSnapIndex: number
  enableSwipeToDismiss: boolean
  disableAnimation: boolean
  onClose?: BottomSheetProps['onClose']
  onSnapChange?: BottomSheetProps['onSnapChange']
}

const getTranslateYForSnap = (snapFraction: number) =>
  SCREEN_HEIGHT * (1 - snapFraction)

export const useBottomSheetAnimation = ({
  isOpen,
  snapPoints,
  initialSnapIndex,
  enableSwipeToDismiss,
  disableAnimation,
  onClose,
  onSnapChange,
}: UseBottomSheetAnimationArgs) => {
  const [shouldRender, setShouldRender] = useState(false)
  const currentSnapIndex = useRef(initialSnapIndex)
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  const sortedSnapPoints = useMemo(
    () => [...snapPoints].sort((a, b) => a - b),
    [snapPoints]
  )

  const snapTranslateValues = useMemo(
    () => sortedSnapPoints.map(getTranslateYForSnap),
    [sortedSnapPoints]
  )

  const open = useCallback(() => {
    setShouldRender(true)
    const targetIndex = Math.min(initialSnapIndex, sortedSnapPoints.length - 1)
    currentSnapIndex.current = targetIndex

    if (disableAnimation) {
      translateY.setValue(snapTranslateValues[targetIndex])
      backdropOpacity.setValue(1)
      return
    }

    translateY.setValue(SCREEN_HEIGHT)
    backdropOpacity.setValue(0)
    animationRef.current?.stop()
    animationRef.current = runOpenAnimation(
      translateY,
      backdropOpacity,
      snapTranslateValues[targetIndex]
    )
  }, [
    initialSnapIndex,
    sortedSnapPoints,
    snapTranslateValues,
    disableAnimation,
    translateY,
    backdropOpacity,
  ])

  const close = useCallback(() => {
    if (disableAnimation) {
      translateY.setValue(SCREEN_HEIGHT)
      backdropOpacity.setValue(0)
      setShouldRender(false)
      onClose?.()
      return
    }

    animationRef.current?.stop()
    animationRef.current = runCloseAnimation(
      translateY,
      backdropOpacity,
      SCREEN_HEIGHT,
      () => {
        setShouldRender(false)
        onClose?.()
      }
    )
  }, [disableAnimation, translateY, backdropOpacity, onClose])

  const snapTo = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, sortedSnapPoints.length - 1))
      currentSnapIndex.current = clampedIndex
      onSnapChange?.(clampedIndex)

      if (disableAnimation) {
        translateY.setValue(snapTranslateValues[clampedIndex])
        return
      }

      animationRef.current?.stop()
      animationRef.current = runSnapAnimation(
        translateY,
        snapTranslateValues[clampedIndex]
      )
    },
    [sortedSnapPoints, snapTranslateValues, disableAnimation, translateY, onSnapChange]
  )

  useEffect(() => {
    if (isOpen) {
      open()
    } else if (shouldRender) {
      close()
    }
  }, [isOpen])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dy) > 5,
        onPanResponderMove: (_, gestureState) => {
          const currentTranslate = snapTranslateValues[currentSnapIndex.current]
          const newTranslateY = currentTranslate + gestureState.dy
          const maxExpanded = snapTranslateValues[snapTranslateValues.length - 1]
          const clamped = Math.max(maxExpanded, newTranslateY)
          translateY.setValue(clamped)
        },
        onPanResponderRelease: (_, gestureState) => {
          const currentTranslate = snapTranslateValues[currentSnapIndex.current]
          const finalPosition = currentTranslate + gestureState.dy

          if (
            enableSwipeToDismiss &&
            (gestureState.vy > DISMISS_VELOCITY_THRESHOLD ||
              finalPosition >
                SCREEN_HEIGHT * (1 - sortedSnapPoints[0] * DISMISS_DISTANCE_FRACTION))
          ) {
            close()
            return
          }

          if (gestureState.vy < -DISMISS_VELOCITY_THRESHOLD) {
            const nextIndex = Math.min(
              currentSnapIndex.current + 1,
              sortedSnapPoints.length - 1
            )
            snapTo(nextIndex)
            return
          }

          if (gestureState.vy > DISMISS_VELOCITY_THRESHOLD) {
            const prevIndex = Math.max(currentSnapIndex.current - 1, 0)
            if (prevIndex === currentSnapIndex.current && enableSwipeToDismiss) {
              close()
              return
            }
            snapTo(prevIndex)
            return
          }

          let closestIndex = 0
          let minDistance = Infinity
          snapTranslateValues.forEach((snapVal, index) => {
            const distance = Math.abs(finalPosition - snapVal)
            if (distance < minDistance) {
              minDistance = distance
              closestIndex = index
            }
          })
          snapTo(closestIndex)
        },
      }),
    [
      snapTranslateValues,
      sortedSnapPoints,
      enableSwipeToDismiss,
      translateY,
      close,
      snapTo,
    ]
  )

  return {
    shouldRender,
    translateY,
    backdropOpacity,
    panResponder,
    close,
    snapTo,
    screenHeight: SCREEN_HEIGHT,
  }
}

export const useBottomSheetStyles = (
  themeColor: ThemeColor,
  radius: Radius
) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const sheetStyles = useMemo(
    () => ({
      backgroundColor:
        theme.mode === 'dark' ? colorScheme.background : '#ffffff',
      borderTopLeftRadius: theme.borderRadius[radius],
      borderTopRightRadius: theme.borderRadius[radius],
    }),
    [theme, colorScheme, radius]
  )

  const handleIndicatorColor = useMemo(
    () =>
      theme.mode === 'dark'
        ? `${colorScheme.main}60`
        : `${colorScheme.main}40`,
    [theme, colorScheme]
  )

  return { sheetStyles, handleIndicatorColor }
}
