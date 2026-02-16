# @xaui/native

React Native components and hooks that extend the core `@xaui/core` theme system. This mobile layer ships animated primitives (buttons, indicators, hooks) ready to use with `XUIProvider`.

**[Full documentation → ui.xtartapp.com](https://ui.xtartapp.com)**

## Installation

```bash
pnpm add @xaui/native
```

### Peer dependencies

- `react` ^18 || ^19
- `react-native` >=0.70.0
- `react-native-reanimated` >=4.0.0
- `react-native-svg` >=13.0.0

The package also relies on `@xaui/core/theme` for the shared tokens.

## Quick start

1. Wrap your tree with `XUIProvider` to expose the tokens and follow the system color scheme:

```tsx
import { XUIProvider } from '@xaui/native/core'
import { theme, darkTheme } from '@xaui/core/theme'

export default function App() {
  return (
    <XUIProvider theme={theme} darkTheme={darkTheme}>
      {/* your screens */}
    </XUIProvider>
  )
}
```

2. Consume the theme inside your components via `useXUITheme` or `useColorMode`:

```tsx
import { Text, View } from 'react-native'
import { useXUITheme, useColorMode } from '@xaui/native/core'

function Banner() {
  const theme = useXUITheme()
  const mode = useColorMode()

  return (
    <View style={{ backgroundColor: theme.colors.primary.background }}>
      <Text style={{ color: theme.colors.primary.foreground }}>
        Current mode: {mode}
      </Text>
    </View>
  )
}
```

## Components (exhaustive)

This table lists all public components exported by `@xaui/native` and their import path.

| Name | Description | Usage |
| --- | --- | --- |
| `XUIProvider` | Theme provider for all XAUI native components. | `import { XUIProvider } from '@xaui/native/core'` |
| `Portal` | Renders content in a portal host layer. | `import { Portal } from '@xaui/native/core'` |
| `PortalHost` | Host container for portal content. | `import { PortalHost } from '@xaui/native/core'` |
| `Button` | Pressable button with variants, sizes, and loading state. | `import { Button } from '@xaui/native/button'` |
| `IconButton` | Compact icon-only button variant. | `import { IconButton } from '@xaui/native/button'` |
| `Checkbox` | Selection control with checked/indeterminate states. | `import { Checkbox } from '@xaui/native/checkbox'` |
| `ExpansionPanel` | Accordion container for expandable sections. | `import { ExpansionPanel } from '@xaui/native/expansion-panel'` |
| `ExpansionPanelItem` | Expandable item inside `ExpansionPanel`. | `import { ExpansionPanelItem } from '@xaui/native/expansion-panel'` |
| `Progress` | Progress indicator with linear/circular rendering. | `import { Progress } from '@xaui/native/progress'` |
| `ActivityIndicator` | Animated loading indicator component. | `import { ActivityIndicator } from '@xaui/native/indicator'` |
| `Switch` | Toggle switch control. | `import { Switch } from '@xaui/native/switch'` |
| `Slider` | Draggable value selector slider. | `import { Slider } from '@xaui/native/slider'` |
| `Select` | Select input with trigger and list behavior. | `import { Select } from '@xaui/native/select'` |
| `SelectItem` | Select option item for `Select`. | `import { SelectItem } from '@xaui/native/select'` |
| `Divider` | Horizontal or vertical separator line. | `import { Divider } from '@xaui/native/divider'` |
| `Drawer` | Side sheet / drawer container. | `import { Drawer } from '@xaui/native/drawer'` |
| `Skeleton` | Placeholder loading block. | `import { Skeleton } from '@xaui/native/skeleton'` |
| `Avatar` | User avatar (image, initials, icon). | `import { Avatar } from '@xaui/native/avatar'` |
| `AvatarGroup` | Grouped avatars with overlap/stacking. | `import { AvatarGroup } from '@xaui/native/avatar'` |
| `Badge` | Status/count badge component. | `import { Badge } from '@xaui/native/badge'` |
| `Alert` | Contextual alert/message banner. | `import { Alert } from '@xaui/native/alert'` |
| `Autocomplete` | Input with dynamic suggestions. | `import { Autocomplete } from '@xaui/native/autocomplete'` |
| `AutocompleteItem` | Suggestion item for `Autocomplete`. | `import { AutocompleteItem } from '@xaui/native/autocomplete'` |
| `DatePicker` | Date selection input/picker. | `import { DatePicker } from '@xaui/native/datepicker'` |
| `Typography` | Themed text component with variants. | `import { Typography } from '@xaui/native/typography'` |
| `TextSpan` | Text group primitive that shares inherited styles across nested typography. | `import { TextSpan } from '@xaui/native/typography'` |
| `Column` | Vertical flex layout helper. | `import { Column } from '@xaui/native/view'` |
| `Row` | Horizontal flex layout helper. | `import { Row } from '@xaui/native/view'` |
| `Spacer` | Flexible space element in layouts. | `import { Spacer } from '@xaui/native/view'` |
| `Padding` | Wrapper applying padding shortcuts. | `import { Padding } from '@xaui/native/view'` |
| `Margin` | Wrapper applying margin shortcuts. | `import { Margin } from '@xaui/native/view'` |
| `SizedBox` | Fixed width/height spacing box. | `import { SizedBox } from '@xaui/native/view'` |
| `PositionedView` | Absolute/fixed positioning helper view. | `import { PositionedView } from '@xaui/native/view'` |
| `BlurView` | Blurred background container. | `import { BlurView } from '@xaui/native/view'` |
| `RoundedView` | View with configurable rounded corners. | `import { RoundedView } from '@xaui/native/view'` |
| `AspectRatio` | Maintains a fixed aspect ratio for content. | `import { AspectRatio } from '@xaui/native/view'` |
| `Grid` | Grid layout container. | `import { Grid } from '@xaui/native/view'` |
| `GridItem` | Item element for `Grid`. | `import { GridItem } from '@xaui/native/view'` |
| `GridBuilder` | Builder-based grid rendering helper. | `import { GridBuilder } from '@xaui/native/view'` |
| `ConditionalView` | Conditionally renders with optional animation. | `import { ConditionalView } from '@xaui/native/view'` |
| `MasonryGrid` | Masonry-style responsive grid container. | `import { MasonryGrid } from '@xaui/native/view'` |
| `MasonryGridItem` | Item element for `MasonryGrid`. | `import { MasonryGridItem } from '@xaui/native/view'` |
| `MasonryGridBuilder` | Builder-based masonry rendering helper. | `import { MasonryGridBuilder } from '@xaui/native/view'` |
| `Carousel` | Swipeable carousel for paged content. | `import { Carousel } from '@xaui/native/carousel'` |
| `SegmentButton` | Segmented control container. | `import { SegmentButton } from '@xaui/native/segment-button'` |
| `SegmentButtonItem` | Segment item for `SegmentButton`. | `import { SegmentButtonItem } from '@xaui/native/segment-button'` |
| `Tabs` | Tabs container with active tab state. | `import { Tabs } from '@xaui/native/tabs'` |
| `Tab` | Individual tab item for `Tabs`. | `import { Tab } from '@xaui/native/tabs'` |
| `Pager` | Paged container with swipe navigation. | `import { Pager } from '@xaui/native/pager'` |
| `PagerItem` | Page item for `Pager`. | `import { PagerItem } from '@xaui/native/pager'` |
| `Chip` | Compact labeled action/filter chip. | `import { Chip } from '@xaui/native/chip'` |
| `ChipGroup` | Group manager for chip selection. | `import { ChipGroup } from '@xaui/native/chip'` |
| `ChipItem` | Item variant used inside `ChipGroup`. | `import { ChipItem } from '@xaui/native/chip'` |
| `BottomSheet` | Bottom sheet modal/panel. | `import { BottomSheet } from '@xaui/native/bottom-sheet'` |
| `BottomTabBar` | Bottom navigation tab bar container. | `import { BottomTabBar } from '@xaui/native/bottom-tab-bar'` |
| `BottomTabBarItem` | Tab item for `BottomTabBar`. | `import { BottomTabBarItem } from '@xaui/native/bottom-tab-bar'` |
| `Menu` | Anchored contextual menu. | `import { Menu } from '@xaui/native/menu'` |
| `MenuItem` | Action item for `Menu`. | `import { MenuItem } from '@xaui/native/menu'` |
| `Fab` | Floating action button. | `import { Fab } from '@xaui/native/fab'` |
| `FabMenu` | Expandable floating action menu. | `import { FabMenu } from '@xaui/native/fab-menu'` |
| `FabMenuItem` | Action item for `FabMenu`. | `import { FabMenuItem } from '@xaui/native/fab-menu'` |
| `FeatureDiscovery` | Spotlight/coach-mark discovery overlay. | `import { FeatureDiscovery } from '@xaui/native/feature-discovery'` |
| `Card` | Card container surface. | `import { Card } from '@xaui/native/card'` |
| `CardHeader` | Header section for `Card`. | `import { CardHeader } from '@xaui/native/card'` |
| `CardBody` | Body/content section for `Card`. | `import { CardBody } from '@xaui/native/card'` |
| `CardFooter` | Footer/actions section for `Card`. | `import { CardFooter } from '@xaui/native/card'` |
| `CardTitle` | Title text slot for `Card`. | `import { CardTitle } from '@xaui/native/card'` |
| `CardDescription` | Description text slot for `Card`. | `import { CardDescription } from '@xaui/native/card'` |
| `TextInput` | Standard text input field. | `import { TextInput } from '@xaui/native/input'` |
| `TextArea` | Multiline text input field. | `import { TextArea } from '@xaui/native/input'` |
| `DateInput` | Date-only formatted input. | `import { DateInput } from '@xaui/native/input'` |
| `TimeInput` | Time-only formatted input. | `import { TimeInput } from '@xaui/native/input'` |
| `DateTimeInput` | Combined date-time formatted input. | `import { DateTimeInput } from '@xaui/native/input'` |
| `OTPInput` | One-time password segmented input. | `import { OTPInput } from '@xaui/native/input'` |
| `NumberInput` | Numeric input with controls/formatting. | `import { NumberInput } from '@xaui/native/input'` |
| `List` | List container with selection options. | `import { List } from '@xaui/native/list'` |
| `ListItem` | Item row for `List`. | `import { ListItem } from '@xaui/native/list'` |
| `ListBuilder` | Builder-based dynamic list helper. | `import { ListBuilder } from '@xaui/native/list'` |
| `Radio` | Single radio option control. | `import { Radio } from '@xaui/native/radio'` |
| `RadioGroup` | Group controller for radio options. | `import { RadioGroup } from '@xaui/native/radio'` |
| `Toolbar` | App toolbar/action bar container. | `import { Toolbar } from '@xaui/native/toolbar'` |
| `ToolbarAction` | Action button/item for `Toolbar`. | `import { ToolbarAction } from '@xaui/native/toolbar'` |
| `AppBar` | Top app bar container. | `import { AppBar } from '@xaui/native/app-bar'` |
| `AppBarStartContent` | Leading slot for `AppBar`. | `import { AppBarStartContent } from '@xaui/native/app-bar'` |
| `AppBarContent` | Main content slot for `AppBar`. | `import { AppBarContent } from '@xaui/native/app-bar'` |
| `AppBarEndContent` | Trailing slot for `AppBar`. | `import { AppBarEndContent } from '@xaui/native/app-bar'` |
| `TimePicker` | Time picker main component. | `import { TimePicker } from '@xaui/native/timepicker'` |
| `TimePickerDialog` | Dialog variant for time selection. | `import { TimePickerDialog } from '@xaui/native/timepicker'` |
| `TimePickerTrigger` | Trigger component for opening time picker UI. | `import { TimePickerTrigger } from '@xaui/native/timepicker'` |
| `Stepper` | Multi-step progress/navigation component. | `import { Stepper } from '@xaui/native/stepper'` |
| `StepperItem` | Individual step for `Stepper`. | `import { StepperItem } from '@xaui/native/stepper'` |
| `MenuBox` | Menu box container with animated items. | `import { MenuBox } from '@xaui/native/menubox'` |
| `MenuBoxItem` | Action item for `MenuBox`. | `import { MenuBoxItem } from '@xaui/native/menubox'` |
| `DonutChartCard` | Card component rendering a donut chart. | `import { DonutChartCard } from '@xaui/native/chart'` |
| `VerticalBarChartCard` | Card component rendering vertical bars. | `import { VerticalBarChartCard } from '@xaui/native/chart'` |
| `PieChartCard` | Card component rendering a pie chart. | `import { PieChartCard } from '@xaui/native/chart'` |
| `LineChartCard` | Card component rendering a line chart. | `import { LineChartCard } from '@xaui/native/chart'` |
| `HeatmapChartCard` | Card component rendering a heatmap chart. | `import { HeatmapChartCard } from '@xaui/native/chart'` |

## Theme hooks & utilities

- `useXUITheme()` must be used within `XUIProvider`; it throws if the provider is missing.
- `useXUIColors()` is a shortcut for reading just the color tokens.
- `useColorMode()` returns `light` or `dark` based on React Native's `useColorScheme()`.
- `XUIProvider` accepts `theme` and `darkTheme` as `DeepPartial<XUITheme>` so you can override partial token sets without redefining the entire theme.

## Testing & build

- Bundles are produced with `tsup` (ESM + CJS outputs under `dist`).
- Tests live under `packages/native/__tests__` and run with `vitest`.

## License

MIT
