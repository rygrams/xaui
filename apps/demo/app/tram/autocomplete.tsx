import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useXAUITheme } from '@xaui/native/theme'
import { Autocomplete } from '@xaui/tram/autocomplete'
import type { AutocompleteSize } from '@xaui/tram/autocomplete'
import { SearchField } from '@xaui/tram/search-field'
import { TramSection } from '../../components/tram-section'

const SIZES: AutocompleteSize[] = ['sm', 'md', 'lg']

const COUNTRIES = [
  ['de', 'Allemagne'],
  ['dz', 'Algérie'],
  ['be', 'Belgique'],
  ['bj', 'Bénin'],
  ['br', 'Brésil'],
  ['bf', 'Burkina Faso'],
  ['cm', 'Cameroun'],
  ['ca', 'Canada'],
  ['ci', 'Côte d’Ivoire'],
  ['es', 'Espagne'],
  ['us', 'États-Unis'],
  ['fr', 'France'],
  ['ga', 'Gabon'],
  ['gn', 'Guinée'],
  ['ie', 'Irlande'],
  ['it', 'Italie'],
  ['jp', 'Japon'],
  ['lu', 'Luxembourg'],
  ['mg', 'Madagascar'],
  ['ml', 'Mali'],
  ['ma', 'Maroc'],
  ['mx', 'Mexique'],
  ['ne', 'Niger'],
  ['nl', 'Pays-Bas'],
  ['pt', 'Portugal'],
  ['cd', 'RD Congo'],
  ['gb', 'Royaume-Uni'],
  ['sn', 'Sénégal'],
  ['se', 'Suède'],
  ['ch', 'Suisse'],
  ['tg', 'Togo'],
  ['tn', 'Tunisie'],
] as const

function CountryItems() {
  return COUNTRIES.map(([value, name]) => (
    <Autocomplete.Item key={value} value={value}>
      {name}
    </Autocomplete.Item>
  ))
}

/**
 * Where the Tram `Autocomplete` is verified, in dark and in light: the three sizes, the
 * page with the search held under its title, the letters found in the accent, the empty
 * line, a current choice far down the list, controlled value and query, the clear mark,
 * invalid, disabled, and named accents.
 */
export default function TramAutocompleteScreen() {
  const theme = useXAUITheme()
  const insets = useSafeAreaInsets()
  const [country, setCountry] = useState<string>('sn')
  const [query, setQuery] = useState('')
  // Tram reads no safe area: the page is padded with the app's own inset.
  const pageTop = insets.top + 24

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="la page"
        note="Le déclencheur du Select ; la liste est sa page, qui pivote sur son bord haut. La recherche a le focus et reste sous le titre ; les lettres trouvées sont à l'accent."
      >
        <Autocomplete>
          <Autocomplete.Label>pays de facturation</Autocomplete.Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value placeholder="choisir un pays" />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Content paddingTop={pageTop}>
            <Autocomplete.Search placeholder="nom du pays" />
            {CountryItems()}
            <Autocomplete.Empty>Aucun pays ne correspond.</Autocomplete.Empty>
          </Autocomplete.Content>
          <Autocomplete.Description>
            Une trentaine de pays : on cherche, on ne lit pas.
          </Autocomplete.Description>
        </Autocomplete>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — la boîte du TextField ; la recherche de la page prend la même taille."
      >
        {SIZES.map(size => (
          <Autocomplete key={size} size={size} defaultValue="fr">
            <Autocomplete.Label>{size}</Autocomplete.Label>
            <Autocomplete.Trigger>
              <Autocomplete.Value />
              <Autocomplete.Indicator />
            </Autocomplete.Trigger>
            <Autocomplete.Content paddingTop={pageTop}>
              <Autocomplete.Search placeholder="nom du pays" />
              {CountryItems()}
            </Autocomplete.Content>
          </Autocomplete>
        ))}
      </TramSection>

      <TramSection
        title="contrôlé, la croix"
        note={`value, query et leurs rappels. Valeur : « ${country} », recherche : « ${query} ». La page s'ouvre sur le choix courant, la recherche reste visible.`}
      >
        <Autocomplete
          value={country}
          onValueChange={setCountry}
          query={query}
          onQueryChange={setQuery}
        >
          <Autocomplete.Label>pays</Autocomplete.Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Content paddingTop={pageTop}>
            <Autocomplete.Search placeholder="nom du pays">
              <SearchField.Icon />
              <SearchField.Clear accessibilityLabel="effacer la recherche" />
            </Autocomplete.Search>
            {CountryItems()}
            <Autocomplete.Empty>Aucun pays ne correspond.</Autocomplete.Empty>
          </Autocomplete.Content>
        </Autocomplete>
      </TramSection>

      <TramSection
        title="invalide, désactivé"
        note="Invalide : la ligne en danger, le label et la description gardent leur encre. Désactivé : gris, ne s'ouvre pas."
      >
        <Autocomplete isInvalid>
          <Autocomplete.Label>pays</Autocomplete.Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value placeholder="choisir un pays" />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Content paddingTop={pageTop}>
            <Autocomplete.Search placeholder="nom du pays" />
            {CountryItems()}
          </Autocomplete.Content>
          <Autocomplete.Error>Choisissez un pays.</Autocomplete.Error>
        </Autocomplete>
        <Autocomplete isDisabled defaultValue="ml">
          <Autocomplete.Label>pays</Autocomplete.Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Content paddingTop={pageTop}>
            <Autocomplete.Search placeholder="nom du pays" />
            {CountryItems()}
          </Autocomplete.Content>
        </Autocomplete>
      </TramSection>

      <TramSection
        title="les accents"
        note="accent repeint la ligne ouverte, le choix courant et les lettres trouvées, lus comme encre."
      >
        {(['lime', 'magenta'] as const).map(accent => (
          <Autocomplete key={accent} accent={accent} defaultValue="ci">
            <Autocomplete.Label>{accent}</Autocomplete.Label>
            <Autocomplete.Trigger>
              <Autocomplete.Value />
              <Autocomplete.Indicator />
            </Autocomplete.Trigger>
            <Autocomplete.Content paddingTop={pageTop}>
              <Autocomplete.Search placeholder="nom du pays" />
              {CountryItems()}
            </Autocomplete.Content>
          </Autocomplete>
        ))}
      </TramSection>
    </ScrollView>
  )
}
