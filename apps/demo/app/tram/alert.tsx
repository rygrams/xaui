import { useState } from 'react'
import { ScrollView } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Alert } from '@xaui/tram/alert'
import type { AlertSize, AlertVariant } from '@xaui/tram/alert'
import { Button } from '@xaui/tram/button'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const VARIANTS: AlertVariant[] = ['flat', 'outline', 'contained']

type Sample = {
  accent?: TramAccentName
  icon: (props: IconComponentProps) => React.JSX.Element
  title: string
  description: string
}

/** The theme's accent, then what Native calls success, warning and danger. */
const SAMPLES: Sample[] = [
  {
    icon: InfoIcon,
    title: 'synchronisation en pause',
    description: 'Le compte se resynchronise dès que le Wi-Fi revient.',
  },
  {
    accent: 'green',
    icon: CheckIcon,
    title: 'brouillon envoyé',
    description: 'Inès le recevra à sa prochaine connexion.',
  },
  {
    accent: 'amber',
    icon: BangIcon,
    title: 'espace presque plein',
    description: 'Il reste 180 Mo sur ce compte.',
  },
  {
    accent: 'red',
    icon: CrossIcon,
    title: 'envoi impossible',
    description: 'Le serveur a refusé la pièce jointe (25 Mo au plus).',
  },
]

const SIZES: AlertSize[] = ['sm', 'md', 'lg']

const ACCENTS: TramAccentName[] = ['lime', 'magenta']

/**
 * Where the Tram `Alert` is verified, in dark and in light: the three drawings, a status
 * as a colour, the sizes, closing, colour.
 */
export default function TramAlertScreen() {
  const theme = useXAUITheme()
  const [closed, setClosed] = useState<string[]>([])

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="les trois dessins"
        note="Ceux du Button : flat (par défaut), outline, contained. Le carré est plein, sauf sur contained, où il passe au trait de l'encre. Sans ombre."
      >
        {VARIANTS.map(variant => {
          const key = `drawing-${variant}`
          return closed.includes(key) ? null : (
            <Alert key={key} variant={variant}>
              <Alert.Icon as={InfoIcon} />
              <Alert.Content>
                <Alert.Title>{variant}</Alert.Title>
                <Alert.Description>
                  Le compte se resynchronise dès que le Wi-Fi revient.
                </Alert.Description>
              </Alert.Content>
              <Alert.Close
                accessibilityLabel={`fermer : ${variant}`}
                onPress={() => setClosed(current => [...current, key])}
              />
            </Alert>
          )
        })}
        {closed.length > 0 ? (
          <Button variant="outline" size="sm" onPress={() => setClosed([])}>
            tout remettre
          </Button>
        ) : null}
      </TramSection>

      <TramSection
        title="un statut est une couleur"
        note="green, amber et red pour ce que Native appelle success, warning et danger — en flat, puis en contained."
      >
        {(['flat', 'contained'] as const).flatMap(variant =>
          SAMPLES.map(sample => (
            <Alert
              key={`${variant}-${sample.title}`}
              variant={variant}
              accent={sample.accent}
            >
              <Alert.Icon as={sample.icon} />
              <Alert.Content>
                <Alert.Title>{sample.title}</Alert.Title>
                <Alert.Description>{sample.description}</Alert.Description>
              </Alert.Content>
            </Alert>
          ))
        )}
      </TramSection>

      <TramSection
        title="les tailles"
        note="Les rôles de la Card : body, subtitle, title ; un carré de 32, 40, 48."
      >
        {SIZES.map(size => (
          <Alert key={size} size={size} accent="amber">
            <Alert.Icon as={BangIcon} />
            <Alert.Content>
              <Alert.Title>taille {size}</Alert.Title>
              <Alert.Description>Il reste 180 Mo sur ce compte.</Alert.Description>
            </Alert.Content>
          </Alert>
        ))}
      </TramSection>

      <TramSection
        title="une phrase"
        note="Un texte nu devient la description : l'alerte la plus simple."
      >
        <Alert>Le compte se resynchronise dès que le Wi-Fi revient.</Alert>
      </TramSection>

      <TramSection
        title="la couleur"
        note="lime et magenta au trait, puis une couleur brute pleine."
      >
        {ACCENTS.map(accent => (
          <Alert key={accent} variant="outline" accent={accent}>
            <Alert.Icon as={InfoIcon} />
            <Alert.Content>
              <Alert.Title>{accent}</Alert.Title>
              <Alert.Description>
                {"Le trait du Button, dans l'accent."}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        ))}
        <Alert variant="contained" color="#7c3aed">
          <Alert.Icon as={InfoIcon} />
          <Alert.Content>
            <Alert.Title>couleur brute</Alert.Title>
            <Alert.Description>#7c3aed, en contained.</Alert.Description>
          </Alert.Content>
        </Alert>
      </TramSection>
    </ScrollView>
  )
}

function InfoIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 10v9M12 5v2" stroke={color} strokeWidth={2.5} />
    </Svg>
  )
}

function CheckIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} strokeWidth={2.5} />
    </Svg>
  )
}

function BangIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4v11M12 18v2" stroke={color} strokeWidth={2.5} />
    </Svg>
  )
}

function CrossIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2.5} />
    </Svg>
  )
}
