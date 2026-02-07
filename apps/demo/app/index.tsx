import { useXUIColors } from '@xaui/native/core'
import { ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@xaui/native/button'
import { useRouter } from 'expo-router'
import { Grid, GridItem } from '@xaui/native/view'

export default function HomeScreen() {
  const colors = useXUIColors()
  const router = useRouter()

  const [, setValue] = useState(0.1)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => prevValue + 0.06)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ScrollView
      style={{
        paddingVertical: 55,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
        gap: 12,
      }}
    >
      <Grid columns={2} spacing={5}>
        <GridItem>
          <Button
            size="sm"
            onPress={() => router.push('/accordion')}
            variant="outlined"
            themeColor="primary"
          >
            Accordion
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
            onPress={() => router.push('/switch')}
            variant="outlined"
            themeColor="secondary"
          >
            Switch
          </Button>
        </GridItem>
      </Grid>
    </ScrollView>
  )
}
