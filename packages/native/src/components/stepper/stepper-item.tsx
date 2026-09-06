import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useStep, useStepper } from './stepper.context'
import type { StepperItemProps } from './stepper.type'

/**
 * One step: its indicator and what the indicator is about.
 *
 * ```tsx
 * <Stepper.Item>
 *   <Stepper.Indicator />
 *   <Stepper.Content>
 *     <Stepper.Title>Profil</Stepper.Title>
 *   </Stepper.Content>
 * </Stepper.Item>
 * ```
 *
 * It declares nothing about where it sits — the root numbers it. What it is, is the box
 * the two columns run in: a row in a vertical stepper, stretched so the line beside the
 * text can reach the full height of it, and an equal-width column in a horizontal one.
 *
 * **A step is not pressable**, and that is `asChild`'s job rather than a prop: a stepper
 * where a completed step takes you back is one composition away, and one where tapping
 * ahead skips validation is not something this component should make easy.
 *
 * ```tsx
 * <Stepper.Item asChild>
 *   <Pressable onPress={() => setStep(1)}>…</Pressable>
 * </Stepper.Item>
 * ```
 *
 * `children` may be a function, which is how a step reads its own standing without the
 * caller wiring `useStep` themselves.
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

StepperItem.displayName = 'XAUI.Stepper.Item'
