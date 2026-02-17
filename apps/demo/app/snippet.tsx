import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Snippet } from '@xaui/native/snippet'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

const variants = ['outlined', 'flat', 'light'] as const
const themeColors = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
  'default',
] as const
const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

export default function SnippetScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [copyStatus, setCopyStatus] = useState('No copy action yet')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Variants</Text>
        <View style={{ gap: theme.spacing.md }}>
          {variants.map(variant => (
            <Snippet
              key={variant}
              value={`pnpm --filter @xaui/native build -- ${variant}`}
              variant={variant}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {themeColors.map(themeColor => (
            <Snippet
              key={themeColor}
              value={`echo "${themeColor}"`}
              themeColor={themeColor}
              variant="outlined"
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Copy Button Position
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {positions.map(copyButtonPosition => (
            <Snippet
              key={copyButtonPosition}
              value={`npm run test -- --watch=false # ${copyButtonPosition}`}
              copyButtonPosition={copyButtonPosition}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Typography
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Snippet
            value="pnpm --filter @xaui/native test"
            fontSize={13}
            fontWeight="400"
            themeColor="default"
          />
          <Snippet
            value="pnpm --filter @xaui/native test"
            fontSize={16}
            fontWeight="600"
            themeColor="secondary"
          />
          <Snippet
            value="pnpm --filter @xaui/native test"
            fontSize={18}
            fontWeight="700"
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Copy Callback</Text>
        <View style={{ gap: theme.spacing.sm }}>
          <Snippet
            value="pnpm changeset version && pnpm -r build"
            themeColor="success"
            onCopy={(value, isSuccess) => {
              setCopyStatus(isSuccess ? `Copied: ${value}` : 'Copy failed on this platform')
            }}
          />
          <Text style={{ color: colors.foreground, opacity: 0.75 }}>{copyStatus}</Text>
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
    paddingBottom: 28,
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
