import { useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Sidebar } from '@xaui/sidebar'
import { Button } from '@xaui/buttons'

export default function SidebarDemoScreen() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [primaryOpen, setPrimaryOpen] = useState(false)
  const [wideOpen, setWideOpen] = useState(false)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sidebar</Text>
      <Text style={styles.description}>
        Slide-in navigation drawers from left or right edges.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Position</Text>
        <View style={styles.row}>
          <Button themeColor="primary" onPress={() => setLeftOpen(true)}>
            Left Sidebar
          </Button>
          <Button themeColor="secondary" onPress={() => setRightOpen(true)}>
            Right Sidebar
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Colors</Text>
        <View style={styles.row}>
          <Button themeColor="primary" onPress={() => setPrimaryOpen(true)}>
            Open Menu
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizing</Text>
        <View style={styles.row}>
          <Button themeColor="secondary" onPress={() => setWideOpen(true)}>
            Wide Sidebar
          </Button>
        </View>
      </View>

      {/* Left Sidebar */}
      <Sidebar
        position="left"
        isOpen={leftOpen}
        onClose={() => setLeftOpen(false)}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <View style={styles.sidebarContent}>
          <Text style={styles.sidebarTitle}>Menu</Text>
          <View style={styles.menuItems}>
            <Text style={styles.menuItem}>Home</Text>
            <Text style={styles.menuItem}>Settings</Text>
            <Text style={styles.menuItem}>Profile</Text>
            <Text style={styles.menuItem}>About</Text>
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
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <View style={styles.sidebarContent}>
          <Text style={styles.sidebarTitle}>Settings</Text>
          <View style={styles.menuItems}>
            <Text style={styles.menuItem}>Account</Text>
            <Text style={styles.menuItem}>Privacy</Text>
            <Text style={styles.menuItem}>Notifications</Text>
            <Text style={styles.menuItem}>Appearance</Text>
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
          <Text style={[styles.sidebarTitle, styles.sidebarTitleLight]}>
            Navigation
          </Text>
          <View style={styles.menuItems}>
            <Text style={[styles.menuItem, styles.menuItemLight]}>Dashboard</Text>
            <Text style={[styles.menuItem, styles.menuItemLight]}>Projects</Text>
            <Text style={[styles.menuItem, styles.menuItemLight]}>Tasks</Text>
            <Text style={[styles.menuItem, styles.menuItemLight]}>Calendar</Text>
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

      {/* Wide Sidebar */}
      <Sidebar
        position="left"
        isOpen={wideOpen}
        onClose={() => setWideOpen(false)}
        width={360}
        overlayOpacity={0.6}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <View style={styles.sidebarContent}>
          <Text style={styles.sidebarTitle}>Workspace</Text>
          <View style={styles.menuItems}>
            <Text style={styles.menuItem}>Overview</Text>
            <Text style={styles.menuItem}>Analytics</Text>
            <Text style={styles.menuItem}>Integrations</Text>
            <Text style={styles.menuItem}>Support</Text>
          </View>
          <Button
            themeColor="secondary"
            onPress={() => setWideOpen(false)}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  section: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    backgroundColor: '#F6F7FB',
    borderColor: '#E2E6EA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
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
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  sidebarTitleLight: {
    color: '#FFFFFF',
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
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  menuItemLight: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButton: {
    marginTop: 24,
  },
})
