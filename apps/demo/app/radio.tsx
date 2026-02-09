import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Radio, RadioGroup } from '@xaui/native/radio'

const themeColors = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
  'default',
] as const

export default function RadioScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [plan, setPlan] = useState('pro')
  const [frequency, setFrequency] = useState('monthly')
  const [lightChoice, setLightChoice] = useState('read')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Controlled Group</Text>
        <RadioGroup value={plan} onValueChange={setPlan} themeColor="primary">
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
          <Radio value="enterprise" label="Enterprise" />
        </RadioGroup>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Horizontal Group</Text>
        <RadioGroup
          value={frequency}
          onValueChange={setFrequency}
          orientation="horizontal"
          variant="light"
          themeColor="secondary"
        >
          <Radio value="weekly" label="Weekly" />
          <Radio value="monthly" label="Monthly" />
          <Radio value="yearly" label="Yearly" />
        </RadioGroup>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Light Variant</Text>
        <RadioGroup
          value={lightChoice}
          onValueChange={setLightChoice}
          variant="light"
          themeColor="tertiary"
        >
          <Radio value="read" label="Read" />
          <Radio value="write" label="Write" />
          <Radio value="admin" label="Admin" />
        </RadioGroup>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Standalone</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Radio label="Uncontrolled" defaultChecked />
          <Radio label="Disabled" isDisabled />
          <Radio label="Disabled Checked" isChecked isDisabled />
          <Radio label="Radius none" radius="none" isChecked />
          <Radio label="Justify left" labelAlignment="justify-left" fullWidth isChecked />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Theme Colors</Text>
        <View style={{ gap: theme.spacing.md }}>
          {themeColors.map(themeColor => (
            <Radio
              key={themeColor}
              label={themeColor}
              isChecked
              themeColor={themeColor}
              variant="filled"
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Sizes</Text>
        <View style={{ gap: theme.spacing.md }}>
          <Radio label="Extra Small" size="xs" isChecked />
          <Radio label="Small" size="sm" isChecked />
          <Radio label="Medium" size="md" isChecked />
          <Radio label="Large" size="lg" isChecked />
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
