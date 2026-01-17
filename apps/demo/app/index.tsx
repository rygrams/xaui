import { Link } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { useThemeColor } from '@/hooks/use-theme-color'

const demos = [
  {
    title: 'Buttons',
    description: 'Primary actions, sizes, and icon buttons.',
    href: '/demos/buttons',
  },
  {
    title: 'Checkboxes',
    description: 'Filled and light styles with alignment options.',
    href: '/demos/checkboxes',
  },
  {
    title: 'Select',
    description: 'Single and multiple selects with variants.',
    href: '/demos/select',
  },
  {
    title: 'Sidebar',
    description: 'Slide-in navigation drawers from left or right.',
    href: '/demos/sidebar',
  },
  {
    title: 'Switches',
    description: 'Inside and overlap toggles with labels.',
    href: '/demos/switches',
  },
  {
    title: 'Progress',
    description: 'Spinner, ticks, and bullet activity indicators.',
    href: '/demos/progress',
  },
]

export default function HomeScreen() {
  const cardBackground = useThemeColor(
    { light: '#F6F7FB', dark: '#1D2126' },
    'background'
  )
  const cardBorder = useThemeColor({ light: '#E2E6EA', dark: '#2B3138' }, 'background')
  const descriptionText = useThemeColor({ light: '#374151', dark: '#9AA3AD' }, 'text')
  const iconColor = useThemeColor({}, 'icon')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Component demos</ThemedText>
        <ThemedText style={[styles.subtitle, { color: descriptionText }]}>
          Tap a component to open its live demo.
        </ThemedText>
      </View>

      <View style={styles.list}>
        {demos.map((demo) => (
          <Link key={demo.href} href={demo.href} asChild>
            <Pressable
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: cardBackground, borderColor: cardBorder },
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardText}>
                  <ThemedText type="subtitle">{demo.title}</ThemedText>
                  <ThemedText style={[styles.cardDescription, { color: descriptionText }]}>
                    {demo.description}
                  </ThemedText>
                </View>
                <IconSymbol name="chevron.right" color={iconColor} size={22} />
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  header: {
    gap: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  list: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  cardDescription: {
    fontSize: 14,
  },
})
