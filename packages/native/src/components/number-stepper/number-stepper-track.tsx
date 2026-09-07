import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperTrackProps } from './number-stepper.type'

/**
 * The pill the two buttons are raised off. **Write it first.**
 *
 * It is out of flow and painted behind everything after it, so its place in the JSX is what
 * puts it under the rest rather than over it — `Slider.Track`'s arrangement exactly.
 *
 * It is inset from the top and bottom of the control, and that inset is the shape: a pill as
 * tall as its buttons is a segmented control, which says "pick one" rather than "more of
 * it".
 *
 * It takes no touches and is hidden from the accessibility tree — a ground is not a control,
 * and a screen reader stopping on it would find nothing to do there.
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

NumberStepperTrack.displayName = 'XAUI.NumberStepper.Track'
