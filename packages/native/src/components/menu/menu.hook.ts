import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  type LayoutRectangle,
  type View,
} from 'react-native'
import { MENU_SCREEN_INDENT } from './menu.style'
import type { MenuPosition } from './menu.type'

export const useMenuMeasurements = (visible: boolean, position: MenuPosition = 'bottom') => {
  const triggerRef = useRef<View | null>(null)
  const menuRef = useRef<View | null>(null)
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null)
  const [menuLayout, setMenuLayout] = useState({ width: 0, height: 0 })
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

  const measureTrigger = useCallback(async () => {
    return new Promise<LayoutRectangle>((resolve) => {
      if (triggerRef.current) {
        triggerRef.current.measureInWindow((x, y, width, height) => {
          resolve({ x, y, width, height })
        })
      }
    })
  }, [])

  const measureMenu = useCallback(async () => {
    return new Promise<LayoutRectangle>((resolve) => {
      if (menuRef.current) {
        menuRef.current.measureInWindow((x, y, width, height) => {
          resolve({ x, y, width, height })
        })
      }
    })
  }, [])

  const calculatePosition = useCallback(async () => {
    if (!visible) return

    const [triggerMeasure, menuMeasure] = await Promise.all([
      measureTrigger(),
      measureMenu(),
    ])

    if (!triggerMeasure.width || !triggerMeasure.height || !menuMeasure.width || !menuMeasure.height) {
      setTimeout(calculatePosition, 0)
      return
    }

    setTriggerLayout(triggerMeasure)
    setMenuLayout({ width: menuMeasure.width, height: menuMeasure.height })

    const windowLayout = Dimensions.get('window')
    let top = triggerMeasure.y
    let left = triggerMeasure.x

    if (position === 'bottom') {
      top = triggerMeasure.y + triggerMeasure.height
    }

    if (left + menuMeasure.width > windowLayout.width - MENU_SCREEN_INDENT) {
      left = Math.max(
        MENU_SCREEN_INDENT,
        windowLayout.width - menuMeasure.width - MENU_SCREEN_INDENT
      )
    }

    if (top + menuMeasure.height > windowLayout.height - MENU_SCREEN_INDENT) {
      top = Math.max(
        MENU_SCREEN_INDENT,
        triggerMeasure.y - menuMeasure.height
      )
    }

    if (top < MENU_SCREEN_INDENT) {
      top = MENU_SCREEN_INDENT
    }

    setMenuPosition({ top, left })
  }, [visible, measureTrigger, measureMenu, position])

  useEffect(() => {
    if (visible) {
      calculatePosition()
    }
  }, [visible, calculatePosition])

  return {
    triggerRef,
    menuRef,
    triggerLayout,
    menuLayout,
    menuPosition,
  }
}
