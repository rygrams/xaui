import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
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
import type { TramAccentName, TramTypeRole } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

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
      <TramSection
        title="le sol"
        note="Vrai noir et vrai blanc. Aucune ombre, nulle part."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {GROUND.map(token => (
            <Swatch key={token} color={theme.colors[token]} label={token} />
          ))}
        </View>
      </TramSection>

      <TramSection
        title="les vingt accents"
        note="Le texte posé dessus est calculé : noir sur lime, ambre et jaune. En trait ou en texte, l'accent devient une encre."
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
              <Typography variant="caption" color={onAccent(tramAccents[name])}>
                {name}
              </Typography>
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
      </TramSection>

      <TramSection
        title="l'échelle de texte"
        note="Le Typography de Tram. Selawik n'est pas embarquée : sans elle, la police système."
      >
        {TYPE_ROLES.map(role => (
          <View key={role}>
            <Typography variant={role} numberOfLines={1}>
              {role}
            </Typography>
            <Typography variant="caption" color={theme.colors.muted}>
              {tramType[role].fontSize} · {tramType[role].weight}
            </Typography>
          </View>
        ))}
      </TramSection>

      <TramSection
        title="le mouvement"
        note="Un ressort, interruptible — ou un fondu de 150 ms si les animations sont réduites."
      >
        <MotionSample />
      </TramSection>
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
  // Read, not filled: the line and the label of the outlined box are the accent as ink.
  const outlined = { backgroundColor: colors.background, borderColor: colors.link }

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={[box, { backgroundColor: colors.accent }]}>
          <Typography variant="subtitle" color={colors.accentForeground}>
            plein
          </Typography>
        </View>
        <View style={[box, outlined]}>
          <Typography variant="subtitle" color={colors.link}>
            contour
          </Typography>
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
        <Typography color={theme.colors.accentForeground}>appuyer</Typography>
      </Animated.View>
    </Pressable>
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
      <Typography variant="caption" color={theme.colors.muted}>
        {label}
      </Typography>
      <Typography variant="caption" color={theme.colors.muted}>
        {color}
      </Typography>
    </View>
  )
}
