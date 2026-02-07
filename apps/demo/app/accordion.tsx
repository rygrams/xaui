import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Accordion, AccordionItem } from '@xaui/native/accordion'

export default function AccordionScreen() {
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
        <Accordion variant="light" defaultExpandedKeys={['intro']}>
          <AccordionItem itemKey="intro" title="What is XAUI?">
            <Text style={{ color: colors.foreground }}>
              XAUI is a cross-platform UI kit for React Native and hybrid apps.
            </Text>
          </AccordionItem>
          <AccordionItem itemKey="theme" title="Theming">
            <Text style={{ color: colors.foreground }}>
              Components use the provider theme and support custom appearance overrides.
            </Text>
          </AccordionItem>
          <AccordionItem itemKey="perf" title="Performance">
            <Text style={{ color: colors.foreground }}>
              Animations can be disabled and most components are optimized for common mobile usage.
            </Text>
          </AccordionItem>
        </Accordion>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Multiple Mode
        </Text>
        <Accordion
          variant="bordered"
          selectionMode="multiple"
          showDivider
          defaultExpandedKeys={['a', 'c']}
        >
          <AccordionItem itemKey="a" title="Account">
            <Text style={{ color: colors.foreground }}>
              Manage profile, security, and connected devices.
            </Text>
          </AccordionItem>
          <AccordionItem itemKey="b" title="Notifications">
            <Text style={{ color: colors.foreground }}>
              Configure push, email, and in-app notification preferences.
            </Text>
          </AccordionItem>
          <AccordionItem itemKey="c" title="Privacy">
            <Text style={{ color: colors.foreground }}>
              Control visibility and data-sharing options.
            </Text>
          </AccordionItem>
        </Accordion>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Compact + Disabled
        </Text>
        <Accordion
          variant="splitted"
          isCompact
          disabledKeys={['disabled']}
          defaultExpandedKeys={['enabled']}
        >
          <AccordionItem
            itemKey="enabled"
            title="Enabled Item"
            subtitle="Tap to expand/collapse"
          >
            <Text style={{ color: colors.foreground }}>
              Compact mode reduces spacing while keeping content readable.
            </Text>
          </AccordionItem>
          <AccordionItem
            itemKey="disabled"
            title="Disabled Item"
            subtitle="Interaction blocked"
          >
            <Text style={{ color: colors.foreground }}>
              This content should not open because the item is disabled.
            </Text>
          </AccordionItem>
        </Accordion>
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
