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
            variant="outlined"
            themeColor="secondary"
          >
            Chart
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/expansion-panel')}
            variant="outlined"
            themeColor="primary"
          >
            Expansion Panel
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/alerts')}
            variant="outlined"
            themeColor="secondary"
          >
            Alert
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/avatars')}
            variant="outlined"
            themeColor="secondary"
          >
            Avatar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/badges')}
            variant="outlined"
            themeColor="primary"
          >
            Badge
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/bottom-sheet')}
            variant="outlined"
            themeColor="secondary"
          >
            Bottom Sheet
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/bottom-tab-bar')}
            variant="outlined"
            themeColor="primary"
          >
            BottomTabBar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/app-bar')}
            variant="outlined"
            themeColor="primary"
          >
            AppBar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/buttons')}
            variant="outlined"
            themeColor="secondary"
          >
            Button
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/card')}
            variant="outlined"
            themeColor="primary"
          >
            Card
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/carousel')}
            variant="outlined"
            themeColor="secondary"
          >
            Carousel
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/checkbox')}
            variant="outlined"
            themeColor="primary"
          >
            Checkbox
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/chips')}
            variant="outlined"
            themeColor="primary"
          >
            Chip
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/drawer')}
            variant="outlined"
            themeColor="secondary"
          >
            Drawer
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/datepicker')}
            variant="outlined"
            themeColor="secondary"
          >
            Datepicker
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/select')}
            variant="outlined"
            themeColor="primary"
          >
            Select
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/autocomplete')}
            variant="outlined"
            themeColor="secondary"
          >
            Autocomplete
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/fab')}
            variant="outlined"
            themeColor="primary"
          >
            FAB
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/feature-discovery')}
            variant="outlined"
            themeColor="secondary"
          >
            FeatureDiscovery
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/indicator')}
            variant="outlined"
            themeColor="secondary"
          >
            Indicator
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/input')}
            variant="outlined"
            themeColor="primary"
          >
            Input
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/date-input')}
            variant="outlined"
            themeColor="secondary"
          >
            Date/Time Input
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/otp-input')}
            variant="outlined"
            themeColor="primary"
          >
            OTP Input
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/number-input')}
            variant="outlined"
            themeColor="secondary"
          >
            Number Input
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/radio')}
            variant="outlined"
            themeColor="primary"
          >
            Radio
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/menus')}
            variant="outlined"
            themeColor="secondary"
          >
            Menu
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/list')}
            variant="outlined"
            themeColor="primary"
          >
            List
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/progress')}
            variant="outlined"
            themeColor="primary"
          >
            Progress
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/pager')}
            variant="outlined"
            themeColor="secondary"
          >
            Pager
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/segment-buttons')}
            variant="outlined"
            themeColor="primary"
          >
            Segment Button
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/skeleton')}
            variant="outlined"
            themeColor="secondary"
          >
            Skeleton
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/stepper')}
            variant="outlined"
            themeColor="primary"
          >
            Stepper
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/switch')}
            variant="outlined"
            themeColor="secondary"
          >
            Switch
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/textarea')}
            variant="outlined"
            themeColor="primary"
          >
            TextArea
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/toolbar')}
            variant="outlined"
            themeColor="secondary"
          >
            Toolbar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/timepicker')}
            variant="outlined"
            themeColor="secondary"
          >
            Time Picker
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/menubox')}
            variant="outlined"
            themeColor="secondary"
          >
            MenuBox
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/slider')}
            variant="outlined"
            themeColor="secondary"
          >
            Slider
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/tabs')}
            variant="outlined"
            themeColor="primary"
          >
            Tabs
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/typography')}
            variant="outlined"
            themeColor="secondary"
          >
            Typography
          </Button>
        </GridItem>
      </Grid>
    </ScrollView>
  )
}
