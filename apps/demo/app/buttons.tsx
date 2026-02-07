import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Button } from '@xaui/native/button'

export default function ButtonsScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Button themeColor="primary" variant="solid">Solid</Button>
          <Button themeColor="primary" variant="outlined">Outlined</Button>
          <Button themeColor="primary" variant="flat">Flat</Button>
          <Button themeColor="primary" variant="light">Light</Button>
          <Button themeColor="primary" variant="elevated">Elevated</Button>
          <Button themeColor="primary" variant="faded">Faded</Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Button size="xs" variant="outlined">Extra Small</Button>
          <Button size="sm" variant="outlined">Small</Button>
          <Button size="md" variant="outlined">Medium</Button>
          <Button size="lg" variant="outlined">Large</Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Button themeColor="primary">Primary</Button>
          <Button themeColor="secondary">Secondary</Button>
          <Button themeColor="tertiary">Tertiary</Button>
          <Button themeColor="success">Success</Button>
          <Button themeColor="warning">Warning</Button>
          <Button themeColor="danger">Danger</Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Button isDisabled variant="solid" themeColor="primary">
            Disabled
          </Button>
          <Button
            isLoading={isLoading}
            onPress={() => {
              setIsLoading(true)
              setTimeout(() => setIsLoading(false), 1500)
            }}
            variant="solid"
            themeColor="success"
          >
            {isLoading ? 'Loading...' : 'Tap to Load'}
          </Button>
          <Button fullWidth variant="outlined" themeColor="secondary">
            Full Width Button
          </Button>
        </View>
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
