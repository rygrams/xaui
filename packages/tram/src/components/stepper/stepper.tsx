import { Children, forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { stepStatus } from '@xaui/native'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { flatPaint } from '../../system/flat-paint'
import { StepProvider, StepperProvider } from './stepper.context'
import { DEFAULT_SIZE, stepperRecipe } from './stepper.recipe'
import type { StepperProps } from './stepper.type'

/** A bar with no ink, kept so the words beside it stay where they are. */
const UNDRAWN = { backgroundColor: 'transparent' } as const

/**
 * Where you are in a sequence of steps — the Native `Stepper`'s API, drawn in bars and
 * type.
 *
 * ```tsx
 * <Stepper value={2}>
 *   <Stepper.Item>
 *     <Stepper.Indicator />
 *     <Stepper.Content>
 *       <Stepper.Title>dates</Stepper.Title>
 *       <Stepper.Description>du 24 au 28 novembre</Stepper.Description>
 *     </Stepper.Content>
 *   </Stepper.Item>
 * </Stepper>
 * ```
 *
 * The value is the caller's, counted from one; the root numbers its children and hands
 * each its status — Native's `stepStatus`. Nothing moves on its own: a step is a report.
 */
export const StepperRoot = forwardRef<View, StepperProps>(function Stepper(
  {
    children,
    value = 1,
    orientation = 'vertical',
    size = DEFAULT_SIZE,
    accent,
    color,
    hasConnector = true,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const styles = stepperRecipe.resolve({ theme, selection: { size, orientation } })
  // A bar is a fill, so a named accent is its true colour.
  const fill = flatPaint({ accent, color })

  const context = useMemo(
    () => ({
      orientation,
      hasConnector,
      itemStyle: styles.item,
      indicatorStyle: styles.indicator,
      barStyle: hasConnector ? styles.bar : [styles.bar, UNDRAWN],
      barCompletedStyle: hasConnector
        ? [styles.barCompleted, fill ? { backgroundColor: fill } : undefined]
        : UNDRAWN,
      barCurrentStyle: hasConnector ? styles.barCurrent : UNDRAWN,
      numeralStyle: styles.numeral,
      numeralUpcomingStyle: styles.numeralUpcoming,
      contentStyle: styles.content,
      titleStyle: styles.title,
      titleCurrentStyle: styles.titleCurrent,
      titleUpcomingStyle: styles.titleUpcoming,
      descriptionStyle: styles.description,
    }),
    [styles, fill, orientation, hasConnector]
  )

  const steps = Children.toArray(children)

  return (
    <StepperProvider value={context}>
      <View
        ref={ref}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 1, max: steps.length, now: value }}
        {...rest}
        style={[styles.root, styleProps, style]}
      >
        {steps.map((child, index) => (
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
        ))}
      </View>
    </StepperProvider>
  )
})

StepperRoot.displayName = 'XAUI.Tram.Stepper.Root'
