import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { JumpList, groupByInitial } from '@xaui/tram/jump-list'
import type { JumpListSection, JumpListSize } from '@xaui/tram/jump-list'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

type Contact = { name: string; detail: string }

/** Examples, not people: names spread over the alphabet, with q, u, w, x and z empty. */
const CONTACTS: Contact[] = [
  ['4 Saisons pizzeria', 'travail'],
  ['Aïcha Diallo', 'mobile'],
  ['Adama Traoré', 'mobile'],
  ['Amélie Roux', 'domicile'],
  ['Bakary Koné', 'mobile'],
  ['Bérénice Lemaire', 'travail'],
  ['Camille Petit', 'mobile'],
  ['Cheick Sangaré', 'mobile'],
  ['Djeneba Coulibaly', 'mobile'],
  ['David Mercier', 'travail'],
  ['Élodie Martin', 'mobile'],
  ['Emmanuel Kouassi', 'travail'],
  ['Fatoumata Keita', 'mobile'],
  ['Florian Dubois', 'domicile'],
  ['Grégoire Lambert', 'travail'],
  ['Hawa Touré', 'mobile'],
  ['Hugo Bernard', 'mobile'],
  ['Ibrahim Cissé', 'travail'],
  ['Inès Moreau', 'mobile'],
  ['Jules Fontaine', 'domicile'],
  ['Kadiatou Bah', 'mobile'],
  ['Lamine Diarra', 'mobile'],
  ['Léa Girard', 'travail'],
  ['Mariam Sylla', 'mobile'],
  ['Mathieu Lefèvre', 'travail'],
  ['Moussa Konaté', 'mobile'],
  ['Nadia Benali', 'mobile'],
  ['Oumar Sow', 'domicile'],
  ['Pauline Garnier', 'mobile'],
  ['Rokia Dembélé', 'mobile'],
  ['Romain Chevalier', 'travail'],
  ['Salif Kanté', 'mobile'],
  ['Sophie Laurent', 'domicile'],
  ['Thomas Roussel', 'travail'],
  ['Victor Blanc', 'mobile'],
  ['Yacouba Ouattara', 'mobile'],
].map(([name, detail]) => ({ name, detail }))

/** Groups that are not letters: the list layout, bars one under the other. One is empty. */
const MESSAGES: JumpListSection<Contact>[] = [
  {
    key: 'today',
    title: "aujourd'hui",
    data: [
      { name: 'Aïcha Diallo', detail: 'on se voit à 18 h ?' },
      { name: 'Bakary Koné', detail: 'c’est envoyé' },
      { name: 'Léa Girard', detail: 'merci pour hier soir' },
    ],
  },
  {
    key: 'yesterday',
    title: 'hier',
    data: [
      { name: 'Moussa Konaté', detail: 'le devis est validé' },
      { name: 'Hugo Bernard', detail: 'tu as les clés ?' },
    ],
  },
  {
    key: 'week',
    title: 'cette semaine',
    data: [
      { name: 'Salif Kanté', detail: 'réunion décalée à jeudi' },
      { name: 'Camille Petit', detail: 'bon anniversaire !' },
      { name: 'Oumar Sow', detail: 'appel manqué' },
    ],
  },
  { key: 'last-week', title: 'semaine dernière', data: [] },
  {
    key: 'month',
    title: 'ce mois-ci',
    data: [
      { name: 'Fatoumata Keita', detail: 'le colis est arrivé' },
      { name: 'David Mercier', detail: 'facture de novembre' },
      { name: 'Rokia Dembélé', detail: 'on garde la date' },
    ],
  },
  {
    key: 'older',
    title: 'plus ancien',
    data: [
      { name: 'Jules Fontaine', detail: 'bonne année !' },
      { name: 'Nadia Benali', detail: 'merci' },
      { name: 'Victor Blanc', detail: 'vu' },
      { name: 'Romain Chevalier', detail: 'les photos du mariage' },
    ],
  },
]

const SIZES: JumpListSize[] = ['sm', 'md', 'lg']

/** The theme's accent, then the three that take black ink and two that take white. */
const ACCENTS: (TramAccentName | undefined)[] = [
  undefined,
  'lime',
  'amber',
  'yellow',
  'magenta',
  'emerald',
]

const RAW = '#7c3aed'

/**
 * Where the Tram `JumpList` is verified, in dark and in light, with motion reduced: the
 * screen is the list. A header opens the grid; a key sends it away and the list lands on
 * its group. The buttons on top change the groups, the size, the accent, a raw colour,
 * and disable the headers; the last line says what the list reported.
 */
export default function TramJumpListScreen() {
  const theme = useXAUITheme()
  const [isDates, setIsDates] = useState(false)
  const [size, setSize] = useState(1)
  const [paint, setPaint] = useState(0)
  const [isRaw, setIsRaw] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [heard, setHeard] = useState('rien encore')

  const contacts = useMemo(
    () => groupByInitial(CONTACTS, row => row.name, { locale: 'fr' }),
    []
  )

  const top = (
    <TramSection
      title={isDates ? 'conversations' : 'contacts'}
      note={`Un carré d'accent ouvre la grille ; une touche grise n'a personne sous elle. Entendu : ${heard}`}
    >
      <Row>
        <Toggle onPress={() => setIsDates(value => !value)}>
          {isDates ? 'lettres' : 'dates'}
        </Toggle>
        <Toggle onPress={() => setSize(value => (value + 1) % SIZES.length)}>
          {`taille : ${SIZES[size]}`}
        </Toggle>
        <Toggle onPress={() => setPaint(value => (value + 1) % ACCENTS.length)}>
          {`accent : ${ACCENTS[paint] ?? 'thème'}`}
        </Toggle>
        <Toggle onPress={() => setIsRaw(value => !value)}>
          {isRaw ? 'sans couleur brute' : `couleur ${RAW}`}
        </Toggle>
        <Toggle onPress={() => setIsDisabled(value => !value)}>
          {isDisabled ? 'activer' : 'désactiver'}
        </Toggle>
      </Row>
    </TramSection>
  )

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <JumpList
        sections={isDates ? MESSAGES : contacts}
        keyExtractor={row => row.name}
        renderItem={({ item }) => <ContactRow row={item} />}
        ListHeaderComponent={top}
        contentContainerStyle={{ padding: 24, paddingBottom: 64 }}
        size={SIZES[size]}
        accent={ACCENTS[paint]}
        color={isRaw ? RAW : undefined}
        isDisabled={isDisabled}
        onOpenChange={isOpen => setHeard(`onOpenChange(${isOpen})`)}
        onJump={key => setHeard(`onJump('${key}')`)}
      >
        <JumpList.Header accessibilityHint="ouvre la grille des groupes" />
        <JumpList.Overlay>
          <JumpList.Key accessibilityHint="va à ce groupe" />
        </JumpList.Overlay>
      </JumpList>
    </View>
  )
}

/** A row of the list, as the Metro people hub drew one: the name, and a line under it. */
function ContactRow({ row }: { row: Contact }) {
  const theme = useXAUITheme()

  return (
    <View style={{ minHeight: 56, justifyContent: 'center' }}>
      <Typography variant="subtitle">{row.name}</Typography>
      <Typography variant="caption" color={theme.colors.muted}>
        {row.detail}
      </Typography>
    </View>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 8,
      }}
    >
      {children}
    </View>
  )
}

function Toggle({ children, onPress }: { children: string; onPress: () => void }) {
  return (
    <Button variant="outline" size="sm" onPress={onPress}>
      {children}
    </Button>
  )
}
