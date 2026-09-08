import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { FieldGroup } from '@xaui/native/field-group'
import {
  PhoneNumberField,
  usePhoneNumberField,
} from '@xaui/native/phone-number-field'
import type {
  PhoneNumberFieldProps,
  PhoneNumberValue,
} from '@xaui/native/phone-number-field'
import { useXAUITheme } from '@xaui/native/theme'

export default function PhoneNumberFieldScreen() {
  const theme = useXAUITheme()
  const [value, setValue] = useState<PhoneNumberValue>({
    country: 'AD',
    nationalNumber: '',
  })
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, gap: 28, paddingBottom: 160 }}
      keyboardShouldPersistTaps="handled"
    >
      <PhoneDemo value={value} onValueChange={setValue} />
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button
          onPress={() => setValue({ country: 'CI', nationalNumber: '0707123456' })}
        >
          Côte d’Ivoire
        </Button>
        <Button
          variant="secondary"
          onPress={() => setValue({ ...value, nationalNumber: '' })}
        >
          Vider
        </Button>
      </View>
      <PhoneDemo
        variant="secondary"
        defaultValue={{ country: 'FR', nationalNumber: '0612345678' }}
      />
      <PhoneDemo
        isDisabled
        defaultValue={{ country: 'AD', nationalNumber: '123456' }}
      />
      <PhoneDemo isInvalid />
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <PhoneDemo key={size} size={size} />
      ))}
      <PhoneDemo countries={['AD', 'CI', 'FR', 'US']} locale="fr" />
    </ScrollView>
  )
}

function PhoneDemo(props: PhoneNumberFieldProps) {
  return (
    <PhoneNumberField
      defaultValue={{ country: 'AD', nationalNumber: '' }}
      {...props}
    >
      <PhoneNumberField.Label>Phone number</PhoneNumberField.Label>
      <FieldGroup>
        <FieldGroup.Prefix>
          <PhoneNumberField.Country accessibilityLabel="Choisir le pays" />
        </FieldGroup.Prefix>
        <PhoneNumberField.Field placeholder="000 000" />
      </FieldGroup>
      <PhoneNumberField.Description>
        We’ll send a verification code to this number
      </PhoneNumberField.Description>
      {props.isInvalid ? (
        <PhoneNumberField.Error>
          Vérifiez le numéro de téléphone.
        </PhoneNumberField.Error>
      ) : null}
      <NumberReadout />
      <PhoneNumberField.Overlay />
      <PhoneNumberField.Content height="65%" isSwipeable={false}>
        <PhoneNumberField.Handle />
        <PhoneNumberField.Title>Choisir le pays</PhoneNumberField.Title>
        <PhoneNumberField.Search
          accessibilityLabel="Rechercher un pays"
          placeholder="Search country…"
        />
        <PhoneNumberField.CountryList ListEmptyComponent={<Text>Aucun pays</Text>} />
        <PhoneNumberField.Close accessibilityLabel="Fermer la liste">
          <Text>Fermer</Text>
        </PhoneNumberField.Close>
      </PhoneNumberField.Content>
    </PhoneNumberField>
  )
}

function NumberReadout() {
  const { phoneNumber } = usePhoneNumberField()
  const theme = useXAUITheme()
  return (
    <Text style={{ color: theme.colors.muted }}>E.164 : {phoneNumber ?? '—'}</Text>
  )
}
