import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useStep, useStepper } from './stepper.context'
import type { StepperItemProps } from './stepper.type'

/**
 * One step: a row in a vertical stepper, so the bar runs the full height of its words,
 * and an equal share of the row in a horizontal one. Not pressable — `asChild` makes it so.
 */
export const StepperItem = forwardRef<View, StepperItemProps>(function StepperItem(
  { children, asChild = false, style, ...props },
  ref
) {
  const { itemStyle } = useStepper()
  const step = useStep()
  const [styleProps, rest] = useStyleProps(props)

  const Node = asChild ? Slot : View

  return (
    <Node ref={ref} {...rest} style={[itemStyle, styleProps, style]}>
      {typeof children === 'function' ? children(step) : children}
    </Node>
  )
})

StepperItem.displayName = 'XAUI.Tram.Stepper.Item'
