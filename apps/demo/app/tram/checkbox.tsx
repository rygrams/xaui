import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Checkbox } from '@xaui/tram/checkbox'
import type { CheckboxSize } from '@xaui/tram/checkbox'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: CheckboxSize[] = ['sm', 'md', 'lg']

/** The three that are pale on white, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

const TOPPINGS = ['olives', 'champignons', 'anchois']

/**
 * Where the Tram `Checkbox` is verified, in dark and in light: the three sizes, controlled
 * and not, the third state driven by a list, disabled, invalid, named accents, a raw
 * `color`, and a custom mark.
 */
export default function TramCheckboxScreen() {
  const theme = useXAUITheme()
  const [isAccepted, setIsAccepted] = useState(false)
  const [picked, setPicked] = useState<string[]>(['olives'])

  const isAll = picked.length === TOPPINGS.length
  const isSome = picked.length > 0 && !isAll

  const toggle = (topping: string) =>
    setPicked(current =>
      current.includes(topping)
        ? current.filter(item => item !== topping)
        : [...current, topping]
    )

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les tailles"
        note="20, 26 et 34 — l'échelle du radio Metro. La cible tactile atteint 48 partout."
      >
        {SIZES.map(size => (
          <Checkbox key={size} size={size} defaultSelected={size !== 'sm'}>
            {size}
          </Checkbox>
        ))}
      </TramSection>

      <TramSection
        title="non contrôlé"
        note="defaultSelected : la case garde son propre état. Sans enfant, c'est la case seule."
      >
        <Checkbox defaultSelected>se souvenir de moi</Checkbox>
        <Checkbox accessibilityLabel="case seule" />
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`isSelected et onSelectedChange. État : ${isAccepted ? 'accepté' : 'en attente'}`}
      >
        <Checkbox isSelected={isAccepted} onSelectedChange={setIsAccepted}>
          {"j'accepte les conditions"}
        </Checkbox>
      </TramSection>

      <TramSection
        title="indéterminé"
        note="La première case parle pour les trois : une barre tant que certaines seulement sont cochées."
      >
        <Checkbox
          isSelected={isAll}
          isIndeterminate={isSome}
          onSelectedChange={next => setPicked(next ? TOPPINGS : [])}
        >
          tout
        </Checkbox>
        <View style={{ paddingStart: 24, gap: 12 }}>
          {TOPPINGS.map(topping => (
            <Checkbox
              key={topping}
              size="sm"
              isSelected={picked.includes(topping)}
              onSelectedChange={() => toggle(topping)}
            >
              {topping}
            </Checkbox>
          ))}
        </View>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Case, marque et texte gris, sans accent — cochée comme vide."
      >
        <Checkbox isDisabled defaultSelected>
          cochée
        </Checkbox>
        <Checkbox isDisabled isIndeterminate>
          indéterminée
        </Checkbox>
        <Checkbox isDisabled>vide</Checkbox>
      </TramSection>

      <TramSection
        title="invalide"
        note="Le trait et la marque passent au danger du thème ; le libellé garde son encre."
      >
        <Checkbox isInvalid>conditions à accepter</Checkbox>
        <Checkbox isInvalid defaultSelected accent="lime">
          {"invalide et cochée : l'accent cède"}
        </Checkbox>
      </TramSection>

      <TramSection
        title="accent"
        note="La marque est un aplat : la vraie couleur, même le jaune sur blanc."
      >
        {ACCENTS.map(accent => (
          <Checkbox key={accent} accent={accent} defaultSelected>
            {accent}
          </Checkbox>
        ))}
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette — ici le succès du thème."
      >
        <Checkbox color={theme.colors.success} defaultSelected>
          sauvegarde terminée
        </Checkbox>
      </TramSection>

      <TramSection
        title="composition"
        note="Une marque à soi dans Indicator, le libellé avant la case, un texte long aligné en haut, sans animation."
      >
        <Checkbox defaultSelected>
          <Checkbox.Indicator>
            <Typography variant="caption">ok</Typography>
          </Checkbox.Indicator>
          <Checkbox.Label>marque à soi</Checkbox.Label>
        </Checkbox>
        <Checkbox defaultSelected alignSelf="stretch" justifyContent="space-between">
          <Checkbox.Label>libellé au début</Checkbox.Label>
          <Checkbox.Indicator />
        </Checkbox>
        <Checkbox alignItems="flex-start" alignSelf="stretch">
          <Checkbox.Indicator />
          <Checkbox.Label flex={1}>
            un libellé assez long pour passer à la ligne, avec la case contre sa
            première ligne plutôt que centrée sur le paragraphe
          </Checkbox.Label>
        </Checkbox>
        <Checkbox defaultSelected animation="disable-all">
          sans animation
        </Checkbox>
      </TramSection>
    </ScrollView>
  )
}
