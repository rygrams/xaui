import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { DateInput, TimeInput, DateTimeInput } from '@xaui/native/input'

export default function DateInputScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [dashDate, setDashDate] = useState('')
  const [slashDate, setSlashDate] = useState('')
  const [dotDate, setDotDate] = useState('')
  const [ymdDate, setYmdDate] = useState('')
  const [dmyDate, setDmyDate] = useState('')
  const [mdyDate, setMdyDate] = useState('')
  const [frDate, setFrDate] = useState('')
  const [jaDate, setJaDate] = useState('')
  const [time24, setTime24] = useState('')
  const [time12, setTime12] = useState('')
  const [timeSeconds, setTimeSeconds] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [validDate, setValidDate] = useState('')

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Separators
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DateInput
            label="Dash separator (-)"
            separator="-"
            value={dashDate}
            onValueChange={setDashDate}
            variant="bordered"
            themeColor="primary"
          />
          <DateInput
            label="Slash separator (/)"
            separator="/"
            value={slashDate}
            onValueChange={setSlashDate}
            variant="bordered"
            themeColor="secondary"
          />
          <DateInput
            label="Dot separator (.)"
            separator="."
            value={dotDate}
            onValueChange={setDotDate}
            variant="bordered"
            themeColor="tertiary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Date Orders
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DateInput
            label="YMD (Year-Month-Day)"
            dateOrder="YMD"
            separator="-"
            value={ymdDate}
            onValueChange={setYmdDate}
            variant="bordered"
            themeColor="primary"
          />
          <DateInput
            label="DMY (Day-Month-Year)"
            dateOrder="DMY"
            separator="/"
            value={dmyDate}
            onValueChange={setDmyDate}
            variant="bordered"
            themeColor="secondary"
          />
          <DateInput
            label="MDY (Month-Day-Year)"
            dateOrder="MDY"
            separator="/"
            value={mdyDate}
            onValueChange={setMdyDate}
            variant="bordered"
            themeColor="success"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Locale Auto-Detection
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DateInput
            label="French (fr)"
            locale="fr"
            separator="/"
            value={frDate}
            onValueChange={setFrDate}
            description="Auto-detects DMY order"
            variant="bordered"
            themeColor="primary"
          />
          <DateInput
            label="Japanese (ja)"
            locale="ja"
            separator="-"
            value={jaDate}
            onValueChange={setJaDate}
            description="Auto-detects YMD order"
            variant="bordered"
            themeColor="secondary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Time Input
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <TimeInput
            label="24-hour (HH:mm)"
            granularity="minute"
            hourCycle={24}
            value={time24}
            onValueChange={setTime24}
            variant="bordered"
            themeColor="primary"
          />
          <TimeInput
            label="12-hour (hh:mm AM)"
            granularity="minute"
            hourCycle={12}
            value={time12}
            onValueChange={setTime12}
            variant="bordered"
            themeColor="secondary"
          />
          <TimeInput
            label="With seconds (HH:mm:ss)"
            granularity="second"
            hourCycle={24}
            value={timeSeconds}
            onValueChange={setTimeSeconds}
            variant="bordered"
            themeColor="tertiary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          DateTime Input
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DateTimeInput
            label="Date + Time"
            dateOrder="YMD"
            separator="-"
            granularity="minute"
            hourCycle={24}
            value={dateTime}
            onValueChange={setDateTime}
            description="Combined date and time input"
            variant="bordered"
            themeColor="success"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Validation
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DateInput
            label="Required date"
            separator="-"
            dateOrder="YMD"
            value={validDate}
            onValueChange={setValidDate}
            isInvalid={validDate.length > 0 && validDate.length < 10}
            errorMessage="Please enter a complete date"
            variant="bordered"
            themeColor="danger"
          />
          <DateInput
            label="Disabled"
            separator="-"
            dateOrder="YMD"
            defaultValue="2024-01-15"
            isDisabled
            variant="flat"
          />
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
})
