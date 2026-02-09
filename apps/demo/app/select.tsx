import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Select, SelectItem } from '@xaui/native/select'

const variants = ['outlined', 'flat', 'light', 'faded', 'underlined'] as const

export default function SelectScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [framework, setFramework] = useState<string[]>(['react-native'])
  const [features, setFeatures] = useState<string[]>(['animation'])

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Controlled Single
        </Text>
        <Select
          label="Framework"
          placeholder="Select a framework"
          selectedKeys={framework}
          onSelectionChange={setFramework}
          themeColor="primary"
          hint={`Current: ${framework[0] ?? 'None'}`}
          fullWidth
        >
          <SelectItem value="react-native" label="React Native" />
          <SelectItem value="expo" label="Expo" />
          <SelectItem value="flutter" label="Flutter" />
          <SelectItem value="native-ios" label="Native iOS" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Multiple Selection
        </Text>
        <Select
          label="Feature set"
          selectionMode="multiple"
          selectedKeys={features}
          onSelectionChange={setFeatures}
          placeholder="Choose multiple options"
          themeColor="secondary"
          fullWidth
          hint={`Selected: ${features.join(', ') || 'None'}`}
        >
          <SelectItem value="animation" label="Animations" />
          <SelectItem value="theme" label="Theming" />
          <SelectItem value="a11y" label="Accessibility" />
          <SelectItem value="testing" label="Testing" />
        </Select>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {variants.map(variant => (
            <Select
              key={variant}
              label={`Variant: ${variant}`}
              variant={variant}
              placeholder="Pick one option"
              fullWidth
            >
              <SelectItem value="one" label="Option one" />
              <SelectItem value="two" label="Option two" />
              <SelectItem value="three" label="Option three" />
            </Select>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Select
            label="Disabled"
            defaultSelectedKeys={['locked']}
            isDisabled
            fullWidth
          >
            <SelectItem value="locked" label="Locked value" />
            <SelectItem value="open" label="Open value" />
          </Select>
          <Select
            label="Invalid"
            isInvalid
            errorMessage="Please choose a valid plan"
            fullWidth
          >
            <SelectItem value="starter" label="Starter" />
            <SelectItem value="pro" label="Pro" />
          </Select>
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
