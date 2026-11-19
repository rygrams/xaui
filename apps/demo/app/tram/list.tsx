import { useState } from 'react'
import { Image, View } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { List } from '@xaui/tram/list'
import { Switch } from '@xaui/tram/switch'
import type { TramAccentName } from '@xaui/tram/theme'
import { ToggleButton } from '@xaui/tram/toggle-button'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

type Kind = 'news' | 'mail' | 'controls'

type Story = {
  id: string
  title: string
  category: string
  lede: string
  icon: 'sun' | 'ball' | 'note' | 'chip' | 'chart' | 'picture'
}

type Mail = { id: string; from: string; subject: string; body: string; time: string }

const STORIES: Story[] = [
  [
    'Coucher de soleil record',
    'météo',
    'Les photos les plus partagées de la semaine, de Dakar à Abidjan.',
    'sun',
  ],
  [
    'Les Étalons en finale',
    'sport',
    'Une victoire arrachée dans les arrêts de jeu, devant un stade plein.',
    'ball',
  ],
  [
    'Le festival ouvre ses portes',
    'culture',
    'Trois scènes, quarante groupes et une nuit entière sur la place.',
    'note',
  ],
  [
    'Un téléphone à tuiles, encore',
    'tech',
    'La mise en page de Metro revient dans les applications.',
    'chip',
  ],
  [
    'Le marché du coton repart',
    'économie',
    'Les cours remontent pour le troisième mois de suite.',
    'chart',
  ],
  [
    'Une image en vignette',
    'asChild',
    'List.Leading asChild : l’image prend le carré de 52.',
    'picture',
  ],
  ...Array.from({ length: 24 }, (_, index) => [
    `Brève ${index + 1}`,
    index % 2 === 0 ? 'ville' : 'région',
    'Une ligne de plus pour voir les lignes dessinées plus tard, en défilant : elles sont posées, sans cascade.',
    'chart',
  ]),
].map(([title, category, lede, icon], index) => ({
  id: `story-${index}`,
  title,
  category,
  lede,
  icon: icon as Story['icon'],
}))

const MAILS: Mail[] = [
  [
    'Inès Kaboré',
    'Revue du List',
    'Le slot Subtitle me va, à condition que Description garde deux lignes.',
    '9:41',
  ],
  [
    'Moussa Traoré',
    'Démo de jeudi',
    'On montre le Pivot puis la liste, dans le même écran ?',
    '9:02',
  ],
  [
    'équipe design',
    'Vignettes carrées',
    'Les photos de contact restent carrées, comme dans le hub.',
    '8:15',
  ],
  [
    'Awa Ouédraogo',
    'Re : accents',
    'Le jaune passe en encre noire sur l’aplat, c’est vérifié.',
    'hier',
  ],
  [
    'Salif Diallo',
    'Balayage',
    'Une seule ligne ouverte à la fois, sinon la liste devient illisible.',
    'lun.',
  ],
].map(([from, subject, body, time], index) => ({
  id: `mail-${index}`,
  from,
  subject,
  body,
  time,
}))

const CONTROLS = [
  { id: 'wifi', title: 'Wi-Fi', detail: 'le Switch garde son propre appui' },
  {
    id: 'sync',
    title: 'synchronisation',
    detail: 'une ligne sans onPress ne bouge pas',
  },
  {
    id: 'flight',
    title: 'mode avion',
    detail: 'sans sous-titre : deux niveaux, comme Native',
  },
]

/** The accents worth seeing on the subtitle: a grey one, a pale one, a strong one. */
const ACCENTS: (TramAccentName | 'theme')[] = ['theme', 'steel', 'yellow', 'crimson']

const GLYPHS = {
  sun: SunIcon,
  ball: BallIcon,
  note: NoteIcon,
  chip: ChipIcon,
  chart: ChartIcon,
} as const

/**
 * Where the Tram `List` is verified, in dark and in light: the news list — squares, three
 * levels of text, a press that tilts, two actions under each row — then the mail list
 * with no square and the time at the end, and rows that hold controls. The accents
 * include steel, whose ink is moved off the grey of the descriptions on white. The
 * entrance can be replayed; the rows drawn later, by scrolling, are placed.
 */
export default function TramListScreen() {
  const theme = useXAUITheme()
  const [kind, setKind] = useState<Kind>('news')
  const [accent, setAccent] = useState<TramAccentName | 'theme'>('theme')
  const [entrance, setEntrance] = useState(0)
  const [isSecondOff, setSecondOff] = useState(false)
  const [stories, setStories] = useState(STORIES)
  const [toggles, setToggles] = useState<Record<string, boolean>>({ wifi: true })
  const [event, setEvent] = useState('—')

  const listAccent = accent === 'theme' ? undefined : accent

  const header = (
    <View style={{ padding: 24, gap: 16 }}>
      <TramSection
        title="la liste"
        note="Une vignette de 52, un titre dans l'encre, une ligne en accent, un détail gris. Aucun trait : 12 points entre deux lignes."
      >
        <ToggleButton.Group
          value={kind}
          onValueChange={value => setKind(value as Kind)}
          size="sm"
        >
          <ToggleButton value="news">actualités</ToggleButton>
          <ToggleButton value="mail">courrier</ToggleButton>
          <ToggleButton value="controls">contrôles</ToggleButton>
        </ToggleButton.Group>
        <ToggleButton.Group
          value={accent}
          onValueChange={value => setAccent(value as TramAccentName | 'theme')}
          size="sm"
        >
          {ACCENTS.map(name => (
            <ToggleButton key={name} value={name}>
              {name === 'theme' ? 'thème' : name}
            </ToggleButton>
          ))}
        </ToggleButton.Group>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <Button size="sm" onPress={() => setEntrance(count => count + 1)}>
            {"rejouer l'entrée"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => setSecondOff(current => !current)}
          >
            {isSecondOff ? 'réactiver la 2e' : 'désactiver la 2e'}
          </Button>
        </View>
        <Typography variant="caption" color={theme.colors.muted}>
          {`dernier événement : ${event}`}
        </Typography>
      </TramSection>
    </View>
  )

  const footer = <View style={{ height: 96 }} />
  const listStyle = { backgroundColor: theme.colors.background }

  if (kind === 'mail') {
    return (
      <List
        key={`mail-${entrance}`}
        accent={listAccent}
        data={MAILS}
        keyExtractor={mail => mail.id}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        style={listStyle}
        renderItem={({ item, index }) => (
          <List.Item
            onPress={() => setEvent(`onPress · ${item.from}`)}
            isDisabled={isSecondOff && index === 1}
          >
            <List.Content>
              <List.Title>{item.from}</List.Title>
              <List.Subtitle
                // A mail already read keeps its subject in the page's ink.
                color={index > 1 ? theme.colors.foreground : undefined}
              >
                {item.subject}
              </List.Subtitle>
              <List.Description>{item.body}</List.Description>
            </List.Content>
            <List.Action>{item.time}</List.Action>
          </List.Item>
        )}
      />
    )
  }

  if (kind === 'controls') {
    return (
      <List
        key={`controls-${entrance}`}
        accent={listAccent}
        data={CONTROLS}
        keyExtractor={row => row.id}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        style={listStyle}
        renderItem={({ item, index }) => (
          <List.Item isDisabled={isSecondOff && index === 1}>
            <List.Leading>
              <Icon as={ChipIcon} />
            </List.Leading>
            <List.Content>
              <List.Title>{item.title}</List.Title>
              <List.Description>{item.detail}</List.Description>
            </List.Content>
            <List.Action>
              <Switch
                aria-label={item.title}
                isSelected={toggles[item.id] ?? false}
                onSelectedChange={on => {
                  setToggles(current => ({ ...current, [item.id]: on }))
                  setEvent(`${item.title} · ${on ? 'activé' : 'désactivé'}`)
                }}
                isDisabled={isSecondOff && index === 1}
              />
            </List.Action>
          </List.Item>
        )}
      />
    )
  }

  return (
    <List
      key={`news-${entrance}`}
      accent={listAccent}
      data={stories}
      keyExtractor={story => story.id}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      style={listStyle}
      renderItem={({ item, index }) => (
        <List.Item
          onPress={() => setEvent(`onPress · ${item.title}`)}
          isDisabled={isSecondOff && index === 1}
        >
          {item.icon === 'picture' ? (
            <List.Leading asChild>
              <Image source={require('../../assets/images/icon.png')} />
            </List.Leading>
          ) : (
            <List.Leading>
              <Icon as={GLYPHS[item.icon]} />
            </List.Leading>
          )}
          <List.Content>
            <List.Title>{item.title}</List.Title>
            <List.Subtitle>{item.category}</List.Subtitle>
            <List.Description>{item.lede}</List.Description>
          </List.Content>
          <List.Swipe>
            <List.SwipeAction onPress={() => setEvent(`archiver · ${item.title}`)}>
              <Icon as={ArchiveIcon} />
              archiver
            </List.SwipeAction>
            <List.SwipeAction
              accent="red"
              onPress={() => {
                setStories(current => current.filter(story => story.id !== item.id))
                setEvent(`supprimer · ${item.title}`)
              }}
            >
              <Icon as={TrashIcon} />
              supprimer
            </List.SwipeAction>
          </List.Swipe>
        </List.Item>
      )}
    />
  )
}

function SunIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={2} />
      <Path
        d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

function BallIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path d="M12 3v18M3 12h18" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function NoteIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18V5l11-2v13" stroke={color} strokeWidth={2} />
      <Circle cx={6} cy={18} r={3} stroke={color} strokeWidth={2} />
      <Circle cx={17} cy={16} r={3} stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function ChipIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={6} y={6} width={12} height={12} stroke={color} strokeWidth={2} />
      <Path
        d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

function ChartIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 20h18M6 16v-5M11 16V7M16 16v-8M21 16V4"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

function ArchiveIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 4h18v5H3zM5 9v11h14V9M10 13h4" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function TrashIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke={color} strokeWidth={2} />
    </Svg>
  )
}
