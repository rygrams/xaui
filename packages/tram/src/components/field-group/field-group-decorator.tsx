import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTextField } from '../text-field'
import { useFieldGroup } from './field-group.context'
import type { FieldGroupPrefixProps, FieldGroupSide } from './field-group.type'

type FieldGroupDecoratorProps = FieldGroupPrefixProps & {
  side: FieldGroupSide
}

/**
 * What `FieldGroup.Prefix` and `FieldGroup.Suffix` both are: a cell at one end of the box.
 * They differ by an end, and one component with a `side` says that better than two copies.
 *
 * **A decorative cell** is a mark in the text's line: it stands off the box's end by the
 * field's padding, takes no touch — a tap on it focuses the field — and leaves the
 * accessibility tree. **A control cell** is a key: padded on both sides and ruled off from
 * the text, it keeps its touches and its place for a screen reader. A disabled group takes
 * the touches of both.
 */
export const FieldGroupDecorator = forwardRef<View, FieldGroupDecoratorProps>(
  function FieldGroupDecorator(
    { side, children, isDecorative = false, style, ...props },
    ref
  ) {
    const { isDisabled, fieldRef } = useTextField()
    const {
      decoratorStyle,
      ruleStyle,
      rulePrefixStyle,
      ruleSuffixStyle,
      cellInsets,
    } = useFieldGroup()
    const [styleProps, rest] = useStyleProps(props)

    // A decorative cell takes the touch itself, not its children, and hands the focus to the
    // field — as a mark laid over the input would let the touch through to it.
    const focusField = isDecorative && !isDisabled ? FOCUS : undefined
    const inset = cellInsets[side][isDecorative ? 'decorative' : 'control']

    return (
      <View
        ref={ref}
        // Hidden only when decorative: a mark that cannot be acted on is noise between the
        // label and the field, while a toggle is a control and has to be reachable.
        accessibilityElementsHidden={isDecorative || undefined}
        importantForAccessibility={isDecorative ? 'no-hide-descendants' : undefined}
        pointerEvents={isDisabled ? 'none' : isDecorative ? 'box-only' : undefined}
        onStartShouldSetResponder={focusField}
        onResponderRelease={focusField && (() => fieldRef.current?.focus())}
        {...rest}
        style={[decoratorStyle, inset, styleProps, style]}
      >
        {children}
        {isDecorative ? null : (
          <View
            pointerEvents="none"
            style={[
              ruleStyle,
              side === 'prefix' ? rulePrefixStyle : ruleSuffixStyle,
            ]}
          />
        )}
      </View>
    )
  }
)

const FOCUS = () => true

FieldGroupDecorator.displayName = 'XAUI.Tram.FieldGroup.Decorator'
