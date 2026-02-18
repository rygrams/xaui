import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { InputTrigger } from '@xaui/native/input-trigger'

export default function InputTriggerScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <InputTrigger
          label="Flat (default)"
          placeholder="Pick a value..."
          variant="flat"
          onPress={() => {}}
        />
        <InputTrigger
          label="Bordered"
          placeholder="Pick a value..."
          variant="bordered"
          onPress={() => {}}
        />
        <InputTrigger
          label="Faded"
          placeholder="Pick a value..."
          variant="faded"
          onPress={() => {}}
        />
        <InputTrigger
          label="Underlined"
          placeholder="Pick a value..."
          variant="underlined"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With value
        </Text>
        <InputTrigger
          label="Country"
          value="France"
          variant="flat"
          onPress={() => {}}
        />
        <InputTrigger
          label="Language"
          value="English"
          variant="bordered"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <InputTrigger
          label="Small"
          placeholder="Small trigger"
          size="sm"
          onPress={() => {}}
        />
        <InputTrigger
          label="Medium (default)"
          placeholder="Medium trigger"
          size="md"
          onPress={() => {}}
        />
        <InputTrigger
          label="Large"
          placeholder="Large trigger"
          size="lg"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <InputTrigger
          label="Disabled"
          placeholder="Disabled trigger"
          isDisabled
          onPress={() => {}}
        />
        <InputTrigger
          label="Invalid"
          placeholder="Invalid trigger"
          isInvalid
          errorMessage="This field is required"
          onPress={() => {}}
        />
        <InputTrigger
          label="With description"
          placeholder="Pick a value..."
          description="This is a helper text below the trigger"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Label placement inside
        </Text>
        <InputTrigger
          label="Category"
          value="Technology"
          labelPlacement="inside"
          onPress={() => {}}
        />
        <InputTrigger
          label="Category"
          placeholder="Pick a category..."
          labelPlacement="inside"
          onPress={() => {}}
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
