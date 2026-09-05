import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Alert } from '@xaui/native/alert'
import type { AlertVariant } from '@xaui/native/alert'
import { Button } from '@xaui/native/button'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: AlertVariant[] = [
  'default',
  'primary',
  'secondary',
  'success',
  'success-soft',
  'warning',
  'warning-soft',
  'danger',
  'danger-soft',
]

/**
 * The verification screen for the `Alert`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the nine variants name tokens and nothing
 * else, `size` moves the padding and the type and never a height, the icon lines up with
 * the first line of the title at every size, a raw `color` lands where the variant put its
 * tokens, and the close is the only control the component contains.
 */
export default function AlertScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 64 }}
    >
      <Section
        title="The nine variants"
        note="The Card's surface for the neutral level, the Chip's status ladder for the rest. default is HeroUI's alert exactly — a neutral card with the status carried by the icon — and the soft slices are the tinted surface most alerts want."
      >
        {VARIANTS.map(variant => (
          <Alert key={variant} variant={variant}>
            <Alert.Icon as={InfoIcon} />
            <Alert.Content>
              <Alert.Title>{variant}</Alert.Title>
              <Alert.Description>
                The title and the icon take the variant&apos;s foreground; the
                description sits behind them on a fraction of the same colour.
              </Alert.Description>
            </Alert.Content>
          </Alert>
        ))}
      </Section>

      <Section
        title="Anatomy — icon, content, close"
        note="Three columns spaced by the root's gap alone. The content takes what the icon and the cross leave, so a long message wraps instead of pushing the cross off the edge. The icon sits half a leading below the top, which is what lines the glyph up with the title's cap-height."
      >
        <Alert variant="success-soft">
          <Alert.Icon as={CheckIcon} />
          <Alert.Content>
            <Alert.Title>Facture payée</Alert.Title>
            <Alert.Description>
              Le reçu part par courriel dans un instant. Rien d&apos;autre à faire.
            </Alert.Description>
          </Alert.Content>
        </Alert>

        <Alert variant="warning-soft">
          <Alert.Icon as={WarningIcon} />
          <Alert.Content>
            <Alert.Title>Maintenance programmée</Alert.Title>
            <Alert.Description>
              Le service sera indisponible dimanche de 2 h à 4 h. Une phrase longue
              pour vérifier que le texte passe à la ligne sous le titre plutôt que de
              repousser la croix hors du bord de l&apos;alerte.
            </Alert.Description>
          </Alert.Content>
          <Alert.Close accessibilityLabel="Fermer" />
        </Alert>

        <Alert variant="danger-soft">
          <Alert.Icon as={WarningIcon} />
          <Alert.Content>
            <Alert.Title>Envoi impossible</Alert.Title>
          </Alert.Content>
          <Alert.Close accessibilityLabel="Fermer" />
        </Alert>

        <Alert variant="secondary">
          <Alert.Icon as={InfoIcon} />
          <Alert.Content>
            <Alert.Title>Mise à jour disponible</Alert.Title>
            <Alert.Description>Une nouvelle version est prête.</Alert.Description>
            <Button size="sm" alignSelf="flex-start" marginTop={4}>
              Redémarrer
            </Button>
          </Alert.Content>
        </Alert>

        <Alert>Un enfant texte devient la description, pas le titre.</Alert>
      </Section>

      <Dismissible />

      <Section
        title="size — padding and type, never a height"
        note="An alert is as tall as the message it carries. The icon's offset is derived from the title's leading, so it stays right at all four sizes rather than being one hard-coded number."
      >
        <Alert size="xs" variant="success-soft">
          <Alert.Icon as={CheckIcon} />
          <Alert.Content>
            <Alert.Title>xs · padding 8, titre 12/16</Alert.Title>
            <Alert.Description>Description 12/16.</Alert.Description>
          </Alert.Content>
        </Alert>
        <Alert size="sm" variant="success-soft">
          <Alert.Icon as={CheckIcon} />
          <Alert.Content>
            <Alert.Title>sm · padding 10, titre 14/20</Alert.Title>
            <Alert.Description>Description 12/16.</Alert.Description>
          </Alert.Content>
        </Alert>
        <Alert size="md" variant="success-soft">
          <Alert.Icon as={CheckIcon} />
          <Alert.Content>
            <Alert.Title>md · padding 12, titre 16/24</Alert.Title>
            <Alert.Description>Description 14/20.</Alert.Description>
          </Alert.Content>
        </Alert>
        <Alert size="lg" variant="success-soft">
          <Alert.Icon as={CheckIcon} />
          <Alert.Content>
            <Alert.Title>lg · padding 16, titre 18/28</Alert.Title>
            <Alert.Description>Description 16/24.</Alert.Description>
          </Alert.Content>
        </Alert>
      </Section>

      <Section
        title="An icon that disagrees with its alert"
        note="HeroUI colours the icon by status on a neutral surface. Here the variant decides both, and the case is an explicit color on the slot — a raw value, which is what R7 says an exception looks like."
      >
        <Alert>
          <Alert.Icon as={CheckIcon} color={theme.colors.success} />
          <Alert.Content>
            <Alert.Title>Profil enregistré</Alert.Title>
            <Alert.Description>
              Surface neutre, coche verte — l&apos;alerte de HeroUI, écrite en clair.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      </Section>

      <Section
        title="color — a raw tint, landing where the variant puts its tokens"
        note="The fill, and through its OKLab-contrasted slice the title, the icon and the cross. Nothing else has to be passed."
      >
        <Alert color="#7c3aed">
          <Alert.Icon as={InfoIcon} />
          <Alert.Content>
            <Alert.Title>Sprint 12 ouvert</Alert.Title>
            <Alert.Description>
              Le titre, l&apos;icône et la croix suivent la teinte sans qu&apos;on
              leur dise une seconde couleur.
            </Alert.Description>
          </Alert.Content>
          <Alert.Close accessibilityLabel="Fermer" />
        </Alert>
      </Section>

      <Section
        title="Single line, and radius"
        note="alignItems='center' is one prop for the alert that has no description. radius overrides what the size chose."
      >
        <Alert variant="success-soft" alignItems="center">
          <Alert.Icon as={CheckIcon} paddingTop={0} />
          <Alert.Content>
            <Alert.Title>Profil mis à jour</Alert.Title>
          </Alert.Content>
        </Alert>

        <Alert variant="default" radius="sm">
          <Alert.Icon as={InfoIcon} />
          <Alert.Content>
            <Alert.Title>radius=&quot;sm&quot;</Alert.Title>
          </Alert.Content>
        </Alert>
      </Section>

      <Section
        title="isDisabled"
        note="Dims the alert and reaches the close inside it — a disabled alert that can still be dismissed is not disabled."
      >
        <Alert isDisabled variant="danger-soft">
          <Alert.Icon as={WarningIcon} />
          <Alert.Content>
            <Alert.Title>Envoi impossible</Alert.Title>
            <Alert.Description>Réessayez dans un moment.</Alert.Description>
          </Alert.Content>
          <Alert.Close accessibilityLabel="Fermer" />
        </Alert>
      </Section>
    </ScrollView>
  )
}

/** The close is the only control an alert contains — and it really removes the alert. */
function Dismissible() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <Section
      title="Alert.Close — the only control an alert contains"
      note="The root is a View with role='alert', never a Pressable. The cross owns its press state, its grown touch target and its missing-label warning, all from the shared system/close-button."
    >
      {isVisible ? (
        <Alert variant="danger-soft">
          <Alert.Icon as={WarningIcon} />
          <Alert.Content>
            <Alert.Title>Connexion perdue</Alert.Title>
            <Alert.Description>
              Les modifications sont enregistrées localement.
            </Alert.Description>
          </Alert.Content>
          <Alert.Close
            accessibilityLabel="Fermer l’alerte"
            onPress={() => setIsVisible(false)}
          />
        </Alert>
      ) : (
        <Button variant="tertiary" size="sm" onPress={() => setIsVisible(true)}>
          remettre l’alerte
        </Button>
      )}
    </Section>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 10 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {note}
      </Text>
      {children}
    </View>
  )
}

/** Third-party icons: they know only `size` and `color`, and are told neither here. */
function InfoIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function CheckIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17l-5-5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function WarningIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
