import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Radio } from '@xaui/tram/radio'
import type { RadioSize } from '@xaui/tram/radio'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: RadioSize[] = ['sm', 'md', 'lg']

/** The three that are pale on white, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

const PLANS = [
  { value: 'monthly', label: 'tous les mois' },
  { value: 'yearly', label: 'tous les ans' },
  { value: 'lifetime', label: 'à vie' },
]

/**
 * Where the Tram `Radio` is verified, in dark and in light: the three sizes, a controlled
 * set and one that holds its own value, a column and a row, a disabled option and a
 * disabled set, invalid, named accents, a raw `color`, and a label that wraps.
 */
export default function TramRadioScreen() {
  const theme = useXAUITheme()
  const [plan, setPlan] = useState('monthly')
  const [isMuted, setIsMuted] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les tailles"
        note="20, 26 et 34. La cible tactile atteint 48 partout, et le groupe pose ses options tous les 48."
      >
        {SIZES.map(size => (
          <Radio.Group
            key={size}
            size={size}
            defaultValue="b"
            orientation="horizontal"
          >
            <Radio value="a">{size}</Radio>
            <Radio value="b">choisi</Radio>
          </Radio.Group>
        ))}
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`value et onValueChange sur le groupe. Formule : ${plan}`}
      >
        <Radio.Group value={plan} onValueChange={setPlan}>
          {PLANS.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </TramSection>

      <TramSection
        title="non contrôlé"
        note="defaultValue : le groupe garde sa valeur. Sans defaultValue, aucune option n'est choisie au départ."
      >
        <Radio.Group defaultValue="train">
          <Radio value="train">train</Radio>
          <Radio value="tram">tram</Radio>
        </Radio.Group>
        <Radio.Group>
          <Radio value="oui">oui</Radio>
          <Radio value="non">non</Radio>
        </Radio.Group>
      </TramSection>

      <TramSection
        title="horizontal"
        note="orientation : la rangée passe à la ligne plutôt que de déborder."
      >
        <Radio.Group orientation="horizontal" defaultValue="m">
          <Radio value="s">petit</Radio>
          <Radio value="m">moyen</Radio>
          <Radio value="l">grand</Radio>
          <Radio value="xl">très grand</Radio>
        </Radio.Group>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Une option désactivée dans un groupe vivant, puis le groupe entier : cercle, point et texte gris, sans accent."
      >
        <Radio.Group defaultValue="carte">
          <Radio value="carte">carte</Radio>
          <Radio value="virement" isDisabled>
            virement, indisponible
          </Radio>
          <Radio value="especes">espèces</Radio>
        </Radio.Group>
        <Radio.Group defaultValue="a" isDisabled accent="lime">
          <Radio value="a">choisie</Radio>
          <Radio value="b">vide</Radio>
        </Radio.Group>
      </TramSection>

      <TramSection
        title="invalide"
        note="Le trait et le point passent au danger du thème ; le libellé garde son encre, et l'accent cède."
      >
        <Radio.Group isInvalid defaultValue="a" accent="lime">
          <Radio value="a">invalide et choisie</Radio>
          <Radio value="b">invalide</Radio>
        </Radio.Group>
      </TramSection>

      <TramSection
        title="accent"
        note="Le point est un aplat : la vraie couleur, même le jaune sur blanc. Une option garde le sien dans un groupe."
      >
        {ACCENTS.map(accent => (
          <Radio key={accent} accent={accent} defaultSelected>
            {accent}
          </Radio>
        ))}
        <Radio.Group accent="cobalt" defaultValue="a" orientation="horizontal">
          <Radio value="a">groupe cobalt</Radio>
          <Radio value="b" accent="magenta">
            option magenta
          </Radio>
        </Radio.Group>
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette — ici le succès du thème."
      >
        <Radio.Group color={theme.colors.success} defaultValue="a">
          <Radio value="a">sauvegarde locale</Radio>
          <Radio value="b">sauvegarde distante</Radio>
        </Radio.Group>
      </TramSection>

      <TramSection
        title="seul"
        note={`Sans groupe, sur son propre isSelected : un appui choisit et n'efface jamais. État : ${isMuted ? 'silencieux' : 'sonore'}`}
      >
        <Radio isSelected={isMuted} onSelectedChange={() => setIsMuted(true)}>
          silencieux
        </Radio>
        <Radio accessibilityLabel="cercle seul" />
      </TramSection>

      <TramSection
        title="composition"
        note="Un libellé long aligné en haut, une marque à soi dans Indicator, le libellé avant le cercle, sans animation."
      >
        <Radio.Group defaultValue="long" alignSelf="stretch">
          <Radio value="long" alignItems="flex-start" alignSelf="stretch">
            <Radio.Indicator />
            <Radio.Label flex={1}>
              un libellé assez long pour passer à la ligne, avec le cercle contre sa
              première ligne plutôt que centré sur le paragraphe
            </Radio.Label>
          </Radio>
          <Radio value="own">
            <Radio.Indicator>
              <Typography variant="caption">ok</Typography>
            </Radio.Indicator>
            <Radio.Label>marque à soi</Radio.Label>
          </Radio>
          <Radio value="end" alignSelf="stretch" justifyContent="space-between">
            <Radio.Label>libellé au début</Radio.Label>
            <Radio.Indicator />
          </Radio>
          <Radio value="still" animation="disable-all">
            sans animation
          </Radio>
        </Radio.Group>
      </TramSection>
    </ScrollView>
  )
}
