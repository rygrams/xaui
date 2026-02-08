import { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { HomeIcon, SearchIcon, PersonIcon, SettingsIcon } from '@xaui/icons'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { BottomTabBar, BottomTabBarItem } from '@xaui/native/bottom-tab-bar'

export default function BottomTabBarScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [selectedKey, setSelectedKey] = useState('home')
  const [routerIndex, setRouterIndex] = useState(0)

  const routes = useMemo(
    () => [
      { key: 'route-home', name: 'home' },
      { key: 'route-search', name: 'search' },
      { key: 'route-profile', name: 'profile' },
    ],
    []
  )

  const descriptors = useMemo(
    () => ({
      'route-home': {
        options: {
          title: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <HomeIcon size={size} color={color} variant="filled" />
          ),
        },
      },
      'route-search': {
        options: {
          title: 'Search',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <SearchIcon size={size} color={color} variant="filled" />
          ),
          tabBarBadge: (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          ),
        },
      },
      'route-profile': {
        options: {
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <PersonIcon size={size} color={color} variant="filled" />
          ),
        },
      },
    }),
    []
  )

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Composable API</Text>
        <Text style={[styles.sectionDescription, { color: colors.foreground }]}>Use `BottomTabBar` with explicit `BottomTabBarItem` children.</Text>
        <View style={styles.previewBox}>
          <BottomTabBar
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            themeColor="primary"
          >
            <BottomTabBarItem
              itemKey="home"
              label="Home"
              icon={({ color, size }) => (
                <HomeIcon size={size} color={color} variant="filled" />
              )}
            />
            <BottomTabBarItem
              itemKey="search"
              label="Search"
              icon={({ color, size }) => (
                <SearchIcon size={size} color={color} variant="filled" />
              )}
              badge={
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>2</Text>
                </View>
              }
            />
            <BottomTabBarItem
              itemKey="settings"
              label="Settings"
              icon={({ color, size }) => (
                <SettingsIcon size={size} color={color} variant="filled" />
              )}
            />
          </BottomTabBar>
        </View>
        <Text style={[styles.valueText, { color: colors.foreground }]}>Selected key: {selectedKey}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Expo Router Compatible API</Text>
        <Text style={[styles.sectionDescription, { color: colors.foreground }]}>
          Pass state, descriptors, and navigation from the expo-router tabBar props.
        </Text>
        <View style={styles.previewBox}>
          <BottomTabBar
            state={{ index: routerIndex, routes }}
            descriptors={descriptors}
            navigation={{
              emit: () => ({ defaultPrevented: false }),
              navigate: (name: string) => {
                const index = routes.findIndex(route => route.name === name)
                if (index >= 0) {
                  setRouterIndex(index)
                }
              },
            }}
            insets={{ bottom: 0 }}
            themeColor="secondary"
          />
        </View>
        <Text style={[styles.valueText, { color: colors.foreground }]}>Focused route: {routes[routerIndex]?.name}</Text>
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
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontSize: 14,
    opacity: 0.84,
  },
  previewBox: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  valueText: {
    fontSize: 13,
    opacity: 0.8,
  },
})
