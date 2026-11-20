import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Calendar } from '@xaui/tram/calendar'
import type { CalendarSize, CalendarView } from '@xaui/tram/calendar'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: CalendarSize[] = ['sm', 'md', 'lg']

/** Title at the start, both chevrons at the end, as the Windows calendar has them. */
function Head({ onTitle }: { onTitle?: () => void }) {
  return (
    <Calendar.Header>
      <Calendar.Title onPress={onTitle} />
      <View style={{ flexDirection: 'row' }}>
        <Calendar.PreviousButton accessibilityLabel="mois précédent" />
        <Calendar.NextButton accessibilityLabel="mois suivant" />
      </View>
    </Calendar.Header>
  )
}

/**
 * Where the Tram `Calendar` is verified, in dark and in light: a day chosen and held by
 * the screen, the title that opens the months then the years, a lower bound, the three
 * sizes, a named accent, and disabled.
 */
export default function TramCalendarScreen() {
  const theme = useXAUITheme()
  const [day, setDay] = useState<Date | undefined>(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)
  })
  const [view, setView] = useState<CalendarView>('grid')
  const [today] = useState(() => new Date())

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 40, paddingBottom: 96 }}
    >
      <TramSection
        title="un jour"
        note="La case choisie en accent, aujourd'hui cerné à l'encre. Les mois défilent de haut en bas ; le titre ouvre les mois, puis les années."
      >
        <Calendar
          value={day}
          onValueChange={setDay}
          view={view}
          onViewChange={setView}
          locale="fr-FR"
        >
          <Head
            onTitle={() =>
              setView(current => (current === 'grid' ? 'month' : 'year'))
            }
          />
          {view === 'grid' ? (
            <>
              <Calendar.Weekdays />
              <Calendar.Grid />
            </>
          ) : view === 'month' ? (
            <Calendar.MonthPicker />
          ) : (
            <Calendar.YearPicker style={{ maxHeight: 290 }} />
          )}
        </Calendar>
        <Typography variant="body" color={theme.colors.muted}>
          {day
            ? day.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })
            : 'aucun jour'}
        </Typography>
      </TramSection>

      <TramSection
        title="pas avant aujourd'hui"
        note="minValue : les jours passés passent au gris pâle et ne répondent plus ; le chevron du haut s'éteint."
      >
        <Calendar minValue={today} locale="fr-FR">
          <Head />
          <Calendar.Weekdays />
          <Calendar.Grid />
        </Calendar>
      </TramSection>

      <TramSection title="les tailles" note="sm, md, lg — des cases de 36, 42, 48.">
        {SIZES.map(size => (
          <Calendar key={size} size={size} defaultValue={today} locale="fr-FR">
            <Head />
            <Calendar.Weekdays />
            <Calendar.Grid />
          </Calendar>
        ))}
      </TramSection>

      <TramSection
        title="accent et désactivé"
        note="Un accent nommé pour la case choisie ; désactivé, tout passe au gris."
      >
        <Calendar accent="lime" defaultValue={today} locale="fr-FR">
          <Head />
          <Calendar.Weekdays />
          <Calendar.Grid />
        </Calendar>
        <Calendar isDisabled defaultValue={today} locale="fr-FR">
          <Head />
          <Calendar.Weekdays />
          <Calendar.Grid />
        </Calendar>
      </TramSection>
    </ScrollView>
  )
}
