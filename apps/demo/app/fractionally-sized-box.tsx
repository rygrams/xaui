import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { FractionallySizedBox } from '@xaui/native/view'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

export default function FractionallySizedBoxScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Width Factor
        </Text>
        <View
          style={[
            styles.bordered,
            { borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' },
          ]}
        >
          {[
            { factor: 0.25, color: colors.primary.main, label: '0.25' },
            { factor: 0.5, color: colors.secondary.main, label: '0.5' },
            { factor: 0.75, color: colors.success.main, label: '0.75' },
          ].map(item => (
            <FractionallySizedBox key={item.label} widthFactor={item.factor}>
              <View
                style={{
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: item.color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: colors.primary.onMain,
                    fontSize: 11,
                    fontWeight: '600',
                  }}
                >
                  widthFactor={item.label}
                </Text>
              </View>
            </FractionallySizedBox>
          ))}
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          Children sized to 25%, 50%, and 75% of parent width
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Height Factor
        </Text>
        <View
          style={[
            styles.bordered,
            {
              flexDirection: 'row',
              borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7',
            },
          ]}
        >
          {[
            { factor: 0.3, color: colors.primary.main, label: '0.3' },
            { factor: 0.6, color: colors.secondary.main, label: '0.6' },
          ].map(item => (
            <View key={item.label} style={{ flex: 1, height: 150 }}>
              <FractionallySizedBox heightFactor={item.factor}>
                <View
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    backgroundColor: item.color,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary.onMain,
                      fontSize: 11,
                      fontWeight: '600',
                    }}
                  >
                    heightFactor={item.label}
                  </Text>
                </View>
              </FractionallySizedBox>
            </View>
          ))}
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          Children sized to 30% and 60% of parent height
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Alignment
        </Text>
        <View
          style={[
            styles.bordered,
            {
              height: 200,
              borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7',
            },
          ]}
        >
          <FractionallySizedBox
            widthFactor={0.5}
            heightFactor={0.5}
            alignment="center"
          >
            <View
              style={{
                flex: 1,
                borderRadius: 8,
                backgroundColor: colors.primary.main,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.primary.onMain,
                  fontSize: 11,
                  fontWeight: '600',
                }}
              >
                alignment="center"
              </Text>
              <Text
                style={{
                  color: colors.primary.onMain,
                  fontSize: 10,
                  opacity: 0.8,
                }}
              >
                50% × 50% of parent
              </Text>
            </View>
          </FractionallySizedBox>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          Child centered within parent at half size
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  section: { width: '100%' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  bordered: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    gap: 8,
  },
})
