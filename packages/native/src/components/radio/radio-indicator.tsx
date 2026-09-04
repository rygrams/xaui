import { forwardRef } from 'react'
import { View } from 'react-native'
import { SelectionFill } from '../../system/selection-fill'
import { useStyleProps } from '../../system/style-props'
import { useRadio } from './radio.context'
import type { RadioIndicatorProps } from './radio.type'

/**
 * The circle, and the dot inside it.
 *
 * ```tsx
 * <Radio.Indicator />
 *
 * <Radio.Indicator>
 *   <Icon as={CheckIcon} size={12} color={theme.colors.accentForeground} />
 * </Radio.Indicator>
 * ```
 *
 * With no children it draws its own dot — a smaller circle in the fill's contrast colour —
 * so a radio needs no icon set, and children replace it.
 *
 * The fill and its motion are `SelectionFill`'s, shared with the `Checkbox`: the two
 * controls differ in their mark and their shape, not in how either arrives.
 */
export const RadioIndicator = forwardRef<View, RadioIndicatorProps>(
  function RadioIndicator({ children, animation = true, style, ...props }, ref) {
    const { indicatorStyle, fillStyle, isSelected } = useRadio()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[indicatorStyle, styleProps, style]}>
        <SelectionFill
          isVisible={isSelected}
          style={fillStyle}
          animation={animation}
        >
          {children ?? <Thumb />}
        </SelectionFill>
      </View>
    )
  }
)

RadioIndicator.displayName = 'XAUI.Radio.Indicator'

/** The built-in dot. Its diameter and its colour are the recipe's. */
function Thumb() {
  const { thumbStyle } = useRadio()

  return <View style={thumbStyle} />
}
