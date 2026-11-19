import { forwardRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle, View } from 'react-native'
import { useControllableState } from '@xaui/native'
import {
  editPhoneNumber,
  phoneCountries,
  readPhoneNumber,
} from '@xaui/native/phone-number-field'
import { useXAUITheme } from '@xaui/native/theme'
import { colorOf } from '../../system/style-values'
import { useTramHaptic } from '../../theme/tram-haptics'
import { tramType } from '../../theme/tram-tokens'
import { BottomSheetRoot } from '../bottom-sheet'
import { TextFieldRoot } from '../text-field'
import { PhoneNumberFieldProvider } from './phone-number-field.context'
import { phoneNumberFieldRecipe } from './phone-number-field.recipe'
import type { PhoneCountry, PhoneNumberFieldProps } from './phone-number-field.type'

/**
 * A national number beside its country, with a searchable list of countries — the Native
 * `PhoneNumberField`'s API, drawn in Metro: the country is a key at the start of the
 * `TextField`'s box, its ISO code and its calling code, ruled off from the number; the list
 * is the Tram `BottomSheet`, a band in the theme's contrast.
 *
 * ```tsx
 * <PhoneNumberField locale="fr" defaultValue={{ country: 'FR', nationalNumber: '' }}>
 *   <PhoneNumberField.Label>téléphone</PhoneNumberField.Label>
 *   <FieldGroup>
 *     <FieldGroup.Prefix>
 *       <PhoneNumberField.Country accessibilityLabel="choisir le pays" />
 *     </FieldGroup.Prefix>
 *     <PhoneNumberField.Field placeholder="06 12 34 56 78" />
 *   </FieldGroup>
 *   <PhoneNumberField.Overlay />
 *   <PhoneNumberField.Content>
 *     <PhoneNumberField.Title>choisir un pays</PhoneNumberField.Title>
 *     <PhoneNumberField.Close accessibilityLabel="fermer" />
 *     <PhoneNumberField.Search accessibilityLabel="chercher un pays" placeholder="pays ou +indicatif" />
 *     <PhoneNumberField.CountryList />
 *   </PhoneNumberField.Content>
 * </PhoneNumberField>
 * ```
 *
 * **It is a `TextField`**, as on Native: the root below is the Tram `TextField`'s, and
 * `Label`, `Description` and `Error` are its slots. The value, the pasting of an
 * international number, the formatting on blur and the E.164 read are Native's — the same
 * helpers, from `@xaui/native/phone-number-field`, over the optional `libphonenumber-js`.
 *
 * **No `Handle`**: the Tram `BottomSheet` has none — the band is as tall as its content and
 * goes by its cross or a drag. Choosing a country is felt as a selection.
 */
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
    const theme = useXAUITheme()
    const haptic = useTramHaptic()
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
    if (!country) {
      throw new Error(
        'XAUI: Tram PhoneNumberField — the selected country must belong to `countries`.'
      )
    }
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
        haptic('selection')
        setValue({ country: code, nationalNumber: value.nationalNumber })
        setOpen(false)
      },
      [isDisabled, haptic, setValue, setOpen, value.nationalNumber]
    )
    const formatNumber = useCallback(() => {
      if (phoneNumber)
        setValue({ ...value, nationalNumber: phoneNumber.formatNational() })
    }, [phoneNumber, setValue, value])

    const styles = phoneNumberFieldRecipe.resolve({
      theme,
      states: { disabled: isDisabled },
    })
    const chevronColor =
      colorOf(StyleSheet.flatten<TextStyle>(styles.chevron), 'color') ??
      theme.colors.foreground

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
        countryStyle: styles.country,
        isoStyle: styles.iso,
        callingStyle: styles.calling,
        // The ISO code's size: the chevron is a mark beside it, not a control of its own.
        chevron: { size: tramType.caption.fontSize, color: chevronColor },
        isDisabled,
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
        styles,
        chevronColor,
      ]
    )

    return (
      <PhoneNumberFieldProvider value={context}>
        <BottomSheetRoot
          isOpen={context.isOpen}
          onOpenChange={setOpen}
          isDisabled={isDisabled}
        >
          <TextFieldRoot ref={ref} isDisabled={isDisabled} {...props}>
            {children}
          </TextFieldRoot>
        </BottomSheetRoot>
      </PhoneNumberFieldProvider>
    )
  }
)

PhoneNumberFieldRoot.displayName = 'XAUI.Tram.PhoneNumberField.Root'
