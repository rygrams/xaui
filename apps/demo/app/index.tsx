import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'
import { Button } from '@react-navigation/elements'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[
        styles.scrollView,
        {
          backgroundColor: colors.background,
        },
      ]}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="none"
      nestedScrollEnabled
      contentContainerStyle={[
        styles.container,
        {
          gap: theme.spacing.lg,
        },
      ]}
    >
      <Autocomplete
        label="Search Framework"
        placeholder="Type to search..."
        variant="outlined"
        themeColor="primary"
        fullWidth
        labelPlacement="outside-top"
        onSelectionChange={key => console.log('Selected:', key)}
        onInputChange={value => console.log('Input:', value)}
      >
        <AutocompleteItem value="react" label="React" description="JavaScript library" />
        <AutocompleteItem value="vue" label="Vue" description="Progressive framework" />
        <AutocompleteItem
          value="angular"
          label="Angular"
          description="Platform framework"
        />
        <AutocompleteItem
          value="svelte"
          label="Svelte"
          description="Compiler framework"
        />
        <AutocompleteItem value="solid" label="Solid" description="Reactive framework" />
      </Autocomplete>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 40,
  },
})
