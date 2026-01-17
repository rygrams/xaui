import { useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Sidebar } from '@xaui/sidebar'
import { Button } from '@xaui/buttons'
import { useXUITheme } from '@xaui/core'

import { ThemedText } from '@/components/themed-text'
import { useThemeColor } from '@/hooks/use-theme-color'

export default function SidebarDemoScreen() {
  const theme = useXUITheme()
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [primaryOpen, setPrimaryOpen] = useState(false)

  const cardBackground = useThemeColor(
    { light: '#F6F7FB', dark: '#1D2126' },
    'background'
  )
  const cardBorder = useThemeColor({ light: '#E2E6EA', dark: '#2B3138' }, 'background')
  const descriptionText = useThemeColor({ light: '#374151', dark: '#9AA3AD' }, 'text')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Sidebar</ThemedText>
      <ThemedText style={[styles.description, { color: descriptionText }]}>
        Slide-in navigation drawers from left or right edges.
      </ThemedText>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Position</ThemedText>
        <View style={styles.row}>
          <Button themeColor="primary" onPress={() => setLeftOpen(true)}>
            Left Sidebar
          </Button>
          <Button themeColor="secondary" onPress={() => setRightOpen(true)}>
            Right Sidebar
          </Button>
        </View>
      </View>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Theme Colors</ThemedText>
        <View style={styles.row}>
          <Button themeColor="primary" onPress={() => setPrimaryOpen(true)}>
            Open Menu
          </Button>
        </View>
      </View>

      {/* Left Sidebar */}
      <Sidebar
        position="left"
        isOpen={leftOpen}
        onClose={() => setLeftOpen(false)}
        style={{ backgroundColor: theme.colors.background }}
      >
        <View style={styles.sidebarContent}>
          <ThemedText type="title" style={styles.sidebarTitle}>
            Menu
          </ThemedText>
          <View style={styles.menuItems}>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Home
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Settings
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Profile
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              About
            </Text>
          </View>
          <Button
            themeColor="primary"
            onPress={() => setLeftOpen(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </View>
      </Sidebar>

      {/* Right Sidebar */}
      <Sidebar
        position="right"
        isOpen={rightOpen}
        onClose={() => setRightOpen(false)}
        width={320}
        style={{ backgroundColor: theme.colors.background }}
      >
        <View style={styles.sidebarContent}>
          <ThemedText type="title" style={styles.sidebarTitle}>
            Settings
          </ThemedText>
          <View style={styles.menuItems}>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Account
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Privacy
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Notifications
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Appearance
            </Text>
          </View>
          <Button
            themeColor="secondary"
            onPress={() => setRightOpen(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </View>
      </Sidebar>

      {/* Primary Themed Sidebar */}
      <Sidebar
        position="left"
        isOpen={primaryOpen}
        onClose={() => setPrimaryOpen(false)}
        themeColor="primary"
        overlayOpacity={0.7}
      >
        <View style={styles.sidebarContent}>
          <ThemedText type="title" style={styles.sidebarTitle}>
            Navigation
          </ThemedText>
          <View style={styles.menuItems}>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Dashboard
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Projects
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Tasks
            </Text>
            <Text style={[styles.menuItem, { color: theme.colors.foreground }]}>
              Calendar
            </Text>
          </View>
          <Button
            themeColor="primary"
            onPress={() => setPrimaryOpen(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </View>
      </Sidebar>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sidebarContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  sidebarTitle: {
    marginBottom: 24,
  },
  menuItems: {
    flex: 1,
    gap: 20,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 24,
  },
})
