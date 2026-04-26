import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Container } from '@xaui/native/view'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

export default function ContainerScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [pressCount, setPressCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      {/* Basic */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic
        </Text>
        <Container
          color={colors.background}
          padding={16}
          borderRadius={12}
          border={{ width: 1, color: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' }}
          shadow={{ offset: { x: 0, y: 2 }, blur: 12, opacity: 0.08 }}
        >
          <Text style={{ color: colors.foreground, fontWeight: '600' }}>
            Shadow Card
          </Text>
          <Text
            style={{
              color: colors.foreground,
              opacity: 0.6,
              marginTop: 4,
              fontSize: 13,
            }}
          >
            padding, borderRadius, border, shadow
          </Text>
        </Container>
      </View>

      {/* Alignment */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Alignment
        </Text>
        <View style={{ gap: 8 }}>
          {(
            [
              'topLeft',
              'topCenter',
              'topRight',
              'centerLeft',
              'center',
              'centerRight',
              'bottomLeft',
              'bottomCenter',
              'bottomRight',
            ] as const
          ).map(align => (
            <Container
              key={align}
              height={56}
              borderRadius={8}
              border={{
                width: 1,
                color: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7',
              }}
              alignment={align}
              color={theme.mode === 'dark' ? '#27272a' : '#fafafa'}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: colors.primary.main,
                }}
              />
              <Text
                style={{
                  color: colors.foreground,
                  fontSize: 10,
                  opacity: 0.5,
                  marginLeft: 6,
                }}
              >
                {align}
              </Text>
            </Container>
          ))}
        </View>
      </View>

      {/* Border */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Border
        </Text>
        <View style={{ gap: 8 }}>
          <Container
            padding={14}
            borderRadius={8}
            border={{ width: 2, color: colors.primary.main, style: 'solid' }}
          >
            <Text style={{ color: colors.foreground, fontSize: 13 }}>
              Uniform border — solid
            </Text>
          </Container>
          <Container
            padding={14}
            borderRadius={8}
            border={{ width: 2, color: colors.secondary.main, style: 'dashed' }}
          >
            <Text style={{ color: colors.foreground, fontSize: 13 }}>
              Uniform border — dashed
            </Text>
          </Container>
          <Container
            padding={14}
            borderRadius={8}
            border={{ top: { width: 3, color: colors.primary.main } }}
          >
            <Text style={{ color: colors.foreground, fontSize: 13 }}>
              Top border only
            </Text>
          </Container>
          <Container
            padding={14}
            borderRadius={8}
            border={{ left: { width: 4, color: colors.success.main } }}
          >
            <Text style={{ color: colors.foreground, fontSize: 13 }}>
              Left accent border
            </Text>
          </Container>
        </View>
      </View>

      {/* Border Radius */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Border Radius
        </Text>
        <View style={{ gap: 8 }}>
          <Container color={colors.primary.main} padding={14} borderRadius={4}>
            <Text style={{ color: colors.primary.onMain, fontSize: 13 }}>
              borderRadius=4
            </Text>
          </Container>
          <Container color={colors.primary.main} padding={14} borderRadius={16}>
            <Text style={{ color: colors.primary.onMain, fontSize: 13 }}>
              borderRadius=16
            </Text>
          </Container>
          <Container color={colors.primary.main} padding={14} borderRadius={9999}>
            <Text style={{ color: colors.primary.onMain, fontSize: 13 }}>
              borderRadius=9999 (pill)
            </Text>
          </Container>
          <Container
            color={colors.secondary.main}
            padding={14}
            borderRadius={{
              topLeft: 24,
              topRight: 24,
              bottomLeft: 0,
              bottomRight: 0,
            }}
          >
            <Text style={{ color: colors.secondary.onMain, fontSize: 13 }}>
              Per-corner: topLeft/topRight=24, bottom=0
            </Text>
          </Container>
        </View>
      </View>

      {/* Shadow */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Shadow
        </Text>
        <View style={{ gap: 12 }}>
          {[
            { blur: 4, opacity: 0.06, label: 'sm — blur:4 opacity:0.06' },
            { blur: 12, opacity: 0.1, label: 'md — blur:12 opacity:0.1' },
            { blur: 24, opacity: 0.15, label: 'lg — blur:24 opacity:0.15' },
          ].map(s => (
            <Container
              key={s.label}
              color={theme.mode === 'dark' ? '#27272a' : '#ffffff'}
              padding={14}
              borderRadius={10}
              shadow={{ offset: { x: 0, y: 4 }, blur: s.blur, opacity: s.opacity }}
            >
              <Text style={{ color: colors.foreground, fontSize: 13 }}>
                {s.label}
              </Text>
            </Container>
          ))}
        </View>
      </View>

      {/* Clip */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Clip</Text>
        <Container
          color={theme.mode === 'dark' ? '#27272a' : '#f4f4f5'}
          height={100}
          borderRadius={12}
          clip
          border={{ width: 1, color: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7' }}
        >
          <View
            style={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: colors.primary.main,
              opacity: 0.2,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.secondary.main,
              opacity: 0.15,
            }}
          />
          <Text
            style={{
              color: colors.foreground,
              fontWeight: '600',
              fontSize: 14,
              margin: 16,
            }}
          >
            clip=true — decorative circles are hidden at bounds
          </Text>
        </Container>
      </View>

      {/* Opacity & Transform */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Opacity & Transform
        </Text>
        <View style={{ gap: 10 }}>
          <Container
            color={colors.primary.container}
            padding={14}
            borderRadius={8}
            opacity={1}
          >
            <Text style={{ color: colors.primary.onContainer, fontSize: 13 }}>
              opacity=1
            </Text>
          </Container>
          <Container
            color={colors.primary.container}
            padding={14}
            borderRadius={8}
            opacity={0.5}
          >
            <Text style={{ color: colors.primary.onContainer, fontSize: 13 }}>
              opacity=0.5
            </Text>
          </Container>
          <Container
            color={colors.secondary.container}
            padding={14}
            borderRadius={8}
            transform={{ rotate: '-2deg' }}
          >
            <Text style={{ color: colors.secondary.onContainer, fontSize: 13 }}>
              transform rotate(-2deg)
            </Text>
          </Container>
          <Container
            color={colors.secondary.container}
            padding={14}
            borderRadius={8}
            transform={{ scale: 0.92 }}
          >
            <Text style={{ color: colors.secondary.onContainer, fontSize: 13 }}>
              transform scale(0.92)
            </Text>
          </Container>
        </View>
      </View>

      {/* Flex Layout */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Flex Layout
        </Text>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Container
              flex={1}
              padding={12}
              borderRadius={8}
              border={{
                width: 1,
                color: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7',
              }}
              alignment="center"
            >
              <Text style={{ color: colors.foreground, fontSize: 12 }}>flex=1</Text>
            </Container>
            <Container
              flex={2}
              padding={12}
              borderRadius={8}
              color={colors.primary.main}
              alignment="center"
            >
              <Text style={{ color: colors.primary.onMain, fontSize: 12 }}>
                flex=2
              </Text>
            </Container>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[1, 1, 1].map((_, i) => (
              <Container
                key={i}
                flex={1}
                height={48}
                borderRadius={8}
                color={
                  i === 0
                    ? colors.primary.main
                    : i === 1
                      ? colors.secondary.main
                      : colors.success.main
                }
                alignment="center"
              >
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>
                  {i + 1}
                </Text>
              </Container>
            ))}
          </View>
        </View>
      </View>

      {/* EdgeInsets Spacing */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          EdgeInsets Spacing
        </Text>
        <View style={{ gap: 8 }}>
          <Container
            padding={16}
            border={{
              width: 1,
              color: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7',
            }}
            borderRadius={8}
          >
            <Text style={{ color: colors.foreground, fontSize: 13 }}>
              padding=16 (uniform)
            </Text>
          </Container>
          <Container
            padding={{ horizontal: 24, vertical: 8 }}
            border={{
              width: 1,
              color: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7',
            }}
            borderRadius={8}
          >
            <Text style={{ color: colors.foreground, fontSize: 13 }}>
              padding={'{ horizontal: 24, vertical: 8 }'}
            </Text>
          </Container>
          <Container
            padding={{ top: 20, bottom: 4, left: 16, right: 8 }}
            border={{
              width: 1,
              color: theme.mode === 'dark' ? '#3f3f46' : '#e4e4e7',
            }}
            borderRadius={8}
          >
            <Text style={{ color: colors.foreground, fontSize: 13 }}>
              padding={'{ top: 20, bottom: 4, left: 16, right: 8 }'}
            </Text>
          </Container>
        </View>
      </View>

      {/* Pressable */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Pressable ({pressCount} presses)
        </Text>
        <View style={{ gap: 8 }}>
          <Container
            color={theme.mode === 'dark' ? '#27272a' : '#ffffff'}
            padding={16}
            borderRadius={12}
            shadow={{ offset: { x: 0, y: 2 }, blur: 8, opacity: 0.08 }}
            onPress={() => setPressCount(n => n + 1)}
          >
            <Text style={{ color: colors.foreground, fontWeight: '600' }}>
              Tap me
            </Text>
            <Text
              style={{
                color: colors.foreground,
                opacity: 0.6,
                fontSize: 13,
                marginTop: 4,
              }}
            >
              onPress — renders Pressable automatically
            </Text>
          </Container>

          <Container
            color={
              liked
                ? colors.primary.main
                : theme.mode === 'dark'
                  ? '#27272a'
                  : '#ffffff'
            }
            padding={16}
            borderRadius={12}
            border={{
              width: 1,
              color: liked
                ? colors.primary.main
                : theme.mode === 'dark'
                  ? '#3f3f46'
                  : '#e4e4e7',
            }}
            onPress={() => setLiked(v => !v)}
          >
            <Text
              style={{
                color: liked ? colors.primary.onMain : colors.foreground,
                fontWeight: '600',
              }}
            >
              {liked ? '❤️ Liked!' : '🤍 Like this card'}
            </Text>
          </Container>

          <Text style={{ color: colors.foreground, opacity: 0.5, fontSize: 12 }}>
            Select an option
          </Text>
          {['Option A', 'Option B', 'Option C'].map((label, idx) => (
            <Container
              key={label}
              color={
                selected === idx
                  ? colors.primary.container
                  : theme.mode === 'dark'
                    ? '#27272a'
                    : '#ffffff'
              }
              padding={{ horizontal: 16, vertical: 12 }}
              borderRadius={8}
              border={{
                width: selected === idx ? 2 : 1,
                color:
                  selected === idx
                    ? colors.primary.main
                    : theme.mode === 'dark'
                      ? '#3f3f46'
                      : '#e4e4e7',
              }}
              onPress={() => setSelected(idx)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color:
                      selected === idx
                        ? colors.primary.onContainer
                        : colors.foreground,
                    fontWeight: selected === idx ? '600' : '400',
                    fontSize: 14,
                  }}
                >
                  {label}
                </Text>
                {selected === idx && (
                  <Text style={{ color: colors.primary.main, fontSize: 16 }}>✓</Text>
                )}
              </View>
            </Container>
          ))}

          <Container
            color={theme.mode === 'dark' ? '#27272a' : '#ffffff'}
            padding={16}
            borderRadius={12}
            shadow={{ offset: { x: 0, y: 2 }, blur: 8, opacity: 0.08 }}
            disabled
            opacity={0.4}
          >
            <Text style={{ color: colors.foreground, fontWeight: '600' }}>
              Disabled container
            </Text>
          </Container>
        </View>
      </View>

      {/* Nested containers */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Nested Containers
        </Text>
        <Container
          color={theme.mode === 'dark' ? '#27272a' : '#ffffff'}
          padding={12}
          borderRadius={14}
          shadow={{ offset: { x: 0, y: 4 }, blur: 16, opacity: 0.08 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Container
              width={48}
              height={48}
              borderRadius={24}
              color={colors.primary.container}
              alignment="center"
            >
              <Text style={{ fontSize: 22 }}>🧩</Text>
            </Container>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.foreground, fontWeight: '600' }}>
                Nested Layout
              </Text>
              <Text
                style={{
                  color: colors.foreground,
                  opacity: 0.55,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                Avatar + content using nested containers
              </Text>
            </View>
            <Container
              padding={{ horizontal: 10, vertical: 4 }}
              borderRadius={99}
              color={colors.success.container}
            >
              <Text
                style={{
                  color: colors.success.onContainer,
                  fontSize: 11,
                  fontWeight: '600',
                }}
              >
                New
              </Text>
            </Container>
          </View>
        </Container>
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
