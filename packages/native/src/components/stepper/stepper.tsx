import { Children, forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { StepProvider, StepperProvider } from './stepper.context'
import { stepperRecipe } from './stepper.recipe'
import type { StepperProps } from './stepper.type'
import { stepStatus } from './stepper.utils'

/**
 * Where you are in a sequence of steps.
 *
 * ```tsx
 * <Stepper value={2}>
 *   <Stepper.Item>
 *     <Stepper.Indicator />
 *     <Stepper.Content>
 *       <Stepper.Title>Compte</Stepper.Title>
 *       <Stepper.Description>Créez votre compte</Stepper.Description>
 *     </Stepper.Content>
 *   </Stepper.Item>
 * </Stepper>
 * ```
 *
 * **The value is the caller's, always.** There is no `defaultValue` and no
 * `onValueChange`, because nothing inside a stepper can move it: a step is not a control,
 * it is a report. The number comes from the form, the wizard or the route that actually
 * knows which step it is on, and an uncontrolled one would be a piece of state that could
 * never change.
 *
 * **The root numbers its children.** JSX order is step order (R4), so an item declares no
 * index and no key of its own — insert a step in the middle and the rest renumber by being
 * there. It is the same reasoning that puts the `Accordion`'s separators on its root: what
 * an item cannot know about its neighbours belongs to the thing that has them all.
 */
export const StepperRoot = forwardRef<View, StepperProps>(function Stepper(
  {
    children,
    value = 1,
    orientation = 'vertical',
    size,
    color,
    hasConnector = true,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = { size, orientation }
  const styles = stepperRecipe.resolve({ theme, selection })
  const tint = color ? stepperRecipe.tint({ theme, color, selection }) : undefined

  const context = useMemo(() => {
    // The tint touches only what the accent painted — the progress — so the neutral slots
    // are passed through untouched rather than merged with an entry that is never there.
    const tinted = <K extends keyof typeof styles>(slot: K) =>
      tint?.[slot] ? [styles[slot], tint[slot]] : styles[slot]

    return {
      orientation,
      hasConnector,
      itemStyle: styles.item,
      trackStyle: styles.track,
      connectorStyle: styles.connector,
      connectorDoneStyle: tinted('connectorDone'),
      indicatorStyle: styles.indicator,
      indicatorCurrentStyle: tinted('indicatorCurrent'),
      indicatorCompletedStyle: tinted('indicatorCompleted'),
      markStyle: styles.mark,
      markCurrentStyle: tinted('markCurrent'),
      checkStyle: tinted('check'),
      contentStyle: styles.content,
      titleStyle: styles.title,
      titleUpcomingStyle: styles.titleUpcoming,
      descriptionStyle: styles.description,
    }
  }, [styles, tint, orientation, hasConnector])

  // `Children.toArray` rather than `Children.map`: it drops nulls, so a step rendered
  // conditionally does not leave a number behind in the ones after it.
  const steps = Children.toArray(children)

  const numbered = steps.map((child, index) => (
    <StepProvider
      key={index}
      value={{
        index,
        status: stepStatus(index, value),
        isFirst: index === 0,
        isLast: index === steps.length - 1,
      }}
    >
      {child}
    </StepProvider>
  ))

  const Node = asChild ? Slot : View

  return (
    <StepperProvider value={context}>
      <Node
        ref={ref}
        // One announcement for the whole component rather than a status spoken on each
        // step: "step 2 of 4" is what a reader needs, and it is what the root alone knows.
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 1, max: steps.length, now: value }}
        {...rest}
        style={[styles.root, styleProps, style]}
      >
        {numbered}
      </Node>
    </StepperProvider>
  )
})

StepperRoot.displayName = 'XAUI.Stepper.Root'
