import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Chip } from '@xaui/tram/chip'
import type { ChipSize, ChipVariant } from '@xaui/tram/chip'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const VARIANTS: ChipVariant[] = ['contained', 'flat', 'outline', 'text']

/** What Native calls success, warning and danger: three of the twenty accents. */
const STATUSES: { accent: TramAccentName; label: string }[] = [
  { accent: 'green', label: 'livré' },
  { accent: 'amber', label: 'en attente' },
  { accent: 'red', label: 'échec' },
]

const SIZES: ChipSize[] = ['sm', 'md', 'lg']

const FILTERS = ['non lus', 'pièces jointes', 'cette semaine']

const PEOPLE = ['inès', 'moussa', 'awa']

const ACCENTS: TramAccentName[] = ['lime', 'magenta', 'cobalt']

const PHOTO = { uri: 'https://picsum.photos/seed/tram-chip/120/120' }

/**
 * Where the Tram `Chip` is verified, in dark and in light: filters that toggle and lean,
 * the `Button`'s four drawings, a status as a colour, the sizes, an avatar and a cross.
 */
export default function TramChipScreen() {
  const theme = useXAUITheme()
  const [on, setOn] = useState<string[]>(['non lus'])
  const [people, setPeople] = useState(PEOPLE)

  const toggle = (filter: string) =>
    setOn(current =>
      current.includes(filter)
        ? current.filter(value => value !== filter)
        : [...current, filter]
    )

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="des filtres"
        note="isPressable : la puce penche vers le doigt comme le Button, et ne change pas de couleur sous lui."
      >
        <Wrap>
          {FILTERS.map(filter => {
            const isOn = on.includes(filter)
            return (
              <Chip
                key={filter}
                isPressable
                variant={isOn ? 'contained' : 'outline'}
                accessibilityState={{ selected: isOn }}
                onPress={() => toggle(filter)}
              >
                {filter}
              </Chip>
            )
          })}
        </Wrap>
      </TramSection>

      <TramSection
        title="les quatre dessins"
        note="Ceux du Button : contained (par défaut), flat, outline, text. Sur flat, le point carré prend la couleur pleine."
      >
        <Wrap>
          {VARIANTS.map(variant => (
            <Chip key={variant} variant={variant}>
              <Chip.Dot />
              <Chip.Label>{variant}</Chip.Label>
            </Chip>
          ))}
        </Wrap>
      </TramSection>

      <TramSection
        title="un statut est une couleur"
        note="green, amber et red pour ce que Native appelle success, warning et danger."
      >
        {VARIANTS.map(variant => (
          <Wrap key={variant}>
            {STATUSES.map(status => (
              <Chip key={status.accent} variant={variant} accent={status.accent}>
                <Chip.Dot />
                <Chip.Label>{status.label}</Chip.Label>
              </Chip>
            ))}
          </Wrap>
        ))}
      </TramSection>

      <TramSection title="les tailles" note="24, 32, 40 de haut, coin de 2.">
        <Wrap>
          {SIZES.map(size => (
            <Chip key={size} size={size} variant="outline">
              {size}
            </Chip>
          ))}
        </Wrap>
      </TramSection>

      <TramSection
        title="une vignette, une croix"
        note="Chip.Avatar est un carré net ; Chip.Close, deux barres du trait du Button, sans cercle."
      >
        <Wrap>
          {people.map(person => (
            <Chip key={person} variant="flat">
              <Chip.Avatar source={PHOTO} />
              <Chip.Label>{person}</Chip.Label>
              <Chip.Close
                accessibilityLabel={`retirer ${person}`}
                onPress={() =>
                  setPeople(current => current.filter(value => value !== person))
                }
              />
            </Chip>
          ))}
          {people.length === 0 ? (
            <Chip isPressable variant="text" onPress={() => setPeople(PEOPLE)}>
              tout remettre
            </Chip>
          ) : null}
        </Wrap>
      </TramSection>

      <TramSection
        title="la couleur"
        note="lime, magenta, cobalt et une couleur brute, dans les quatre dessins."
      >
        {VARIANTS.map(variant => (
          <Wrap key={variant}>
            {ACCENTS.map(accent => (
              <Chip key={accent} variant={variant} accent={accent}>
                <Chip.Dot />
                <Chip.Label>{accent}</Chip.Label>
              </Chip>
            ))}
            <Chip variant={variant} color="#7c3aed">
              <Chip.Dot />
              <Chip.Label>brut</Chip.Label>
            </Chip>
          </Wrap>
        ))}
      </TramSection>

      <TramSection title="désactivée" note="L'opacité du thème, rien d'autre.">
        <Wrap>
          <Chip isPressable isDisabled>
            non lus
          </Chip>
          <Chip isDisabled variant="flat">
            <Chip.Label>inès</Chip.Label>
            <Chip.Close accessibilityLabel="retirer inès" />
          </Chip>
        </Wrap>
        <Typography variant="caption" color={theme.colors.muted}>
          {on.length} filtre(s) actif(s)
        </Typography>
      </TramSection>
    </ScrollView>
  )
}

function Wrap({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {children}
    </View>
  )
}
