import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useStep, useStepper } from './stepper.context'
import type { StepperIndicatorProps } from './stepper.type'

/**
 * The step's bar and its numeral. The bar is the accent once the step is done, the ink
 * while it is in progress, the faint grey ahead; the numeral is Light, grey ahead. Lying
 * down in a horizontal stepper, the bar is all there is.
 *
 * Children replace the numeral — an `Icon`, a letter. The bar stays.
 */
export const StepperIndicator = forwardRef<View, StepperIndicatorProps>(
  function StepperIndicator({ children, style, ...props }, ref) {
    const {
      indicatorStyle,
      barStyle,
      barCompletedStyle,
      barCurrentStyle,
      numeralStyle,
      numeralUpcomingStyle,
      orientation,
    } = useStepper()
    const { index, status } = useStep()
    const [styleProps, rest] = useStyleProps(props)

    const bar =
      status === 'completed'
        ? barCompletedStyle
        : status === 'current'
          ? barCurrentStyle
          : null

    return (
      <View ref={ref} {...rest} style={[indicatorStyle, styleProps, style]}>
        <View style={[barStyle, bar]} />
        {orientation === 'vertical'
          ? (children ?? (
              <Text
                style={[numeralStyle, status === 'upcoming' && numeralUpcomingStyle]}
              >
                {index + 1}
              </Text>
            ))
          : null}
      </View>
    )
  }
)

StepperIndicator.displayName = 'XAUI.Tram.Stepper.Indicator'
