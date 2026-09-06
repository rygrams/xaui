import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useStep, useStepper } from './stepper.context'
import type { StepperTitleProps } from './stepper.type'

/**
 * The step's name.
 *
 * It recedes once the step is ahead of you — the whole step does, indicator and all — so
 * that the eye finds where it is rather than counting from the top. A step you have
 * already done keeps its full contrast: it is a thing you did, not a thing greyed out.
 */
export const StepperTitle = forwardRef<Text, StepperTitleProps>(
  function StepperTitle({ children, style, ...props }, ref) {
    const { titleStyle, titleUpcomingStyle } = useStepper()
    const { status } = useStep()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        {...rest}
        style={[
          titleStyle,
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

StepperTitle.displayName = 'XAUI.Stepper.Title'
