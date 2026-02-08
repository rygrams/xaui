import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Tab, Tabs } from '@xaui/native/tabs'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

const themeColors = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'warning',
  'success',
  'default',
] as const

function renderAccountTabs() {
  return [
    <Tab key="profile" title="Profile" />,
    <Tab key="security" title="Security" />,
    <Tab key="billing" title="Billing" />,
  ]
}

function renderAccountTabsWithContent(colors: ReturnType<typeof useXUIColors>) {
  return [
    <Tab key="profile" title="Profile">
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
          Profile
        </Text>
        <Text style={[styles.contentText, { color: colors.foreground }]}>
          Active tab key: profile
        </Text>
      </View>
    </Tab>,
    <Tab key="security" title="Security">
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
          Security
        </Text>
        <Text style={[styles.contentText, { color: colors.foreground }]}>
          Active tab key: security
        </Text>
      </View>
    </Tab>,
    <Tab key="billing" title="Billing">
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
          Billing
        </Text>
        <Text style={[styles.contentText, { color: colors.foreground }]}>
          Active tab key: billing
        </Text>
      </View>
    </Tab>,
  ]
}

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
        <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey} fullWidth>
          {renderAccountTabs()}
        </Tabs>
        <Text style={[styles.resultText, { color: colors.foreground }]}>
          Active tab: {selectedKey}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Tabs defaultSelectedKey="profile" variant="solid" fullWidth>
            {renderAccountTabs()}
          </Tabs>
          <Tabs defaultSelectedKey="profile" variant="bordered" fullWidth>
            {renderAccountTabs()}
          </Tabs>
          <Tabs defaultSelectedKey="profile" variant="light" fullWidth>
            {renderAccountTabs()}
          </Tabs>
          <Tabs defaultSelectedKey="profile" variant="underlined" fullWidth>
            {renderAccountTabs()}
          </Tabs>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {themeColors.map(themeColor => (
            <View key={themeColor} style={{ gap: theme.spacing.xs }}>
              <Text style={[styles.colorLabel, { color: colors.foreground }]}>
                {themeColor}
              </Text>
              <Tabs
                defaultSelectedKey="profile"
                color={themeColor}
                variant="bordered"
                fullWidth
              >
                {renderAccountTabs()}
              </Tabs>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Tabs defaultSelectedKey="profile" size="xs" fullWidth>
            {renderAccountTabs()}
          </Tabs>
          <Tabs defaultSelectedKey="profile" size="sm" fullWidth>
            {renderAccountTabs()}
          </Tabs>
          <Tabs defaultSelectedKey="profile" size="md" fullWidth>
            {renderAccountTabs()}
          </Tabs>
          <Tabs defaultSelectedKey="profile" size="lg" fullWidth>
            {renderAccountTabs()}
          </Tabs>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Disabled Keys + Animation Toggle
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Tabs defaultSelectedKey="profile" disabledKeys={['billing']} fullWidth>
            {renderAccountTabs()}
          </Tabs>
          <Tabs
            defaultSelectedKey="security"
            disableAnimation
            color="secondary"
            fullWidth
          >
            {renderAccountTabs()}
          </Tabs>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Children Content
        </Text>
        <Tabs defaultSelectedKey="profile" variant="solid" fullWidth>
          {renderAccountTabsWithContent(colors)}
        </Tabs>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Tab Render (No children required)
        </Text>
        <Tabs
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
        >
          <Tab key="all" title="All" />
          <Tab key="active" title="Active" />
          <Tab key="done" title="Done" />
        </Tabs>
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
  colorLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
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
})
