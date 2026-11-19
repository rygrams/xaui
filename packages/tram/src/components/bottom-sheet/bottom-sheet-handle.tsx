import { forwardRef, useCallback } from 'react'
import { Pressable, View } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import { useStyleProps, warnDev } from '@xaui/native/system'
import { touchReach } from '../../system/touch-reach'
import { useBottomSheet } from './bottom-sheet.context'
import { HANDLE_BOX } from './bottom-sheet.recipe'
import type { BottomSheetHandleProps } from './bottom-sheet.type'

/** Reaches the 48-point target above and below the box the bar sits in. */
const REACH = touchReach(HANDLE_BOX)
const HIT_SLOP = { top: REACH, bottom: REACH }

/**
 * The grab bar: a straight bar of 40 × 4 in half the band's ink, where Native's is a
 * pill. It is the only thing telling a reader the band can be dragged.
 *
 * **On a band that can be reduced it is a real control**: a press toggles the two
 * heights, because a drag is a gesture some people cannot perform. It is then pressed
 * like a control of 48 and needs an `accessibilityLabel`. Otherwise it is decoration,
 * hidden from screen readers, taking no touches.
 */
export const BottomSheetHandle = forwardRef<View, BottomSheetHandleProps>(
  function BottomSheetHandle(
    { accessibilityRole = 'button', style, onPress, ...props },
    ref
  ) {
    const {
      handleStyle,
      handleBarStyle,
      isCollapsible,
      isExpanded,
      toggleExpanded,
    } = useBottomSheet()
    const [styleProps, rest] = useStyleProps(props)

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        toggleExpanded()
      },
      [onPress, toggleExpanded]
    )

    const bar = <View style={handleBarStyle} />

    if (!isCollapsible) {
      return (
        <View
          ref={ref}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          {...rest}
          // `style` may be `Pressable`'s function form; a decorative bar is never pressed.
          style={[
            handleStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: false }) : style,
          ]}
        >
          {bar}
        </View>
      )
    }

    if (!rest.accessibilityLabel && !rest['aria-label']) {
      warnDev(
        'Tram BottomSheet.Handle: a collapsible sheet needs an `accessibilityLabel` on ' +
          'its handle — it is the control that reduces and restores the sheet.'
      )
    }

    return (
      <Pressable
        ref={ref}
        hitSlop={HIT_SLOP}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ expanded: isExpanded }}
        aria-expanded={isExpanded}
        {...rest}
        style={state => [
          handleStyle,
          styleProps,
          typeof style === 'function' ? style(state) : style,
        ]}
        onPress={handlePress}
      >
        {bar}
      </Pressable>
    )
  }
)

BottomSheetHandle.displayName = 'XAUI.Tram.BottomSheet.Handle'
