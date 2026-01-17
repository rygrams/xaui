import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { CircularActivityIndicator } from '@xaui/progress'
import { colors } from '@xaui/colors'
import { Button, IconButton } from '@xaui/buttons'
import Svg, { Path } from 'react-native-svg'

const HeartIcon = ({ width = 24, height = 24, color = '#000' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

const SearchIcon = ({ width = 24, height = 24, color = '#000' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

const PlusIcon = ({ width = 24, height = 24, color = '#000' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14M5 12h14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Button Components</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Variants</Text>
        <Button themeColor="primary" variant="solid" onPress={() => {}}>
          Solid
        </Button>
        <Button themeColor="primary" variant="outlined" onPress={() => {}}>
          Outlined
        </Button>
        <Button themeColor="primary" variant="flat" onPress={() => {}}>
          Flat
        </Button>
        <Button themeColor="primary" variant="light" onPress={() => {}}>
          Light
        </Button>
        <Button themeColor="primary" variant="elevated" onPress={() => {}}>
          Elevated
        </Button>
        <Button themeColor="primary" variant="faded" onPress={() => {}}>
          Faded
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Colors</Text>
        <Button themeColor="primary" onPress={() => {}}>
          Primary
        </Button>
        <Button themeColor="secondary" onPress={() => {}}>
          Secondary
        </Button>
        <Button themeColor="success" onPress={() => {}}>
          Success
        </Button>
        <Button themeColor="warning" onPress={() => {}}>
          Warning
        </Button>
        <Button themeColor="danger" onPress={() => {}}>
          Danger
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sizes</Text>
        <Button themeColor="primary" size="xs" onPress={() => {}}>
          Extra Small
        </Button>
        <Button themeColor="primary" size="sm" onPress={() => {}}>
          Small
        </Button>
        <Button themeColor="primary" size="md" onPress={() => {}}>
          Medium
        </Button>
        <Button themeColor="primary" size="lg" onPress={() => {}}>
          Large
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Loading States</Text>
        <Button
          themeColor="primary"
          isLoading
          spinnerType="ticks"
          spinnerPlacement="start"
          onPress={() => {}}
        >
          Loading Start
        </Button>
        <Button themeColor="primary" isLoading spinnerPlacement="end" onPress={() => {}}>
          Loading End
        </Button>
        <Button
          themeColor="secondary"
          variant="outlined"
          radius="full"
          isLoading
          spinnerType="bullets"
          onPress={() => {}}
        >
          Dots Spinner
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>States</Text>
        <Button themeColor="primary" isDisabled onPress={() => {}}>
          Disabled
        </Button>
        <Button themeColor="primary" fullWidth onPress={() => {}}>
          Full Width
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Ripple Effect</Text>
        <Button themeColor="primary" variant="solid" enableRipple onPress={() => {}}>
          Solid with Ripple
        </Button>
        <Button themeColor="secondary" variant="outlined" enableRipple onPress={() => {}}>
          Outlined with Ripple
        </Button>
        <Button themeColor="success" variant="flat" enableRipple onPress={() => {}}>
          Flat with Ripple
        </Button>
      </View>

      <Text style={[styles.title, { marginTop: 32 }]}>Icon Buttons</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Icon Button Variants</Text>
        <View style={styles.iconRow}>
          <IconButton
            icon={<HeartIcon color={colors.red[500]} />}
            themeColor="danger"
            variant="light"
            onPress={() => {}}
          />
          <IconButton
            icon={<SearchIcon color={colors.blue[500]} />}
            themeColor="primary"
            variant="light"
            onPress={() => {}}
          />
          <IconButton
            icon={<PlusIcon color={colors.green[500]} />}
            themeColor="success"
            variant="light"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Icon Button Sizes</Text>
        <View style={styles.iconRow}>
          <IconButton
            icon={<HeartIcon />}
            themeColor="danger"
            variant="solid"
            size="xs"
            onPress={() => {}}
          />
          <IconButton
            icon={<HeartIcon />}
            themeColor="danger"
            variant="solid"
            size="sm"
            onPress={() => {}}
          />
          <IconButton
            icon={<HeartIcon />}
            themeColor="danger"
            variant="solid"
            size="md"
            onPress={() => {}}
          />
          <IconButton
            icon={<HeartIcon />}
            themeColor="danger"
            variant="solid"
            size="lg"
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Icon Button with Ripple</Text>
        <View style={styles.iconRow}>
          <IconButton
            icon={<HeartIcon />}
            themeColor="danger"
            variant="solid"
            radius="full"
            enableRipple
            onPress={() => {}}
          />
          <IconButton
            icon={<SearchIcon />}
            themeColor="primary"
            variant="outlined"
            radius="full"
            enableRipple
            onPress={() => {}}
          />
          <IconButton
            icon={<PlusIcon />}
            themeColor="success"
            variant="flat"
            radius="full"
            enableRipple
            onPress={() => {}}
          />
        </View>
      </View>

      <Text style={[styles.title, { marginTop: 32 }]}>Progress Indicators</Text>
      <View style={styles.section}>
        <CircularActivityIndicator variant="spinner" themeColor="primary" />
        <CircularActivityIndicator variant="ticks" themeColor="secondary" />
        <CircularActivityIndicator variant="bullets" themeColor="tertiary" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.slate[950],
  },
  container: {
    padding: 20,
    gap: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  note: {
    fontSize: 12,
    color: colors.slate[400],
  },
  iconRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
})
