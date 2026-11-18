import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Dialog } from '@xaui/tram/dialog'
import { Select } from '@xaui/tram/select'
import { TextField } from '@xaui/tram/text-field'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const CITIES = [
  'abidjan',
  'accra',
  'bamako',
  'cotonou',
  'dakar',
  'lagos',
  'lomé',
  'niamey',
  'ouagadougou',
  'yamoussoukro',
]

const LONG =
  "Le document, ses douze versions et les commentaires de l'équipe seront effacés de " +
  'cet appareil et de tous ceux qui le synchronisent. Les liens déjà partagés ne ' +
  "mèneront plus nulle part, et les personnes qui l'avaient en favori le verront " +
  "disparaître de leur liste. Rien de tout cela ne passe par la corbeille : il n'y " +
  'aura aucun moyen de revenir en arrière, ni pour vous ni pour un administrateur.'

/** The banner's actions: side by side, in equal shares. Each one answers, so each closes. */
function Actions({ labels }: { labels: string[] }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {labels.map((label, index) => (
        <Dialog.Close key={label} asChild>
          <Button flex={1} variant={index === 0 ? 'contained' : 'outline'}>
            {label}
          </Button>
        </Dialog.Close>
      ))}
    </View>
  )
}

/** A trigger as it is written nine times out of ten: a `Button`, through `asChild`. */
function Opener({ children }: { children: ReactNode }) {
  return (
    <Dialog.Trigger asChild>
      <Button variant="outline" alignSelf="flex-start">
        {children}
      </Button>
    </Dialog.Trigger>
  )
}

/**
 * Where the Tram `Dialog` is verified, in dark and in light: a title alone, a title and a
 * description, one, two and three actions, controlled and not, one that must be answered,
 * a disabled trigger, `Close` as a `Button` and as text, a long content, a `TextField`
 * in the banner, the style props, a dialog opened from a `Select` that took the screen,
 * and an opening interrupted halfway.
 */
export default function TramDialogScreen() {
  const theme = useXAUITheme()
  const insets = useSafeAreaInsets()
  const [isOpen, setOpen] = useState(false)
  const [isHalfway, setHalfway] = useState(false)
  const [city, setCity] = useState('lomé')
  const [asked, setAsked] = useState<string>()
  // Tram reads no safe area: the banner is padded with the app's own inset.
  const top = insets.top + 24

  /** Opens, then closes before the swivel has ended: the banner sets off from where it is. */
  const interrupt = () => {
    setHalfway(true)
    setTimeout(() => setHalfway(false), 140)
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="le titre seul"
        note="Un bandeau en haut de l'écran, d'un bord à l'autre, sur la page assombrie. Il entre en swivel ; un balayage vers le haut le renvoie."
      >
        <Dialog>
          <Opener>titre seul</Opener>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>la synchronisation est terminée</Dialog.Title>
            <Actions labels={['ok']} />
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="titre et description"
        note="Le titre en title dans l'encre de la page, la description en body, en muted. Ils arrivent en cascade après le swivel, puis les actions."
      >
        <Dialog>
          <Opener>titre et description</Opener>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>supprimer ce document ?</Dialog.Title>
            <Dialog.Description>définitif, sans corbeille.</Dialog.Description>
            <Actions labels={['supprimer', 'annuler']} />
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="une, deux, trois actions"
        note="Des Button posés par l'appelant, côte à côte, à parts égales."
      >
        {[['ok'], ['oui', 'non'], ['oui', 'non', 'annuler']].map(labels => (
          <Dialog key={labels.length}>
            <Opener>{`${labels.length} action${labels.length > 1 ? 's' : ''}`}</Opener>
            <Dialog.Overlay />
            <Dialog.Content paddingTop={top}>
              <Dialog.Title>enregistrer les modifications ?</Dialog.Title>
              <Dialog.Description>
                le brouillon a changé depuis hier.
              </Dialog.Description>
              <Actions labels={labels} />
            </Dialog.Content>
          </Dialog>
        ))}
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`isOpen et onOpenChange : l'état vit ici — ${isOpen ? 'ouvert' : 'fermé'}. Le bouton l'ouvre sans Trigger.`}
      >
        <Button
          variant="outline"
          alignSelf="flex-start"
          onPress={() => setOpen(true)}
        >
          {"ouvrir de l'extérieur"}
        </Button>
        <Dialog isOpen={isOpen} onOpenChange={setOpen}>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>activer la localisation ?</Dialog.Title>
            <Dialog.Description>
              elle sert à trier les résultats par distance.
            </Dialog.Description>
            <Actions labels={['activer', 'plus tard']} />
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="l'entrée interrompue"
        note="Ouvre, puis referme 140 ms plus tard : le bandeau repart de l'angle où il est, le fond avec lui."
      >
        <Button variant="outline" alignSelf="flex-start" onPress={interrupt}>
          ouvrir puis refermer
        </Button>
        <Dialog isOpen={isHalfway} onOpenChange={setHalfway}>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>à peine entrevu</Dialog.Title>
            <Dialog.Description>refermé avant la fin du swivel.</Dialog.Description>
            <Actions labels={['ok']} />
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="non dismissable"
        note="isDismissable à false sur Overlay : ni le fond, ni le balayage, ni le retour du système ne ferment. Le bandeau suit le doigt sur quelques degrés et revient."
      >
        <Dialog>
          <Opener>il faut répondre</Opener>
          <Dialog.Overlay isDismissable={false} />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>accepter les conditions ?</Dialog.Title>
            <Dialog.Description>sans réponse, rien ne continue.</Dialog.Description>
            <Actions labels={['accepter', 'refuser']} />
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="désactivé"
        note="isDisabled : le Trigger est gris et n'ouvre pas — le Button de asChild comme le texte seul."
      >
        <Dialog isDisabled>
          <Opener>un button</Opener>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>jamais ouvert</Dialog.Title>
          </Dialog.Content>
        </Dialog>
        <Dialog isDisabled>
          <Dialog.Trigger>du texte seul</Dialog.Trigger>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>jamais ouvert</Dialog.Title>
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="close"
        note="Aucune croix : un MessageBox se ferme par ses boutons. asChild en fait un Button ; un texte seul est posé en body. Le Trigger aussi peut n'être que du texte."
      >
        <Dialog>
          <Dialog.Trigger>ouvrir, en texte seul</Dialog.Trigger>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>la mise à jour est prête</Dialog.Title>
            <Dialog.Description>
              elle sera installée au prochain démarrage.
            </Dialog.Description>
            <Dialog.Close asChild>
              <Button>redémarrer maintenant</Button>
            </Dialog.Close>
            <Dialog.Close>fermer, en texte seul</Dialog.Close>
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="un contenu long"
        note="La description passe à la ligne ; le bandeau prend la hauteur qu'il lui faut."
      >
        <Dialog>
          <Opener>contenu long</Opener>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>
              supprimer définitivement ce document et tout son historique ?
            </Dialog.Title>
            <Dialog.Description>{LONG}</Dialog.Description>
            <Actions labels={['supprimer', 'annuler']} />
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="un champ dans le bandeau"
        note="Un TextField entre la description et les actions : le bandeau est en haut, le clavier ne le couvre pas."
      >
        <Dialog>
          <Opener>renommer</Opener>
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>renommer le dossier</Dialog.Title>
            <TextField>
              <TextField.Label>nom</TextField.Label>
              <TextField.Field
                defaultValue="sans titre"
                placeholder="nom du dossier"
              />
            </TextField>
            <Actions labels={['renommer', 'annuler']} />
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="props de style"
        note="Les style props et style sur chaque slot : le fond plus dense (sa couleur ; son opacité reste celle de l'animation), le bandeau plus resserré, le titre en section."
      >
        <Dialog>
          <Opener>habillé</Opener>
          <Dialog.Overlay backgroundColor="rgba(0, 0, 0, 0.8)" />
          <Dialog.Content
            paddingTop={top}
            paddingHorizontal={32}
            gap={8}
            style={{ backgroundColor: theme.colors.default }}
          >
            <Dialog.Title fontSize={32}>batterie faible</Dialog.Title>
            <Dialog.Description color={theme.colors.foreground}>
              il reste 5 % de charge.
            </Dialog.Description>
            <Actions labels={['économiser', 'ignorer']} />
          </Dialog.Content>
        </Dialog>
      </TramSection>

      <TramSection
        title="depuis un select en plein écran"
        note="Choisir une ville referme la page et demande confirmation : un bandeau ouvert alors que la page du Select s'en va."
      >
        <Select value={city} onValueChange={setAsked}>
          <Select.Label>ville</Select.Label>
          <Select.Trigger>
            <Select.Value placeholder="choisir une ville" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content paddingTop={top}>
            {CITIES.map(name => (
              <Select.Item key={name} value={name}>
                {name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <Dialog
          isOpen={asked !== undefined}
          onOpenChange={next => {
            if (!next) setAsked(undefined)
          }}
        >
          <Dialog.Overlay />
          <Dialog.Content paddingTop={top}>
            <Dialog.Title>{`changer pour ${asked ?? city} ?`}</Dialog.Title>
            <Dialog.Description>
              la météo et les horaires suivront.
            </Dialog.Description>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Dialog.Close asChild>
                <Button flex={1} onPress={() => asked && setCity(asked)}>
                  changer
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button flex={1} variant="outline">
                  garder
                </Button>
              </Dialog.Close>
            </View>
          </Dialog.Content>
        </Dialog>
        <Typography variant="caption" color={theme.colors.muted}>
          {`ville courante : ${city}`}
        </Typography>
      </TramSection>
    </ScrollView>
  )
}
