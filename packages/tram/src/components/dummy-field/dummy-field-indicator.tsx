import { forwardRef } from 'react'
import { View } from 'react-native'
import { ChevronDownIcon, Icon, useStyleProps } from '@xaui/native/system'
import type { DummyFieldIndicatorProps } from './dummy-field.type'

/**
 * The glyph at the end of the field — a chevron unless given `as` — in the field's ink, at
 * the `Select`'s sizes. It stands still: what the field opens is somewhere else.
 *
 * Left out, the row holds the value alone, which is how a Metro field reads.
 */
export const DummyFieldIndicator = forwardRef<View, DummyFieldIndicatorProps>(
  function DummyFieldIndicator(
    { as = ChevronDownIcon, size, color, children, style, ...props },
    ref
  ) {
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[styleProps, style]}>
        {children ? (
          <Icon size={size} color={color}>
            {children}
          </Icon>
        ) : (
          <Icon as={as} size={size} color={color} />
        )}
      </View>
    )
  }
)

DummyFieldIndicator.displayName = 'XAUI.Tram.DummyField.Indicator'
