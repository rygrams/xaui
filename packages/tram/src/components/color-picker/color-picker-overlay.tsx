import { useEffect } from 'react'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerOverlayProps } from './color-picker.type'

/**
 * What else closes the page: the system's back, unless `isDismissable={false}`. It draws
 * nothing — the page takes the screen and there is no outside to touch, which is where
 * Native's draws its backdrop. Optional: omitted, the back closes the page.
 */
export function ColorPickerOverlay({
  isDismissable = true,
}: ColorPickerOverlayProps) {
  const { dismissable } = useColorPicker()

  useEffect(() => {
    dismissable.current = isDismissable

    return () => {
      dismissable.current = true
    }
  }, [dismissable, isDismissable])

  return null
}

ColorPickerOverlay.displayName = 'XAUI.Tram.ColorPicker.Overlay'
