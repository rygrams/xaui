import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SizedBox } from '@xaui/native-legacy/view'
import { useXUIColors, useXUITheme } from '@xaui/native-legacy/core'

export default function SizedBoxScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      {/* Fixed spacer */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Fixed Spacer
        </Text>
        <View
          style={[
            styles.row,
            { borderColor: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' },
          ]}
        >
          <View style={[styles.block, { backgroundColor: colors.primary.main }]} />
          <SizedBox width={32} />
          <View style={[styles.block, { backgroundColor: colors.secondary.main }]} />
          <SizedBox width={16} />
          <View style={[styles.block, { backgroundColor: colors.success.main }]} />
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          width=32 between first and second, width=16 between second and third
        </Text>
      </View>

      {/* Fixed height spacer */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Fixed Height Spacer
        </Text>
        <View>
          <View
            style={[styles.hBlock, { backgroundColor: colors.primary.container }]}
          >
            <Text style={{ color: colors.primary.onContainer, fontSize: 13 }}>
              Section A
            </Text>
          </View>
          <SizedBox height={24} />
          <View
            style={[styles.hBlock, { backgroundColor: colors.secondary.container }]}
          >
            <Text style={{ color: colors.secondary.onContainer, fontSize: 13 }}>
              Section B
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          height=24 vertical gap
        </Text>
      </View>

      {/* Fixed size box */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Fixed Size Box
        </Text>
        <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
          {[40, 64, 96].map(size => (
            <SizedBox key={size} width={size} height={size}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.primary.main,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: colors.primary.onMain,
                    fontSize: 10,
                    fontWeight: '600',
                  }}
                >
                  {size}
                </Text>
              </View>
            </SizedBox>
          ))}
        </View>
      </View>

      {/* Expand */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Expand (Fills Remaining Space)
        </Text>
        <View style={{ flexDirection: 'row', height: 48, gap: 8 }}>
          <View
            style={{
              width: 48,
              borderRadius: 8,
              backgroundColor: colors.secondary.main,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.secondary.onMain, fontSize: 10 }}>
              48px
            </Text>
          </View>
          <SizedBox expand>
            <View
              style={{
                flex: 1,
                borderRadius: 8,
                backgroundColor: colors.primary.container,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.primary.onContainer, fontSize: 12 }}>
                expand
              </Text>
            </View>
          </SizedBox>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          SizedBox expand fills all remaining space in the row
        </Text>
      </View>

      {/* Shrink */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Shrink (Zero Size)
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: colors.success.main,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.success.onMain, fontSize: 10 }}>A</Text>
          </View>
          <SizedBox shrink />
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: colors.success.main,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.success.onMain, fontSize: 10 }}>B</Text>
          </View>
        </View>
        <Text
          style={{
            color: colors.foreground,
            opacity: 0.55,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          SizedBox shrink takes no space — A and B are adjacent
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  block: { width: 40, height: 40, borderRadius: 6 },
  hBlock: {
    padding: 14,
    borderRadius: 8,
  },
})
