import { ScrollView, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Button } from '@xaui/native/button'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The way into the demo, and nothing else.
 *
 * One screen per v1 component or primitive, each one the place that component is verified
 * — in light and in dark, since there is no test file for any of them. This screen only
 * points at them, so that adding a component means adding a route and one line here rather
 * than growing a screen that already scrolls for a minute.
 *
 * Alphabetical by label. The list was in the order the components were built, which is
 * exactly the order nobody looking for one of them is thinking in.
 */
const SCREENS = [
  { href: '/accordion', label: 'Accordion' },
  { href: '/alert', label: 'Alert' },
  { href: '/avatar', label: 'Avatar' },
  { href: '/badge', label: 'Badge' },
  { href: '/bottom-sheet', label: 'BottomSheet' },
  { href: '/button', label: 'Button' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/card', label: 'Card' },
  { href: '/checkbox', label: 'Checkbox' },
  { href: '/chip', label: 'Chip' },
  { href: '/date-field', label: 'DateField' },
  { href: '/dialog', label: 'Dialog' },
  { href: '/divider', label: 'Divider' },
  { href: '/field-group', label: 'FieldGroup' },
  { href: '/icon', label: 'Icon' },
  { href: '/input-otp', label: 'InputOTP' },
  { href: '/view', label: 'Layout' },
  { href: '/menu', label: 'Menu' },
  { href: '/popover', label: 'Popover' },
  { href: '/pressable-feedback', label: 'PressableFeedback' },
  { href: '/radio', label: 'Radio' },
  { href: '/select', label: 'Select' },
  { href: '/skeleton', label: 'Skeleton' },
  { href: '/slider', label: 'Slider' },
  { href: '/spinner', label: 'Spinner' },
  { href: '/stepper', label: 'Stepper' },
  { href: '/surface', label: 'Surface' },
  { href: '/switch', label: 'Switch' },
  { href: '/tabs', label: 'Tabs' },
  { href: '/tag-group', label: 'TagGroup' },
  { href: '/text-area', label: 'TextArea' },
  { href: '/text-field', label: 'TextField' },
  { href: '/time-field', label: 'TimeField' },
  { href: '/time-picker', label: 'TimePicker' },
  { href: '/toast', label: 'Toast' },
  { href: '/typography', label: 'Typography' },
] as const

export default function HomeScreen() {
  const theme = useXAUITheme()
  const router = useRouter()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 48 }}
    >
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        One screen per component. Each one is how that component is verified, in
        light and in dark.
      </Text>

      <View style={{ gap: 10 }}>
        {SCREENS.map(screen => (
          <Button
            key={screen.href}
            variant="tertiary"
            onPress={() => router.push(screen.href)}
          >
            {screen.label} →
          </Button>
        ))}
      </View>
    </ScrollView>
  )
}
