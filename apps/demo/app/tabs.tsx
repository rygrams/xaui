import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Tabs, type TabsItem } from '@xaui/native/tabs'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

const accountTabs: TabsItem[] = [
  { key: 'profile', title: 'Profile' },
  { key: 'security', title: 'Security' },
  { key: 'billing', title: 'Billing' },
]

export default function TabsScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [selectedKey, setSelectedKey] = useState('profile')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Controlled + Content Render
        </Text>
        <Tabs
          items={accountTabs}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
          fullWidth
        >
          {({ selectedKey: activeKey }) => (
            <Text style={[styles.resultText, { color: colors.foreground }]}>
              Active tab: {activeKey}
            </Text>
          )}
        </Tabs>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            variant="solid"
            fullWidth
          />
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            variant="bordered"
            fullWidth
          />
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            variant="light"
            fullWidth
          />
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            variant="underlined"
            fullWidth
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            size="xs"
            fullWidth
          />
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            size="sm"
            fullWidth
          />
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            size="md"
            fullWidth
          />
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            size="lg"
            fullWidth
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Disabled Keys + Animation Toggle
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Tabs
            items={accountTabs}
            defaultSelectedKey="profile"
            disabledKeys={['billing']}
            fullWidth
          />
          <Tabs
            items={accountTabs}
            defaultSelectedKey="security"
            disableAnimation
            color="secondary"
            fullWidth
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Children Content
        </Text>
        <Tabs
          items={accountTabs}
          defaultSelectedKey="profile"
          variant="solid"
          fullWidth
        >
          {({ selectedKey: activeKey, selectedItem }) => (
            <View
              style={[
                styles.contentBox,
                {
                  backgroundColor: colors.background,
                  borderColor: `${colors.foreground}20`,
                },
              ]}
            >
              <Text style={[styles.contentTitle, { color: colors.foreground }]}>
                {selectedItem?.title}
              </Text>
              <Text style={[styles.contentText, { color: colors.foreground }]}>
                Active tab key: {activeKey}
              </Text>
              <Text
                style={[
                  styles.contentDescription,
                  { color: `${colors.foreground}80` },
                ]}
              >
                This content is rendered using the children render prop. It updates
                automatically when you switch tabs.
              </Text>
            </View>
          )}
        </Tabs>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Tab Render (No children required)
        </Text>
        <Tabs
          items={[
            { key: 'all', title: 'All' },
            { key: 'active', title: 'Active' },
            { key: 'done', title: 'Done' },
          ]}
          defaultSelectedKey="all"
          fullWidth
          variant="bordered"
          renderTab={(item, state) => (
            <Text
              style={{
                fontWeight: state.isSelected ? '700' : '500',
                color: state.isDisabled
                  ? `${colors.foreground}70`
                  : colors.foreground,
              }}
            >
              {item.title}
            </Text>
          )}
        />
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
  resultText: {
    marginTop: 8,
    fontSize: 14,
  },
  contentBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
})
