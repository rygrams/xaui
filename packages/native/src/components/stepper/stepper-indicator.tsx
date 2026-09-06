import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useStep, useStepper } from './stepper.context'
import { sheet } from './stepper.style'
import type { StepperIndicatorProps } from './stepper.type'
import { isConnectorDone, isLeadDone } from './stepper.utils'

/**
 * The circle, and the rail it sits on.
 *
 * ```tsx
 * <Stepper.Indicator />
 *
 * <Stepper.Indicator>
 *   <Icon as={LockIcon} />
 * </Stepper.Indicator>
 * ```
 *
 * With no children it shows its own number, and a check once the step is behind you —
 * drawn out of two borders (`utils/check-glyph`, the `Checkbox`'s tick) so a stepper works
 * in a project that has installed no icon set.
 *
 * **The connectors are the indicator's, not the root's.** A vertical line has to run from
 * under one circle to the next through whatever height the text beside it takes, and only
 * something inside that row can measure it — the opposite of the `Accordion`, whose
 * separator spans the full width and can only be drawn by the root.
 *
 * A horizontal step carries **two** halves, one on each side, so its circle stays centred
 * over its label whatever the neighbours do. The two ends of the rail are drawn transparent
 * rather than dropped: removing them would let the first and last circles slide off centre.
 */
export const StepperIndicator = forwardRef<View, StepperIndicatorProps>(
  function StepperIndicator({ children, style, ...props }, ref) {
    const {
      trackStyle,
      indicatorStyle,
      indicatorCurrentStyle,
      indicatorCompletedStyle,
      orientation,
    } = useStepper()
    const { index, status, isFirst, isLast } = useStep()
    const [styleProps, rest] = useStyleProps(props)

    // `indicatorStyle` is what an upcoming step looks like; the other two statuses lay a
    // colour over it — see the recipe on why the status is an overlay rather than an axis.
    const statusStyle =
      status === 'current'
        ? indicatorCurrentStyle
        : status === 'completed'
          ? indicatorCompletedStyle
          : null

    return (
      <View style={trackStyle}>
        {orientation === 'horizontal' ? (
          <Connector isDone={isLeadDone(status)} isEdge={isFirst} />
        ) : null}

        <View
          ref={ref}
          {...rest}
          style={[indicatorStyle, statusStyle, styleProps, style]}
        >
          {children ??
            (status === 'completed' ? <Check /> : <Mark>{index + 1}</Mark>)}
        </View>

        <Connector isDone={isConnectorDone(status)} isEdge={isLast} />
      </View>
    )
  }
)

StepperIndicator.displayName = 'XAUI.Stepper.Indicator'

/** One half of the rail. `isEdge` keeps its space and drops its ink. */
function Connector({ isDone, isEdge }: { isDone: boolean; isEdge: boolean }) {
  const { connectorStyle, connectorDoneStyle, hasConnector } = useStepper()

  if (!hasConnector) return null

  return (
    <View
      style={[connectorStyle, isDone && connectorDoneStyle, isEdge && sheet.hidden]}
    />
  )
}

/** The step's number, in the colour its status calls for. */
function Mark({ children }: { children: number }) {
  const { markStyle, markCurrentStyle } = useStepper()
  const { status } = useStep()

  return (
    <Text style={[markStyle, status === 'current' && markCurrentStyle]}>
      {children}
    </Text>
  )
}

/** The built-in tick, for a step that is behind you. */
function Check() {
  const { checkStyle } = useStepper()

  return <View style={checkStyle} />
}
