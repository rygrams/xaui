import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Toast, ToastHost, useToast } from '@xaui/native/toast'
import type { ToastVariant } from '@xaui/native/toast'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ToastVariant[] = [
  'default',
  'accent',
  'success',
  'warning',
  'danger',
]

/**
 * The verification screen for the `Toast`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * The host is mounted here rather than in the demo's layout on purpose: it is the one
 * component of the library that an app mounts itself, and seeing it in the screen that
 * uses it is the point.
 */
export default function ToastScreen() {
  return (
    <ToastHost>
      <Screen />
    </ToastHost>
  )
}

function Screen() {
  const theme = useXAUITheme()
  const { toast, dismissAll } = useToast()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 200 }}
    >
      <Section
        title="The variant paints the title, and nothing else"
        note="A red card sliding in from the edge of the screen reads as the app breaking; a red line of text reads as the thing you just did failing. The surface stays the theme's floating one whatever happened — which is also what lets two toasts of different kinds stack without the pile looking like a paint chart. The soft foregrounds rather than the full colours, because a toast is read from the corner of the eye."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {VARIANTS.map(variant => (
            <Button
              key={variant}
              variant="secondary"
              size="sm"
              onPress={() =>
                toast({
                  variant,
                  render: () => (
                    <Toast variant={variant}>
                      <Toast.Title>{`Enregistré — ${variant}`}</Toast.Title>
                      <Toast.Description>
                        Vos modifications sont sur le serveur.
                      </Toast.Description>
                    </Toast>
                  ),
                })
              }
            >
              {variant}
            </Button>
          ))}
        </View>
      </Section>

      <Section
        title="The stack keeps three, and drops the oldest"
        note="Every card is anchored to the same edge and pushed back by its transform alone — 10 points toward the edge and 3% smaller per step, HeroUI’s values — so a pile of eight costs the height of one. Press five times quickly: three shoulders, and the rest are queued at zero opacity rather than dropped. Each one that expires promotes the next into view."
      >
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            variant="secondary"
            size="sm"
            onPress={() =>
              toast({
                render: ({ dismiss }) => (
                  <Toast>
                    <Toast.Title>Un de plus</Toast.Title>
                    <Toast.Actions>
                      <Button variant="tertiary" size="sm" onPress={dismiss}>
                        Fermer
                      </Button>
                    </Toast.Actions>
                  </Toast>
                ),
              })
            }
          >
            Empiler
          </Button>
          <Button variant="tertiary" size="sm" onPress={dismissAll}>
            Tout retirer
          </Button>
        </View>
      </Section>

      <Section
        title="Actions, and one that stays"
        note="duration={0} keeps a toast until something dismisses it — for the one that asks a question rather than reporting an answer. Toast.Close knows which toast it belongs to without being told: the host provides the dismiss around each entry."
      >
        <Button
          variant="secondary"
          size="sm"
          onPress={() =>
            toast({
              duration: 0,
              variant: 'danger',
              render: () => (
                <Toast variant="danger">
                  <Toast.Title>Échec de l’envoi</Toast.Title>
                  <Toast.Description>
                    Le réseau a coupé au milieu. Rien n’a été perdu.
                  </Toast.Description>
                  <Toast.Actions>
                    <Toast.Close asChild>
                      <Button variant="tertiary" size="sm">
                        Plus tard
                      </Button>
                    </Toast.Close>
                    <Toast.Close asChild>
                      <Button size="sm">Réessayer</Button>
                    </Toast.Close>
                  </Toast.Actions>
                </Toast>
              ),
            })
          }
        >
          Un qui attend une réponse
        </Button>
      </Section>

      <Section
        title="A card of your own"
        note="render returns whatever you like — the queue never looks at it. Toast is the card this library ships, not the card the host requires."
      >
        <Button
          variant="secondary"
          size="sm"
          onPress={() =>
            toast({
              render: () => (
                <View
                  style={{
                    backgroundColor: theme.colors.accent,
                    padding: 16,
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.accentForeground,
                      fontWeight: theme.fontWeights.medium,
                    }}
                  >
                    Rien de la bibliothèque ici
                  </Text>
                </View>
              ),
            })
          }
        >
          Une carte à moi
        </Button>
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
