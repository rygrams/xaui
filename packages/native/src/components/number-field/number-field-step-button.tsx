import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useTextField } from '../text-field'
import { warnDev } from '../../utils/warn-dev'
import { useNumberField } from './number-field.context'

/** A bar twelve points long is the right size to look at and the wrong size to hit. */
const HIT_SLOP = 12

/** The upright of the plus. The bar under it is the minus, drawn by both buttons. */
const sheet = StyleSheet.create({ upright: { transform: [{ rotate: '90deg' }] } })

type StepButtonProps = {
  /** The name the warning and the `displayName` carry. */
  name: string
  /** A plus is a minus with a second bar across it, so this is the whole difference. */
  hasUpright: boolean
  onPress: () => void
  isLive: boolean
  accessibilityLabel: string | undefined
  children: ReactNode
}

/**
 * The pressable half of a stepper, which is everything the two buttons share.
 *
 * It is **internal**: what `NumberField.Increment` and `NumberField.Decrement` add on top
 * of it is the decorator they sit in and the sign of the step they take, and neither is
 * something a caller should have to supply. Sharing it here is what keeps a plus and a
 * minus in one field the same weight, the same target and the same dimming.
 *
 * With no children it draws its own mark out of one bar, or two a quarter turn apart —
 * the close button's construction, so a field works in a project that has installed no
 * icon set.
 */
export const StepButton = forwardRef<View, StepButtonProps>(function StepButton(
  { name, hasUpright, onPress, isLive, accessibilityLabel, children },
  ref
) {
  const { isDisabled } = useTextField()
  const { stepButtonStyle, stepGlyphStyle, stepExhaustedStyle } = useNumberField()

  // A plus says "one more" to someone who can see it and nothing at all to someone who
  // cannot — and the label beside the field names the quantity, not the action, so there
  // is nothing to fall back on.
  if (!accessibilityLabel) {
    warnDev(
      `${name}: the stepper needs an \`accessibilityLabel\` — a plus is not text, and ` +
        'the label above the field names the quantity rather than what pressing it does.'
    )
  }

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled || !isLive }}
      disabled={isDisabled || !isLive}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      style={[stepButtonStyle, isLive ? undefined : stepExhaustedStyle]}
    >
      {children ?? (
        <>
          <View style={stepGlyphStyle} />
          {hasUpright ? <View style={[stepGlyphStyle, sheet.upright]} /> : null}
        </>
      )}
    </Pressable>
  )
})

StepButton.displayName = 'XAUI.NumberField.StepButton'
