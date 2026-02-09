import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Switch } from '@xaui/native/switch'

export default function SwitchScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [isWifiEnabled, setIsWifiEnabled] = useState(true)
  const [isSyncEnabled, setIsSyncEnabled] = useState(false)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Controlled
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Switch
            label={isWifiEnabled ? 'Wi-Fi Enabled' : 'Wi-Fi Disabled'}
            isSelected={isWifiEnabled}
            onValueChange={setIsWifiEnabled}
            themeColor="success"
          />
          <Switch
            label={isSyncEnabled ? 'Auto Sync On' : 'Auto Sync Off'}
            isSelected={isSyncEnabled}
            onValueChange={setIsSyncEnabled}
            themeColor="secondary"
            variant="overlap"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Internal State (Uncontrolled)
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Switch label="Internal Switch A" />
          <Switch label="Internal Switch B (Overlap)" variant="overlap" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Switch label="Inside" variant="inside" />
          <Switch label="Overlap" variant="overlap" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Switch label="Small" size="sm" />
          <Switch label="Medium" size="md" />
          <Switch label="Large" size="lg" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Switch label="Primary" themeColor="primary" />
          <Switch label="Secondary" themeColor="secondary" />
          <Switch label="Success" themeColor="success" />
          <Switch label="Warning" themeColor="warning" />
          <Switch label="Danger" themeColor="danger" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Label & States
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Switch
            label="Justify Right"
            fullWidth
            labelAlignment="justify-right"
            isSelected
          />
          <Switch
            label="Justify Left"
            fullWidth
            labelAlignment="justify-left"
            isSelected
          />
          <Switch label="Radius None" radius="none" isSelected />
          <Switch label="Radius Medium" radius="md" isSelected />
          <Switch label="Disabled Off" isDisabled />
          <Switch label="Disabled On" isDisabled isSelected />
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
