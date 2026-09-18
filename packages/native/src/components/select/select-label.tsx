import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSelect } from './select.context'
import type { SelectLabelProps } from './select.type'

/**
 * What the field is for — the `TextField.Label`, on a field that opens a list.
 *
 * It turns `danger` with `isInvalid`, so the field that is wrong is findable on a long
 * form without reading every message. Its colour is the theme's `foreground` rather than
 * the variant's: the label sits outside the box, on the screen behind it, so a tinted
 * trigger does not tint it.
 *
 * It carries the id the trigger points at, which is what makes a screen reader announce
 * "Langue, bouton" instead of reading the placeholder and hoping.
 *
 * The heading over a run of rows *inside* the panel is `Select.GroupLabel`.
 */
export const SelectLabel = forwardRef<Text, SelectLabelProps>(function SelectLabel(
  { children, style, nativeID, ...props },
  ref
) {
  const { labelStyle, labelId } = useSelect()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      nativeID={nativeID ?? labelId}
      style={[labelStyle, styleProps, style]}
      {...rest}
    >
      {children}
    </Text>
  )
})

SelectLabel.displayName = 'XAUI.Select.Label'
