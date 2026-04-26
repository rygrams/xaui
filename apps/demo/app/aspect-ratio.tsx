import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AspectRatio } from '@xaui/native/view'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

export default function AspectRatioScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Common Ratios
        </Text>
        <View
          style={[
            styles.bordered,
            { borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' },
          ]}
        >
          {[
            { ratio: 16 / 9, label: '16:9', color: colors.primary.main },
            { ratio: 4 / 3, label: '4:3', color: colors.secondary.main },
            { ratio: 1, label: '1:1', color: colors.success.main },
            { ratio: 2 / 1, label: '2:1', color: colors.warning.main },
          ].map(item => (
            <AspectRatio key={item.label} ratio={item.ratio}>
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
                    fontSize: 13,
                    fontWeight: '600',
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </AspectRatio>
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
          Standard aspect ratios from wide to tall
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Square Avatar
        </Text>
        <View
          style={[
            styles.bordered,
            { borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' },
          ]}
        >
          <AspectRatio ratio={1} style={{ width: 80 }}>
            <View
              style={{
                flex: 1,
                borderRadius: 40,
                backgroundColor: colors.primary.main,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.primary.onMain,
                  fontSize: 24,
                  fontWeight: '700',
                }}
              >
                AB
              </Text>
            </View>
          </AspectRatio>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          Perfect square avatar with circular clipping
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Clip
        </Text>
        <View
          style={[
            styles.bordered,
            { borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' },
          ]}
        >
          <AspectRatio ratio={1} clip style={{ width: 200, borderRadius: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.primary.container,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: colors.primary.main,
                  top: -20,
                  left: -20,
                  opacity: 0.7,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: colors.secondary.main,
                  bottom: -15,
                  right: -15,
                  opacity: 0.7,
                }}
              />
              <Text
                style={{
                  color: colors.foreground,
                  fontSize: 11,
                  fontWeight: '600',
                }}
              >
                clip=true
              </Text>
            </View>
          </AspectRatio>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          Overflowing circles are clipped to the box bounds
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
