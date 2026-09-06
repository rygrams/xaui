import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Card } from '@xaui/native/card'
import { FlipCard, useFlipCard } from '@xaui/native/flip-card'
import type { FlipCardDirection } from '@xaui/native/flip-card'
import { useXAUITheme } from '@xaui/native/theme'

const DIRECTIONS: FlipCardDirection[] = ['horizontal', 'vertical']

/** A control on a face, written against the context — it costs no state of its own. */
function TurnBack({ label }: { label: string }) {
  const { flip } = useFlipCard()
  const theme = useXAUITheme()

  return (
    <Pressable onPress={flip} hitSlop={12}>
      <Text style={{ color: theme.colors.accent, fontSize: theme.fontSizes.sm }}>
        {label}
      </Text>
    </Pressable>
  )
}

function Face({
  title,
  body,
  variant = 'primary',
  children,
}: {
  title: string
  body: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  children?: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <Card variant={variant}>
      <Card.Body style={{ height: 150, justifyContent: 'center', gap: 6 }}>
        <Text
          style={{
            color: theme.colors.foreground,
            fontSize: theme.fontSizes.lg,
            fontWeight: theme.fontWeights.semibold,
          }}
        >
          {title}
        </Text>
        <Text style={{ color: theme.colors.muted }}>{body}</Text>
        {children}
      </Card.Body>
    </Card>
  )
}

/**
 * The verification screen for the `FlipCard`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function FlipCardScreen() {
  const theme = useXAUITheme()
  const [driven, setDriven] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Deux faces, et un tour entre elles"
        note="Le composant ne peint rien et n'a pas de recette : ce qui tourne, ce sont deux faces fournies par l'appelant, et chacune est le plus souvent une Card avec sa variante, son rayon et son ombre. Une recette ici serait une deuxième table qui dit les mêmes choses. Appuyez sur la carte."
      >
        <FlipCard>
          <FlipCard.Front>
            <Face title="Recto" body="Appuyez pour retourner." />
          </FlipCard.Front>
          <FlipCard.Back>
            <Face title="Verso" body="Et encore pour revenir." variant="secondary" />
          </FlipCard.Back>
        </FlipCard>
      </Section>

      <Section
        title="Les deux axes"
        note="horizontal fait pivoter la carte autour de son axe vertical — les deux faces échangent la gauche et la droite, ce que fait une carte à jouer. vertical la fait basculer vers vous."
      >
        {DIRECTIONS.map(direction => (
          <FlipCard key={direction} direction={direction}>
            <FlipCard.Front>
              <Face title={direction} body="Appuyez." />
            </FlipCard.Front>
            <FlipCard.Back>
              <Face title={direction} body="De l’autre côté." variant="secondary" />
            </FlipCard.Back>
          </FlipCard>
        ))}
      </Section>

      <Section
        title="Dans l'autre sens"
        note="rotation nie les deux faces, donc elles continuent de se suivre. N'en nier qu'une les ferait se croiser, et on verrait les deux au milieu du tour."
      >
        <FlipCard rotation="reverse">
          <FlipCard.Front>
            <Face title="reverse" body="Le tour part de l’autre côté." />
          </FlipCard.Front>
          <FlipCard.Back>
            <Face title="reverse" body="Verso." variant="secondary" />
          </FlipCard.Back>
        </FlipCard>
      </Section>

      <Section
        title="Contrôlé, et sans pression"
        note="isPressable={false} en fait un affichage et laisse le tour à une commande à vous — un bouton sur une face, un geste, un minuteur. La carte reste pilotable par isFlipped."
      >
        <FlipCard isFlipped={driven} onFlipChange={setDriven} isPressable={false}>
          <FlipCard.Front>
            <Face
              title="Piloté de l’extérieur"
              body="La carte ne répond pas au doigt."
            />
          </FlipCard.Front>
          <FlipCard.Back>
            <Face
              title="Verso"
              body="Le bouton dessous décide."
              variant="tertiary"
            />
          </FlipCard.Back>
        </FlipCard>

        <Button variant="tertiary" onPress={() => setDriven(current => !current)}>
          Retourner
        </Button>
      </Section>

      <Section
        title="Une commande sur une face"
        note="useFlipCard().flip est ce qu'un bouton sur le verso appelle, et il ne coûte aucun état. Ici la face avant se retourne à la pression et le verso a son propre lien pour revenir."
      >
        <FlipCard>
          <FlipCard.Front>
            <Face title="Tarif" body="Appuyez pour voir le détail." />
          </FlipCard.Front>
          <FlipCard.Back>
            <Face
              title="Détail"
              body="24 € par mois, sans engagement."
              variant="secondary"
            >
              <TurnBack label="← Revenir" />
            </Face>
          </FlipCard.Back>
        </FlipCard>
      </Section>

      <Section
        title="Sans animation, et désactivé"
        note="animation={false} pose la carte sur l'autre face sans aucun tour. isDisabled la fige."
      >
        <FlipCard animation={false}>
          <FlipCard.Front>
            <Face title="Sans tour" body="Le changement est instantané." />
          </FlipCard.Front>
          <FlipCard.Back>
            <Face
              title="Verso"
              body="Arrivé sans passer par le milieu."
              variant="secondary"
            />
          </FlipCard.Back>
        </FlipCard>

        <FlipCard isDisabled>
          <FlipCard.Front>
            <Face title="Figée" body="Ne répond pas." />
          </FlipCard.Front>
          <FlipCard.Back>
            <Face title="Verso" body="Inatteignable." variant="secondary" />
          </FlipCard.Back>
        </FlipCard>
      </Section>
    </ScrollView>
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
    <View style={{ gap: 12 }}>
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
