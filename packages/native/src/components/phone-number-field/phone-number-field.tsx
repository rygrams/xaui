import { forwardRef, useCallback, useMemo, useState } from 'react'
import type { View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import {
  phoneCountries,
  readPhoneNumber,
  editPhoneNumber,
} from '../../utils/phone-number'
import { BottomSheetRoot } from '../bottom-sheet'
import { TextFieldRoot } from '../text-field'
import { PhoneNumberFieldProvider } from './phone-number-field.context'
import type { PhoneCountry, PhoneNumberFieldProps } from './phone-number-field.type'

export const PhoneNumberFieldRoot = forwardRef<View, PhoneNumberFieldProps>(
  function PhoneNumberField(
    {
      value: controlled,
      defaultValue,
      onValueChange,
      locale = 'en',
      countries: countryCodes,
      children,
      isDisabled = false,
      ...props
    },
    ref
  ) {
    const [value, setValue] = useControllableState({
      value: controlled,
      defaultValue: defaultValue ?? {
        country: countryCodes?.[0] ?? 'US',
        nationalNumber: '',
      },
      onChange: onValueChange,
    })
    const [isOpen, setOpenState] = useState(false)
    const [query, setQuery] = useState('')
    const countries = useMemo(
      () => phoneCountries(locale, countryCodes),
      [locale, countryCodes]
    )
    const country = countries.find(item => item.code === value.country)
    if (!country)
      throw new Error(
        'PhoneNumberField: the selected country must belong to countries.'
      )
    const phoneNumber = readPhoneNumber(value)

    const setOpen = useCallback(
      (open: boolean) => {
        if (isDisabled && open) return
        setOpenState(open)
        if (!open) setQuery('')
      },
      [isDisabled]
    )
    const setNumber = useCallback(
      (text: string) => {
        if (!isDisabled) setValue(editPhoneNumber(text, value, countryCodes))
      },
      [isDisabled, setValue, value, countryCodes]
    )
    const selectCountry = useCallback(
      (code: PhoneCountry) => {
        if (isDisabled) return
        setValue({ country: code, nationalNumber: value.nationalNumber })
        setOpen(false)
      },
      [isDisabled, setValue, setOpen, value.nationalNumber]
    )
    const formatNumber = useCallback(() => {
      if (phoneNumber)
        setValue({ ...value, nationalNumber: phoneNumber.formatNational() })
    }, [phoneNumber, setValue, value])
    const context = useMemo(
      () => ({
        value,
        country,
        countries,
        phoneNumber: phoneNumber?.number ?? null,
        setNumber,
        selectCountry,
        formatNumber,
        query,
        setQuery,
        isOpen: isOpen && !isDisabled,
        setOpen,
      }),
      [
        value,
        country,
        countries,
        phoneNumber,
        setNumber,
        selectCountry,
        formatNumber,
        query,
        isOpen,
        isDisabled,
        setOpen,
      ]
    )

    return (
      <PhoneNumberFieldProvider value={context}>
        <BottomSheetRoot
          isOpen={context.isOpen}
          onOpenChange={setOpen}
          isDisabled={isDisabled}
        >
          <TextFieldRoot
            ref={ref}
            variant="primary"
            isDisabled={isDisabled}
            {...props}
          >
            {children}
          </TextFieldRoot>
        </BottomSheetRoot>
      </PhoneNumberFieldProvider>
    )
  }
)
PhoneNumberFieldRoot.displayName = 'XAUI.PhoneNumberField.Root'
