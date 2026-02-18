import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Surface, Column, Row } from '@xaui/native/view'
import { useXUITheme } from '@xaui/native/core'

const semanticColors = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
  'default',
] as const

export default function SurfaceScreen() {
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>Default</Text>
        <Surface padding={16}>
          <Text style={{ color: theme.colors.foreground }}>
            Surface uses theme background by default.
          </Text>
        </Surface>
      </View>

      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>
          Semantic Backgrounds
        </Text>
        <Column spacing={10}>
          {semanticColors.map(color => (
            <Surface
              key={color}
              themeColor={color}
              padding={12}
              radius="sm"
            >
              <Row mainAxisAlignment="space-between" crossAxisAlignment="center" fullWidth>
                <Text style={{ color: theme.colors.foreground, fontWeight: '600' }}>
                  {color}
                </Text>
                <Text style={{ color: theme.colors.foreground }}>background tone</Text>
              </Row>
            </Surface>
          ))}
        </Column>
      </View>

      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>
          Radius, Padding, Full Width
        </Text>
        <Column spacing={10}>
          <Surface themeColor="secondary" padding={10} radius="none">
            <Text style={{ color: theme.colors.foreground }}>radius=none / padding=10</Text>
          </Surface>
          <Surface themeColor="primary" padding={16} radius="md">
            <Text style={{ color: theme.colors.foreground }}>radius=md / padding=16</Text>
          </Surface>
          <Surface themeColor="success" padding={22} radius="lg">
            <Text style={{ color: theme.colors.foreground }}>radius=lg</Text>
          </Surface>
        </Column>
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
    paddingBottom: 36,
    gap: 16,
  },
  section: {
    gap: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
})
