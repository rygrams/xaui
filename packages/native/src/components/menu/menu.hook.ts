import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Dimensions, Easing, type LayoutChangeEvent, type View } from 'react-native'
import { MENU_SCREEN_INDENT, MENU_TRIGGER_GAP } from './menu.style'
import type { MenuPosition } from './menu.type'

type TriggerPosition = {
  x: number
  y: number
  width: number
  height: number
}

export const useMenuTriggerMeasurements = (visible: boolean) => {
  const triggerRef = useRef<View>(null)
  const [triggerPosition, setTriggerPosition] = useState<TriggerPosition | null>(null)

  useEffect(() => {
    if (!visible) return

    const measureTrigger = () => {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerPosition({ x, y, width, height })
      })
    }

    const frameId = globalThis.setTimeout(measureTrigger, 0)
    return () => globalThis.clearTimeout(frameId)
  }, [visible])

  return { triggerRef, triggerPosition }
}

export const useMenuContentLayout = () => {
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 })

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContentSize({ width, height })
  }, [])

  return { contentSize, handleContentLayout }
}

export const useMenuPosition = (
  triggerPosition: TriggerPosition | null,
  contentSize: { width: number; height: number },
  position: MenuPosition
) => {
  return useMemo(() => {
    if (!triggerPosition) return { top: 0, left: 0 }

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height

    let top: number
    let left = triggerPosition.x

    const hasEnoughSpaceBelow =
      triggerPosition.y + triggerPosition.height + contentSize.height <= screenHeight - MENU_SCREEN_INDENT
    const hasEnoughSpaceAbove =
      triggerPosition.y - contentSize.height >= MENU_SCREEN_INDENT

    if (position === 'bottom') {
      if (hasEnoughSpaceBelow) {
        top = triggerPosition.y + triggerPosition.height + MENU_TRIGGER_GAP
      } else if (hasEnoughSpaceAbove) {
        top = triggerPosition.y - contentSize.height - MENU_TRIGGER_GAP
      } else {
        top = triggerPosition.y + triggerPosition.height + MENU_TRIGGER_GAP
      }
    } else {
      if (hasEnoughSpaceAbove) {
        top = triggerPosition.y - contentSize.height - MENU_TRIGGER_GAP
      } else if (hasEnoughSpaceBelow) {
        top = triggerPosition.y + triggerPosition.height + MENU_TRIGGER_GAP
      } else {
        top = triggerPosition.y - contentSize.height - MENU_TRIGGER_GAP
      }
    }

    if (contentSize.width > 0 && left + contentSize.width > screenWidth - MENU_SCREEN_INDENT) {
      left = Math.max(
        MENU_SCREEN_INDENT,
        triggerPosition.x + triggerPosition.width - contentSize.width
      )
    }

    if (left < MENU_SCREEN_INDENT) {
      left = MENU_SCREEN_INDENT
    }

    return { top, left }
  }, [triggerPosition, contentSize, position])
}

export const useMenuAnimation = (visible: boolean) => {
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!visible) return

    opacity.setValue(0)
    scale.setValue(0)

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 9,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start()
  }, [visible, opacity, scale])

  return { opacity, scale }
}
