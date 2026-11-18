import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Select } from '@xaui/tram/select'
import type { SelectSize } from '@xaui/tram/select'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: SelectSize[] = ['sm', 'md', 'lg']

/** The three that are too light to read as a line on white, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

const SPEEDS = [
  { value: 'slow', label: 'lente' },
  { value: 'normal', label: 'normale' },
  { value: 'fast', label: 'rapide' },
  { value: 'instant', label: 'immédiate' },
]

const CITIES = [
  'abidjan',
  'accra',
  'bamako',
  'cotonou',
  'dakar',
  'lagos',
  'lomé',
  'niamey',
  'ouagadougou',
  'yamoussoukro',
]

function SpeedItems() {
  return SPEEDS.map(speed => (
    <Select.Item key={speed.value} value={speed.value}>
      {speed.label}
    </Select.Item>
  ))
}

/**
 * Where the Tram `Select` is verified, in dark and in light: the three sizes, controlled
 * and not, the placeholder, the label and the hint, invalid, disabled, a disabled item,
 * groups, a second line, a controlled opening, four choices in place, ten on a page, the forced mode, named
 * accents, a raw `color`, `asChild` and the style props.
 */
export default function TramSelectScreen() {
  const theme = useXAUITheme()
  const insets = useSafeAreaInsets()
  const [speed, setSpeed] = useState('normal')
  const [city, setCity] = useState<string>()
  const [isOpen, setOpen] = useState(false)
  const [isPageOpen, setPageOpen] = useState(false)

  /** Opens, then closes before the opening has ended: the box sets off from where it is. */
  const interrupt = (set: (isOpen: boolean) => void) => {
    set(true)
    setTimeout(() => set(false), 140)
  }
  // Tram reads no safe area: the page is padded with the app's own inset.
  const pageTop = insets.top + 24

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — 40, 48, 56 de haut, la boîte du TextField. La liste se déplie dans la boîte et pousse ce qui est dessous."
      >
        {SIZES.map(size => (
          <Select key={size} size={size} defaultValue="normal">
            <Select.Label>{size}</Select.Label>
            <Select.Trigger>
              <Select.Value placeholder="choisir une vitesse" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Overlay />
            <Select.Content>{SpeedItems()}</Select.Content>
            <Select.Description>celle des animations.</Select.Description>
          </Select>
        ))}
      </TramSection>

      <TramSection
        title="non contrôlé, placeholder"
        note="Rien de choisi : le placeholder, en muted. Toucher le label ouvre la liste."
      >
        <Select>
          <Select.Label>vitesse</Select.Label>
          <Select.Trigger>
            <Select.Value placeholder="choisir une vitesse" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>{SpeedItems()}</Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`Deux selects sur le même état. Valeur : « ${speed} »`}
      >
        <Select value={speed} onValueChange={setSpeed}>
          <Select.Label>vitesse</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>{SpeedItems()}</Select.Content>
        </Select>
        <Select size="sm" value={speed} onValueChange={setSpeed}>
          <Select.Label>le même état</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>{SpeedItems()}</Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="ouverture contrôlée"
        note="isOpen et onOpenChange. Refermé à mi-course, le dépliage repart de la hauteur courante ; le swivel aussi."
      >
        <Select isOpen={isOpen} onOpenChange={setOpen} defaultValue="fast">
          <Select.Label>sur place</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>{SpeedItems()}</Select.Content>
        </Select>
        <Select isOpen={isPageOpen} onOpenChange={setPageOpen} defaultValue="fast">
          <Select.Label>en plein écran</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content mode="fullscreen" paddingTop={pageTop}>
            {SpeedItems()}
          </Select.Content>
        </Select>
        <Button variant="outline" onPress={() => interrupt(setOpen)}>
          ouvrir puis refermer, sur place
        </Button>
        <Button variant="outline" onPress={() => interrupt(setPageOpen)}>
          ouvrir puis refermer, plein écran
        </Button>
      </TramSection>

      <TramSection
        title="invalide"
        note="Bordure et message en danger, ouvert compris ; le label et la description gardent leur encre."
      >
        <Select isInvalid={city === undefined} value={city} onValueChange={setCity}>
          <Select.Label>ville</Select.Label>
          <Select.Trigger>
            <Select.Value placeholder="choisir une ville" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content mode="inline">
            {CITIES.slice(0, 4).map(name => (
              <Select.Item key={name} value={name}>
                {name}
              </Select.Item>
            ))}
          </Select.Content>
          <Select.Description>celle de la livraison.</Select.Description>
          {city === undefined ? (
            <Select.Error>il faut une ville.</Select.Error>
          ) : null}
        </Select>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Bordure, valeur et label gris, sans accent. Ne s'ouvre pas, ni par le label."
      >
        <Select isDisabled defaultValue="fast">
          <Select.Label>vitesse</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>{SpeedItems()}</Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="un item désactivé"
        note="« immédiate » est gris et ne se choisit pas."
      >
        <Select defaultValue="slow">
          <Select.Label>vitesse</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>
            {SPEEDS.map(item => (
              <Select.Item
                key={item.value}
                value={item.value}
                isDisabled={item.value === 'instant'}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="groupes et seconde ligne"
        note="GroupLabel en tête de chaque groupe ; ItemDescription sous le label, en muted."
      >
        <Select defaultValue="wifi">
          <Select.Label>synchronisation</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>
            <Select.GroupLabel>automatique</Select.GroupLabel>
            <Select.Item value="wifi" label="en wi-fi">
              <Select.ItemLabel>en wi-fi</Select.ItemLabel>
              <Select.ItemDescription>
                jamais sur le réseau mobile.
              </Select.ItemDescription>
            </Select.Item>
            <Select.Item value="always" label="toujours">
              <Select.ItemLabel>toujours</Select.ItemLabel>
              <Select.ItemDescription>
                le forfait est utilisé.
              </Select.ItemDescription>
            </Select.Item>
            <Select.GroupLabel>manuelle</Select.GroupLabel>
            <Select.Item value="never" label="à la demande">
              <Select.ItemLabel>à la demande</Select.ItemLabel>
            </Select.Item>
          </Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="plein écran"
        note="Dix choix : la liste prend l'écran en swivel, le label en titre, les choix en cascade, défilée sur le choix courant."
      >
        <Select defaultValue="lomé">
          <Select.Label>ville</Select.Label>
          <Select.Trigger>
            <Select.Value placeholder="choisir une ville" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content paddingTop={pageTop}>
            {CITIES.map(name => (
              <Select.Item key={name} value={name}>
                {name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="le mode forcé"
        note="mode sur Content : quatre choix en plein écran, dix sur place."
      >
        <Select defaultValue="fast">
          <Select.Label>quatre, en plein écran</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content mode="fullscreen" paddingTop={pageTop}>
            {SpeedItems()}
          </Select.Content>
        </Select>
        <Select defaultValue="bamako">
          <Select.Label>dix, sur place</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content mode="inline">
            {CITIES.map(name => (
              <Select.Item key={name} value={name}>
                {name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="les accents"
        note="Ouvert : la bordure et le choix courant dans l'encre de l'accent. Lime, ambre et jaune sont assombris sur blanc."
      >
        {ACCENTS.map(accent => (
          <Select key={accent} accent={accent} defaultValue="normal">
            <Select.Label>{accent}</Select.Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Overlay />
            <Select.Content>{SpeedItems()}</Select.Content>
          </Select>
        ))}
      </TramSection>

      <TramSection
        title="color brut"
        note="color l'emporte sur accent et n'est jamais corrigé."
      >
        <Select accent="lime" color="#E3008C" defaultValue="normal">
          <Select.Label>#E3008C</Select.Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>{SpeedItems()}</Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="asChild"
        note="La racine, le Trigger et l'Item se fondent dans l'élément du caller."
      >
        <Select asChild defaultValue="slow">
          <View testID="select-root-as-child">
            <Select.Label>vitesse</Select.Label>
            <Select.Trigger asChild>
              <Pressable testID="select-trigger-as-child">
                <Select.Value />
                <Select.Indicator />
              </Pressable>
            </Select.Trigger>
            <Select.Overlay />
            <Select.Content>
              {SPEEDS.map(item => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  asChild
                >
                  <Pressable testID={`select-item-${item.value}`}>
                    <Select.ItemLabel>{item.label}</Select.ItemLabel>
                  </Pressable>
                </Select.Item>
              ))}
            </Select.Content>
          </View>
        </Select>
      </TramSection>

      <TramSection
        title="props de style"
        note="Sur la racine, le Trigger, la valeur et les items : largeur, padding, fond, casse."
      >
        <Select defaultValue="normal" width={240} gap={12}>
          <Select.Label textTransform="uppercase" letterSpacing={1}>
            vitesse
          </Select.Label>
          <Select.Trigger
            paddingHorizontal={20}
            backgroundColor={theme.colors.surface}
          >
            <Select.Value textTransform="uppercase" />
            <Select.Indicator size={16} />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content backgroundColor={theme.colors.surface}>
            {SPEEDS.map(item => (
              <Select.Item
                key={item.value}
                value={item.value}
                paddingHorizontal={20}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </TramSection>

      <TramSection
        title="dessous"
        note="Ce bloc est poussé quand un select se déplie."
      >
        <Typography variant="body">la suite de la page.</Typography>
        <Button variant="outline">un bouton</Button>
      </TramSection>
    </ScrollView>
  )
}
