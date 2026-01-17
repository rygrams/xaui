import { ScrollView, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { Checkbox } from '@xaui/checkboxes'

import { ThemedText } from '@/components/themed-text'
import { useThemeColor } from '@/hooks/use-theme-color'

export default function CheckboxesDemoScreen() {
  const [checked, setChecked] = useState({
    marketing: true,
    updates: false,
    terms: false,
  })
  const [alignmentChecked, setAlignmentChecked] = useState(true)
  const cardBackground = useThemeColor(
    { light: '#F6F7FB', dark: '#1D2126' },
    'background'
  )
  const cardBorder = useThemeColor({ light: '#E2E6EA', dark: '#2B3138' }, 'background')
  const descriptionText = useThemeColor({ light: '#374151', dark: '#9AA3AD' }, 'text')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Checkboxes</ThemedText>
      <ThemedText style={[styles.description, { color: descriptionText }]}>
        Pick multiple options and align labels as needed.
      </ThemedText>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Selections</ThemedText>
        <View style={styles.column}>
          <Checkbox
            label="Product updates"
            isChecked={checked.updates}
            onValueChange={(value) => setChecked({ ...checked, updates: value })}
          />
          <Checkbox
            label="Marketing emails"
            isChecked={checked.marketing}
            onValueChange={(value) => setChecked({ ...checked, marketing: value })}
            themeColor="success"
          />
          <Checkbox
            label="Agree to terms"
            isChecked={checked.terms}
            onValueChange={(value) => setChecked({ ...checked, terms: value })}
            themeColor="danger"
          />
        </View>
      </View>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Alignment</ThemedText>
        <View style={styles.column}>
          <Checkbox
            label="Label on the left"
            labelAlignment="left"
            isChecked={alignmentChecked}
            onValueChange={setAlignmentChecked}
          />
          <Checkbox
            label="Justified right"
            labelAlignment="justify-right"
            fullWidth
            isChecked={!alignmentChecked}
            onValueChange={(value) => setAlignmentChecked(!value)}
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
