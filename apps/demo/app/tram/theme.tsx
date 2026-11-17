import { useState } from 'react'
import type { ReactNode } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import type { TextStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { XAUIProvider, useColorMode, useXAUITheme } from '@xaui/native/theme'
import type { XAUIColors } from '@xaui/native/theme'
import { useTramMotion } from '@xaui/tram/motion'
import {
  TRAM_TOUCH_TARGET,
  createTramTheme,
  onAccent,
  tramAccents,
  tramType,
} from '@xaui/tram/theme'
import type { TramAccentName, TramFontWeight, TramTypeRole } from '@xaui/tram/theme'

const ACCENT_NAMES = Object.keys(tramAccents) as TramAccentName[]

/** Built once, at module level — one theme per accent, as an app would build its own. */
const THEMES = Object.fromEntries(
  ACCENT_NAMES.map(name => [name, createTramTheme({ accent: name })])
) as Record<TramAccentName, ReturnType<typeof createTramTheme>>

const GROUND: (keyof XAUIColors)[] = [
  'background',
  'foreground',
  'muted',
  'surface',
  'default',
  'border',
  'success',
  'warning',
  'danger',
]

const TYPE_ROLES = Object.keys(tramType) as TramTypeRole[]

/**
 * Until `Typography` resolves a weight name to a Selawik face, the demo approximates:
 * SemiLight sits at 350, which `fontWeight` cannot say.
 */
const WEIGHTS: Record<TramFontWeight, TextStyle['fontWeight']> = {
  light: '300',
  semilight: '300',
  regular: '400',
}

/**
 * The verification screen for the Tram socle — the theme, its tokens and the motion hook.
 * There is no component here yet; what is checked is what every component will read.
 *
 * Picking an accent re-themes the block under it through a nested provider, which is the
 * check that `createTramTheme` resolves all twenty and that the text drawn on each reads.
 */
export default function TramThemeScreen() {
  const theme = useXAUITheme()
  const colorMode = useColorMode()
  const [accent, setAccent] = useState<TramAccentName>('cyan')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <Section
        title="le sol"
        note="Vrai noir et vrai blanc. Aucune ombre, nulle part."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {GROUND.map(token => (
            <Swatch key={token} color={theme.colors[token]} label={token} />
          ))}
        </View>
      </Section>

      <Section
        title="les vingt accents"
        note="Le texte posé dessus est calculé : noir sur lime, ambre et jaune."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {ACCENT_NAMES.map(name => (
            <Pressable
              key={name}
              accessibilityRole="button"
              accessibilityLabel={`accent ${name}`}
              accessibilityState={{ selected: name === accent }}
              onPress={() => setAccent(name)}
              style={{
                width: 76,
                height: 76,
                padding: 6,
                justifyContent: 'flex-end',
                backgroundColor: tramAccents[name],
                borderWidth: theme.borderWidth.default,
                borderColor:
                  name === accent ? theme.colors.foreground : tramAccents[name],
              }}
            >
              <Text style={{ color: onAccent(tramAccents[name]), fontSize: 13 }}>
                {name}
              </Text>
            </Pressable>
          ))}
        </View>

        <XAUIProvider
          theme={THEMES[accent]}
          colorMode={colorMode}
          hasPortalHost={false}
        >
          <AccentSample />
        </XAUIProvider>
      </Section>

      <Section
        title="l'échelle de texte"
        note="Selawik n'est pas embarquée : sans elle, la police système."
      >
        {TYPE_ROLES.map(role => (
          <View key={role}>
            <Text
              numberOfLines={1}
              style={{
                color: theme.colors.foreground,
                fontFamily: theme.fontFamilies.heading,
                fontSize: tramType[role].fontSize,
                fontWeight: WEIGHTS[tramType[role].weight],
              }}
            >
              {role}
            </Text>
            <Caption>
              {tramType[role].fontSize} · {tramType[role].weight}
            </Caption>
          </View>
        ))}
      </Section>

      <Section
        title="le mouvement"
        note="Un ressort, interruptible — ou un fondu de 150 ms si les animations sont réduites."
      >
        <MotionSample />
      </Section>
    </ScrollView>
  )
}

/** Reads the nested theme: a filled block, an outlined one, and the derived tokens. */
function AccentSample() {
  const theme = useXAUITheme()
  const { colors } = theme
  const box = {
    minHeight: 56,
    paddingHorizontal: 14,
    justifyContent: 'center' as const,
    borderWidth: theme.borderWidth.default,
    borderRadius: theme.radius.lg,
    borderColor: colors.accent,
  }

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={[box, { backgroundColor: colors.accent }]}>
          <Text style={{ color: colors.accentForeground, fontSize: 19 }}>plein</Text>
        </View>
        <View style={[box, { backgroundColor: colors.background }]}>
          <Text style={{ color: colors.accent, fontSize: 19 }}>contour</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Swatch color={colors.accentPressed} label="accentPressed" />
        <Swatch color={colors.accentSoft} label="accentSoft" />
        <Swatch color={colors.focus} label="focus" />
        <Swatch color={colors.link} label="link" />
      </View>
    </View>
  )
}

/** Press to shrink on the `press` spring; release to slide on the `navigation` one. */
function MotionSample() {
  const theme = useXAUITheme()
  const animate = useTramMotion()
  const scale = useSharedValue(1)
  const offset = useSharedValue(0)
  const [isAway, setIsAway] = useState(false)

  const tile = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ translateX: offset.value }, { scale: scale.value }] }
  })

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="tuile de mouvement"
      onPressIn={() => {
        scale.value = animate(0.96)
      }}
      onPressOut={() => {
        scale.value = animate(1)
        offset.value = animate(isAway ? 0 : 120, 'navigation')
        setIsAway(!isAway)
      }}
      style={{ alignSelf: 'flex-start' }}
    >
      <Animated.View
        style={[
          {
            width: 120,
            height: 120,
            padding: 8,
            justifyContent: 'flex-end',
            backgroundColor: theme.colors.accent,
          },
          tile,
        ]}
      >
        <Text style={{ color: theme.colors.accentForeground, fontSize: 16 }}>
          appuyer
        </Text>
      </Animated.View>
    </Pressable>
  )
}

type SectionProps = { title: string; note: string; children: ReactNode }

function Section({ title, note, children }: SectionProps) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 12 }}>
      <View style={{ gap: 2 }}>
        <Text
          style={{
            color: theme.colors.foreground,
            fontFamily: theme.fontFamilies.heading,
            fontSize: tramType.section.fontSize,
            fontWeight: '300',
          }}
        >
          {title}
        </Text>
        <Caption>{note}</Caption>
      </View>
      {children}
    </View>
  )
}

function Caption({ children }: { children: ReactNode }) {
  const theme = useXAUITheme()

  return (
    <Text
      style={{
        color: theme.colors.muted,
        fontFamily: theme.fontFamilies.body,
        fontSize: tramType.caption.fontSize,
      }}
    >
      {children}
    </Text>
  )
}

function Swatch({ color, label }: { color: string; label: string }) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 4, width: 96 }}>
      <View
        style={{
          height: TRAM_TOUCH_TARGET,
          backgroundColor: color,
          borderWidth: 1,
          borderColor: theme.colors.muted,
        }}
      />
      <Caption>{label}</Caption>
      <Caption>{color}</Caption>
    </View>
  )
}
