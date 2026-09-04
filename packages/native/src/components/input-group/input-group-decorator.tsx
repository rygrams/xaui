import { forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useInput } from '../input'
import { useInputGroup } from './input-group.context'
import type { InputGroupPrefixProps, InputGroupSide } from './input-group.type'

type InputGroupDecoratorProps = InputGroupPrefixProps & {
  side: InputGroupSide
}

/**
 * What `InputGroup.Prefix` and `InputGroup.Suffix` both are. They differ by an edge and by
 * which width they report, and one component with a `side` says that better than two
 * copies of thirty lines that have to be kept identical by hand.
 *
 * It is not exported: a side is not a decision a caller should have to make twice, and
 * `<InputGroup.Prefix>` already reads as the leading edge.
 *
 * The measurement is the point of this node. The decorator is out of flow, so it cannot
 * push the text aside the way a sibling in a row would — it measures itself and the field
 * clears it by that width. A caller's own `onLayout` is composed, never replaced.
 */
export const InputGroupDecorator = forwardRef<View, InputGroupDecoratorProps>(
  function InputGroupDecorator(
    { side, children, isDecorative = false, onLayout, style, ...props },
    ref
  ) {
    const { prefixStyle, suffixStyle, isDisabled } = useInput()
    const { setPrefixWidth, setSuffixWidth } = useInputGroup()
    const [styleProps, rest] = useStyleProps(props)

    const report = side === 'prefix' ? setPrefixWidth : setSuffixWidth

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        report(event.nativeEvent.layout.width)
        onLayout?.(event)
      },
      [report, onLayout]
    )

    // A decorative decorator hands its touches to the field underneath, so tapping the
    // glyph focuses the field; a disabled group takes them from everything, including the
    // toggle a caller put in a suffix that is *not* decorative.
    const isInert = isDecorative || isDisabled

    return (
      <View
        ref={ref}
        // Hidden from the screen reader on both platforms, and only when decorative: a
        // mark that cannot be acted on is noise between the label and the field, while a
        // reveal toggle is a control and has to be reachable.
        accessibilityElementsHidden={isDecorative || undefined}
        importantForAccessibility={isDecorative ? 'no-hide-descendants' : undefined}
        pointerEvents={isInert ? 'none' : undefined}
        {...rest}
        style={[side === 'prefix' ? prefixStyle : suffixStyle, styleProps, style]}
        onLayout={handleLayout}
      >
        {children}
      </View>
    )
  }
)

InputGroupDecorator.displayName = 'XAUI.InputGroup.Decorator'
