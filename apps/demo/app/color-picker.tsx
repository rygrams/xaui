import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { ColorPicker } from '@xaui/native/color-picker'

const brandColors = [
  {
    name: 'Brand',
    colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#06b6d4'],
  },
  {
    name: 'Neutral',
    colors: ['#f8fafc', '#e2e8f0', '#94a3b8', '#475569', '#1e293b', '#0f172a'],
  },
]

export default function ColorPickerScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [primaryColor, setPrimaryColor] = useState('')
  const [accentColor, setAccentColor] = useState('#6366f1')
  const [bgColor, setBgColor] = useState('')
  const [brandColor, setBrandColor] = useState('')
  const [invalidColor, setInvalidColor] = useState('')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic
        </Text>
        <ColorPicker
          label="Primary color"
          value={primaryColor}
          onColorChange={setPrimaryColor}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With initial value
        </Text>
        <ColorPicker
          label="Accent color"
          value={accentColor}
          onColorChange={setAccentColor}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom palette
        </Text>
        <ColorPicker
          label="Brand color"
          colorGroups={brandColors}
          value={brandColor}
          onColorChange={setBrandColor}
          sheetTitle="Choose a brand color"
          themeColor="secondary"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <ColorPicker
          label="Bordered"
          variant="bordered"
          value={bgColor}
          onColorChange={setBgColor}
        />
        <ColorPicker
          label="Colored"
          variant="colored"
          themeColor="success"
          value={bgColor}
          onColorChange={setBgColor}
        />
        <ColorPicker
          label="Underlined"
          variant="underlined"
          value={bgColor}
          onColorChange={setBgColor}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <ColorPicker
          label="Disabled"
          value="#6366f1"
          isDisabled
          onColorChange={() => {}}
        />
        <ColorPicker
          label="Invalid"
          value={invalidColor}
          isInvalid
          errorMessage="Please select a color"
          onColorChange={setInvalidColor}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With description
        </Text>
        <ColorPicker
          label="Background color"
          description="Choose a color for your app background"
          value={bgColor}
          onColorChange={setBgColor}
          swatchSize={32}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
})
