import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, IconButton } from '@xaui/buttons'
import { useXUITheme } from '@xaui/core'

import { ThemedText } from '@/components/themed-text'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { useThemeColor } from '@/hooks/use-theme-color'

export default function ButtonsDemoScreen() {
  const theme = useXUITheme()
  const cardBackground = useThemeColor(
    { light: '#F6F7FB', dark: '#1D2126' },
    'background'
  )
  const cardBorder = useThemeColor({ light: '#E2E6EA', dark: '#2B3138' }, 'background')
  const descriptionText = useThemeColor({ light: '#374151', dark: '#9AA3AD' }, 'text')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Buttons</ThemedText>
      <ThemedText style={[styles.description, { color: descriptionText }]}>
        Primary actions, variants, and icon-only controls.
      </ThemedText>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Variants</ThemedText>
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

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Sizes</ThemedText>
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

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Icon Buttons</ThemedText>
        <View style={styles.row}>
          <IconButton
            themeColor="primary"
            icon={<IconSymbol name="chevron.right" color={theme.colors.primary.main} />}
          />
          <IconButton
            themeColor="success"
            variant="outlined"
            icon={<IconSymbol name="chevron.right" color={theme.colors.success.main} />}
          />
          <IconButton
            themeColor="danger"
            variant="solid"
            icon={<IconSymbol name="chevron.right" color={theme.colors.danger.foreground} />}
          />
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
})
