import { forwardRef } from 'react'
import { View } from 'react-native'
import { ChevronDownIcon, Icon } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useDummyField } from './dummy-field.context'
import type { DummyFieldIndicatorProps } from './dummy-field.type'

/**
 * An indicator glyph on the trailing end of the field (such as a chevron).
 * Inherits size and color from the field's resolved icon/glyph context.
 */
export const DummyFieldIndicator = forwardRef<View, DummyFieldIndicatorProps>(
  function DummyFieldIndicator(
    { as = ChevronDownIcon, children, style, ...props },
    ref
  ) {
    const { indicatorStyle } = useDummyField()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} style={[indicatorStyle, styleProps, style]} {...rest}>
        {children ? <Icon>{children}</Icon> : <Icon as={as} />}
      </View>
    )
  }
)

DummyFieldIndicator.displayName = 'XAUI.DummyField.Indicator'
