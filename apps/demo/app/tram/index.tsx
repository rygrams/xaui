import { Pressable, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useXAUITheme } from '@xaui/native/theme'
import { Typography } from '@xaui/tram/typography'

/**
 * The way into the Tram screens. A component adds its route to `tram/_layout` and one
 * line here.
 */
const SCREENS = [
  { href: '/tram/theme', label: 'thème et mouvement' },
  { href: '/tram/page', label: 'page' },
  { href: '/tram/button', label: 'button' },
  { href: '/tram/switch', label: 'switch' },
  { href: '/tram/checkbox', label: 'checkbox' },
  { href: '/tram/radio', label: 'radio' },
  { href: '/tram/slider', label: 'slider' },
  { href: '/tram/pivot', label: 'pivot' },
  { href: '/tram/progress-bar', label: 'progress bar' },
  { href: '/tram/text-field', label: 'text field' },
  { href: '/tram/text-area', label: 'text area' },
  { href: '/tram/select', label: 'select' },
  { href: '/tram/list', label: 'list' },
  { href: '/tram/list-box', label: 'list box' },
  { href: '/tram/menu', label: 'menu' },
  { href: '/tram/tile', label: 'tile' },
  { href: '/tram/jump-list', label: 'jump list' },
  { href: '/tram/panorama', label: 'panorama' },
  { href: '/tram/wheel-picker', label: 'wheel picker' },
  { href: '/tram/date-picker', label: 'date picker' },
  { href: '/tram/date-time-picker', label: 'date time picker' },
  { href: '/tram/time-picker', label: 'time picker' },
  { href: '/tram/dialog', label: 'dialog' },
  { href: '/tram/fab', label: 'fab' },
  { href: '/tram/close-button', label: 'close button' },
  { href: '/tram/app-bar', label: 'app bar' },
  { href: '/tram/toast', label: 'toast' },
  { href: '/tram/tabs', label: 'tabs' },
  { href: '/tram/toggle-button', label: 'toggle button' },
  { href: '/tram/typography', label: 'typography' },
  { href: '/tram/surface', label: 'surface' },
  { href: '/tram/card', label: 'card' },
  { href: '/tram/spinner', label: 'spinner' },
  { href: '/tram/avatar', label: 'avatar' },
  { href: '/tram/divider', label: 'divider' },
  { href: '/tram/badge', label: 'badge' },
  { href: '/tram/chip', label: 'chip' },
  { href: '/tram/alert', label: 'alert' },
  { href: '/tram/skeleton', label: 'skeleton' },
  { href: '/tram/empty-state', label: 'empty state' },
  { href: '/tram/accordion', label: 'accordion' },
  { href: '/tram/search-field', label: 'search field' },
  { href: '/tram/number-field', label: 'number field' },
  { href: '/tram/input-otp', label: 'input otp' },
  { href: '/tram/bottom-sheet', label: 'bottom sheet' },
  { href: '/tram/mask-field', label: 'mask field' },
  { href: '/tram/autocomplete', label: 'autocomplete' },
  { href: '/tram/combobox', label: 'combobox' },
  { href: '/tram/field-group', label: 'field group' },
  { href: '/tram/phone-number-field', label: 'phone number field' },
  { href: '/tram/dummy-field', label: 'dummy field' },
  { href: '/tram/number-stepper', label: 'number stepper' },
  { href: '/tram/rating', label: 'rating' },
  { href: '/tram/number-pad', label: 'number pad' },
  { href: '/tram/calendar', label: 'calendar' },
  { href: '/tram/range-calendar', label: 'range calendar' },
  { href: '/tram/stepper', label: 'stepper' },
  { href: '/tram/timeline', label: 'timeline' },
  { href: '/tram/color-picker', label: 'color picker' },
  { href: '/tram/slide-button', label: 'slide button' },
  { href: '/tram/table', label: 'table' },
  { href: '/tram/morph-button', label: 'morph button' },
  { href: '/tram/carousel', label: 'carousel' },
  { href: '/tram/scaffold', label: 'scaffold' },
  { href: '/tram/charts', label: 'charts' },
  { href: '/tram/view', label: 'view' },
] as const

export default function TramHomeScreen() {
  const theme = useXAUITheme()
  const router = useRouter()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 24, paddingBottom: 48 }}
    >
      <Typography variant="page" accessibilityRole="header">
        tram
      </Typography>

      <View style={{ gap: 12 }}>
        {SCREENS.map(screen => (
          <Pressable
            key={screen.href}
            accessibilityRole="link"
            onPress={() => router.push(screen.href)}
            style={{ minHeight: 48, justifyContent: 'center' }}
          >
            <Typography variant="title">{screen.label}</Typography>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}
