import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'

export default function AutocompleteScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [searchValue, setSearchValue] = useState('Re')
  const [selectedCity, setSelectedCity] = useState<string | null>('paris')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic
        </Text>
        <Autocomplete label="Framework" placeholder="Search framework..." fullWidth>
          <AutocompleteItem value="react-native" label="React Native" />
          <AutocompleteItem value="expo" label="Expo" />
          <AutocompleteItem value="nextjs" label="Next.js" />
          <AutocompleteItem value="flutter" label="Flutter" />
        </Autocomplete>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Controlled Input
        </Text>
        <Autocomplete
          label="Search city"
          placeholder="Type a city..."
          inputValue={searchValue}
          onInputChange={setSearchValue}
          onSelectionChange={setSelectedCity}
          themeColor="secondary"
          fullWidth
          description={`Input: "${searchValue}" | Selected: ${selectedCity ?? 'none'}`}
        >
          <AutocompleteItem value="paris" label="Paris" />
          <AutocompleteItem value="london" label="London" />
          <AutocompleteItem value="tokyo" label="Tokyo" />
          <AutocompleteItem value="montreal" label="Montreal" />
          <AutocompleteItem value="dakar" label="Dakar" />
        </Autocomplete>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Force Selection
        </Text>
        <Autocomplete
          label="Package manager"
          placeholder="Must match an option"
          forceSelection
          allowsCustomValue={false}
          themeColor="primary"
          fullWidth
        >
          <AutocompleteItem value="pnpm" label="pnpm" />
          <AutocompleteItem value="npm" label="npm" />
          <AutocompleteItem value="yarn" label="yarn" />
          <AutocompleteItem value="bun" label="bun" />
        </Autocomplete>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Autocomplete
            label="Disabled"
            defaultInputValue="React Native"
            isDisabled
            fullWidth
          >
            <AutocompleteItem value="react-native" label="React Native" />
            <AutocompleteItem value="expo" label="Expo" />
          </Autocomplete>
          <Autocomplete
            label="Invalid"
            isInvalid
            errorMessage="Please select a valid option"
            fullWidth
          >
            <AutocompleteItem value="alpha" label="Alpha" />
            <AutocompleteItem value="beta" label="Beta" />
          </Autocomplete>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
})
