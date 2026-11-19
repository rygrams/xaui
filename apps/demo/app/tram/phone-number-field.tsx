import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { FieldGroup } from '@xaui/tram/field-group'
import { PhoneNumberField, usePhoneNumberField } from '@xaui/tram/phone-number-field'
import type { PhoneCountry, PhoneNumberValue } from '@xaui/tram/phone-number-field'
import type { TextFieldSize } from '@xaui/tram/text-field'
import { TramSection } from '../../components/tram-section'

const SIZES: TextFieldSize[] = ['sm', 'lg']

const WEST_AFRICA_AND_EUROPE: PhoneCountry[] = [
  'CI',
  'ML',
  'SN',
  'BF',
  'FR',
  'BE',
  'CH',
]

/** The box and the band, the same in every sample. */
function PhoneParts({ placeholder }: { placeholder?: string }) {
  return (
    <>
      <FieldGroup>
        <FieldGroup.Prefix>
          <PhoneNumberField.Country accessibilityLabel="choisir le pays" />
        </FieldGroup.Prefix>
        <PhoneNumberField.Field placeholder={placeholder} />
      </FieldGroup>
      <PhoneNumberField.Overlay />
      <PhoneNumberField.Content>
        <PhoneNumberField.Title>choisir un pays</PhoneNumberField.Title>
        <PhoneNumberField.Close accessibilityLabel="fermer" />
        <PhoneNumberField.Search
          accessibilityLabel="chercher un pays"
          placeholder="pays, code ou +indicatif"
        />
        <PhoneNumberField.CountryList />
      </PhoneNumberField.Content>
    </>
  )
}

/** What `usePhoneNumberField` reads: the E.164 number, once it is possible. */
function E164() {
  const { phoneNumber } = usePhoneNumberField()

  return (
    <PhoneNumberField.Description>
      {phoneNumber ? `E.164 : ${phoneNumber}` : 'on vous envoie un code par SMS.'}
    </PhoneNumberField.Description>
  )
}

/**
 * Where the Tram `PhoneNumberField` is verified, in dark and in light: the country as a key
 * at the start of the box — ISO code, calling code, chevron — the band of countries with
 * its search, a pasted international number that picks its country, the format on blur,
 * a restricted list, two sizes, invalid and disabled.
 */
export default function TramPhoneNumberFieldScreen() {
  const theme = useXAUITheme()
  const [phone, setPhone] = useState<PhoneNumberValue>({
    country: 'FR',
    nationalNumber: '',
  })

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <TramSection
        title="contrôlé"
        note={`Collez +225 07 07 07 07 07 : le pays suit. Le format arrive en quittant le champ. Valeur : ${phone.country} · « ${phone.nationalNumber} »`}
      >
        <PhoneNumberField locale="fr" value={phone} onValueChange={setPhone}>
          <PhoneNumberField.Label>téléphone</PhoneNumberField.Label>
          <PhoneParts placeholder="06 12 34 56 78" />
          <E164 />
        </PhoneNumberField>
      </TramSection>

      <TramSection
        title="pays restreints"
        note="Sept pays, la Côte d'Ivoire d'abord. La liste se cherche par nom, code ISO ou indicatif."
      >
        <PhoneNumberField locale="fr" countries={WEST_AFRICA_AND_EUROPE}>
          <PhoneNumberField.Label>numéro mobile</PhoneNumberField.Label>
          <PhoneParts />
        </PhoneNumberField>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm et lg : la boîte du TextField, 40 et 56."
      >
        {SIZES.map(size => (
          <PhoneNumberField
            key={size}
            size={size}
            locale="fr"
            defaultValue={{ country: 'SN', nationalNumber: '77 123 45 67' }}
          >
            <PhoneNumberField.Label>{size}</PhoneNumberField.Label>
            <PhoneParts />
          </PhoneNumberField>
        ))}
      </TramSection>

      <TramSection
        title="invalide et désactivé"
        note="Invalide : la boîte en danger. Désactivé : tout en gris, ni le pays ni le numéro ne se changent."
      >
        <PhoneNumberField
          locale="fr"
          isInvalid
          defaultValue={{ country: 'FR', nationalNumber: '06 12' }}
        >
          <PhoneNumberField.Label>téléphone</PhoneNumberField.Label>
          <PhoneParts />
          <PhoneNumberField.Error>ce numéro est trop court.</PhoneNumberField.Error>
        </PhoneNumberField>
        <PhoneNumberField
          locale="fr"
          isDisabled
          defaultValue={{ country: 'ML', nationalNumber: '76 12 34 56' }}
        >
          <PhoneNumberField.Label>téléphone</PhoneNumberField.Label>
          <PhoneParts />
        </PhoneNumberField>
      </TramSection>
    </ScrollView>
  )
}
