import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperTrackProps } from './number-stepper.type'

/**
 * The ground under the keys — kept so Native's markup moves over as it is, and drawn as
 * nothing: Metro raises the keys off no pill. A caller's style paints it, behind
 * everything written after it.
 *
 * It takes no touches and is hidden from the accessibility tree.
 */
export const NumberStepperTrack = forwardRef<View, NumberStepperTrackProps>(
  function NumberStepperTrack({ style, ...props }, ref) {
    const { trackStyle } = useNumberStepper()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        {...rest}
        style={[trackStyle, styleProps, style]}
      />
    )
  }
)

NumberStepperTrack.displayName = 'XAUI.Tram.NumberStepper.Track'
