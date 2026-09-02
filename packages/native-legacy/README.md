# @xaui/native-legacy

> **Frozen.** These are the 47 components published as `@xaui/native` up to `0.2.8`,
> republished under this name so that projects can migrate to `@xaui/native` v1 screen by
> screen. Bug fixes only — no new component, no new prop. It is deprecated on npm once v1
> reaches parity.
>
> New projects should use [`@xaui/native`](https://www.npmjs.com/package/@xaui/native).

React Native components and hooks that extend the core `@xaui/core` theme system. This mobile layer ships animated primitives (buttons, indicators, hooks) ready to use with `XUIProvider`.

**[Full documentation → ui.xtartapp.com](https://ui.xtartapp.com)**

## Installation

**Pin an exact version.** This package is frozen, so there is nothing to gain from a range —
and a range is how an unattended `pnpm update` pulls in a change you did not ask for.

```bash
pnpm add --save-exact @xaui/native-legacy@0.2.8
```

That writes the version without a range operator, which is what keeps it pinned:

```jsonc
{
  "dependencies": {
    "@xaui/native-legacy": "0.2.8"   // not "^0.2.8", not "~0.2.8"
  }
}
```

Bumping it should be a decision: read the changelog, then change the number by hand. The
same applies to `npm i --save-exact` and `yarn add --exact`.

### Peer dependencies

- `react` ^18 || ^19
- `react-native` >=0.70.0
- `react-native-reanimated` >=4.0.0
- `react-native-svg` >=13.0.0

The package also relies on `@xaui/core/theme` for the shared tokens.

## Quick start

1. Wrap your tree with `XUIProvider` to expose the tokens and follow the system color scheme:

```tsx
import { XUIProvider } from '@xaui/native-legacy/core'
import { theme } from '@xaui/core/theme'

export default function App() {
  return <XUIProvider theme={theme}>{/* your screens */}</XUIProvider>
}
```

2. Consume the theme inside your components via `useXUITheme` or `useColorMode`:

```tsx
import { Text, View } from 'react-native'
import { useXUITheme, useColorMode } from '@xaui/native-legacy/core'

function Banner() {
  const theme = useXUITheme()
  const mode = useColorMode()

  return (
    <View style={{ backgroundColor: theme.colors.primary.container }}>
      <Text style={{ color: theme.colors.primary.onContainer }}>
        Current mode: {mode}
      </Text>
    </View>
  )
}
```

## Components (exhaustive)

This table lists all public components exported by `@xaui/native-legacy` and their import path.

| Name                   | Description                                                                 | Usage                                                               |
| ---------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `XUIProvider`          | Theme provider for all XAUI native components.                              | `import { XUIProvider } from '@xaui/native-legacy/core'`                   |
| `Portal`               | Renders content in a portal host layer.                                     | `import { Portal } from '@xaui/native-legacy/core'`                        |
| `PortalHost`           | Host container for portal content.                                          | `import { PortalHost } from '@xaui/native-legacy/core'`                    |
| `Button`               | Pressable button with variants, sizes, and loading state.                   | `import { Button } from '@xaui/native-legacy/button'`                      |
| `IconButton`           | Compact icon-only button variant.                                           | `import { IconButton } from '@xaui/native-legacy/button'`                  |
| `Checkbox`             | Selection control with checked/indeterminate states.                        | `import { Checkbox } from '@xaui/native-legacy/checkbox'`                  |
| `ExpansionPanel`       | Accordion container for expandable sections.                                | `import { ExpansionPanel } from '@xaui/native-legacy/expansion-panel'`     |
| `ExpansionPanelItem`   | Expandable item inside `ExpansionPanel`.                                    | `import { ExpansionPanelItem } from '@xaui/native-legacy/expansion-panel'` |
| `Progress`             | Progress indicator with linear/circular rendering.                          | `import { Progress } from '@xaui/native-legacy/progress'`                  |
| `ActivityIndicator`    | Animated loading indicator component.                                       | `import { ActivityIndicator } from '@xaui/native-legacy/indicator'`        |
| `Switch`               | Toggle switch control.                                                      | `import { Switch } from '@xaui/native-legacy/switch'`                      |
| `Slider`               | Draggable value selector slider.                                            | `import { Slider } from '@xaui/native-legacy/slider'`                      |
| `Select`               | Select input with trigger and list behavior.                                | `import { Select } from '@xaui/native-legacy/select'`                      |
| `SelectItem`           | Select option item for `Select`.                                            | `import { SelectItem } from '@xaui/native-legacy/select'`                  |
| `Dialog`               | Modal dialog container component.                                           | `import { Dialog } from '@xaui/native-legacy/dialog'`                      |
| `DialogHeader`         | Header section for `Dialog`.                                                | `import { DialogHeader } from '@xaui/native-legacy/dialog'`                |
| `DialogBody`           | Body/content section for `Dialog`.                                          | `import { DialogBody } from '@xaui/native-legacy/dialog'`                  |
| `DialogFooter`         | Footer/actions section for `Dialog`.                                        | `import { DialogFooter } from '@xaui/native-legacy/dialog'`                |
| `Divider`              | Horizontal or vertical separator line.                                      | `import { Divider } from '@xaui/native-legacy/divider'`                    |
| `Drawer`               | Side sheet / drawer container.                                              | `import { Drawer } from '@xaui/native-legacy/drawer'`                      |
| `Skeleton`             | Placeholder loading block.                                                  | `import { Skeleton } from '@xaui/native-legacy/skeleton'`                  |
| `Avatar`               | User avatar (image, initials, icon).                                        | `import { Avatar } from '@xaui/native-legacy/avatar'`                      |
| `AvatarGroup`          | Grouped avatars with overlap/stacking.                                      | `import { AvatarGroup } from '@xaui/native-legacy/avatar'`                 |
| `Badge`                | Status/count badge component.                                               | `import { Badge } from '@xaui/native-legacy/badge'`                        |
| `Alert`                | Contextual alert/message banner.                                            | `import { Alert } from '@xaui/native-legacy/alert'`                        |
| `Autocomplete`         | Input with dynamic suggestions.                                             | `import { Autocomplete } from '@xaui/native-legacy/autocomplete'`          |
| `AutocompleteItem`     | Suggestion item for `Autocomplete`.                                         | `import { AutocompleteItem } from '@xaui/native-legacy/autocomplete'`      |
| `DatePicker`           | Date selection input/picker.                                                | `import { DatePicker } from '@xaui/native-legacy/datepicker'`              |
| `Typography`           | Themed text component with variants.                                        | `import { Typography } from '@xaui/native-legacy/typography'`              |
| `TextSpan`             | Text group primitive that shares inherited styles across nested typography. | `import { TextSpan } from '@xaui/native-legacy/typography'`                |
| `Column`               | Vertical flex layout helper.                                                | `import { Column } from '@xaui/native-legacy/view'`                        |
| `Row`                  | Horizontal flex layout helper.                                              | `import { Row } from '@xaui/native-legacy/view'`                           |
| `Spacer`               | Flexible space element in layouts.                                          | `import { Spacer } from '@xaui/native-legacy/view'`                        |
| `Padding`              | Wrapper applying padding shortcuts.                                         | `import { Padding } from '@xaui/native-legacy/view'`                       |
| `Margin`               | Wrapper applying margin shortcuts.                                          | `import { Margin } from '@xaui/native-legacy/view'`                        |
| `SizedBox`             | Fixed width/height spacing box.                                             | `import { SizedBox } from '@xaui/native-legacy/view'`                      |
| `PositionedView`       | Absolute/fixed positioning helper view.                                     | `import { PositionedView } from '@xaui/native-legacy/view'`                |
| `BlurView`             | Blurred background container.                                               | `import { BlurView } from '@xaui/native-legacy/view'`                      |
| `RoundedView`          | View with configurable rounded corners.                                     | `import { RoundedView } from '@xaui/native-legacy/view'`                   |
| `AspectRatio`          | Maintains a fixed aspect ratio for content.                                 | `import { AspectRatio } from '@xaui/native-legacy/view'`                   |
| `Grid`                 | Grid layout container.                                                      | `import { Grid } from '@xaui/native-legacy/view'`                          |
| `GridItem`             | Item element for `Grid`.                                                    | `import { GridItem } from '@xaui/native-legacy/view'`                      |
| `GridBuilder`          | Builder-based grid rendering helper.                                        | `import { GridBuilder } from '@xaui/native-legacy/view'`                   |
| `ConditionalView`      | Conditionally renders with optional animation.                              | `import { ConditionalView } from '@xaui/native-legacy/view'`               |
| `MasonryGrid`          | Masonry-style responsive grid container.                                    | `import { MasonryGrid } from '@xaui/native-legacy/view'`                   |
| `MasonryGridItem`      | Item element for `MasonryGrid`.                                             | `import { MasonryGridItem } from '@xaui/native-legacy/view'`               |
| `MasonryGridBuilder`   | Builder-based masonry rendering helper.                                     | `import { MasonryGridBuilder } from '@xaui/native-legacy/view'`            |
| `Carousel`             | Swipeable carousel for paged content.                                       | `import { Carousel } from '@xaui/native-legacy/carousel'`                  |
| `SegmentButton`        | Segmented control container.                                                | `import { SegmentButton } from '@xaui/native-legacy/segment-button'`       |
| `SegmentButtonItem`    | Segment item for `SegmentButton`.                                           | `import { SegmentButtonItem } from '@xaui/native-legacy/segment-button'`   |
| `Tabs`                 | Tabs container with active tab state.                                       | `import { Tabs } from '@xaui/native-legacy/tabs'`                          |
| `Tab`                  | Individual tab item for `Tabs`.                                             | `import { Tab } from '@xaui/native-legacy/tabs'`                           |
| `Pager`                | Paged container with swipe navigation.                                      | `import { Pager } from '@xaui/native-legacy/pager'`                        |
| `PagerItem`            | Page item for `Pager`.                                                      | `import { PagerItem } from '@xaui/native-legacy/pager'`                    |
| `Chip`                 | Compact labeled action/filter chip.                                         | `import { Chip } from '@xaui/native-legacy/chip'`                          |
| `ChipGroup`            | Group manager for chip selection.                                           | `import { ChipGroup } from '@xaui/native-legacy/chip'`                     |
| `ChipItem`             | Item variant used inside `ChipGroup`.                                       | `import { ChipItem } from '@xaui/native-legacy/chip'`                      |
| `BottomSheet`          | Bottom sheet modal/panel.                                                   | `import { BottomSheet } from '@xaui/native-legacy/bottom-sheet'`           |
| `BottomTabBar`         | Bottom navigation tab bar container.                                        | `import { BottomTabBar } from '@xaui/native-legacy/bottom-tab-bar'`        |
| `BottomTabBarItem`     | Tab item for `BottomTabBar`.                                                | `import { BottomTabBarItem } from '@xaui/native-legacy/bottom-tab-bar'`    |
| `Menu`                 | Anchored contextual menu.                                                   | `import { Menu } from '@xaui/native-legacy/menu'`                          |
| `MenuItem`             | Action item for `Menu`.                                                     | `import { MenuItem } from '@xaui/native-legacy/menu'`                      |
| `Fab`                  | Floating action button.                                                     | `import { Fab } from '@xaui/native-legacy/fab'`                            |
| `FabMenu`              | Expandable floating action menu.                                            | `import { FabMenu } from '@xaui/native-legacy/fab-menu'`                   |
| `FabMenuItem`          | Action item for `FabMenu`.                                                  | `import { FabMenuItem } from '@xaui/native-legacy/fab-menu'`               |
| `FeatureDiscovery`     | Spotlight/coach-mark discovery overlay.                                     | `import { FeatureDiscovery } from '@xaui/native-legacy/feature-discovery'` |
| `Card`                 | Card container surface.                                                     | `import { Card } from '@xaui/native-legacy/card'`                          |
| `CardHeader`           | Header section for `Card`.                                                  | `import { CardHeader } from '@xaui/native-legacy/card'`                    |
| `CardBody`             | Body/content section for `Card`.                                            | `import { CardBody } from '@xaui/native-legacy/card'`                      |
| `CardFooter`           | Footer/actions section for `Card`.                                          | `import { CardFooter } from '@xaui/native-legacy/card'`                    |
| `CardTitle`            | Title text slot for `Card`.                                                 | `import { CardTitle } from '@xaui/native-legacy/card'`                     |
| `CardDescription`      | Description text slot for `Card`.                                           | `import { CardDescription } from '@xaui/native-legacy/card'`               |
| `TextInput`            | Standard text input field.                                                  | `import { TextInput } from '@xaui/native-legacy/input'`                    |
| `TextArea`             | Multiline text input field.                                                 | `import { TextArea } from '@xaui/native-legacy/input'`                     |
| `DateInput`            | Date-only formatted input.                                                  | `import { DateInput } from '@xaui/native-legacy/input'`                    |
| `TimeInput`            | Time-only formatted input.                                                  | `import { TimeInput } from '@xaui/native-legacy/input'`                    |
| `DateTimeInput`        | Combined date-time formatted input.                                         | `import { DateTimeInput } from '@xaui/native-legacy/input'`                |
| `OTPInput`             | One-time password segmented input.                                          | `import { OTPInput } from '@xaui/native-legacy/input'`                     |
| `NumberInput`          | Numeric input with controls/formatting.                                     | `import { NumberInput } from '@xaui/native-legacy/input'`                  |
| `List`                 | List container with selection options.                                      | `import { List } from '@xaui/native-legacy/list'`                          |
| `ListItem`             | Item row for `List`.                                                        | `import { ListItem } from '@xaui/native-legacy/list'`                      |
| `ListBuilder`          | Builder-based dynamic list helper.                                          | `import { ListBuilder } from '@xaui/native-legacy/list'`                   |
| `Radio`                | Single radio option control.                                                | `import { Radio } from '@xaui/native-legacy/radio'`                        |
| `RadioGroup`           | Group controller for radio options.                                         | `import { RadioGroup } from '@xaui/native-legacy/radio'`                   |
| `Toolbar`              | App toolbar/action bar container.                                           | `import { Toolbar } from '@xaui/native-legacy/toolbar'`                    |
| `ToolbarAction`        | Action button/item for `Toolbar`.                                           | `import { ToolbarAction } from '@xaui/native-legacy/toolbar'`              |
| `AppBar`               | Top app bar container.                                                      | `import { AppBar } from '@xaui/native-legacy/app-bar'`                     |
| `AppBarStartContent`   | Leading slot for `AppBar`.                                                  | `import { AppBarStartContent } from '@xaui/native-legacy/app-bar'`         |
| `AppBarContent`        | Main content slot for `AppBar`.                                             | `import { AppBarContent } from '@xaui/native-legacy/app-bar'`              |
| `AppBarEndContent`     | Trailing slot for `AppBar`.                                                 | `import { AppBarEndContent } from '@xaui/native-legacy/app-bar'`           |
| `TimePicker`           | Time picker main component.                                                 | `import { TimePicker } from '@xaui/native-legacy/timepicker'`              |
| `TimePickerDialog`     | Dialog variant for time selection.                                          | `import { TimePickerDialog } from '@xaui/native-legacy/timepicker'`        |
| `TimePickerTrigger`    | Trigger component for opening time picker UI.                               | `import { TimePickerTrigger } from '@xaui/native-legacy/timepicker'`       |
| `Stepper`              | Multi-step progress/navigation component.                                   | `import { Stepper } from '@xaui/native-legacy/stepper'`                    |
| `StepperItem`          | Individual step for `Stepper`.                                              | `import { StepperItem } from '@xaui/native-legacy/stepper'`                |
| `MenuBox`              | Menu box container with animated items.                                     | `import { MenuBox } from '@xaui/native-legacy/menubox'`                    |
| `MenuBoxItem`          | Action item for `MenuBox`.                                                  | `import { MenuBoxItem } from '@xaui/native-legacy/menubox'`                |
| `DonutChartCard`       | Card component rendering a donut chart.                                     | `import { DonutChartCard } from '@xaui/native-legacy/chart'`               |
| `VerticalBarChartCard` | Card component rendering vertical bars.                                     | `import { VerticalBarChartCard } from '@xaui/native-legacy/chart'`         |
| `PieChartCard`         | Card component rendering a pie chart.                                       | `import { PieChartCard } from '@xaui/native-legacy/chart'`                 |
| `LineChartCard`        | Card component rendering a line chart.                                      | `import { LineChartCard } from '@xaui/native-legacy/chart'`                |
| `HeatmapChartCard`     | Card component rendering a heatmap chart.                                   | `import { HeatmapChartCard } from '@xaui/native-legacy/chart'`             |

## Theme hooks & utilities

- `useXUITheme()` must be used within `XUIProvider`; it throws if the provider is missing.
- `useXUIColors()` is a shortcut for reading just the color tokens.
- `useColorMode()` returns `light` or `dark` based on React Native's `useColorScheme()`.
- `XUIProvider` accepts a single `theme` object (`DeepPartial<XUITheme>`) for partial token overrides.

## Testing & build

- Bundles are produced with `tsup` (ESM + CJS outputs under `dist`).
- Tests live under `packages/native/__tests__` and run with `vitest`.

## License

MIT
