import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Picker } from '@xaui/native/picker'

const countries = [
  { label: 'France', value: 'fr' },
  { label: 'United States', value: 'us' },
  { label: 'Japan', value: 'jp' },
  { label: 'Brazil', value: 'br' },
  { label: 'Germany', value: 'de' },
  { label: 'Australia', value: 'au' },
]

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'Spanish', value: 'es' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Portuguese', value: 'pt' },
]

const sizes = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
]

export default function PickerScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [country, setCountry] = useState('')
  const [language, setLanguage] = useState('')
  const [size, setSize] = useState('')
  const [plan, setPlan] = useState('')
  const [variant, setVariant] = useState('')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic
        </Text>
        <Picker
          label="Country"
          placeholder="Select a country..."
          options={countries}
          value={country}
          onValueChange={setCountry}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With sheet title
        </Text>
        <Picker
          label="Language"
          placeholder="Select a language..."
          sheetTitle="Choose your language"
          options={languages}
          value={language}
          onValueChange={setLanguage}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <Picker
          label="Bordered"
          placeholder="Select a size..."
          variant="bordered"
          options={sizes}
          value={size}
          onValueChange={setSize}
        />
        <Picker
          label="Faded"
          placeholder="Select a plan..."
          variant="faded"
          themeColor="secondary"
          options={[
            { label: 'Free', value: 'free' },
            { label: 'Pro', value: 'pro' },
            { label: 'Enterprise', value: 'enterprise' },
          ]}
          value={plan}
          onValueChange={setPlan}
        />
        <Picker
          label="Underlined"
          placeholder="Select a variant..."
          variant="underlined"
          options={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c' },
          ]}
          value={variant}
          onValueChange={setVariant}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <Picker
          label="Disabled"
          placeholder="Select a country..."
          options={countries}
          isDisabled
          value=""
          onValueChange={() => {}}
        />
        <Picker
          label="Invalid"
          placeholder="Select a country..."
          options={countries}
          isInvalid
          errorMessage="Please select a country"
          value=""
          onValueChange={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With disabled options
        </Text>
        <Picker
          label="Plan"
          placeholder="Select a plan..."
          options={[
            { label: 'Free', value: 'free' },
            { label: 'Pro', value: 'pro' },
            { label: 'Enterprise (contact us)', value: 'enterprise', disabled: true },
          ]}
          value={plan}
          onValueChange={setPlan}
          themeColor="success"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
})
