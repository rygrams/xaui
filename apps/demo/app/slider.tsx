import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Slider } from '@xaui/native/slider'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

export default function SliderScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [volume, setVolume] = useState(30)
  const [price, setPrice] = useState(250)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Controlled
        </Text>
        <Slider
          label="Volume"
          value={volume}
          minValue={0}
          maxValue={100}
          step={1}
          showValueLabel
          onChange={setVolume}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Steps + Color
        </Text>
        <Slider
          label="Price"
          value={price}
          minValue={50}
          maxValue={500}
          step={50}
          color="secondary"
          showSteps
          showValueLabel
          onChange={setPrice}
          formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Marks
        </Text>
        <Slider
          label="Delivery priority"
          defaultValue={50}
          step={25}
          showValueLabel
          marks={[
            { value: 0, label: 'Low' },
            { value: 50, label: 'Medium' },
            { value: 100, label: 'High' },
          ]}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Vertical + Disabled
        </Text>
        <View style={{ flexDirection: 'row', gap: theme.spacing.lg }}>
          <Slider
            label="Opacity"
            defaultValue={70}
            orientation="vertical"
            showValueLabel
            trackLength={220}
          />
          <Slider
            label="Read only"
            defaultValue={35}
            orientation="vertical"
            isReadOnly
            showValueLabel
            color="warning"
            trackLength={220}
          />
          <Slider
            label="Disabled"
            defaultValue={55}
            orientation="vertical"
            isDisabled
            showValueLabel
            trackLength={220}
          />
        </View>
      </View>

      <View style={{ height: 40 }} />
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
