import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useStep, useStepper } from './stepper.context'
import type { StepperTitleProps } from './stepper.type'

/**
 * The step's name. In progress it is a role larger, in the ink; ahead it is grey; done it
 * keeps the ink — a thing you did, not a thing greyed out.
 */
export const StepperTitle = forwardRef<Text, StepperTitleProps>(
  function StepperTitle({ children, style, ...props }, ref) {
    const { titleStyle, titleCurrentStyle, titleUpcomingStyle } = useStepper()
    const { status } = useStep()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={1}
        {...rest}
        style={[
          titleStyle,
          status === 'current' && titleCurrentStyle,
          status === 'upcoming' && titleUpcomingStyle,
          styleProps,
          style,
        ]}
      >
        {children}
      </Text>
    )
  }
)

StepperTitle.displayName = 'XAUI.Tram.Stepper.Title'
