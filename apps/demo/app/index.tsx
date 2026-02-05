import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, ScrollView } from 'react-native'
import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'
import { Select, SelectItem } from '@xaui/native/select'

export default function HomeScreen() {
  const colors = useXUIColors()

  return (
    <ScrollView
      style={{
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
      }}
    >
      <Select
        label="Choose a framework"
        placeholder="Select framework"
        size="md"
        style={{ marginBottom: 24 }}
      >
        <SelectItem value="react" label="React" />
        <SelectItem value="vue" label="Vue" />
        <SelectItem value="angular" label="Angular" />
        <SelectItem value="svelte" label="Svelte" />
        <SelectItem value="solid" label="Solid" />
        <SelectItem value="astro" label="Astro" />
        <SelectItem value="nextjs" label="Next.js" />
      </Select>
      <Autocomplete
        label="Search Framework"
        placeholder="Type to search..."
        variant="outlined"
        themeColor="primary"
        isClearable
        fullWidth
        size="md"
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
        <AutocompleteItem
          value="Astro"
          label="Astro"
          description="Static site generator"
        />
        <AutocompleteItem value="Next.js" label="Next.js" description="React framework" />
      </Autocomplete>
    </ScrollView>
  )
}
