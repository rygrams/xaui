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

type Sample = {
  variant: AlertVariant
  icon: (props: IconComponentProps) => React.JSX.Element
  title: string
  description: string
}

const SAMPLES: Sample[] = [
  {
    variant: 'default',
    icon: InfoIcon,
    title: 'synchronisation en pause',
    description: 'Le compte se resynchronise dès que le Wi-Fi revient.',
  },
  {
    variant: 'secondary',
    icon: InfoIcon,
    title: 'nouveau : les pivots',
    description: "Balayez pour passer d'un dossier à l'autre.",
  },
  {
    variant: 'success-soft',
    icon: CheckIcon,
    title: 'brouillon envoyé',
    description: 'Inès le recevra à sa prochaine connexion.',
  },
  {
    variant: 'warning-soft',
    icon: BangIcon,
    title: 'espace presque plein',
    description: 'Il reste 180 Mo sur ce compte.',
  },
  {
    variant: 'danger-soft',
    icon: CrossIcon,
    title: 'envoi impossible',
    description: 'Le serveur a refusé la pièce jointe (25 Mo au plus).',
  },
  {
    variant: 'primary',
    icon: InfoIcon,
    title: 'mode avion',
    description: 'Les messages partiront à la reconnexion.',
  },
  {
    variant: 'success',
    icon: CheckIcon,
    title: 'sauvegarde terminée',
    description: '1 204 messages archivés.',
  },
  {
    variant: 'warning',
    icon: BangIcon,
    title: 'batterie faible',
    description: 'La synchronisation ralentit sous 15 %.',
  },
  {
    variant: 'danger',
    icon: CrossIcon,
    title: 'compte déconnecté',
    description: 'Reconnectez-vous pour recevoir vos messages.',
  },
]

const SIZES: AlertSize[] = ['sm', 'md', 'lg']

const ACCENTS: TramAccentName[] = ['lime', 'magenta']

/**
 * Where the Tram `Alert` is verified, in dark and in light: the nine names — the square
 * filled on a soft ground, drawn as a line on a full one — the sizes, closing, colour.
 */
export default function TramAlertScreen() {
  const theme = useXAUITheme()
  const [closed, setClosed] = useState<AlertVariant[]>([])

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="les neuf noms"
        note="Sur la surface ou une tranche douce, le carré est plein ; sur une couleur pleine, c'est le trait de l'encre. Sans ombre."
      >
        {SAMPLES.filter(sample => !closed.includes(sample.variant)).map(sample => (
          <Alert key={sample.variant} variant={sample.variant}>
            <Alert.Icon as={sample.icon} />
            <Alert.Content>
              <Alert.Title>{sample.title}</Alert.Title>
              <Alert.Description>{sample.description}</Alert.Description>
            </Alert.Content>
            <Alert.Close
              accessibilityLabel={`fermer : ${sample.title}`}
              onPress={() => setClosed(current => [...current, sample.variant])}
            />
          </Alert>
        ))}
        {closed.length > 0 ? (
          <Button variant="outline" size="sm" onPress={() => setClosed([])}>
            tout remettre
          </Button>
        ) : null}
      </TramSection>

      <TramSection
        title="les tailles"
        note="Les rôles de la Card : body, subtitle, title ; un carré de 32, 40, 48."
      >
        {SIZES.map(size => (
          <Alert key={size} size={size} variant="warning-soft">
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
        note="Une tranche douce de lime et de magenta, le carré plein ; une couleur brute sur default remplit l'alerte, et le carré passe au trait."
      >
        {ACCENTS.map(accent => (
          <Alert key={accent} variant="secondary" accent={accent}>
            <Alert.Icon as={InfoIcon} />
            <Alert.Content>
              <Alert.Title>{accent}</Alert.Title>
              <Alert.Description>
                {"La tranche douce de l'accent."}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        ))}
        <Alert color="#7c3aed">
          <Alert.Icon as={InfoIcon} />
          <Alert.Content>
            <Alert.Title>couleur brute</Alert.Title>
            <Alert.Description>#7c3aed, sur default.</Alert.Description>
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
