import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Dialog } from '@xaui/native/dialog'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Select } from '@xaui/tram/select'
import type { TramAccentName } from '@xaui/tram/theme'
import { Toast, ToastHost, useToast } from '@xaui/tram/toast'
import type { ToastProps, ToastVariant } from '@xaui/tram/toast'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const VARIANTS: ToastVariant[] = [
  'default',
  'accent',
  'success',
  'warning',
  'danger',
]

/** The three that take black text, and two that take white. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

const CITIES = [
  'abidjan',
  'accra',
  'bamako',
  'cotonou',
  'dakar',
  'lagos',
  'lomé',
  'niamey',
]

type NoticeProps = ToastProps & { title: string; description?: string }

/** The toast most samples send: a title, and a description when there is one. */
function Notice({ title, description, children, ...props }: NoticeProps) {
  return (
    <Toast {...props}>
      <Toast.Title>{title}</Toast.Title>
      {description ? <Toast.Description>{description}</Toast.Description> : null}
      {children}
    </Toast>
  )
}

/**
 * Where the Tram `Toast` is verified, in dark and in light: the five variants, a title
 * alone and with its description, a square prefix, an action, `Close` as a child, a
 * press, a short and an endless duration, four in a row, dismissal by id and of all, the
 * bottom placement, named accents, a raw `color`, the style props, and a toast over a
 * `Dialog` and over a full-screen `Select`.
 *
 * The host is in the Tram layout, under the notch.
 */
export default function TramToastScreen() {
  const theme = useXAUITheme()
  const insets = useSafeAreaInsets()
  const { toast, dismiss, dismissAll } = useToast()
  const [pressed, setPressed] = useState(0)
  const [city, setCity] = useState<string>()
  const lastId = useRef('')
  const count = useRef(0)

  const send = (node: ReactNode, duration?: number) => {
    lastId.current = toast({ duration, render: () => node })
  }

  const sendNumbered = () => {
    count.current += 1
    send(<Notice title={`message ${count.current}`} description="dans la pile" />)
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="variants"
        note="Les cinq noms de Native, en aplats : default et accent dans l'accent du thème, success, warning et danger dans leur couleur, le texte dans l'encre qui s'y lit."
      >
        {VARIANTS.map(variant => (
          <Button
            key={variant}
            variant="outline"
            onPress={() =>
              send(
                <Notice
                  variant={variant}
                  title={variant}
                  description="un message sur une ligne"
                />
              )
            }
          >
            {variant}
          </Button>
        ))}
      </TramSection>

      <TramSection
        title="contenu"
        note="Un titre seul, un titre et sa description coupée à la fin, un préfixe carré de 22 composé par l'appelant."
      >
        <Button
          variant="outline"
          onPress={() => send(<Notice title="enregistré" />)}
        >
          titre seul
        </Button>
        <Button
          variant="outline"
          onPress={() =>
            send(
              <Notice
                title="messagerie"
                description="awa : tu passes à quelle heure ce soir ? on t'attend pour dîner"
              />
            )
          }
        >
          titre et description
        </Button>
        <Button
          variant="outline"
          onPress={() =>
            send(
              <Toast>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    backgroundColor: theme.colors.accentForeground,
                  }}
                />
                <Toast.Title>messagerie</Toast.Title>
                <Toast.Description>un nouveau message</Toast.Description>
              </Toast>
            )
          }
        >
          préfixe carré
        </Button>
      </TramSection>

      <TramSection
        title="actions"
        note="Un Button dans le toast est du texte dans son encre. Close ne dessine rien : il ferme ce qu'on lui donne. onPress : le toast rétrécit sous le doigt."
      >
        <Button
          variant="outline"
          onPress={() =>
            send(
              <Notice title="supprimé" description="la conversation">
                <Toast.Actions>
                  <Button size="sm" onPress={() => setPressed(value => value + 1)}>
                    annuler
                  </Button>
                </Toast.Actions>
              </Notice>
            )
          }
        >
          une action
        </Button>
        <Button
          variant="outline"
          onPress={() =>
            send(
              <Notice title="hors ligne" variant="warning">
                <Toast.Actions>
                  <Toast.Close asChild>
                    <Button size="sm">fermer</Button>
                  </Toast.Close>
                </Toast.Actions>
              </Notice>,
              0
            )
          }
        >
          close en asChild
        </Button>
        <Button
          variant="outline"
          onPress={() =>
            send(
              <Notice
                title="messagerie"
                description="touchez pour ouvrir"
                onPress={() => setPressed(value => value + 1)}
              />
            )
          }
        >
          avec onPress
        </Button>
        <Typography variant="caption" color={theme.colors.muted}>
          {`touches et actions reçues : ${pressed}`}
        </Typography>
      </TramSection>

      <TramSection
        title="durée"
        note="4000 ms par défaut. Une entrée peut dire la sienne ; 0 la garde jusqu'à ce qu'on la ferme."
      >
        <Button
          variant="outline"
          onPress={() => send(<Notice title="bref" description="1,5 s" />, 1500)}
        >
          durée courte
        </Button>
        <Button
          variant="outline"
          onPress={() =>
            send(<Notice title="reste" description="jusqu'au balayage" />, 0)
          }
        >
          durée infinie
        </Button>
      </TramSection>

      <TramSection
        title="pile"
        note="Le plus récent en haut, les précédents dessous, espacés de 8. Au-delà de trois ils sont transparents, pas retirés."
      >
        <Button variant="outline" onPress={sendNumbered}>
          un de plus
        </Button>
        <Button
          variant="outline"
          onPress={() => {
            for (let index = 0; index < 4; index += 1) sendNumbered()
          }}
        >
          quatre d&apos;affilée
        </Button>
        <Button variant="outline" onPress={() => dismiss(lastId.current)}>
          fermer le dernier, par id
        </Button>
        <Button variant="outline" onPress={dismissAll}>
          tout fermer
        </Button>
      </TramSection>

      <TramSection
        title="placement"
        note="Un second hôte, placement bottom : la pile monte du bas, et un toast y sort vers le bas."
      >
        <ToastHost placement="bottom" offset={Math.max(insets.bottom, 10)}>
          <BottomSample />
        </ToastHost>
      </TramSection>

      <TramSection
        title="accents"
        note="accent repeint le rectangle dans sa vraie couleur : noir sur lime, ambre et jaune. color est une couleur brute, et l'emporte."
      >
        {ACCENTS.map(accent => (
          <Button
            key={accent}
            variant="outline"
            accent={accent}
            onPress={() =>
              send(<Notice accent={accent} title={accent} description="en aplat" />)
            }
          >
            {accent}
          </Button>
        ))}
        <Button
          variant="outline"
          onPress={() =>
            send(
              <Notice
                accent="lime"
                color="#7C3AED"
                title="#7C3AED"
                description="color l'emporte sur accent"
              />
            )
          }
        >
          color brut
        </Button>
      </TramSection>

      <TramSection
        title="props de style"
        note="Chaque slot prend les props de style de sa vue : ici une hauteur, un padding et un texte souligné."
      >
        <Button
          variant="outline"
          onPress={() =>
            send(
              <Toast minHeight={72} paddingHorizontal={24}>
                <Toast.Title textDecorationLine="underline">souligné</Toast.Title>
                <Toast.Description opacity={0.7}>72 de haut</Toast.Description>
              </Toast>
            )
          }
        >
          props de style
        </Button>
      </TramSection>

      <TramSection
        title="par-dessus"
        note="Un toast envoyé depuis un Dialog ouvert, et depuis la page d'un Select en plein écran."
      >
        <Dialog>
          <Dialog.Trigger asChild>
            <Button variant="outline">ouvrir un dialog</Button>
          </Dialog.Trigger>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>un dialog</Dialog.Title>
            <Dialog.Description>le toast doit passer par-dessus.</Dialog.Description>
            <Button
              onPress={() =>
                send(
                  <Notice title="par-dessus" description="le dialog est dessous" />
                )
              }
            >
              envoyer un toast
            </Button>
          </Dialog.Content>
        </Dialog>
        <Select
          value={city}
          onValueChange={value => {
            setCity(value)
            send(<Notice title="ville" description={value} />)
          }}
          onOpenChange={isOpen => {
            if (isOpen)
              send(<Notice title="page ouverte" description="choisissez" />)
          }}
        >
          <Select.Label>une ville</Select.Label>
          <Select.Trigger>
            <Select.Value placeholder="choisir" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content mode="fullscreen" paddingTop={insets.top + 24}>
            {CITIES.map(name => (
              <Select.Item key={name} value={name}>
                {name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </TramSection>
    </ScrollView>
  )
}

/** Reads the nearest host — the bottom one it is rendered under. */
function BottomSample() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onPress={() =>
        toast({
          render: () => <Notice title="en bas" description="placement bottom" />,
        })
      }
    >
      en bas
    </Button>
  )
}
