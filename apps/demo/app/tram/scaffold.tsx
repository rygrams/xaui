import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { useScaffold } from '@xaui/tram/scaffold'
import type { ScaffoldVariant } from '@xaui/tram/scaffold'
import type { TramAccentName } from '@xaui/tram/theme'
import { ToggleButton } from '@xaui/tram/toggle-button'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'
import { useTramScaffoldChoice } from '../../components/tram-scaffold-choice'

const VARIANTS: ScaffoldVariant[] = ['ghost', 'tertiary', 'secondary', 'primary']

/** Two that take black on the bar, two that take white, and the theme's own. */
const ACCENTS: (TramAccentName | 'thème')[] = [
  'thème',
  'lime',
  'yellow',
  'magenta',
  'cobalt',
]

/**
 * Where the Tram `Scaffold` is verified, in dark and in light. The bar under test is the
 * real one: the header over every Tram screen is this section's own `Scaffold`, and the
 * groups below dress it — the four variants, a named accent, the status bar's ink read on
 * the bar's ground. Leaving and coming back shows the back arrow in the title's ink.
 */
export default function TramScaffoldScreen() {
  const theme = useXAUITheme()
  const router = useRouter()
  const { variant, accent, setVariant, setAccent } = useTramScaffoldChoice()
  const { screenOptions, statusBar } = useScaffold()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="variant"
        note="ghost : le fond de la page. tertiary : une ligne de 2 en muted dessous. secondary : la surface discrète. primary : l'aplat de l'accent."
      >
        <ToggleButton.Group
          value={variant}
          onValueChange={next => next && setVariant(next as ScaffoldVariant)}
        >
          {VARIANTS.map(name => (
            <ToggleButton key={name} value={name}>
              {name}
            </ToggleButton>
          ))}
        </ToggleButton.Group>
      </TramSection>

      <TramSection
        title="accent"
        note="Il remplit la barre de primary et secondary ; sur ghost et tertiary il colore le titre, lu sur la page. Sur le lime et le jaune, la barre d'état passe en icônes sombres."
      >
        <ToggleButton.Group
          value={accent ?? 'thème'}
          onValueChange={next =>
            next &&
            setAccent(next === 'thème' ? undefined : (next as TramAccentName))
          }
        >
          {ACCENTS.map(name => (
            <ToggleButton key={name} value={name}>
              {name}
            </ToggleButton>
          ))}
        </ToggleButton.Group>
      </TramSection>

      <TramSection
        title="ce que lit le navigateur"
        note="useScaffold : les valeurs résolues, fusionnées sous les options de l'app."
      >
        <Typography variant="caption" color={theme.colors.muted}>
          {`fond ${String(screenOptions.headerStyle.backgroundColor)} · titre ${String(
            screenOptions.headerTitleStyle.color
          )} · aligné ${screenOptions.headerTitleAlign} · barre d'état ${statusBar.barStyle}`}
        </Typography>
      </TramSection>

      <TramSection
        title="une page plus loin"
        note="La flèche de retour prend l'encre du titre."
      >
        <Button variant="outline" onPress={() => router.push('/tram/view')}>
          ouvrir view
        </Button>
      </TramSection>
    </ScrollView>
  )
}
