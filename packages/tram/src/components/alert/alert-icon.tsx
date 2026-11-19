import { forwardRef } from 'react'
import { View } from 'react-native'
import { Icon, useStyleProps } from '@xaui/native/system'
import { useAlert } from './alert.context'
import type { AlertIconProps } from './alert.type'

/**
 * The square at the start, with a glyph in it: filled with the colour the alert is about,
 * or drawn as the ink's line on an alert that is already that colour.
 */
export const AlertIcon = forwardRef<View, AlertIconProps>(function AlertIcon(
  { as, children, source, size, color, style, ...props },
  ref
) {
  const { iconStyle, icon } = useAlert()
  const [styleProps, rest] = useStyleProps(props)

  const glyphSize = size ?? icon.size
  const glyphColor = color ?? icon.color

  return (
    // The glyph repeats what the title says: a screen reader reads the title.
    <View
      ref={ref}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      {...rest}
      style={[iconStyle, styleProps, style]}
    >
      {/* One `<Icon>` per form: `as`, then children, then `source` — `Icon`'s order. */}
      {as ? (
        <Icon as={as} size={glyphSize} color={glyphColor} />
      ) : source ? (
        <Icon source={source} size={glyphSize} color={glyphColor} />
      ) : (
        <Icon size={glyphSize} color={glyphColor}>
          {children}
        </Icon>
      )}
    </View>
  )
})

AlertIcon.displayName = 'XAUI.Tram.Alert.Icon'
