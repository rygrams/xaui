import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ConstrainedBox } from '@xaui/native/view'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

export default function ConstrainedBoxScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Min Width
        </Text>
        <View
          style={[
            styles.bordered,
            { borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' },
          ]}
        >
          <ConstrainedBox constraints={{ minWidth: 200 }}>
            <View
              style={{
                height: 40,
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
                constraints=&#123; minWidth: 200 &#125;
              </Text>
            </View>
          </ConstrainedBox>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          Child refuses to shrink below 200px wide
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Max Width
        </Text>
        <View
          style={[
            styles.bordered,
            { borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' },
          ]}
        >
          {[120, 180, 250].map(mw => (
            <ConstrainedBox key={mw} constraints={{ maxWidth: mw }}>
              <View
                style={{
                  borderRadius: 6,
                  padding: 8,
                  backgroundColor:
                    mw === 180 ? colors.primary.main : colors.primary.container,
                }}
              >
                <Text
                  style={{
                    color:
                      mw === 180
                        ? colors.primary.onMain
                        : colors.primary.onContainer,
                    fontSize: 11,
                    fontWeight: '500',
                  }}
                >
                  maxWidth={mw} — this text wraps when it hits the bound
                </Text>
              </View>
            </ConstrainedBox>
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
          Text blocks capped at different widths
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Combined Min + Max
        </Text>
        <View
          style={[
            styles.bordered,
            { borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' },
          ]}
        >
          <ConstrainedBox constraints={{ minWidth: 120, maxWidth: 220 }}>
            <View
              style={{
                height: 40,
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
                constraints=&#123; minWidth: 120, maxWidth: 220 &#125;
              </Text>
            </View>
          </ConstrainedBox>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          At least 120px wide, never more than 220px
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Vertical Constraints
        </Text>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
          <ConstrainedBox constraints={{ minHeight: 80, maxHeight: 120 }}>
            <View
              style={{
                width: 80,
                borderRadius: 8,
                backgroundColor: colors.secondary.main,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.secondary.onMain,
                  fontSize: 10,
                  fontWeight: '600',
                }}
              >
                80-120h
              </Text>
            </View>
          </ConstrainedBox>
          <ConstrainedBox
            constraints={{
              minWidth: 60,
              maxWidth: 100,
              minHeight: 60,
              maxHeight: 100,
            }}
          >
            <View
              style={{
                flex: 1,
                borderRadius: 8,
                backgroundColor: colors.success.main,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.success.onMain,
                  fontSize: 10,
                  fontWeight: '600',
                }}
              >
                60-100{'\n'}x 60-100
              </Text>
            </View>
          </ConstrainedBox>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          minHeight/maxHeight and full BoxConstraints
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
