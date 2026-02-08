import { useCallback, useMemo, useRef, useState } from 'react'
import { Animated, useWindowDimensions } from 'react-native'
import type { RefObject } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'

type MeasurableNode = {
  measureInWindow: (
    callback: (x: number, y: number, width: number, height: number) => void
  ) => void
}

type TargetLayout = {
  x: number
  y: number
  width: number
  height: number
}

export const useFeatureDiscoveryAnimations = () => {
  const backdropOpacity = useRef(new Animated.Value(0)).current
  const circleAnimScale = useRef(new Animated.Value(0.2)).current
  const contentOpacity = useRef(new Animated.Value(0)).current
  const haloScale = useRef(new Animated.Value(0.8)).current

  const startAnimations = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(circleAnimScale, {
        toValue: 1,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.spring(haloScale, {
        toValue: 1,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start()
  }, [backdropOpacity, circleAnimScale, contentOpacity, haloScale])

  const resetAnimations = useCallback(() => {
    backdropOpacity.setValue(0)
    circleAnimScale.setValue(0.2)
    contentOpacity.setValue(0)
    haloScale.setValue(0.8)
  }, [backdropOpacity, circleAnimScale, contentOpacity, haloScale])

  return {
    backdropOpacity,
    circleAnimScale,
    contentOpacity,
    haloScale,
    startAnimations,
    resetAnimations,
  }
}

export const useFeatureDiscoveryLayout = (
  targetRef: RefObject<MeasurableNode | null>
) => {
  const { width: viewportWidth, height: viewportHeight } = useWindowDimensions()
  const [targetLayout, setTargetLayout] = useState<TargetLayout | null>(null)

  const measureTarget = useCallback(() => {
    targetRef.current?.measureInWindow((x, y, width, height) => {
      if (!width && !height) {
        setTargetLayout({
          x: viewportWidth / 2 - 28,
          y: viewportHeight / 2 - 28,
          width: 56,
          height: 56,
        })
        return
      }

      setTargetLayout({ x, y, width, height })
    })
  }, [targetRef, viewportHeight, viewportWidth])

  const fallbackTarget = useMemo(
    () => ({
      x: viewportWidth / 2 - 28,
      y: viewportHeight / 2 - 28,
      width: 56,
      height: 56,
    }),
    [viewportWidth, viewportHeight]
  )

  const target = targetLayout ?? fallbackTarget

  return {
    targetLayout,
    target,
    measureTarget,
    setTargetLayout,
    viewportWidth,
    viewportHeight,
  }
}

export const useFeatureDiscoveryGeometry = (
  target: TargetLayout,
  viewportWidth: number,
  viewportHeight: number,
  spotlightPadding: number,
  circleScale: number
) => {
  const HIGHLIGHT_EDGE_INSET = 16
  const maxTargetX = Math.max(
    HIGHLIGHT_EDGE_INSET,
    viewportWidth - target.width - HIGHLIGHT_EDGE_INSET
  )
  const maxTargetY = Math.max(
    HIGHLIGHT_EDGE_INSET,
    viewportHeight - target.height - HIGHLIGHT_EDGE_INSET
  )
  const clampedTargetX = Math.min(
    Math.max(target.x, HIGHLIGHT_EDGE_INSET),
    maxTargetX
  )
  const clampedTargetY = Math.min(
    Math.max(target.y, HIGHLIGHT_EDGE_INSET),
    maxTargetY
  )

  const targetCenterX = clampedTargetX + target.width / 2
  const targetCenterY = clampedTargetY + target.height / 2
  const spotlightSize = Math.max(target.width, target.height) + spotlightPadding * 2

  const circleDiameter = useMemo(() => {
    return viewportWidth * circleScale
  }, [circleScale, viewportWidth])

  const circleRadius = circleDiameter / 2

  const TEXT_PADDING = 24
  const TARGET_GAP = 30
  const MIN_MESSAGE_HEIGHT = 140
  const MIN_MESSAGE_WIDTH = 280
  const MESSAGE_VERTICAL_OFFSET = 14
  const isTargetInTopHalf = targetCenterY < viewportHeight * 0.55
  const baseMessageTop = isTargetInTopHalf
    ? Math.min(viewportHeight - 200, clampedTargetY + target.height + TARGET_GAP)
    : Math.max(TEXT_PADDING, clampedTargetY - 150)
  const messageTop = Math.max(TEXT_PADDING, baseMessageTop - MESSAGE_VERTICAL_OFFSET)
  const textDy = messageTop - targetCenterY
  const textHalfChord =
    Math.abs(textDy) < circleRadius
      ? Math.sqrt(circleRadius ** 2 - textDy ** 2)
      : 0

  const baseMsgLeft = Math.max(
    TEXT_PADDING,
    targetCenterX - textHalfChord + TEXT_PADDING
  )
  const baseMsgRight = Math.max(
    TEXT_PADDING,
    viewportWidth - (targetCenterX + textHalfChord - TEXT_PADDING)
  )
  const baseMsgWidth = viewportWidth - baseMsgLeft - baseMsgRight
  const clampedMinMessageWidth = Math.min(
    MIN_MESSAGE_WIDTH,
    viewportWidth - TEXT_PADDING * 2
  )
  const isTargetOnLeft = targetCenterX < viewportWidth / 2
  const shouldUseSideAnchoredLayout = baseMsgWidth < clampedMinMessageWidth
  const msgLeft = shouldUseSideAnchoredLayout
    ? isTargetOnLeft
      ? TEXT_PADDING
      : viewportWidth - TEXT_PADDING - clampedMinMessageWidth
    : baseMsgLeft
  const msgRight = shouldUseSideAnchoredLayout
    ? isTargetOnLeft
      ? viewportWidth - TEXT_PADDING - clampedMinMessageWidth
      : TEXT_PADDING
    : baseMsgRight

  const circleBottomY = targetCenterY + circleRadius - TEXT_PADDING
  const msgMaxHeight = Math.max(MIN_MESSAGE_HEIGHT, circleBottomY - messageTop)

  return {
    targetCenterX,
    targetCenterY,
    spotlightSize,
    circleDiameter,
    circleRadius,
    messageTop,
    msgLeft,
    msgRight,
    msgMaxHeight,
    isTargetOnLeft,
    highlightX: clampedTargetX,
    highlightY: clampedTargetY,
  }
}

export const useFeatureDiscoveryTheme = (
  themeColor: ThemeColor,
  overlayColor?: string
) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[getSafeThemeColor(themeColor)]
  const resolvedOverlayColor = useMemo(
    () => overlayColor ?? withOpacity(theme.colors.foreground, 0.42),
    [overlayColor, theme.colors.foreground]
  )

  return {
    colorScheme,
    resolvedOverlayColor,
  }
}
