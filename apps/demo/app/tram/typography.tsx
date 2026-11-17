import { ScrollView, Text, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { tramType } from '@xaui/tram/theme'
import type { TramAccentName, TramTypeRole } from '@xaui/tram/theme'
import { TextSpan, Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const ROLES = Object.keys(tramType) as TramTypeRole[]

/** Four that are too light to read on white, two too dark to read on black. */
const ACCENTS: TramAccentName[] = [
  'yellow',
  'lime',
  'amber',
  'cyan',
  'crimson',
  'indigo',
]

/**
 * Where the Tram `Typography` is verified, in dark and in light: the eight roles and
 * their faces, a named `accent` drawn as ink, a raw `color`, a `TextSpan`, the style
 * props, and the case left as written.
 */
export default function TramTypographyScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les rôles"
        note="Chaque rôle fixe la taille, la graisse et la face. Sans Selawik, la police système."
      >
        {ROLES.map(role => (
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
        title="une page"
        note="Le titre de page, un titre d'élément, le corps, la légende."
      >
        <View>
          <Typography variant="page" accessibilityRole="header">
            réglages
          </Typography>
          <Typography variant="title">thème</Typography>
          <Typography>
            Le fond est noir ou blanc, et une seule couleur porte tout ce qui se
            touche. Le texte fait le reste : sa taille dit où nous sommes.
          </Typography>
          <Typography variant="caption" color={theme.colors.muted}>
            modifié il y a deux minutes
          </Typography>
        </View>
      </TramSection>

      <TramSection
        title="accent"
        note="Un texte est une encre : l'accent est rapproché du noir ou du blanc jusqu'à 4,5:1."
      >
        {ACCENTS.map(accent => (
          <View key={accent}>
            <Typography variant="title" accent={accent}>
              {accent}
            </Typography>
            <Typography variant="caption" accent={accent}>
              la même encre à 13 — lisible aussi
            </Typography>
          </View>
        ))}
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette, jamais corrigée — ici le danger du thème."
      >
        <Typography variant="subtitle" color={theme.colors.danger}>
          trois projets seront supprimés
        </Typography>
      </TramSection>

      <TramSection
        title="textspan"
        note="Un fragment hérite du rôle et ne change que ce qu'il nomme."
      >
        <Typography>
          supprimer{' '}
          <TextSpan fontWeight="700" color={theme.colors.danger}>
            trois projets
          </TextSpan>{' '}
          définitivement, ou les{' '}
          <TextSpan textDecorationLine="underline">archiver</TextSpan>.
        </Typography>
      </TramSection>

      <TramSection
        title="la casse"
        note="Metro écrivait en minuscules ; Tram rend ce que l'appli a écrit."
      >
        <Typography variant="title">minuscules</Typography>
        <Typography variant="title">Une Majuscule Par Mot</Typography>
        <Typography variant="title">CAPITALES</Typography>
      </TramSection>

      <TramSection
        title="props de style"
        note="Toute clé de TextStyle est une prop ; style a le dernier mot."
      >
        <Typography textAlign="center">centré</Typography>
        <Typography alignSelf="flex-end" opacity={0.6}>
          à la fin, à 60 %
        </Typography>
        <Typography variant="subtitle" style={{ letterSpacing: 4 }}>
          espacé par style
        </Typography>
        <Typography variant="title" asChild>
          <Text accessibilityRole="header">aschild : le Text est le mien</Text>
        </Typography>
      </TramSection>
    </ScrollView>
  )
}
