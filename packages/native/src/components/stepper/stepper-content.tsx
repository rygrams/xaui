import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useStep, useStepper } from './stepper.context'
import { sheet } from './stepper.style'
import type { StepperContentProps } from './stepper.type'

/**
 * What the step is about: its title, its description, and anything else you put there.
 *
 * ```tsx
 * <Stepper.Content>
 *   <Stepper.Title>Profil</Stepper.Title>
 *   <Stepper.Description>Renseignez votre profil</Stepper.Description>
 * </Stepper.Content>
 * ```
 *
 * In a vertical stepper it is the column beside the rail, and it carries the space between
 * one step and the next **under** its own text — that space is what the line runs through,
 * so it belongs to the text rather than to a gap on the root. The last step takes it back:
 * there is no line under it and no step after it, only trailing whitespace.
 */
export const StepperContent = forwardRef<View, StepperContentProps>(
  function StepperContent({ children, style, ...props }, ref) {
    const { contentStyle, orientation } = useStepper()
    const { isLast } = useStep()
    const [styleProps, rest] = useStyleProps(props)

    const flush = isLast && orientation === 'vertical' ? sheet.flush : null

    return (
      <View ref={ref} {...rest} style={[contentStyle, flush, styleProps, style]}>
        {children}
      </View>
    )
  }
)

StepperContent.displayName = 'XAUI.Stepper.Content'
