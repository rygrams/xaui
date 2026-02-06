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
    if (!visible) {
      setTriggerPosition(null)
      return
    }

    const measureTrigger = (attempt: number) => {
      triggerRef.current?.measure((_, __, width, height, pageX, pageY) => {
        if ((width <= 0 || height <= 0) && attempt < 5) {
          globalThis.requestAnimationFrame(() => measureTrigger(attempt + 1))
          return
        }

        setTriggerPosition({
          x: pageX,
          y: pageY,
          width: Math.max(0, width),
          height: Math.max(0, height),
        })
      })
    }

    const frameId = globalThis.setTimeout(() => measureTrigger(0), 0)
    return () => globalThis.clearTimeout(frameId)
  }, [visible])

  return { triggerRef, triggerPosition }
}

export const useMenuContentLayout = (visible: boolean) => {
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 })
  const [isMeasured, setIsMeasured] = useState(false)

  useEffect(() => {
    if (!visible) {
      setIsMeasured(false)
    }
  }, [visible])

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    if (width > 0 && height > 0) {
      setContentSize({ width, height })
      setIsMeasured(true)
    }
  }, [])

  return { contentSize, handleContentLayout, isMeasured }
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

    const maxTop = Math.max(MENU_SCREEN_INDENT, screenHeight - MENU_SCREEN_INDENT - contentSize.height)
    const clampedTop = Math.min(maxTop, Math.max(MENU_SCREEN_INDENT, top))

    return { top: clampedTop, left }
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
