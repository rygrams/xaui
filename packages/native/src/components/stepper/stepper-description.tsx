import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useStepper } from './stepper.context'
import type { StepperDescriptionProps } from './stepper.type'

/**
 * The line under the title.
 *
 * It is a **vertical** affair: a horizontal step has a label centred under its circle and
 * no room for a second line, so a description there will render but will not read as one.
 * It does not move with the status — it is already the quiet line, and dimming the quiet
 * line twice makes an upcoming step unreadable rather than distant.
 */
export const StepperDescription = forwardRef<Text, StepperDescriptionProps>(
  function StepperDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useStepper()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

StepperDescription.displayName = 'XAUI.Stepper.Description'
