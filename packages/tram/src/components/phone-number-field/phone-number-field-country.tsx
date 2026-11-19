import { forwardRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import type { TextStyle, View } from 'react-native'
import { usePressState } from '@xaui/native'
import { ChevronDownIcon, Icon } from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { touchReach } from '../../system/touch-reach'
import { BottomSheetTrigger } from '../bottom-sheet'
import { useOptionalFieldGroup } from '../field-group'
import { useTextField } from '../text-field'
import { splitFieldStyle } from '../search-field/search-field.utils'
import { usePhoneNumberField } from './phone-number-field.context'
import type { PhoneNumberFieldCountryProps } from './phone-number-field.type'

/**
 * The country, and the way to the list: its ISO code, its calling code in the field's own
 * type, and a small chevron — text, where Native draws a flag.
 *
 * ```tsx
 * <FieldGroup.Prefix>
 *   <PhoneNumberField.Country accessibilityLabel="choisir le pays" />
 * </FieldGroup.Prefix>
 * ```
 *
 * It is `BottomSheet.Trigger`, and goes in `FieldGroup.Prefix`: a control, so the group
 * rules it off from the number as a key. It fills its cell — the cell's padding is its own
 * — so the whole key is pressed, and it shrinks a little under the finger, as a key inside
 * a box does, without a tilt. Give it an `accessibilityLabel` in the app's language; the
 * country and its calling code are its value. Children replace the drawing.
 */
export const PhoneNumberFieldCountry = forwardRef<
  View,
  PhoneNumberFieldCountryProps
>(function PhoneNumberFieldCountry({ children, asChild, ...props }, ref) {
  const { country, countryStyle, isoStyle, callingStyle, chevron, isDisabled } =
    usePhoneNumberField()
  const { fieldStyle } = useTextField()
  const group = useOptionalFieldGroup()
  const [isPressed, press] = usePressState({})

  // The calling code is set in what the number is typed in: the field's type, not its box.
  const typed = splitFieldStyle(StyleSheet.flatten<TextStyle>(fieldStyle)).text
  const inset = group?.inset ?? 0
  // The key fills its cell: the cell's padding becomes the key's, so it is pressed too.
  const filling = group
    ? { marginHorizontal: -inset, paddingHorizontal: inset }
    : null

  return (
    <BottomSheetTrigger
      ref={ref}
      asChild
      // The row it draws carries no role of its own, where a `Button` handed to a
      // trigger would. Before `props`: a caller's own role wins.
      accessibilityRole="button"
      accessibilityLabel={country.name}
      accessibilityValue={{ text: `${country.name}, +${country.callingCode}` }}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <PressRow
          isPressed={isPressed}
          isDisabled={isDisabled}
          animation={false}
          // The box is under 48 at `sm` and `md`: the touch reaches past it.
          hitSlop={group ? touchReach(group.innerHeight) : undefined}
          style={[countryStyle, filling]}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {children ?? (
            <>
              <Text style={isoStyle}>{country.code}</Text>
              <Text style={[typed, callingStyle]}>+{country.callingCode}</Text>
              <Icon as={ChevronDownIcon} size={chevron.size} color={chevron.color} />
            </>
          )}
        </PressRow>
      )}
    </BottomSheetTrigger>
  )
})

PhoneNumberFieldCountry.displayName = 'XAUI.Tram.PhoneNumberField.Country'
