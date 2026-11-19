import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { SearchField } from '@xaui/tram/search-field'
import type { SearchFieldSize } from '@xaui/tram/search-field'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const SIZES: SearchFieldSize[] = ['sm', 'md', 'lg']

/** Two that are too light to read as a line on white, and one that is not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'magenta']

const RECORDS = [
  'Nuits de Lagos',
  'Talking Timbuktu',
  'Dimanche à Bamako',
  'Moussolou',
  'Rail Band',
]

/**
 * Where the Tram `SearchField` is verified, in dark and in light: the three sizes, the
 * two variants, a list filtered as you type and a query submitted with the search key,
 * the cross that shows only with text, invalid, disabled, named accents, a raw `color`, a
 * mark of another size and the style props.
 */
export default function TramSearchFieldScreen() {
  const theme = useXAUITheme()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')

  const found = RECORDS.filter(name =>
    name.toLowerCase().includes(query.trim().toLowerCase())
  )
  const text = { color: theme.colors.foreground, fontSize: 16 }
  const muted = { color: theme.colors.muted, fontSize: 14 }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <TramSection
        title="filtrer en tapant"
        note="onValueChange à chaque touche et à l'effacement ; la croix n'apparaît qu'avec du texte, et rend le focus."
      >
        <SearchField value={query} onValueChange={setQuery} onSearch={setSubmitted}>
          <SearchField.Label>vinyles</SearchField.Label>
          <SearchField.Field placeholder="rechercher">
            <SearchField.Icon />
            <SearchField.Clear accessibilityLabel="effacer la recherche" />
          </SearchField.Field>
          <SearchField.Description>par titre.</SearchField.Description>
        </SearchField>
        <View style={{ gap: 6 }}>
          {found.length > 0 ? (
            found.map(name => (
              <Text key={name} style={text}>
                {name}
              </Text>
            ))
          ) : (
            <Text style={muted}>rien pour « {query} ».</Text>
          )}
          <Text style={muted}>
            dernière recherche envoyée : {submitted ? `« ${submitted} »` : 'aucune'}
          </Text>
        </View>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — 40, 48, 56 de haut, la loupe et la croix en 16, 20, 24. Sans enfants, le champ dessine la loupe seule."
      >
        {SIZES.map(size => (
          <SearchField
            key={size}
            size={size}
            defaultValue={size === 'md' ? 'lagos' : ''}
          >
            <SearchField.Field placeholder={size}>
              <SearchField.Icon />
              <SearchField.Clear accessibilityLabel="effacer" />
            </SearchField.Field>
          </SearchField>
        ))}
        <SearchField>
          <SearchField.Field placeholder="sans enfants : la loupe seule" />
        </SearchField>
      </TramSection>

      <TramSection
        title="secondary"
        note="La surface discrète, sans trait au repos ; le trait d'accent vient avec le focus. Pour une recherche posée sur une surface."
      >
        <View
          style={{ padding: 16, gap: 12, backgroundColor: theme.colors.surface }}
        >
          <SearchField variant="secondary" defaultValue="timbuktu">
            <SearchField.Field placeholder="rechercher">
              <SearchField.Icon />
              <SearchField.Clear accessibilityLabel="effacer" />
            </SearchField.Field>
          </SearchField>
        </View>
        <SearchField variant="secondary">
          <SearchField.Field placeholder="secondary sur le fond" />
        </SearchField>
      </TramSection>

      <TramSection
        title="invalide et désactivé"
        note="Invalide : le trait en danger, focus compris, dans les deux variantes. Désactivé : tout gris, la croix ne répond plus."
      >
        <SearchField isInvalid defaultValue="#?">
          <SearchField.Field>
            <SearchField.Icon />
            <SearchField.Clear accessibilityLabel="effacer" />
          </SearchField.Field>
          <SearchField.Error>
            des lettres ou des chiffres seulement.
          </SearchField.Error>
        </SearchField>
        <SearchField isInvalid variant="secondary" defaultValue="#?">
          <SearchField.Field />
        </SearchField>
        <SearchField isDisabled defaultValue="bamako">
          <SearchField.Field>
            <SearchField.Icon />
            <SearchField.Clear accessibilityLabel="effacer" />
          </SearchField.Field>
        </SearchField>
      </TramSection>

      <TramSection
        title="accent et color"
        note="Au focus, le trait est l'accent lu comme encre ; une teinte brute n'est jamais corrigée."
      >
        {ACCENTS.map(accent => (
          <SearchField key={accent} accent={accent}>
            <SearchField.Field placeholder={accent} />
          </SearchField>
        ))}
        <SearchField color={theme.colors.success}>
          <SearchField.Field placeholder="color : le succès du thème" />
        </SearchField>
      </TramSection>

      <TramSection
        title="la loupe et les props de style"
        note="Icon size et color ; une clé de boîte (borderColor, height) va sur la boîte, une clé de texte (fontSize) sur le texte."
      >
        <SearchField>
          <SearchField.Field placeholder="loupe de 24, en accent">
            <SearchField.Icon size={24} color={theme.colors.focus} />
          </SearchField.Field>
        </SearchField>
        <SearchField maxWidth={260}>
          <SearchField.Field
            placeholder="trait fixe, texte en 14"
            borderColor={theme.colors.foreground}
            fontSize={14}
          />
        </SearchField>
      </TramSection>
    </ScrollView>
  )
}
