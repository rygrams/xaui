import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { FileInputTrigger } from '@xaui/native/input-trigger'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function FileInputTriggerScreen() {
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
        <FileInputTrigger label="Colored" variant="colored" onPress={() => {}} />
        <FileInputTrigger label="Light" variant="light" onPress={() => {}} />
        <FileInputTrigger label="Bordered" variant="bordered" onPress={() => {}} />
        <FileInputTrigger
          label="Underlined"
          variant="underlined"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With value
        </Text>
        <FileInputTrigger
          label="Invoice"
          value="invoice-2026-02.pdf"
          description="Tap to replace file"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <FileInputTrigger label="Disabled" isDisabled onPress={() => {}} />
        <FileInputTrigger
          label="Invalid"
          isInvalid
          errorMessage="At least one file is required"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Radius & Selected
        </Text>
        <FileInputTrigger label="Squared" radius="none" onPress={() => {}} />
        <FileInputTrigger label="Circular" radius="full" onPress={() => {}} />
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
