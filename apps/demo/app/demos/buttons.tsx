import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, IconButton } from '@xaui/buttons'

import { IconSymbol } from '@/components/ui/icon-symbol'

export default function ButtonsDemoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buttons</Text>
      <Text style={styles.description}>
        Primary actions, variants, and icon-only controls.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variants</Text>
        <View style={styles.row}>
          <Button themeColor="primary">Solid</Button>
          <Button themeColor="primary" variant="outlined">
            Outlined
          </Button>
          <Button themeColor="primary" variant="light">
            Light
          </Button>
          <Button themeColor="primary" variant="faded">
            Faded
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizes</Text>
        <View style={styles.row}>
          <Button themeColor="secondary" size="sm">
            Small
          </Button>
          <Button themeColor="secondary" size="md">
            Medium
          </Button>
          <Button themeColor="secondary" size="lg">
            Large
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icon Buttons</Text>
        <View style={styles.row}>
          <IconButton
            themeColor="primary"
            icon={<IconSymbol name="chevron.right" color="#2563EB" />}
          />
          <IconButton
            themeColor="success"
            variant="outlined"
            icon={<IconSymbol name="chevron.right" color="#16A34A" />}
          />
          <IconButton
            themeColor="danger"
            variant="solid"
            icon={<IconSymbol name="chevron.right" color="#FFFFFF" />}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>States</Text>
        <View style={styles.row}>
          <Button themeColor="primary" isLoading>
            Loading
          </Button>
          <Button themeColor="secondary" isDisabled>
            Disabled
          </Button>
          <Button themeColor="success" variant="outlined" isDisabled>
            Outlined
          </Button>
        </View>
      </View>
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
})
