import { Link } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { IconSymbol } from '@/components/ui/icon-symbol'

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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Component demos</Text>
        <Text style={styles.subtitle}>Tap a component to open its live demo.</Text>
      </View>

      <View style={styles.list}>
        {demos.map(demo => (
          <Link key={demo.href} href={demo.href} asChild>
            <Pressable
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{demo.title}</Text>
                  <Text style={styles.cardDescription}>{demo.description}</Text>
                </View>
                <IconSymbol name="chevron.right" color="#4B5563" size={22} />
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
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
  },
  list: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F6F7FB',
    borderColor: '#E2E6EA',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  cardDescription: {
    fontSize: 14,
    color: '#4B5563',
  },
})
