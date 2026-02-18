import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import {
  createLoaderAnimation,
  getLoaderBarWidth,
  getLoaderInitialX,
} from './scaffold.animation'

export const useLinearLoader = (isLoading: boolean, themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const translateX = useRef(new Animated.Value(getLoaderInitialX())).current
  const animRef = useRef<Animated.CompositeAnimation | null>(null)

  useEffect(() => {
    if (isLoading) {
      translateX.setValue(getLoaderInitialX())
      animRef.current = createLoaderAnimation(translateX)
      animRef.current.start()
    } else {
      animRef.current?.stop()
      translateX.setValue(getLoaderInitialX())
    }

    return () => {
      animRef.current?.stop()
    }
  }, [isLoading, translateX])

  return {
    translateX,
    barWidth: getLoaderBarWidth(),
    barColor: colorScheme.main,
    trackColor: withOpacity(colorScheme.main, 0.12),
  }
}
