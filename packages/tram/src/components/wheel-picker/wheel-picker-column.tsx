import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { Platform, View } from 'react-native'
import type { AccessibilityActionEvent } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { useControllableState } from '@xaui/native'
import { childrenToString, useStyleProps } from '@xaui/native/system'
import { canLoop, loopIndex } from '../../system/wheel'
import { WheelPickerColumnProvider, useWheelPicker } from './wheel-picker.context'
import { useWheelTurn, useWheelWake } from './wheel-picker.hook'
import { WheelPickerItem } from './wheel-picker-item'
import type { WheelPickerColumnProps } from './wheel-picker.type'

const ACTIONS = [{ name: 'increment' }, { name: 'decrement' }]

/** `adjustable` has no ARIA role of its own; a wheel of values is a spin button. */
const WEB_ROLE = Platform.OS === 'web' ? ('spinbutton' as const) : undefined

/**
 * One turning column, and the value it has come to rest on.
 *
 * ```tsx
 * <WheelPicker.Column value={day} onValueChange={setDay} accessibilityLabel="jour" isLooping>
 *   {DAYS.map(d => (
 *     <WheelPicker.Item key={d} value={d}>{d}</WheelPicker.Item>
 *   ))}
 * </WheelPicker.Column>
 * ```
 *
 * **The turn is the control.** The square at the middle is the choice: drag the column,
 * throw it, or touch a neighbour to bring it there. The two gestures are
 * `react-native-gesture-handler`'s, an optional peer imported for this slot alone.
 *
 * **It reports at rest, never while turning** — `onValueChange` fires once the column has
 * stopped on a new square. What is felt on the way, square by square, is the haptic.
 *
 * `isLooping` puts the first square after the last. To a screen reader the column is one
 * `adjustable` that reads the current square and steps by one; give it a label.
 */
export const WheelPickerColumn = forwardRef<View, WheelPickerColumnProps>(
  function WheelPickerColumn(
    {
      children,
      value: controlledValue,
      defaultValue,
      onValueChange,
      isDisabled = false,
      isLooping = false,
      style,
      accessibilityState,
      onAccessibilityAction,
      ...props
    },
    ref
  ) {
    const wheel = useWheelPicker()
    const [styleProps, rest] = useStyleProps(props)
    const column = useId()
    const disabled = isDisabled || wheel.isDisabled
    const { step, visibleCount } = wheel.geometry

    // Read off the elements rather than from mounted squares: the column has to stand
    // on the right one from its first frame.
    const { values, labels } = useMemo(() => readSquares(children), [children])
    const count = values.length

    const [value, setValue] = useControllableState<string | undefined>({
      value: controlledValue,
      defaultValue: defaultValue ?? values[0],
      onChange: onValueChange as ((next: string | undefined) => void) | undefined,
    })
    // Counts the choices the column came to rest on. A controlled column may refuse one,
    // and the wheel then has to rejoin a value that did not move.
    const [settles, setSettles] = useState(0)

    const selectedIndex = Math.max(values.indexOf(value as string), 0)
    const loops = isLooping && canLoop(count, visibleCount)
    const shape = useMemo(
      () => ({ step, count, isLooping: loops }),
      [step, count, loops]
    )

    const listed = useRef(values)
    listed.current = values

    const choose = useCallback(
      (index: number) => {
        const next = listed.current[index]
        if (next !== undefined) setValue(next)
        setSettles(times => times + 1)
      },
      [setValue]
    )

    const awake = useWheelWake(column)
    const { offset, gesture } = useWheelTurn({
      column,
      shape,
      selectedIndex,
      settles,
      isEnabled: !disabled,
      onChoice: choose,
    })

    const handleAction = (event: AccessibilityActionEvent) => {
      onAccessibilityAction?.(event)
      if (disabled) return

      const toward = event.nativeEvent.actionName === 'increment' ? 1 : -1
      const stepped = selectedIndex + toward
      const next = loops
        ? loopIndex(stepped, count)
        : Math.min(Math.max(stepped, 0), count - 1)

      // The state moves and the column follows it, on the spring.
      if (values[next] !== undefined) setValue(values[next])
    }

    const context = useMemo(
      () => ({
        offset,
        awake,
        shape,
        selectedIndex,
        indexOf: (candidate: string) => values.indexOf(candidate),
        paint: disabled ? wheel.disabledPaint : wheel.paint,
        isDisabled: disabled,
      }),
      [offset, awake, shape, selectedIndex, values, disabled, wheel]
    )

    const text = labels[selectedIndex]
    const last = Math.max(count - 1, 0)

    return (
      <WheelPickerColumnProvider value={context}>
        <GestureDetector gesture={gesture} touchAction="pan-x">
          <View
            ref={ref}
            accessible
            accessibilityRole="adjustable"
            role={WEB_ROLE}
            accessibilityValue={{ min: 0, max: last, now: selectedIndex, text }}
            accessibilityActions={ACTIONS}
            // The web reads the ARIA attributes and not the value object above.
            aria-valuemin={0}
            aria-valuemax={last}
            aria-valuenow={selectedIndex}
            aria-valuetext={text}
            aria-disabled={disabled || undefined}
            {...rest}
            // Merged, not spread over: a caller naming another state must not drop it.
            accessibilityState={{ disabled, ...accessibilityState }}
            onAccessibilityAction={handleAction}
            style={[wheel.columnStyle, styleProps, style]}
          >
            {children}
          </View>
        </GestureDetector>
      </WheelPickerColumnProvider>
    )
  }
)

WheelPickerColumn.displayName = 'XAUI.Tram.WheelPicker.Column'

/**
 * Every square's `value` and what it reads as, in the order they were written.
 *
 * Direct children only, and by identity: a square nested in a component of the caller's
 * own is one this column cannot count, and counting it wrong is worse than not counting
 * it — the index is what the wheel turns to.
 */
function readSquares(children: ReactNode) {
  const values: string[] = []
  const labels: string[] = []

  Children.forEach(children, child => {
    if (!isValidElement(child) || child.type !== WheelPickerItem) return
    const { value, children: content } = child.props as {
      value?: string
      children?: ReactNode
    }
    if (typeof value !== 'string') return

    values.push(value)
    labels.push(childrenToString(content) ?? value)
  })

  return { values, labels }
}
