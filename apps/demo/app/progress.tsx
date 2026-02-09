import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { Progress } from '@xaui/native/progress'

export default function ProgressScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [value, setValue] = useState(0.15)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        const next = prev + 0.1
        return next > 1 ? 0 : next
      })
    }, 900)

    return () => clearInterval(interval)
  }, [])

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Animated Value
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Progress value={value} />
          <Text style={[styles.label, { color: colors.foreground }]}>
            Current: {Math.round(value * 100)}%
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Linear Cases
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Progress value={0.25} size={4} themeColor="primary" />
          <Progress value={0.5} size={8} themeColor="secondary" />
          <Progress value={0.72} size={12} themeColor="success" borderRadius={999} />
          <Progress value={0.9} size={10} themeColor="warning" disableAnimation />
          <Progress value={1.2} size={8} themeColor="danger" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Circular Cases
        </Text>
        <View style={styles.row}>
          <View style={styles.itemCenter}>
            <Progress
              variant="circular"
              value={0.2}
              size={40}
              themeColor="primary"
            />
            <Text style={[styles.label, { color: colors.foreground }]}>20%</Text>
          </View>
          <View style={styles.itemCenter}>
            <Progress
              variant="circular"
              value={0.55}
              size={56}
              themeColor="secondary"
            />
            <Text style={[styles.label, { color: colors.foreground }]}>55%</Text>
          </View>
          <View style={styles.itemCenter}>
            <Progress
              variant="circular"
              value={0.85}
              size={72}
              themeColor="success"
              borderRadius={12}
            />
            <Text style={[styles.label, { color: colors.foreground }]}>85%</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Progress
            value={0.66}
            color="#0ea5e9"
            backgroundColor="#bae6fd"
            size={10}
            borderRadius={12}
          />
          <Progress
            variant="circular"
            value={0.38}
            size={60}
            color="#f97316"
            backgroundColor="#fed7aa"
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  itemCenter: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
  },
})
