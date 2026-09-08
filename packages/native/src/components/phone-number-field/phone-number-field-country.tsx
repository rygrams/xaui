import { forwardRef } from 'react'
import { Text } from 'react-native'
import type { View } from 'react-native'
import { BottomSheetTrigger } from '../bottom-sheet'
import { useTextField } from '../text-field'
import { usePhoneNumberField } from './phone-number-field.context'
import type { PhoneNumberFieldCountryProps } from './phone-number-field.type'

/** Place inside FieldGroup.Prefix so its measured width leaves room for the number. */
export const PhoneNumberFieldCountry = forwardRef<
  View,
  PhoneNumberFieldCountryProps
>(function PhoneNumberFieldCountry({ children, asChild, ...props }, ref) {
  const { country } = usePhoneNumberField()
  const { labelStyle } = useTextField()
  return (
    <BottomSheetTrigger
      ref={ref}
      asChild={asChild}
      accessibilityLabel={country.name}
      accessibilityValue={{ text: `${country.name}, +${country.callingCode}` }}
      {...props}
    >
      {children ?? (
        <Text style={labelStyle}>
          {country.flag} +{country.callingCode}
        </Text>
      )}
    </BottomSheetTrigger>
  )
})
PhoneNumberFieldCountry.displayName = 'XAUI.PhoneNumberField.Country'
