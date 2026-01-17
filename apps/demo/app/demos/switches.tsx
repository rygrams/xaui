import { ScrollView, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { Switch } from '@xaui/switches'

import { ThemedText } from '@/components/themed-text'
import { useThemeColor } from '@/hooks/use-theme-color'

export default function SwitchesDemoScreen() {
  const [insideEnabled, setInsideEnabled] = useState(true)
  const [overlapEnabled, setOverlapEnabled] = useState(false)
  const [quietMode, setQuietMode] = useState(true)
  const cardBackground = useThemeColor(
    { light: '#F6F7FB', dark: '#1D2126' },
    'background'
  )
  const cardBorder = useThemeColor({ light: '#E2E6EA', dark: '#2B3138' }, 'background')
  const descriptionText = useThemeColor({ light: '#374151', dark: '#9AA3AD' }, 'text')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Switches</ThemedText>
      <ThemedText style={[styles.description, { color: descriptionText }]}>
        Toggle quick settings with inside or overlap styles.
      </ThemedText>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Variants</ThemedText>
        <View style={styles.column}>
          <Switch
            label="Inside (default)"
            isSelected={insideEnabled}
            onValueChange={setInsideEnabled}
            themeColor="primary"
          />
          <Switch
            label="Overlap"
            variant="overlap"
            isSelected={overlapEnabled}
            onValueChange={setOverlapEnabled}
            themeColor="secondary"
          />
        </View>
      </View>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Label Alignment</ThemedText>
        <View style={styles.column}>
          <Switch
            label="Quiet mode"
            labelAlignment="left"
            isSelected={quietMode}
            onValueChange={setQuietMode}
          />
          <Switch
            label="Justified right"
            labelAlignment="justify-right"
            fullWidth
            isSelected={!quietMode}
            onValueChange={(value) => setQuietMode(!value)}
            themeColor="success"
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
  column: {
    gap: 12,
  },
})
