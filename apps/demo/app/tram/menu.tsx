import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { ListBox } from '@xaui/tram/list-box'
import { Menu } from '@xaui/tram/menu'
import { duration } from '@xaui/tram/motion'
import { Page } from '@xaui/tram/page'
import { Toast, useToast } from '@xaui/tram/toast'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

type Mail = {
  id: string
  from: string
  subject: string
  body: string
  isUnread: boolean
}

const MAIL: Mail[] = [
  {
    id: 'awa',
    from: 'Awa Koné',
    subject: 'Réunion de demain',
    body: 'On décale à 10 h ?',
    isUnread: true,
  },
  {
    id: 'marc',
    from: 'Marc',
    subject: 'Photos du week-end',
    body: "Je t'envoie tout ce soir",
    isUnread: false,
  },
  {
    id: 'banque',
    from: 'Banque',
    subject: 'Relevé de novembre',
    body: 'Votre relevé est disponible',
    isUnread: false,
  },
  {
    id: 'ines',
    from: 'Inès',
    subject: 'Re : anniversaire',
    body: 'Super idée pour le gâteau',
    isUnread: true,
  },
  {
    id: 'theo',
    from: 'Théo',
    subject: 'Billets de train',
    body: 'Départ 7 h 42, voiture 12',
    isUnread: false,
  },
]

const SORTS = [
  { id: 'date', label: 'date' },
  { id: 'from', label: 'expéditeur' },
  { id: 'unread', label: "non lus d'abord" },
] as const

type Sort = (typeof SORTS)[number]['id']

const FOLDERS = Array.from({ length: 14 }, (_, index) => `dossier ${index + 1}`)

function CheckIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12.5 9.5 18 20 6" stroke={color} strokeWidth={2.5} />
    </Svg>
  )
}

/**
 * Where the Tram `Menu` is verified, in dark and in light, with reduced motion: a context
 * menu held on the rows of a list — the page recedes, the row stays in front — a menu
 * opened on a press with a heading and checks, one against the foot of the screen that
 * opens upward, a menu too long for either side that scrolls, one without `Overlay`, one
 * that must be answered, a disabled one and a controlled one.
 */
export default function TramMenuScreen() {
  const theme = useXAUITheme()
  const { toast } = useToast()
  const [mail, setMail] = useState(MAIL)
  const [sort, setSort] = useState<Sort>('date')
  const [isOpen, setOpen] = useState(false)
  const [opened, setOpened] = useState(0)

  const say = (title: string) =>
    toast({
      render: () => (
        <Toast>
          <Toast.Title>{title}</Toast.Title>
        </Toast>
      ),
    })

  const toggleRead = (id: string) =>
    setMail(current =>
      current.map(item =>
        item.id === id ? { ...item, isUnread: !item.isUnread } : item
      )
    )

  // Once the menu has swivelled away: the row is its trigger, and a menu whose trigger is
  // taken away while it closes has nothing left to close.
  const remove = (id: string) =>
    setTimeout(
      () => setMail(current => current.filter(item => item.id !== id)),
      duration.base
    )

  return (
    <Page>
      <ScrollView
        style={{ backgroundColor: theme.colors.background }}
        contentContainerStyle={{ padding: 24, gap: 40, paddingBottom: 96 }}
      >
        <TramSection
          title="appui long"
          note="Maintenez une ligne : la page recule, la ligne reste devant et le menu pivote sur le bord qu'il partage avec elle. Un appui bref ouvre toujours le message."
        >
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button size="sm" variant="text" onPress={() => setMail(MAIL)}>
              remettre
            </Button>
          </View>
          <ListBox>
            {mail.map(item => (
              <Menu key={item.id}>
                <Menu.Trigger asChild opensOn="longPress">
                  <ListBox.ItemButton
                    onPress={() => say(`ouvrir « ${item.subject} »`)}
                  >
                    <ListBox.ItemContent>
                      <ListBox.ItemTitle>{item.from}</ListBox.ItemTitle>
                      <ListBox.ItemDescription
                        color={
                          item.isUnread ? theme.colors.link : theme.colors.foreground
                        }
                      >
                        {item.subject}
                      </ListBox.ItemDescription>
                      <ListBox.ItemDescription>{item.body}</ListBox.ItemDescription>
                    </ListBox.ItemContent>
                  </ListBox.ItemButton>
                </Menu.Trigger>
                <Menu.Overlay />
                <Menu.Content>
                  <Menu.Item onPress={() => say(`répondre à ${item.from}`)}>
                    <Menu.ItemTitle>répondre</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item onPress={() => toggleRead(item.id)}>
                    <Menu.ItemTitle>
                      {item.isUnread ? 'marquer comme lu' : 'marquer comme non lu'}
                    </Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item onPress={() => say(`épinglé : ${item.subject}`)}>
                    <Menu.ItemTitle>
                      {"épingler sur l'écran d'accueil"}
                    </Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item isDisabled>
                    <Menu.ItemTitle>archiver</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item variant="danger" onPress={() => remove(item.id)}>
                    <Menu.ItemTitle>supprimer</Menu.ItemTitle>
                  </Menu.Item>
                </Menu.Content>
              </Menu>
            ))}
          </ListBox>
        </TramSection>

        <TramSection
          title="sur un appui"
          note="Le Menu de Native : un appui ouvre. Un intitulé, des coches dans l'indicateur, une seconde ligne."
        >
          <Menu>
            <Menu.Trigger asChild>
              <Button variant="outline" alignSelf="flex-start">
                {`trier : ${SORTS.find(item => item.id === sort)?.label}`}
              </Button>
            </Menu.Trigger>
            <Menu.Overlay />
            <Menu.Content>
              <Menu.Label>trier par</Menu.Label>
              <Menu.Group>
                {SORTS.map(item => (
                  <Menu.Item
                    key={item.id}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: item.id === sort }}
                    onPress={() => setSort(item.id)}
                  >
                    <Menu.ItemTitle>{item.label}</Menu.ItemTitle>
                    <Menu.ItemIndicator>
                      {item.id === sort ? <Icon as={CheckIcon} /> : null}
                    </Menu.ItemIndicator>
                  </Menu.Item>
                ))}
              </Menu.Group>
              <Menu.Separator />
              <Menu.Item onPress={() => say('filtres')}>
                <View style={{ flex: 1 }}>
                  <Menu.ItemTitle>filtres</Menu.ItemTitle>
                  <Menu.ItemDescription>
                    pièces jointes, drapeaux
                  </Menu.ItemDescription>
                </View>
              </Menu.Item>
            </Menu.Content>
          </Menu>
        </TramSection>

        <TramSection
          title="trop long pour un côté"
          note="Quatorze dossiers : le menu prend le côté le plus grand et défile."
        >
          <Menu>
            <Menu.Trigger asChild>
              <Button variant="outline" alignSelf="flex-start">
                déplacer vers
              </Button>
            </Menu.Trigger>
            <Menu.Overlay />
            <Menu.Content>
              {FOLDERS.map(folder => (
                <Menu.Item
                  key={folder}
                  onPress={() => say(`déplacé vers ${folder}`)}
                >
                  <Menu.ItemTitle>{folder}</Menu.ItemTitle>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu>
        </TramSection>

        <TramSection
          title="sans overlay, ou à répondre"
          note="Sans Menu.Overlay, rien ne s'assombrit ni ne recule. Avec isDismissable={false}, ni un appui dehors ni le retour ne ferment."
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            <Menu>
              <Menu.Trigger asChild>
                <Button variant="outline">sans overlay</Button>
              </Menu.Trigger>
              <Menu.Content>
                <Menu.Item>
                  <Menu.ItemTitle>fermer</Menu.ItemTitle>
                </Menu.Item>
              </Menu.Content>
            </Menu>
            <Menu>
              <Menu.Trigger asChild>
                <Button variant="outline">à répondre</Button>
              </Menu.Trigger>
              <Menu.Overlay isDismissable={false} />
              <Menu.Content placement="top">
                <Menu.Item onPress={() => say('gardé')}>
                  <Menu.ItemTitle>garder</Menu.ItemTitle>
                </Menu.Item>
                <Menu.Item variant="danger" onPress={() => say('jeté')}>
                  <Menu.ItemTitle>jeter</Menu.ItemTitle>
                </Menu.Item>
              </Menu.Content>
            </Menu>
          </View>
        </TramSection>

        <TramSection
          title="désactivé, contrôlé"
          note="Un menu désactivé grise son déclencheur et n'ouvre rien. Le second est ouvert par son état, depuis un autre bouton."
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            <Menu isDisabled>
              <Menu.Trigger asChild>
                <Button variant="outline">désactivé</Button>
              </Menu.Trigger>
              <Menu.Overlay />
              <Menu.Content>
                <Menu.Item>
                  <Menu.ItemTitle>jamais vu</Menu.ItemTitle>
                </Menu.Item>
              </Menu.Content>
            </Menu>
            <Menu
              isOpen={isOpen}
              onOpenChange={next => {
                setOpen(next)
                if (next) setOpened(count => count + 1)
              }}
            >
              <Menu.Trigger>contrôlé</Menu.Trigger>
              <Menu.Overlay />
              <Menu.Content>
                <Menu.Item closesOnPress={false} onPress={() => say('reste ouvert')}>
                  <Menu.ItemTitle>rester ouvert</Menu.ItemTitle>
                </Menu.Item>
                <Menu.Item>
                  <Menu.ItemTitle>fermer</Menu.ItemTitle>
                </Menu.Item>
              </Menu.Content>
            </Menu>
            <Button variant="text" onPress={() => setOpen(true)}>
              ouvrir le contrôlé
            </Button>
          </View>
          <Typography variant="caption" color={theme.colors.muted}>
            {`ouvert ${opened} fois`}
          </Typography>
        </TramSection>

        <TramSection
          title="au pied de l'écran"
          note="Sans place dessous, le menu s'ouvre au-dessus et pivote sur son bord bas."
        >
          <Menu>
            <Menu.Trigger asChild>
              <Button alignSelf="flex-start">options</Button>
            </Menu.Trigger>
            <Menu.Overlay />
            <Menu.Content>
              <Menu.Item onPress={() => say('partager')}>
                <Menu.ItemTitle>partager</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item onPress={() => say('copier le lien')}>
                <Menu.ItemTitle>copier le lien</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item onPress={() => say('renommer')}>
                <Menu.ItemTitle>renommer</Menu.ItemTitle>
              </Menu.Item>
            </Menu.Content>
          </Menu>
        </TramSection>
      </ScrollView>
    </Page>
  )
}
