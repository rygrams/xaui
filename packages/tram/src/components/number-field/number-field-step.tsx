import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { touchReach } from '../../system/touch-reach'
import { useTextField } from '../text-field'
import { useNumberField } from './number-field.context'
import type { NumberFieldDecrementProps } from './number-field.type'

/** The upright of the plus. The bar under it is the minus, drawn by both cells. */
const sheet = StyleSheet.create({ upright: { transform: [{ rotate: '90deg' }] } })

type StepCellProps = NumberFieldDecrementProps & {
  /** The name the warning carries. */
  name: string
  /** Which end of the box: the rule goes on the side that faces the value. */
  edge: 'start' | 'end'
  /** A plus is a minus with a second bar across it, so this is the whole difference. */
  hasUpright: boolean
  onStep: () => void
  isLive: boolean
}

/**
 * One cell of the stepper, everything the decrement and the increment share: the cell,
 * the rule facing the value, the pressable and its mark.
 *
 * The press is the row's: what the cell holds shrinks a little and springs back. No tilt —
 * a cell is a key inside the box, not a box of its own — and no colour, as everywhere in
 * Tram. With nowhere left to go, the mark turns grey and the cell stops taking presses.
 */
export const StepCell = forwardRef<View, StepCellProps>(function StepCell(
  {
    name,
    edge,
    hasUpright,
    onStep,
    isLive,
    accessibilityLabel,
    children,
    style,
    ...props
  },
  ref
) {
  const { isDisabled } = useTextField()
  const {
    cell,
    stepStyle,
    pressStyle,
    ruleStyle,
    ruleStartStyle,
    ruleEndStyle,
    glyphStyle,
    glyphSpentStyle,
  } = useNumberField()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({})

  const motion = resolveAnimation(undefined, useAnimationDisabled())
  const Press = motion.scale ? PressRow : PressableFeedback

  // A plus says "one more" to someone who can see it and nothing at all to someone who
  // cannot — and the label above names the quantity, not the action.
  if (!accessibilityLabel) {
    warnDev(
      `Tram ${name}: the stepper needs an \`accessibilityLabel\` — a plus is not text, ` +
        'and the label above the field names the quantity rather than the action.'
    )
  }

  const isOff = isDisabled || !isLive
  const bar = [glyphStyle, isLive ? undefined : glyphSpentStyle]

  return (
    <View ref={ref} {...rest} style={[stepStyle, styleProps, style]}>
      <Press
        isPressed={isPressed}
        isDisabled={isOff}
        animation={motion.disableAll ? 'disable-all' : false}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isOff }}
        // Under 48 across at `sm` and `md`: the touch reaches past the cell.
        hitSlop={touchReach(cell)}
        style={pressStyle}
        onPress={onStep}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children ?? (
          <>
            <View style={bar} />
            {hasUpright ? <View style={[bar, sheet.upright]} /> : null}
          </>
        )}
      </Press>
      <View
        pointerEvents="none"
        style={[ruleStyle, edge === 'start' ? ruleStartStyle : ruleEndStyle]}
      />
    </View>
  )
})

StepCell.displayName = 'XAUI.Tram.NumberField.StepCell'
