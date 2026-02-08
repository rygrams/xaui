import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Checkbox } from '@xaui/native/checkbox'

export default function CheckboxScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [isEmailEnabled, setIsEmailEnabled] = useState(true)
  const [isPushEnabled, setIsPushEnabled] = useState(false)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Controlled</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Checkbox
            label={isEmailEnabled ? 'Email Notifications On' : 'Email Notifications Off'}
            isChecked={isEmailEnabled}
            onValueChange={setIsEmailEnabled}
            themeColor="primary"
          />
          <Checkbox
            label={isPushEnabled ? 'Push Notifications On' : 'Push Notifications Off'}
            isChecked={isPushEnabled}
            onValueChange={setIsPushEnabled}
            themeColor="secondary"
            variant="light"
          />
          <Checkbox label="Partially Selected" isIndeterminate themeColor="warning" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Internal State (Uncontrolled)</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Checkbox label="Newsletter" />
          <Checkbox label="Product Updates" variant="light" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Variants</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Checkbox label="Filled" variant="filled" isChecked />
          <Checkbox label="Light" variant="light" isChecked />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Sizes</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Checkbox label="Extra Small" size="xs" isChecked />
          <Checkbox label="Small" size="sm" isChecked />
          <Checkbox label="Medium" size="md" isChecked />
          <Checkbox label="Large" size="lg" isChecked />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Theme Colors</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Checkbox label="Primary" themeColor="primary" isChecked />
          <Checkbox label="Secondary" themeColor="secondary" isChecked />
          <Checkbox label="Success" themeColor="success" isChecked />
          <Checkbox label="Warning" themeColor="warning" isChecked />
          <Checkbox label="Danger" themeColor="danger" isChecked />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Layout & States</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Checkbox label="Justify Left" labelAlignment="justify-left" fullWidth isChecked />
          <Checkbox label="Justify Right" labelAlignment="justify-right" fullWidth isChecked />
          <Checkbox label="Radius None" radius="none" isChecked />
          <Checkbox label="Radius Full" radius="full" isChecked />
          <Checkbox label="Disabled Off" isDisabled />
          <Checkbox label="Disabled On" isDisabled isChecked />
        </View>
      </View>

      <View style={{ height: 40 }} />
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
