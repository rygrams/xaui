import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { RangeCalendar } from '@xaui/tram/range-calendar'
import type { DateRange } from '@xaui/tram/range-calendar'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const DAY = 86_400_000

function Head() {
  return (
    <RangeCalendar.Header>
      <RangeCalendar.Title />
      <View style={{ flexDirection: 'row' }}>
        <RangeCalendar.PreviousButton accessibilityLabel="mois précédent" />
        <RangeCalendar.NextButton accessibilityLabel="mois suivant" />
      </View>
    </RangeCalendar.Header>
  )
}

function short(date: Date) {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

/** What the screen says about the period: half chosen, one day, or so many nights. */
function reading(stay: DateRange) {
  if (!stay.start) return 'choisissez l’arrivée'
  if (!stay.end) return `du ${short(stay.start)} — choisissez le départ`

  const nights = Math.round((stay.end.getTime() - stay.start.getTime()) / DAY)
  if (nights === 0) return `${short(stay.start)} · la journée`

  return `${short(stay.start)} – ${short(stay.end)} · ${nights} nuit${nights > 1 ? 's' : ''}`
}

/**
 * Where the Tram `RangeCalendar` is verified, in dark and in light: a period held by the
 * screen and read back, the three presses, a named accent.
 */
export default function TramRangeCalendarScreen() {
  const theme = useXAUITheme()
  const [stay, setStay] = useState<DateRange>(() => {
    const today = new Date()
    const y = today.getFullYear()
    const m = today.getMonth()
    const d = today.getDate()
    return { start: new Date(y, m, d + 4), end: new Date(y, m, d + 8) }
  })

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 40, paddingBottom: 96 }}
    >
      <TramSection
        title="une période"
        note="Les deux bouts en accent, l'entre-deux dans sa tranche douce, bord à bord. Trois appuis : l'arrivée, le départ, puis une nouvelle arrivée."
      >
        <RangeCalendar value={stay} onValueChange={setStay} locale="fr-FR">
          <Head />
          <RangeCalendar.Weekdays />
          <RangeCalendar.Grid />
        </RangeCalendar>
        <Typography variant="body" color={theme.colors.muted}>
          {reading(stay)}
        </Typography>
      </TramSection>

      <TramSection
        title="un autre accent"
        note="Un accent nommé : la tranche douce le suit."
      >
        <RangeCalendar accent="magenta" size="sm" locale="fr-FR">
          <Head />
          <RangeCalendar.Weekdays />
          <RangeCalendar.Grid />
        </RangeCalendar>
      </TramSection>
    </ScrollView>
  )
}
