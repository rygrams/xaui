import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useStepper } from './stepper.context'
import type { StepperDescriptionProps } from './stepper.type'

/** The grey line under the title — a vertical affair, as in Native. */
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

StepperDescription.displayName = 'XAUI.Tram.Stepper.Description'
