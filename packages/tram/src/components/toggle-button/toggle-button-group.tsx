import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactElement, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'
import Animated, { useReducedMotion } from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import { Slot, useAnimationDisabled, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { scale } from '../../motion/motion-tokens'
import { joinWithBars, spansAcross } from '../../system/joined-row'
import { usePressLean } from '../../system/press-tilt'
import type { Point } from '../../system/tilt'
import { ToggleButtonGroupProvider } from './toggle-button-group.context'
import { toggleButtonGroupRecipe } from './toggle-button-group.recipe'
import { createCellRow } from './toggle-button-group.row'
import type { ToggleButtonGroupProps } from './toggle-button-group.type'

/** Native's `Slot`, able to take an animated style: the caller's element leans too. */
const AnimatedSlot = Animated.createAnimatedComponent(
  Slot as never
) as unknown as typeof Animated.View

/**
 * One choice among a few, drawn as **one box** — the Native `ToggleButton.Group`'s API.
 * A button joins it by naming a `value`.
 *
 * ```tsx
 * <ToggleButton.Group value={view} onValueChange={setView}>
 *   <ToggleButton value="day">jour</ToggleButton>
 *   <ToggleButton value="week">semaine</ToggleButton>
 *   <ToggleButton value="month">mois</ToggleButton>
 * </ToggleButton.Group>
 * ```
 *
 * The group draws the frame, a line of ink, and a bar of the same line between every two
 * of its children; its buttons are stuck inside with no line of their own, and the chosen
 * one fills its whole case with the accent. Touching the chosen one does not release it.
 *
 * A press leans the whole group toward the finger, as a block — a wide one by the wide
 * angle. `size`, `radius`, `accent`, `color` and `isDisabled` are handed down; a button's
 * own value wins, but a disabled group has no enabled button in it.
 */
export const ToggleButtonGroup = forwardRef<View, ToggleButtonGroupProps>(
  function ToggleButtonGroup(
    {
      children,
      value: controlledValue,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      size,
      radius,
      accent,
      color,
      isDisabled = false,
      asChild = false,
      accessibilityRole = 'radiogroup',
      style,
      onLayout,
      ...props
    },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const [value, setValue] = useControllableState<string | undefined>({
      value: controlledValue,
      defaultValue,
      // It is only ever set to a button's value, so the caller never hears `undefined`.
      onChange: onValueChange as ((next: string | undefined) => void) | undefined,
    })
    // `useControllableState` drops a set to the value it already holds.
    const select = useCallback((next: string) => setValue(next), [setValue])

    const [row] = useState(createCellRow)
    const box = useRef({ width: 0, height: 0 })

    const styles = toggleButtonGroupRecipe.resolve({
      theme,
      selection: { orientation, radius },
      states: { disabled: isDisabled },
    })

    const own = StyleSheet.flatten<ViewStyle>([
      styleProps,
      style as StyleProp<ViewStyle>,
    ])
    const tilt = usePressLean(scale.press, own)
    // With motion reduced, or under an ancestor's `disable-all`, nothing leans.
    const isReduced = useReducedMotion()
    const isDisabledAll = useAnimationDisabled()
    const isStill = isReduced || isDisabledAll

    const { lean: leanBox, settle } = tilt
    const lean = useCallback(
      (pressed: string, at: Point) => {
        const span = row.spanOf(pressed)
        if (isStill || !span) return
        leanBox({ x: span.x + at.x, y: span.y + at.y }, box.current)
      },
      [isStill, row, leanBox]
    )

    const measure = useCallback(
      (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout
        box.current = { width, height }
        onLayout?.(event)
      },
      [onLayout]
    )

    const isStretched = spansAcross(own)
    const context = useMemo(
      () => ({
        value,
        select,
        size,
        accent,
        color,
        isDisabled,
        orientation,
        isStretched,
        lean,
        settle,
        row,
      }),
      [
        value,
        select,
        size,
        accent,
        color,
        isDisabled,
        orientation,
        isStretched,
        lean,
        settle,
        row,
      ]
    )

    // Hidden from screen readers: a bar is drawing, and says nothing.
    const bar = (index: number) => (
      <View
        key={`bar-${index}`}
        style={styles.bar}
        aria-hidden
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
    )
    const join = (nodes: ReactNode) => joinWithBars(Children.toArray(nodes), bar)

    const rootProps = {
      ref,
      // Announced once, by the thing that holds the choice.
      accessibilityRole,
      accessibilityState: { disabled: isDisabled },
      ...rest,
      onLayout: measure,
      style: [styles.root, styleProps, style, tilt.style],
    }

    return (
      <ToggleButtonGroupProvider value={context}>
        {asChild ? (
          // The caller's element is the frame: the bars go between its own children.
          <AnimatedSlot {...rootProps}>
            {withJoinedChildren(children, join)}
          </AnimatedSlot>
        ) : (
          <Animated.View {...rootProps}>{join(children)}</Animated.View>
        )}
      </ToggleButtonGroupProvider>
    )
  }
)

ToggleButtonGroup.displayName = 'XAUI.Tram.ToggleButton.Group'

/** The single element `asChild` merges into, its children parted by the bars. */
function withJoinedChildren(
  children: ReactNode,
  join: (nodes: ReactNode) => ReactNode[]
): ReactNode {
  if (!isValidElement(children)) return children

  const element = children as ReactElement<{ children?: ReactNode }>

  return cloneElement(element, undefined, ...join(element.props.children))
}
