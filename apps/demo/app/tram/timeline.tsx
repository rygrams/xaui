import { ScrollView } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Timeline } from '@xaui/tram/timeline'
import type { TimelineSize, TimelineStatus } from '@xaui/tram/timeline'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

type Entry = {
  day: string
  month: string
  over: string
  status: TimelineStatus
  title: string
  description: string
}

const STAY: Entry[] = [
  {
    day: '16',
    month: 'nov',
    over: '09:12',
    status: 'success',
    title: 'demande reçue',
    description: 'Chambre verte, quatre nuits, deux personnes.',
  },
  {
    day: '17',
    month: 'nov',
    over: '14:40',
    status: 'success',
    title: 'arrhes encaissées',
    description: '96 € par carte, reçu envoyé.',
  },
  {
    day: '18',
    month: 'nov',
    over: '18:05',
    status: 'warning',
    title: 'heure d’arrivée à confirmer',
    description: 'Relance envoyée par message.',
  },
  {
    day: '20',
    month: 'nov',
    over: 'AUJOURD’HUI',
    status: 'current',
    title: 'chambre en préparation',
    description: 'Draps, bois pour le poêle.',
  },
  {
    day: '24',
    month: 'nov',
    over: '15:00',
    status: 'default',
    title: 'arrivée',
    description: 'Accueil à partir de 15 h.',
  },
  {
    day: '28',
    month: 'nov',
    over: '11:00',
    status: 'muted',
    title: 'départ',
    description: 'La chambre est à rendre avant 11 h.',
  },
]

const SIZES: TimelineSize[] = ['sm', 'lg']

/**
 * Where the Tram `Timeline` is verified, in dark and in light: the six statuses on a
 * stay, the two other sizes, compact, a named accent, and entries with no tile.
 */
export default function TramTimelineScreen() {
  const theme = useXAUITheme()

  const entries = (list: Entry[]) =>
    list.map(entry => (
      <Timeline.Item key={entry.day + entry.title} status={entry.status}>
        <Timeline.Leading caption={entry.month}>{entry.day}</Timeline.Leading>
        <Timeline.Rail />
        <Timeline.Content>
          <Typography variant="caption" color={theme.colors.muted}>
            {entry.over}
          </Typography>
          <Timeline.Title>{entry.title}</Timeline.Title>
          <Timeline.Description>{entry.description}</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    ))

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 40, paddingBottom: 96 }}
    >
      <TramSection
        title="un séjour"
        note="Une tuile de la date ouvre chaque entrée, une ligne descend jusqu'à la suivante. La tuile prend le statut : accent, encre en cours, gris pâle, vert, ambre, rouge."
      >
        <Timeline>{entries(STAY)}</Timeline>
      </TramSection>

      {SIZES.map(size => (
        <TramSection
          key={size}
          title={size === 'sm' ? 'petite, serrée' : 'grande'}
          note={
            size === 'sm'
              ? 'size sm et density compact : des tuiles de 60, 16 d’air.'
              : 'size lg : des tuiles de 92, et un accent nommé.'
          }
        >
          <Timeline
            size={size}
            density={size === 'sm' ? 'compact' : 'comfortable'}
            accent={size === 'lg' ? 'teal' : undefined}
          >
            {entries(STAY.slice(3, 5))}
          </Timeline>
        </TramSection>
      ))}

      <TramSection
        title="sans tuile"
        note="Une entrée sans Leading : le rail se tient dans la rangée, un carré de son statut en haut."
      >
        <Timeline>
          {STAY.slice(0, 3).map(entry => (
            <Timeline.Item key={entry.title} status={entry.status}>
              <Timeline.Rail />
              <Timeline.Content>
                <Timeline.Title>{entry.title}</Timeline.Title>
                <Timeline.Description>{entry.description}</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </TramSection>
    </ScrollView>
  )
}
