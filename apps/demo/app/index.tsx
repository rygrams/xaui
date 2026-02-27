import { useXUIColors } from '@xaui/native/core'
import { ScrollView } from 'react-native'
import { Button } from '@xaui/native/button'
import { useRouter } from 'expo-router'
import { Grid, GridItem } from '@xaui/native/view'

export default function HomeScreen() {
  const colors = useXUIColors()
  const router = useRouter()

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        paddingVertical: 55,
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 24,
      }}
    >
      <Grid columns={2} spacing={5}>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/chart')}
            variant="bordered"
            themeColor="secondary"
          >
            Chart
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/expansion-panel')}
            variant="bordered"
            themeColor="primary"
          >
            Expansion Panel
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/alerts')}
            variant="bordered"
            themeColor="secondary"
          >
            Alert
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/avatars')}
            variant="bordered"
            themeColor="secondary"
          >
            Avatar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/badges')}
            variant="bordered"
            themeColor="primary"
          >
            Badge
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/bottom-sheet')}
            variant="bordered"
            themeColor="secondary"
          >
            Bottom Sheet
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/bottom-tab-bar')}
            variant="bordered"
            themeColor="primary"
          >
            BottomTabBar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/app-bar')}
            variant="bordered"
            themeColor="primary"
          >
            AppBar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/buttons')}
            variant="bordered"
            themeColor="secondary"
          >
            Button
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/card')}
            variant="bordered"
            themeColor="primary"
          >
            Card
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/carousel')}
            variant="bordered"
            themeColor="secondary"
          >
            Carousel
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/checkbox')}
            variant="bordered"
            themeColor="primary"
          >
            Checkbox
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/chips')}
            variant="bordered"
            themeColor="primary"
          >
            Chip
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/dialog')}
            variant="bordered"
            themeColor="secondary"
          >
            Dialog
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/drawer')}
            variant="bordered"
            themeColor="secondary"
          >
            Drawer
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/datepicker')}
            variant="bordered"
            themeColor="secondary"
          >
            Datepicker
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/select')}
            variant="bordered"
            themeColor="primary"
          >
            Select
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/autocomplete')}
            variant="bordered"
            themeColor="secondary"
          >
            Autocomplete
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/fab')}
            variant="bordered"
            themeColor="primary"
          >
            FAB
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/feature-discovery')}
            variant="bordered"
            themeColor="secondary"
          >
            FeatureDiscovery
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/indicator')}
            variant="bordered"
            themeColor="secondary"
          >
            Indicator
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/input')}
            variant="bordered"
            themeColor="primary"
          >
            Input
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/date-input')}
            variant="bordered"
            themeColor="secondary"
          >
            Date/Time Input
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/otp-input')}
            variant="bordered"
            themeColor="primary"
          >
            OTP Input
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/number-input')}
            variant="bordered"
            themeColor="secondary"
          >
            Number Input
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/radio')}
            variant="bordered"
            themeColor="primary"
          >
            Radio
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/menus')}
            variant="bordered"
            themeColor="secondary"
          >
            Menu
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/list')}
            variant="bordered"
            themeColor="primary"
          >
            List
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/progress')}
            variant="bordered"
            themeColor="primary"
          >
            Progress
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/pager')}
            variant="bordered"
            themeColor="secondary"
          >
            Pager
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/segment-buttons')}
            variant="bordered"
            themeColor="primary"
          >
            Segment Button
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/skeleton')}
            variant="bordered"
            themeColor="secondary"
          >
            Skeleton
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/stepper')}
            variant="bordered"
            themeColor="primary"
          >
            Stepper
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/snackbar')}
            variant="bordered"
            themeColor="primary"
          >
            Snackbar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/snippet')}
            variant="bordered"
            themeColor="secondary"
          >
            Snippet
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/switch')}
            variant="bordered"
            themeColor="secondary"
          >
            Switch
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/textarea')}
            variant="bordered"
            themeColor="primary"
          >
            TextArea
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/toolbar')}
            variant="bordered"
            themeColor="secondary"
          >
            Toolbar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/timepicker')}
            variant="bordered"
            themeColor="secondary"
          >
            Time Picker
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/menubox')}
            variant="bordered"
            themeColor="secondary"
          >
            MenuBox
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/slider')}
            variant="bordered"
            themeColor="secondary"
          >
            Slider
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/surface')}
            variant="bordered"
            themeColor="primary"
          >
            Surface
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/tabs')}
            variant="bordered"
            themeColor="primary"
          >
            Tabs
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/typography')}
            variant="bordered"
            themeColor="secondary"
          >
            Typography
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/input-trigger')}
            variant="bordered"
            themeColor="primary"
          >
            InputTrigger
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/picker')}
            variant="bordered"
            themeColor="secondary"
          >
            Picker
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/color-picker')}
            variant="bordered"
            themeColor="primary"
          >
            ColorPicker
          </Button>
        </GridItem>
      </Grid>
    </ScrollView>
  )
}
