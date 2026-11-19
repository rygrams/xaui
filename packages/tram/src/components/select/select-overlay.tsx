import { forwardRef, useContext, useEffect } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Portal, PortalContext, useStyleProps } from '@xaui/native/system'
import { unfoldedInner } from '../../system/list-picker'
import { useSelect } from './select.context'
import type { SelectOverlayProps } from './select.type'

/**
 * What closes the list when the choice is made elsewhere. It draws nothing.
 *
 * Around a list unfolded in place it is two bands, above the box and below it, rendered
 * in the nearest `PortalHost`: a touch on either closes the list, and the box between
 * them stays the list's. For a list that took the screen there is no outside to touch;
 * it only carries `isDismissable`, which is then the system's back.
 *
 * Optional, as in Native: omitted, a touch outside closes nothing.
 */
export const SelectOverlay = forwardRef<View, SelectOverlayProps>(
  function SelectOverlay({ children, isDismissable = true, style, ...props }, ref) {
    const {
      overlayStyle,
      isOpen,
      mode,
      close,
      dismissable,
      boxTop,
      rowHeight,
      listHeight,
      lineWidth,
      keepsRow,
    } = useSelect()
    const [styleProps, rest] = useStyleProps(props)
    const host = useContext(PortalContext)

    useEffect(() => {
      dismissable.current = isDismissable

      return () => {
        dismissable.current = true
      }
    }, [dismissable, isDismissable])

    if (!isOpen || mode !== 'inline' || boxTop === null) return null

    // The box reports window coordinates and the bands are laid out in the host.
    const top = Math.max(0, boxTop - (host?.origin.y ?? 0))
    const bottom =
      top + unfoldedInner(rowHeight, listHeight, keepsRow) + lineWidth * 2
    const dismiss = isDismissable ? close : undefined

    return (
      <Portal>
        <View
          ref={ref}
          {...rest}
          // Only the bands take the touch: the box between them is the list's.
          style={[overlayStyle, bands.around, styleProps, style]}
        >
          {/* Not buttons: they are the absence of the list. */}
          <Pressable
            accessibilityRole="none"
            importantForAccessibility="no"
            onPress={dismiss}
            style={[bands.band, { top: 0, height: top }]}
          />
          <Pressable
            accessibilityRole="none"
            importantForAccessibility="no"
            onPress={dismiss}
            style={[bands.band, { top: bottom, bottom: 0 }]}
          />
          {children}
        </View>
      </Portal>
    )
  }
)

const bands = StyleSheet.create({
  around: { pointerEvents: 'box-none' },
  band: { position: 'absolute', start: 0, end: 0 },
})

SelectOverlay.displayName = 'XAUI.Tram.Select.Overlay'
