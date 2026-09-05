import { forwardRef } from 'react'
import { View } from 'react-native'
import { SelectionFill } from '../../system/selection-fill'
import { useStyleProps } from '../../system/style-props'
import { useCheckbox } from './checkbox.context'
import type { CheckboxIndicatorProps } from './checkbox.type'

/**
 * The box itself, and the mark inside it.
 *
 * ```tsx
 * <Checkbox.Indicator />
 *
 * <Checkbox.Indicator>
 *   <Icon as={CheckIcon} size={14} color={theme.colors.accentForeground} />
 * </Checkbox.Indicator>
 * ```
 *
 * With no children it draws its own check — two borders of an empty box, a quarter turn
 * from where they look like a tick — so a checkbox works in a project that has installed
 * no icon set. That is the `CloseButton`'s bargain, taken for the same reason.
 *
 * The fill and its motion are `SelectionFill`'s, shared with the `Radio`: what differs
 * between the two controls is the mark and the shape it sits in, not how either arrives.
 */
export const CheckboxIndicator = forwardRef<View, CheckboxIndicatorProps>(
  function CheckboxIndicator({ children, animation = true, style, ...props }, ref) {
    const { indicatorStyle, fillStyle, isSelected, isIndeterminate } = useCheckbox()
    const [styleProps, rest] = useStyleProps(props)

    // The third state fills the box like the second one and marks it differently — a dash
    // where the check has two strokes.
    const isFilled = isSelected || isIndeterminate
    const mark = children ?? (isIndeterminate ? <Dash /> : <Check />)

    return (
      <View ref={ref} {...rest} style={[indicatorStyle, styleProps, style]}>
        <SelectionFill isVisible={isFilled} style={fillStyle} animation={animation}>
          {mark}
        </SelectionFill>
      </View>
    )
  }
)

CheckboxIndicator.displayName = 'XAUI.Checkbox.Indicator'

/** The built-in tick. Its two strokes and its colour are the recipe's; the turn is not. */
function Check() {
  const { checkStyle } = useCheckbox()

  return <View style={checkStyle} />
}

/** The third state's mark: the check's long stroke, on its own and level. */
function Dash() {
  const { dashStyle } = useCheckbox()

  return <View style={dashStyle} />
}
