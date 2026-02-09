import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { ExpansionPanel, ExpansionPanelItem } from '@xaui/native/expansion-panel'

export default function ExpansionPanelScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Toggle Mode
        </Text>
        <ExpansionPanel variant="light" defaultExpandedKeys={['intro']}>
          <ExpansionPanelItem itemKey="intro" title="What is XAUI?">
            <Text style={{ color: colors.foreground }}>
              XAUI is a cross-platform UI kit for React Native and hybrid apps.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem itemKey="theme" title="Theming">
            <Text style={{ color: colors.foreground }}>
              Components use the provider theme and support custom appearance
              overrides.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem itemKey="perf" title="Performance">
            <Text style={{ color: colors.foreground }}>
              Animations can be disabled and most components are optimized for common
              mobile usage.
            </Text>
          </ExpansionPanelItem>
        </ExpansionPanel>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Multiple Mode
        </Text>
        <ExpansionPanel
          variant="bordered"
          selectionMode="multiple"
          showDivider
          defaultExpandedKeys={['a', 'c']}
        >
          <ExpansionPanelItem itemKey="a" title="Account">
            <Text style={{ color: colors.foreground }}>
              Manage profile, security, and connected devices.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem itemKey="b" title="Notifications">
            <Text style={{ color: colors.foreground }}>
              Configure push, email, and in-app notification preferences.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem itemKey="c" title="Privacy">
            <Text style={{ color: colors.foreground }}>
              Control visibility and data-sharing options.
            </Text>
          </ExpansionPanelItem>
        </ExpansionPanel>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Compact + Disabled
        </Text>
        <ExpansionPanel
          variant="splitted"
          isCompact
          disabledKeys={['disabled']}
          defaultExpandedKeys={['enabled']}
        >
          <ExpansionPanelItem
            itemKey="enabled"
            title="Enabled Item"
            subtitle="Tap to expand/collapse"
          >
            <Text style={{ color: colors.foreground }}>
              Compact mode reduces spacing while keeping content readable.
            </Text>
          </ExpansionPanelItem>
          <ExpansionPanelItem
            itemKey="disabled"
            title="Disabled Item"
            subtitle="Interaction blocked"
          >
            <Text style={{ color: colors.foreground }}>
              This content should not open because the item is disabled.
            </Text>
          </ExpansionPanelItem>
        </ExpansionPanel>
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
