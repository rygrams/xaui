import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useStep, useStepper } from './stepper.context'
import type { StepperContentProps } from './stepper.type'

const FLUSH = { paddingBottom: 0 } as const

/**
 * What the step is about, beside its numeral. It carries the air under its own words, so
 * the bar beside it runs through it; the last step takes it back.
 */
export const StepperContent = forwardRef<View, StepperContentProps>(
  function StepperContent({ children, style, ...props }, ref) {
    const { contentStyle, orientation } = useStepper()
    const { isLast } = useStep()
    const [styleProps, rest] = useStyleProps(props)

    const flush = isLast && orientation === 'vertical' ? FLUSH : null

    return (
      <View ref={ref} {...rest} style={[contentStyle, flush, styleProps, style]}>
        {children}
      </View>
    )
  }
)

StepperContent.displayName = 'XAUI.Tram.Stepper.Content'
