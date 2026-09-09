import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Pager, usePager } from '@xaui/native/pager'
import type { PagerVariant } from '@xaui/native/pager'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: PagerVariant[] = ['primary', 'secondary', 'tertiary']

const STEPS = [
  {
    title: 'Bienvenue',
    body: 'Une page est la piste, mesurée — jamais une propriété.',
  },
  {
    title: 'Permissions',
    body: 'pagingEnabled est la pagination de RN, page entière.',
  },
  { title: 'Terminé', body: 'Les points suivent le doigt, pas le repos.' },
]

/**
 * The verification screen for the `Pager`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it; the paging arithmetic it
 * shares with the `Carousel` is tested in `utils/carousel`.
 *
 * What each section checks is in its subtitle: a page is the track's size on both axes, the
 * dots follow the drag rather than the settle, the three variants name tokens and nothing
 * else, the indicator sits in the flow until a style prop lifts it out, the vertical axis
 * needs no second branch, and `isDisabled` locks the swipe and the dots together.
 */
export default function PagerScreen() {
  const theme = useXAUITheme()
  const [index, setIndex] = useState(0)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Des pages entières"
        note="Une page est la piste, mesurée, sur les deux axes — pas une propriété et pas une fraction. La mesure est celle de la piste et non de la racine : l'indicateur est dans le flux sous les pages."
      >
        <Pager height={220}>
          <Pager.Content>
            {STEPS.map(step => (
              <Pager.Page key={step.title}>
                <Panel title={step.title} body={step.body} />
              </Pager.Page>
            ))}
          </Pager.Content>

          <Pager.Indicator paddingVertical={12} />
        </Pager>
      </Section>

      <Section
        title="Piloté de l'extérieur"
        note="index / defaultIndex / onIndexChange, contrôlé ou non. L'index bouge quand la piste franchit la moitié, pas quand elle s'arrête : onMomentumScrollEnd ne part jamais pour une molette, et il arrive après coup."
      >
        <Pager height={200} index={index} onIndexChange={setIndex}>
          <Pager.Content>
            {STEPS.map(step => (
              <Pager.Page key={step.title}>
                <Panel title={step.title} body={step.body} />
              </Pager.Page>
            ))}
          </Pager.Content>

          <Pager.Indicator paddingVertical={12}>
            {STEPS.map((step, dot) => (
              <Pager.Dot key={step.title} index={dot} />
            ))}
          </Pager.Indicator>
        </Pager>

        <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
          Page {index + 1} sur {STEPS.length}
        </Text>

        <Button
          variant="tertiary"
          alignSelf="flex-start"
          onPress={() => setIndex(current => (current + 1) % STEPS.length)}
        >
          Suivante
        </Button>
      </Section>

      <Section
        title="Une commande dans le pager"
        note="usePager() publie goTo, l'index posé, le compte que la piste a compté elle-même, et l'offset vif en valeur partagée. Une commande écrite contre lui ne coûte aucun état."
      >
        <Pager height={200}>
          <Pager.Content>
            {STEPS.map(step => (
              <Pager.Page key={step.title}>
                <Panel title={step.title} body={step.body}>
                  <Skip />
                </Panel>
              </Pager.Page>
            ))}
          </Pager.Content>

          <Pager.Indicator paddingVertical={12} />
        </Pager>
      </Section>

      <Section
        title="Les trois variantes"
        note="Elles nomment la couleur du point courant, seule chose que ce composant peint. Les points derrière gardent un remplissage neutre : une teinte pâle de l'accent sous les pages lirait comme un contrôle à moitié chargé."
      >
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 8 }}>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}
            >
              {variant}
            </Text>
            <Pager variant={variant} height={140}>
              <Pager.Content>
                {STEPS.map(step => (
                  <Pager.Page key={step.title}>
                    <Panel title={step.title} body={variant} />
                  </Pager.Page>
                ))}
              </Pager.Content>
              <Pager.Indicator paddingVertical={10} />
            </Pager>
          </View>
        ))}
      </Section>

      <Section
        title="L'indicateur par-dessus, et un tint"
        note="Il est dans le flux par défaut ; le poser sur les pages est un jeu de style props — position absolute, bottom, start et end. Absolu par défaut aurait fait du cas courant celui qu'il faut défaire."
      >
        <Pager height={200} variant="tertiary">
          <Pager.Content>
            {STEPS.map(step => (
              <Pager.Page key={step.title}>
                <Panel title={step.title} body={step.body} tone="accent" />
              </Pager.Page>
            ))}
          </Pager.Content>

          <Pager.Indicator position="absolute" bottom={16} start={0} end={0} />
        </Pager>
      </Section>

      <Section
        title="L'axe vertical"
        note="orientation est l'axe et non une direction, donc aucune branche RTL : un pager horizontal se reflète avec son scroll view, ce qui est le comportement de RN. Les points suivent — l'indicateur devient une colonne."
      >
        <Pager orientation="vertical" height={220} variant="tertiary">
          <Pager.Content>
            {STEPS.map(step => (
              <Pager.Page key={step.title}>
                <Panel title={step.title} body={step.body} tone="accent" />
              </Pager.Page>
            ))}
          </Pager.Content>

          <Pager.Indicator
            position="absolute"
            end={12}
            top={0}
            bottom={0}
            paddingHorizontal={8}
          />
        </Pager>
      </Section>

      <Section
        title="Désactivé"
        note="isDisabled verrouille le glissement et les points ensemble : un pager dont les points répondent encore alors que la piste ne bouge plus est un pager qui se contredit."
      >
        <Pager isDisabled height={160}>
          <Pager.Content>
            {STEPS.map(step => (
              <Pager.Page key={step.title}>
                <Panel title={step.title} body="Figé." />
              </Pager.Page>
            ))}
          </Pager.Content>
          <Pager.Indicator paddingVertical={10} />
        </Pager>
      </Section>
    </ScrollView>
  )
}

/** A control inside a page, written against the context — it costs no state of its own. */
function Skip() {
  const { goTo, count } = usePager()

  return (
    <Button size="sm" variant="tertiary" onPress={() => goTo(count - 1)}>
      Passer
    </Button>
  )
}

/**
 * A stand-in for whatever a page actually holds.
 *
 * `tone="accent"` is the over-a-photograph case: neutral dots on a neutral panel vanish, and
 * that pairing is exactly what the `tertiary` variant exists for.
 */
function Panel({
  title,
  body,
  tone = 'default',
  children,
}: {
  title: string
  body: string
  tone?: 'default' | 'accent'
  children?: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          tone === 'accent' ? theme.colors.accent : theme.colors.default,
        borderRadius: theme.radius['2xl'],
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 20,
      }}
    >
      <Text
        style={{
          color:
            tone === 'accent'
              ? theme.colors.accentForeground
              : theme.colors.foreground,
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color:
            tone === 'accent' ? theme.colors.accentForeground : theme.colors.muted,
          fontSize: theme.fontSizes.sm,
          textAlign: 'center',
        }}
      >
        {body}
      </Text>
      {children}
    </View>
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
