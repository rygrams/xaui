import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Combobox } from '@xaui/tram/combobox'
import type { ComboboxSize } from '@xaui/tram/combobox'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: ComboboxSize[] = ['sm', 'md', 'lg']

const CITIES = [
  ['abj', 'Abidjan'],
  ['bko', 'Bamako'],
  ['bod', 'Bordeaux'],
  ['bru', 'Bruxelles'],
  ['dkr', 'Dakar'],
  ['gva', 'Genève'],
  ['lil', 'Lille'],
  ['lfw', 'Lomé'],
  ['lyn', 'Lyon'],
  ['mrs', 'Marseille'],
  ['yul', 'Montréal'],
  ['nte', 'Nantes'],
  ['oua', 'Ouagadougou'],
  ['par', 'Paris'],
  ['rba', 'Rabat'],
  ['tls', 'Toulouse'],
] as const

function CityItems() {
  return CITIES.map(([value, name]) => (
    <Combobox.Item key={value} value={value}>
      {name}
    </Combobox.Item>
  ))
}

/**
 * Where the Tram `Combobox` is verified, in dark and in light: the list unfolded under
 * the field being typed into, scrolling past five rows, the letters found in the accent,
 * the empty line, the label put back on a close without a choice, the three sizes,
 * controlled, invalid, disabled and an accent.
 */
export default function TramComboboxScreen() {
  const theme = useXAUITheme()
  const [city, setCity] = useState<string>()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
    >
      <TramSection
        title="dans la boîte"
        note="Taper déplie la liste sous le champ et pousse ce qui suit ; cinq lignes, puis elle défile. Quitter sans choisir remet la ville choisie."
      >
        <Combobox>
          <Combobox.Label>ville</Combobox.Label>
          <Combobox.Trigger>
            <Combobox.Input placeholder="chercher une ville" />
            <Combobox.Indicator accessibilityLabel="ouvrir la liste" />
          </Combobox.Trigger>
          <Combobox.Overlay />
          <Combobox.Content>
            {CityItems()}
            <Combobox.Empty>Aucune ville ne correspond.</Combobox.Empty>
          </Combobox.Content>
          <Combobox.Description>
            Une seule, et elle doit être dans la liste.
          </Combobox.Description>
        </Combobox>
        <Typography variant="caption" color={theme.colors.muted}>
          Ce texte est poussé quand la liste se déplie.
        </Typography>
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`value et onValueChange. Valeur : « ${city ?? '—'} »`}
      >
        <Combobox value={city} onValueChange={setCity}>
          <Combobox.Label>ville</Combobox.Label>
          <Combobox.Trigger>
            <Combobox.Input placeholder="chercher une ville" />
            <Combobox.Indicator accessibilityLabel="ouvrir la liste" />
          </Combobox.Trigger>
          <Combobox.Overlay />
          <Combobox.Content>
            {CityItems()}
            <Combobox.Empty>Aucune ville ne correspond.</Combobox.Empty>
          </Combobox.Content>
        </Combobox>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — 40, 48, 56 de haut ; une ligne fait 48 au moins, jamais moins que le champ."
      >
        {SIZES.map(size => (
          <Combobox key={size} size={size} defaultValue="dkr">
            <Combobox.Label>{size}</Combobox.Label>
            <Combobox.Trigger>
              <Combobox.Input placeholder="chercher une ville" />
              <Combobox.Indicator accessibilityLabel="ouvrir la liste" />
            </Combobox.Trigger>
            <Combobox.Overlay />
            <Combobox.Content>{CityItems()}</Combobox.Content>
          </Combobox>
        ))}
      </TramSection>

      <TramSection
        title="invalide, désactivé, accent"
        note="Invalide : la ligne en danger. Désactivé : gris, ni saisie ni liste. accent repeint la ligne ouverte, le choix et les lettres trouvées."
      >
        <Combobox isInvalid>
          <Combobox.Label>ville</Combobox.Label>
          <Combobox.Trigger>
            <Combobox.Input placeholder="chercher une ville" />
            <Combobox.Indicator accessibilityLabel="ouvrir la liste" />
          </Combobox.Trigger>
          <Combobox.Overlay />
          <Combobox.Content>{CityItems()}</Combobox.Content>
          <Combobox.Error>Choisissez une ville de la liste.</Combobox.Error>
        </Combobox>
        <Combobox isDisabled defaultValue="bko">
          <Combobox.Label>ville</Combobox.Label>
          <Combobox.Trigger>
            <Combobox.Input />
            <Combobox.Indicator accessibilityLabel="ouvrir la liste" />
          </Combobox.Trigger>
          <Combobox.Content>{CityItems()}</Combobox.Content>
        </Combobox>
        <Combobox accent="magenta" defaultValue="oua">
          <Combobox.Label>magenta</Combobox.Label>
          <Combobox.Trigger>
            <Combobox.Input />
            <Combobox.Indicator accessibilityLabel="ouvrir la liste" />
          </Combobox.Trigger>
          <Combobox.Overlay />
          <Combobox.Content>{CityItems()}</Combobox.Content>
        </Combobox>
      </TramSection>
    </ScrollView>
  )
}
