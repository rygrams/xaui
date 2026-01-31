import { useXUIColors } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'

export default function TestAutocomplete() {
  const colors = useXUIColors()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>Test Autocomplete</Text>

      <Autocomplete
        label="Test"
        placeholder="Type here..."
        variant="outlined"
        fullWidth
        onSelectionChange={key => {
          console.log('Selected:', key)
        }}
        onInputChange={value => {
          console.log('Input changed:', value)
        }}
      >
        <AutocompleteItem value="1" label="Option 1" />
        <AutocompleteItem value="2" label="Option 2" />
        <AutocompleteItem value="3" label="Option 3" />
      </Autocomplete>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
})
