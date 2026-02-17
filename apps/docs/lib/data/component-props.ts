export type PropDef = {
  name: string
  type: string
  defaultValue: string
  description: string
}

export type EventDef = {
  name: string
  type: string
  description: string
}

export type ExampleDef = {
  title: string
  description?: string
  code: string
}

export type ComponentPropsData = {
  props: PropDef[]
  events?: EventDef[]
  examples?: ExampleDef[]
  subComponents?: {
    name: string
    props: PropDef[]
    events?: EventDef[]
  }[]
}

export const componentPropsMap: Record<string, ComponentPropsData> = {
  alert: {
    props: [
      { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Alert title' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Alert description text' },
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Custom icon element' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'variant', type: '"solid" | "bordered" | "flat" | "faded"', defaultValue: '"flat"', description: 'Visual style variant' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'isClosable', type: 'boolean', defaultValue: 'false', description: 'Show close button' },
      { name: 'hideIcon', type: 'boolean', defaultValue: 'false', description: 'Hide the status icon' },
      { name: 'closeButton', type: 'ReactNode', defaultValue: '-', description: 'Custom close button element' },
      { name: 'isVisible', type: 'boolean', defaultValue: 'true', description: 'Controlled visibility' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Additional content inside the alert' },
      { name: 'customAppearance', type: '{ container?: ViewStyle; title?: TextStyle; description?: TextStyle }', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onClose', type: '() => void', description: 'Called when the alert is closed' },
      { name: 'onVisibleChange', type: '(isVisible: boolean) => void', description: 'Called when visibility changes' },
    ],
    examples: [
      {
        title: 'Theme Colors',
        description: 'Use themeColor to convey semantic meaning.',
        code: `import { Alert } from '@xaui/native/alert'
import { Column } from '@xaui/native/view'

export function ThemeColorsExample() {
  return (
    <Column gap={8}>
      <Alert title="Success" description="Your changes have been saved." themeColor="success" />
      <Alert title="Warning" description="Your session is about to expire." themeColor="warning" />
      <Alert title="Danger" description="An error occurred. Please try again." themeColor="danger" />
      <Alert title="Info" description="A new version is available." themeColor="primary" />
      <Alert title="Default" description="Nothing special here." themeColor="default" />
    </Column>
  )
}`,
      },
      {
        title: 'Variants',
        description: 'All visual styles combined with a theme color.',
        code: `import { Alert } from '@xaui/native/alert'
import { Column } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Column gap={8}>
      <Alert title="Flat" description="Default flat style." variant="flat" themeColor="success" />
      <Alert title="Solid" description="High contrast." variant="solid" themeColor="success" />
      <Alert title="Bordered" description="Outlined style." variant="bordered" themeColor="success" />
      <Alert title="Faded" description="Subtle background." variant="faded" themeColor="success" />
    </Column>
  )
}`,
      },
      {
        title: 'Closable Alert',
        description: 'Let users dismiss the alert.',
        code: `import { useState } from 'react'
import { Alert } from '@xaui/native/alert'

export function ClosableExample() {
  const [visible, setVisible] = useState(true)

  return (
    <Alert
      title="Update available"
      description="Restart the app to apply the latest update."
      themeColor="primary"
      isClosable
      isVisible={visible}
      onClose={() => setVisible(false)}
    />
  )
}`,
      },
      {
        title: 'With Custom Icon',
        description: 'Replace the default icon with a custom element.',
        code: `import { Alert } from '@xaui/native/alert'
import { Typography } from '@xaui/native/typography'

export function CustomIconExample() {
  return (
    <Alert
      title="Tip"
      description="Long-press any item to see more options."
      themeColor="secondary"
      icon={<Typography>💡</Typography>}
    />
  )
}`,
      },
    ],
  },

  'app-bar': {
    props: [
      { name: 'variant', type: '"docked" | "floating"', defaultValue: '"docked"', description: 'Layout variant. Docked spans full width with no radius; floating is narrower with a pill radius and a shadow' },
      { name: 'elevation', type: 'number', defaultValue: '0', description: 'Shadow elevation level (0–4+). Maps to theme shadow tokens: sm ≤1, md ≤2, lg ≤3, xl >3' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Color theme. Default uses white (light) or surface (dark) background with a subtle border' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Compose using AppBarStartContent, AppBarContent, and AppBarEndContent slots' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles applied to the root container' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'Title centred with a back button on the left.',
        code: `import { AppBar, AppBarStartContent, AppBarContent } from '@xaui/native/app-bar'
import { IconButton } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'
import { ArrowBackIcon } from '@xaui/icons/arrow-back'

export function BasicExample() {
  return (
    <AppBar>
      <AppBarStartContent>
        <IconButton icon={<ArrowBackIcon />} onPress={() => {}} />
      </AppBarStartContent>
      <AppBarContent>
        <Typography variant="titleMedium">Home</Typography>
      </AppBarContent>
    </AppBar>
  )
}`,
      },
      {
        title: 'With End Actions',
        description: 'Action buttons on the right using AppBarEndContent.',
        code: `import { AppBar, AppBarStartContent, AppBarContent, AppBarEndContent } from '@xaui/native/app-bar'
import { IconButton } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'
import { MenuIcon } from '@xaui/icons/menu'
import { NotificationsIcon } from '@xaui/icons/notifications'
import { SettingsIcon } from '@xaui/icons/settings'

export function WithActionsExample() {
  return (
    <AppBar>
      <AppBarStartContent>
        <IconButton icon={<MenuIcon />} onPress={() => {}} />
      </AppBarStartContent>
      <AppBarContent>
        <Typography variant="titleMedium">Dashboard</Typography>
      </AppBarContent>
      <AppBarEndContent>
        <IconButton icon={<NotificationsIcon />} onPress={() => {}} />
        <IconButton icon={<SettingsIcon />} onPress={() => {}} />
      </AppBarEndContent>
    </AppBar>
  )
}`,
      },
      {
        title: 'Floating Variant',
        description: 'Detached pill-shaped bar with an elevation shadow.',
        code: `import { AppBar, AppBarStartContent, AppBarContent, AppBarEndContent } from '@xaui/native/app-bar'
import { IconButton } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'
import { ArrowBackIcon } from '@xaui/icons/arrow-back'
import { SearchIcon } from '@xaui/icons/search'

export function FloatingExample() {
  return (
    <AppBar variant="floating" elevation={2}>
      <AppBarStartContent>
        <IconButton icon={<ArrowBackIcon />} onPress={() => {}} />
      </AppBarStartContent>
      <AppBarContent>
        <Typography variant="titleMedium">Search</Typography>
      </AppBarContent>
      <AppBarEndContent>
        <IconButton icon={<SearchIcon />} onPress={() => {}} />
      </AppBarEndContent>
    </AppBar>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Use themeColor to apply a branded background.',
        code: `import { AppBar, AppBarStartContent, AppBarContent } from '@xaui/native/app-bar'
import { IconButton } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'
import { ArrowBackIcon } from '@xaui/icons/arrow-back'
import { Column } from '@xaui/native/view'

export function ThemeColorsExample() {
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning'] as const

  return (
    <Column gap={8}>
      {colors.map(color => (
        <AppBar key={color} themeColor={color}>
          <AppBarStartContent>
            <IconButton icon={<ArrowBackIcon />} onPress={() => {}} />
          </AppBarStartContent>
          <AppBarContent>
            <Typography variant="titleMedium" style={{ textTransform: 'capitalize' }}>
              {color}
            </Typography>
          </AppBarContent>
        </AppBar>
      ))}
    </Column>
  )
}`,
      },
      {
        title: 'Elevation Levels',
        description: 'Increase elevation to add progressively stronger shadows.',
        code: `import { AppBar, AppBarContent } from '@xaui/native/app-bar'
import { Typography } from '@xaui/native/typography'
import { Column } from '@xaui/native/view'

export function ElevationExample() {
  return (
    <Column gap={8}>
      {([0, 1, 2, 3, 4] as const).map(level => (
        <AppBar key={level} elevation={level}>
          <AppBarContent>
            <Typography variant="titleMedium">Elevation {level}</Typography>
          </AppBarContent>
        </AppBar>
      ))}
    </Column>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'AppBarStartContent',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content rendered at the leading edge (left). Typically a back button or menu icon' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
        ],
      },
      {
        name: 'AppBarContent',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Main content area. Centred and takes all available space between start and end slots' },
          { name: 'alignment', type: '"start" | "center" | "end"', defaultValue: '"center"', description: 'Horizontal alignment of content inside the content slot' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
        ],
      },
      {
        name: 'AppBarEndContent',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content rendered at the trailing edge (right). Typically action icon buttons' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
        ],
      },
    ],
  },

  autocomplete: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'AutocompleteItem children' },
      { name: 'variant', type: '"outlined" | "flat" | "light" | "faded" | "underlined"', defaultValue: '"outlined"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Component size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: 'Input placeholder text' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Helper text below the field' },
      { name: 'errorMessage', type: 'ReactNode', defaultValue: '-', description: 'Error message when invalid' },
      { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element rendered at the start of the input' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element rendered at the end of the input' },
      { name: 'labelPlacement', type: '"inside" | "outside" | "outside-left" | "outside-top"', defaultValue: '"inside"', description: 'Position of the label' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full container width' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Mark field as invalid' },
      { name: 'isReadOnly', type: 'boolean', defaultValue: 'false', description: 'Read-only mode' },
      { name: 'isClearable', type: 'boolean', defaultValue: 'false', description: 'Show clear button' },
      { name: 'allowsCustomValue', type: 'boolean', defaultValue: 'false', description: 'Allow values not in the list' },
      { name: 'inputValue', type: 'string', defaultValue: '-', description: 'Controlled input text' },
      { name: 'defaultInputValue', type: 'string', defaultValue: '-', description: 'Default input text (uncontrolled)' },
      { name: 'menuTrigger', type: '"focus" | "input" | "manual"', defaultValue: '"input"', description: 'When to open suggestions' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable transition animations' },
      { name: 'customAppearance', type: 'AutocompleteCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(key: string | null) => void', description: 'Called when an item is selected' },
      { name: 'onInputChange', type: '(value: string) => void', description: 'Called when the input text changes' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', description: 'Called when the dropdown opens or closes' },
      { name: 'onClear', type: '() => void', description: 'Called when the clear button is pressed' },
      { name: 'onFocus', type: '() => void', description: 'Called when the input gains focus' },
      { name: 'onBlur', type: '() => void', description: 'Called when the input loses focus' },
    ],
    examples: [
      {
        title: 'Basic Autocomplete',
        description: 'Autocomplete with a list of items.',
        code: `import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'

export function BasicExample() {
  return (
    <Autocomplete label="Search framework" placeholder="Type to search">
      <AutocompleteItem value="react" label="React" />
      <AutocompleteItem value="vue" label="Vue" />
      <AutocompleteItem value="angular" label="Angular" />
      <AutocompleteItem value="svelte" label="Svelte" />
    </Autocomplete>
  )
}`,
      },
      {
        title: 'Controlled Selection',
        description: 'Track the selected value with state.',
        code: `import { useState } from 'react'
import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

export function ControlledExample() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <Autocomplete
      label="Select a fruit"
      onSelectionChange={setSelected}
    >
      {fruits.map(fruit => (
        <AutocompleteItem key={fruit.value} value={fruit.value} label={fruit.label} />
      ))}
    </Autocomplete>
  )
}`,
      },
      {
        title: 'With Description & Error',
        description: 'Provide helper text and validation feedback.',
        code: `import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'

export function ValidationExample() {
  return (
    <Autocomplete
      label="Country"
      description="Select your country of residence"
      errorMessage="Country is required"
      isInvalid
    >
      <AutocompleteItem value="fr" label="France" />
      <AutocompleteItem value="us" label="United States" />
      <AutocompleteItem value="uk" label="United Kingdom" />
    </Autocomplete>
  )
}`,
      },
      {
        title: 'Items with Description',
        description: 'Show secondary text inside each item.',
        code: `import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'

export function ItemDescriptionExample() {
  return (
    <Autocomplete label="Select role">
      <AutocompleteItem
        value="admin"
        label="Admin"
        description="Full access to all resources"
      />
      <AutocompleteItem
        value="editor"
        label="Editor"
        description="Can edit content, cannot manage users"
      />
      <AutocompleteItem
        value="viewer"
        label="Viewer"
        description="Read-only access"
        isDisabled
      />
    </Autocomplete>
  )
}`,
      },
      {
        title: 'Allows Custom Value',
        description: 'Let users type values not present in the list.',
        code: `import { Autocomplete, AutocompleteItem } from '@xaui/native/autocomplete'

export function CustomValueExample() {
  return (
    <Autocomplete label="Tag" allowsCustomValue placeholder="Choose or create a tag">
      <AutocompleteItem value="design" label="Design" />
      <AutocompleteItem value="engineering" label="Engineering" />
      <AutocompleteItem value="marketing" label="Marketing" />
    </Autocomplete>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'AutocompleteItem',
        props: [
          { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Display label' },
          { name: 'value', type: 'string', defaultValue: '-', description: 'Unique value for selection' },
          { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Secondary description text' },
          { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start of item' },
          { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end of item' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this item' },
        ],
        events: [
          { name: 'onSelected', type: '() => void', description: 'Called when the item is selected' },
        ],
      },
    ],
  },

  avatar: {
    props: [
      { name: 'src', type: 'string', defaultValue: '-', description: 'Image source URL' },
      { name: 'name', type: 'string', defaultValue: '-', description: 'Name used to generate initials fallback' },
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Custom icon fallback' },
      { name: 'fallback', type: 'ReactNode', defaultValue: '-', description: 'Custom fallback element' },
      { name: 'size', type: '"sm" | "md" | "lg" | number', defaultValue: '"md"', description: 'Avatar size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme for initials background' },
      { name: 'isBordered', type: 'boolean', defaultValue: 'false', description: 'Show a border ring' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Apply disabled appearance' },
      { name: 'showFallback', type: 'boolean', defaultValue: 'false', description: 'Force display of fallback' },
      { name: 'getInitials', type: '(name: string) => string', defaultValue: '-', description: 'Custom initials generator' },
      { name: 'customAppearance', type: '{ container?: ViewStyle; image?: ImageStyle; text?: TextStyle }', defaultValue: '-', description: 'Custom style overrides' },
    ],
    examples: [
      {
        title: 'With image',
        description: 'Use `src` to display a remote image.',
        code: `import { Avatar } from '@xaui/native/avatar'

export function AvatarImageExample() {
  return (
    <Avatar
      src="https://i.pravatar.cc/150?u=john"
      size="lg"
    />
  )
}`,
      },
      {
        title: 'Initials fallback',
        description: 'When `src` is absent, `name` generates initials automatically.',
        code: `import { Avatar } from '@xaui/native/avatar'
import { Row } from '@xaui/native/view'

export function AvatarInitialsExample() {
  return (
    <Row spacing={8}>
      <Avatar name="John Doe" themeColor="primary" />
      <Avatar name="Alice Martin" themeColor="secondary" />
      <Avatar name="Bob" themeColor="success" />
    </Row>
  )
}`,
      },
      {
        title: 'Custom initials',
        description: 'Override the default initials logic with `getInitials`.',
        code: `import { Avatar } from '@xaui/native/avatar'

export function AvatarCustomInitialsExample() {
  return (
    <Avatar
      name="John Doe"
      getInitials={(name) => name.split(' ').map(n => n[0]).join('').toUpperCase()}
    />
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Use `size` preset or pass a custom number.',
        code: `import { Avatar } from '@xaui/native/avatar'
import { Row } from '@xaui/native/view'

export function AvatarSizesExample() {
  return (
    <Row spacing={8} crossAxisAlignment="center">
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size={64} />
    </Row>
  )
}`,
      },
      {
        title: 'Radius',
        description: 'Control the shape with `radius`.',
        code: `import { Avatar } from '@xaui/native/avatar'
import { Row } from '@xaui/native/view'

export function AvatarRadiusExample() {
  return (
    <Row spacing={8}>
      <Avatar name="RN" radius="none" />
      <Avatar name="RS" radius="sm" />
      <Avatar name="RM" radius="md" />
      <Avatar name="RL" radius="lg" />
      <Avatar name="RF" radius="full" />
    </Row>
  )
}`,
      },
      {
        title: 'Bordered',
        description: 'Add a ring with `isBordered`.',
        code: `import { Avatar } from '@xaui/native/avatar'
import { Row } from '@xaui/native/view'

export function AvatarBorderedExample() {
  return (
    <Row spacing={8}>
      <Avatar src="https://i.pravatar.cc/150?u=1" isBordered themeColor="primary" />
      <Avatar src="https://i.pravatar.cc/150?u=2" isBordered themeColor="success" />
      <Avatar src="https://i.pravatar.cc/150?u=3" isBordered themeColor="danger" />
    </Row>
  )
}`,
      },
      {
        title: 'Icon fallback',
        description: 'Use `icon` when you have no image and no name.',
        code: `import { Avatar } from '@xaui/native/avatar'
import { UserIcon } from 'lucide-react-native'

export function AvatarIconFallbackExample() {
  return (
    <Avatar
      icon={<UserIcon size={20} color="#fff" />}
      themeColor="secondary"
      size="lg"
    />
  )
}`,
      },
      {
        title: 'Custom fallback',
        description: 'Provide any ReactNode as fallback with `fallback`.',
        code: `import { Avatar } from '@xaui/native/avatar'

export function AvatarCustomFallbackExample() {
  return (
    <Avatar
      showFallback
      fallback={
        <View style={{ width: '100%', height: '100%', backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ fontSize: 10 }}>N/A</Typography>
        </View>
      }
    />
  )
}`,
      },
      {
        title: 'Disabled',
        description: 'Apply a disabled appearance with `isDisabled`.',
        code: `import { Avatar } from '@xaui/native/avatar'

export function AvatarDisabledExample() {
  return (
    <Avatar
      src="https://i.pravatar.cc/150?u=jane"
      isDisabled
    />
  )
}`,
      },
      {
        title: 'Custom appearance',
        description: 'Fine-tune styles for the container, image, or text.',
        code: `import { Avatar } from '@xaui/native/avatar'

export function AvatarCustomAppearanceExample() {
  return (
    <Avatar
      name="JD"
      customAppearance={{
        container: { borderWidth: 2, borderColor: '#6366f1' },
        text: { fontWeight: '700', fontSize: 18 },
      }}
      size="lg"
    />
  )
}`,
      },
    ],
  },

  'avatar-group': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Avatar children' },
      { name: 'max', type: 'number', defaultValue: '-', description: 'Maximum avatars visible before overflow count' },
      { name: 'total', type: 'number', defaultValue: '-', description: 'Total count used for overflow label (overrides auto-count)' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Size applied to all avatars' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Radius applied to all avatars' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme for overflow count badge' },
      { name: 'isBordered', type: 'boolean', defaultValue: 'false', description: 'Border ring on all avatars' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Apply disabled appearance to all avatars' },
      { name: 'isGrid', type: 'boolean', defaultValue: 'false', description: 'Render as a grid instead of stacked' },
      { name: 'renderCount', type: '(count: number) => ReactNode', defaultValue: '-', description: 'Custom overflow count renderer' },
      { name: 'customAppearance', type: '{ container?: ViewStyle }', defaultValue: '-', description: 'Custom container styles' },
    ],
    examples: [
      {
        title: 'Basic stacked group',
        description: 'Default stacked layout with overlapping avatars.',
        code: `import { Avatar, AvatarGroup } from '@xaui/native/avatar'

export function AvatarGroupBasicExample() {
  return (
    <AvatarGroup>
      <Avatar src="https://i.pravatar.cc/150?u=1" />
      <Avatar src="https://i.pravatar.cc/150?u=2" />
      <Avatar src="https://i.pravatar.cc/150?u=3" />
      <Avatar src="https://i.pravatar.cc/150?u=4" />
    </AvatarGroup>
  )
}`,
      },
      {
        title: 'Max — overflow count',
        description: 'Limit visible avatars with `max`. The rest shows as a count badge.',
        code: `import { Avatar, AvatarGroup } from '@xaui/native/avatar'

export function AvatarGroupMaxExample() {
  return (
    <AvatarGroup max={3}>
      <Avatar src="https://i.pravatar.cc/150?u=1" />
      <Avatar src="https://i.pravatar.cc/150?u=2" />
      <Avatar src="https://i.pravatar.cc/150?u=3" />
      <Avatar src="https://i.pravatar.cc/150?u=4" />
      <Avatar src="https://i.pravatar.cc/150?u=5" />
    </AvatarGroup>
  )
}`,
      },
      {
        title: 'Total — custom count',
        description: 'Override the overflow number shown with `total`.',
        code: `import { Avatar, AvatarGroup } from '@xaui/native/avatar'

export function AvatarGroupTotalExample() {
  return (
    <AvatarGroup max={3} total={128}>
      <Avatar src="https://i.pravatar.cc/150?u=1" />
      <Avatar src="https://i.pravatar.cc/150?u=2" />
      <Avatar src="https://i.pravatar.cc/150?u=3" />
    </AvatarGroup>
  )
}`,
      },
      {
        title: 'Bordered group',
        description: 'Add ring borders to each avatar with `isBordered`.',
        code: `import { Avatar, AvatarGroup } from '@xaui/native/avatar'

export function AvatarGroupBorderedExample() {
  return (
    <AvatarGroup isBordered themeColor="primary">
      <Avatar src="https://i.pravatar.cc/150?u=1" />
      <Avatar src="https://i.pravatar.cc/150?u=2" />
      <Avatar src="https://i.pravatar.cc/150?u=3" />
    </AvatarGroup>
  )
}`,
      },
      {
        title: 'Grid layout',
        description: 'Switch to a grid arrangement with `isGrid`.',
        code: `import { Avatar, AvatarGroup } from '@xaui/native/avatar'

export function AvatarGroupGridExample() {
  return (
    <AvatarGroup isGrid size="lg">
      <Avatar src="https://i.pravatar.cc/150?u=1" />
      <Avatar src="https://i.pravatar.cc/150?u=2" />
      <Avatar src="https://i.pravatar.cc/150?u=3" />
      <Avatar src="https://i.pravatar.cc/150?u=4" />
      <Avatar src="https://i.pravatar.cc/150?u=5" />
      <Avatar src="https://i.pravatar.cc/150?u=6" />
    </AvatarGroup>
  )
}`,
      },
      {
        title: 'Custom overflow renderer',
        description: 'Render the overflow badge exactly as you want with `renderCount`.',
        code: `import { Avatar, AvatarGroup } from '@xaui/native/avatar'

export function AvatarGroupRenderCountExample() {
  return (
    <AvatarGroup
      max={3}
      renderCount={(count) => (
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#6366f1', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>+{count}</Typography>
        </View>
      )}
    >
      <Avatar src="https://i.pravatar.cc/150?u=1" />
      <Avatar src="https://i.pravatar.cc/150?u=2" />
      <Avatar src="https://i.pravatar.cc/150?u=3" />
      <Avatar src="https://i.pravatar.cc/150?u=4" />
    </AvatarGroup>
  )
}`,
      },
    ],
  },

  badge: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Element the badge is anchored to. Badge is absolutely positioned over its corner' },
      { name: 'content', type: 'ReactNode', defaultValue: '-', description: 'Badge label or count. Omit when using isDot' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'variant', type: '"solid" | "flat" | "faded" | "shadow"', defaultValue: '"solid"', description: 'Visual style variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Badge size (sm: 16px, md: 20px, lg: 24px height)' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius' },
      { name: 'placement', type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', defaultValue: '"top-right"', description: 'Corner the badge is anchored to' },
      { name: 'showOutline', type: 'boolean', defaultValue: 'true', description: 'Show white outline ring between badge and its parent' },
      { name: 'disableOutline', type: 'boolean', defaultValue: 'false', description: 'Force-remove the outline even when showOutline is true' },
      { name: 'isInvisible', type: 'boolean', defaultValue: 'false', description: 'Hide the badge while preserving layout' },
      { name: 'isDot', type: 'boolean', defaultValue: 'false', description: 'Render as a small dot with no content (sm: 8px, md: 10px, lg: 12px)' },
      { name: 'isOneChar', type: 'boolean', defaultValue: 'false', description: 'Optimise layout for a single character (e.g. "9")' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable the entrance scale animation' },
      { name: 'customAppearance', type: '{ container?: ViewStyle; badge?: ViewStyle; text?: TextStyle }', defaultValue: '-', description: 'Custom style overrides for container, badge pill, and text' },
    ],
    examples: [
      {
        title: 'Basic Count',
        description: 'Attach a numeric badge to any element.',
        code: `import { Badge } from '@xaui/native/badge'
import { IconButton } from '@xaui/native/button'
import { NotificationsIcon } from '@xaui/icons/notifications'

export function BasicExample() {
  return (
    <Badge content={3}>
      <IconButton icon={<NotificationsIcon />} onPress={() => {}} />
    </Badge>
  )
}`,
      },
      {
        title: 'Dot Indicator',
        description: 'Use isDot for a minimal status indicator with no content.',
        code: `import { Badge } from '@xaui/native/badge'
import { Avatar } from '@xaui/native/avatar'
import { Row } from '@xaui/native/view'

export function DotExample() {
  return (
    <Row gap={16}>
      <Badge isDot themeColor="success">
        <Avatar label="Online" />
      </Badge>
      <Badge isDot themeColor="danger">
        <Avatar label="Busy" />
      </Badge>
      <Badge isDot themeColor="default">
        <Avatar label="Away" />
      </Badge>
    </Row>
  )
}`,
      },
      {
        title: 'Variants',
        description: 'Four visual styles available for badges.',
        code: `import { Badge } from '@xaui/native/badge'
import { IconButton } from '@xaui/native/button'
import { BellIcon } from '@xaui/icons/bell'
import { Row } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Row gap={24}>
      <Badge content={4} variant="solid" themeColor="primary">
        <IconButton icon={<BellIcon />} onPress={() => {}} />
      </Badge>
      <Badge content={4} variant="flat" themeColor="primary">
        <IconButton icon={<BellIcon />} onPress={() => {}} />
      </Badge>
      <Badge content={4} variant="faded" themeColor="primary">
        <IconButton icon={<BellIcon />} onPress={() => {}} />
      </Badge>
      <Badge content={4} variant="shadow" themeColor="primary">
        <IconButton icon={<BellIcon />} onPress={() => {}} />
      </Badge>
    </Row>
  )
}`,
      },
      {
        title: 'Placements',
        description: 'Position the badge on any corner of the wrapped element.',
        code: `import { Badge } from '@xaui/native/badge'
import { Avatar } from '@xaui/native/avatar'
import { Row } from '@xaui/native/view'

export function PlacementsExample() {
  return (
    <Row gap={24}>
      <Badge content="1" placement="top-right">
        <Avatar label="TR" />
      </Badge>
      <Badge content="2" placement="top-left">
        <Avatar label="TL" />
      </Badge>
      <Badge content="3" placement="bottom-right">
        <Avatar label="BR" />
      </Badge>
      <Badge content="4" placement="bottom-left">
        <Avatar label="BL" />
      </Badge>
    </Row>
  )
}`,
      },
      {
        title: 'Visibility Toggle',
        description: 'Use isInvisible to conditionally hide the badge.',
        code: `import { useState } from 'react'
import { Badge } from '@xaui/native/badge'
import { Button, IconButton } from '@xaui/native/button'
import { NotificationsIcon } from '@xaui/icons/notifications'
import { Row } from '@xaui/native/view'

export function VisibilityExample() {
  const [hasNotif, setHasNotif] = useState(true)

  return (
    <Row gap={16} alignItems="center">
      <Badge content={5} isInvisible={!hasNotif}>
        <IconButton icon={<NotificationsIcon />} onPress={() => {}} />
      </Badge>
      <Button onPress={() => setHasNotif(v => !v)}>
        {hasNotif ? 'Clear' : 'Notify'}
      </Button>
    </Row>
  )
}`,
      },
    ],
  },

  'bottom-sheet': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content rendered inside the sheet' },
      { name: 'isOpen', type: 'boolean', defaultValue: '-', description: 'Controls whether the sheet is open' },
      { name: 'snapPoints', type: '[number, ...number[]]', defaultValue: '[0.4, 0.9]', description: 'Array of snap heights as a fraction of the screen (0–1). First value is the collapsed height, subsequent values are expanded heights' },
      { name: 'initialSnapIndex', type: 'number', defaultValue: '0', description: 'Index into snapPoints to open at' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Color theme applied to the sheet surface' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"lg"', description: 'Top corner radius of the sheet' },
      { name: 'showBackdrop', type: 'boolean', defaultValue: 'true', description: 'Show a semi-transparent backdrop behind the sheet' },
      { name: 'closeOnBackdropPress', type: 'boolean', defaultValue: 'true', description: 'Dismiss the sheet when the backdrop is pressed' },
      { name: 'enableSwipeToDismiss', type: 'boolean', defaultValue: 'true', description: 'Allow swiping down past the first snap point to close' },
      { name: 'showHandle', type: 'boolean', defaultValue: 'true', description: 'Show the drag handle pill at the top of the sheet' },
      { name: 'handleContent', type: 'ReactNode', defaultValue: '-', description: 'Replace the default handle with a custom element' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable all open/close/snap animations' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional styles applied to the sheet surface' },
    ],
    events: [
      { name: 'onClose', type: '() => void', description: 'Called when the sheet is fully dismissed' },
      { name: 'onSnapChange', type: '(index: number) => void', description: 'Called when the sheet snaps to a new point, with the snap index' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'Open a sheet with a single snap point.',
        code: `import { useState } from 'react'
import { BottomSheet } from '@xaui/native/bottom-sheet'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'
import { Column, Padding } from '@xaui/native/view'

export function BasicExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Sheet</Button>
      <BottomSheet isOpen={open} onClose={() => setOpen(false)}>
        <Padding all={24}>
          <Column gap={12}>
            <Typography variant="titleMedium">Bottom Sheet</Typography>
            <Typography variant="bodyMedium">
              Swipe down or tap the backdrop to dismiss.
            </Typography>
            <Button onPress={() => setOpen(false)}>Close</Button>
          </Column>
        </Padding>
      </BottomSheet>
    </>
  )
}`,
      },
      {
        title: 'Multiple Snap Points',
        description: 'Define several heights the sheet can snap to.',
        code: `import { useState } from 'react'
import { BottomSheet } from '@xaui/native/bottom-sheet'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'
import { Column, Padding } from '@xaui/native/view'

export function MultiSnapExample() {
  const [open, setOpen] = useState(false)
  const [snapIndex, setSnapIndex] = useState(0)

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Sheet</Button>
      <BottomSheet
        isOpen={open}
        snapPoints={[0.3, 0.6, 0.9]}
        initialSnapIndex={0}
        onClose={() => setOpen(false)}
        onSnapChange={setSnapIndex}
      >
        <Padding all={24}>
          <Column gap={12}>
            <Typography variant="titleMedium">
              Snap index: {snapIndex}
            </Typography>
            <Typography variant="bodyMedium">
              Drag the handle up or down to snap between 30 %, 60 %, and 90 % heights.
            </Typography>
          </Column>
        </Padding>
      </BottomSheet>
    </>
  )
}`,
      },
      {
        title: 'Custom Handle',
        description: 'Replace the default handle with your own element.',
        code: `import { useState } from 'react'
import { BottomSheet } from '@xaui/native/bottom-sheet'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'
import { Column, Padding, Row } from '@xaui/native/view'
import { View } from 'react-native'

export function CustomHandleExample() {
  const [open, setOpen] = useState(false)

  const handle = (
    <Padding horizontal={24} vertical={16}>
      <Row justifyContent="space-between" alignItems="center">
        <Typography variant="titleSmall">Options</Typography>
        <Button size="sm" variant="light" onPress={() => setOpen(false)}>
          Done
        </Button>
      </Row>
    </Padding>
  )

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Sheet</Button>
      <BottomSheet
        isOpen={open}
        showHandle={false}
        handleContent={handle}
        onClose={() => setOpen(false)}
      >
        <Padding horizontal={24} bottom={32}>
          <Column gap={8}>
            {['Option A', 'Option B', 'Option C'].map(label => (
              <Button key={label} variant="flat" fullWidth onPress={() => setOpen(false)}>
                {label}
              </Button>
            ))}
          </Column>
        </Padding>
      </BottomSheet>
    </>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Style the sheet surface with a theme color.',
        code: `import { useState } from 'react'
import { BottomSheet } from '@xaui/native/bottom-sheet'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'
import { Column, Padding } from '@xaui/native/view'

export function ThemeColorsExample() {
  const [color, setColor] = useState<string | null>(null)

  return (
    <Column gap={8}>
      {(['primary', 'success', 'warning', 'danger'] as const).map(c => (
        <Button key={c} themeColor={c} onPress={() => setColor(c)}>
          Open {c}
        </Button>
      ))}
      <BottomSheet
        isOpen={color !== null}
        themeColor={color as 'primary' | 'success' | 'warning' | 'danger'}
        onClose={() => setColor(null)}
      >
        <Padding all={24}>
          <Typography variant="titleMedium" style={{ textTransform: 'capitalize' }}>
            {color} sheet
          </Typography>
        </Padding>
      </BottomSheet>
    </Column>
  )
}`,
      },
    ],
  },

  'bottom-tab-bar': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'BottomTabBarItem children (composable mode)' },
      { name: 'selectedKey', type: 'string', defaultValue: '-', description: 'Controlled selected tab key' },
      { name: 'defaultSelectedKey', type: 'string', defaultValue: '-', description: 'Initial selected key for uncontrolled usage' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme applied to the active indicator, active icon, and active label' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Component size (sm: 68px, md: 78px, lg: 86px min-height)' },
      { name: 'variant', type: '"stacked" | "inline" | "icon-only"', defaultValue: '"stacked"', description: 'Layout variant: stacked places label below icon, inline places it beside, icon-only hides labels' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable all tab items at once' },
      { name: 'showLabel', type: 'boolean', defaultValue: 'true', description: 'Show or hide labels on all items. Individual items can override this' },
      { name: 'insetBottom', type: 'number', defaultValue: '0', description: 'Extra bottom padding for safe-area insets (e.g. iPhone home indicator)' },
      { name: 'activeColor', type: 'string', defaultValue: '-', description: 'Override active icon and label colour for all items' },
      { name: 'inactiveColor', type: 'string', defaultValue: '-', description: 'Override inactive icon and label colour for all items' },
      { name: 'indicatorColor', type: 'string', defaultValue: '-', description: 'Override the selected-state pill indicator colour for all items' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles for the root container' },
      { name: 'customAppearance', type: '{ container?: StyleProp<ViewStyle> }', defaultValue: '-', description: 'Fine-grained style overrides for the container' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(key: string) => void', description: 'Called when a tab is selected, receiving the itemKey of the pressed item' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'Stacked variant with icons and labels.',
        code: `import { useState } from 'react'
import { BottomTabBar, BottomTabBarItem } from '@xaui/native/bottom-tab-bar'
import { HomeIcon } from '@xaui/icons/home'
import { SearchIcon } from '@xaui/icons/search'
import { PersonIcon } from '@xaui/icons/person'

export function BasicExample() {
  const [selected, setSelected] = useState('home')

  return (
    <BottomTabBar selectedKey={selected} onSelectionChange={setSelected}>
      <BottomTabBarItem itemKey="home" label="Home" icon={<HomeIcon />} />
      <BottomTabBarItem itemKey="search" label="Search" icon={<SearchIcon />} />
      <BottomTabBarItem itemKey="profile" label="Profile" icon={<PersonIcon />} />
    </BottomTabBar>
  )
}`,
      },
      {
        title: 'Variants',
        description: 'Three layout variants: stacked, inline, and icon-only.',
        code: `import { useState } from 'react'
import { BottomTabBar, BottomTabBarItem } from '@xaui/native/bottom-tab-bar'
import { Column } from '@xaui/native/view'
import { HomeIcon } from '@xaui/icons/home'
import { SearchIcon } from '@xaui/icons/search'
import { PersonIcon } from '@xaui/icons/person'
import { BookmarkIcon } from '@xaui/icons/bookmark'

const items = [
  { key: 'home', label: 'Home', icon: <HomeIcon /> },
  { key: 'search', label: 'Search', icon: <SearchIcon /> },
  { key: 'saved', label: 'Saved', icon: <BookmarkIcon /> },
  { key: 'profile', label: 'Profile', icon: <PersonIcon /> },
]

export function VariantsExample() {
  const [selected, setSelected] = useState('home')

  return (
    <Column gap={16}>
      <BottomTabBar variant="stacked" selectedKey={selected} onSelectionChange={setSelected}>
        {items.map(i => (
          <BottomTabBarItem key={i.key} itemKey={i.key} label={i.label} icon={i.icon} />
        ))}
      </BottomTabBar>

      <BottomTabBar variant="inline" selectedKey={selected} onSelectionChange={setSelected}>
        {items.map(i => (
          <BottomTabBarItem key={i.key} itemKey={i.key} label={i.label} icon={i.icon} />
        ))}
      </BottomTabBar>

      <BottomTabBar variant="icon-only" selectedKey={selected} onSelectionChange={setSelected}>
        {items.map(i => (
          <BottomTabBarItem key={i.key} itemKey={i.key} label={i.label} icon={i.icon} />
        ))}
      </BottomTabBar>
    </Column>
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Three sizes control bar height and icon/label scaling.',
        code: `import { useState } from 'react'
import { BottomTabBar, BottomTabBarItem } from '@xaui/native/bottom-tab-bar'
import { Column } from '@xaui/native/view'
import { HomeIcon } from '@xaui/icons/home'
import { SearchIcon } from '@xaui/icons/search'
import { PersonIcon } from '@xaui/icons/person'

export function SizesExample() {
  const [selected, setSelected] = useState('home')

  return (
    <Column gap={16}>
      {(['sm', 'md', 'lg'] as const).map(size => (
        <BottomTabBar
          key={size}
          size={size}
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <BottomTabBarItem itemKey="home" label="Home" icon={<HomeIcon />} />
          <BottomTabBarItem itemKey="search" label="Search" icon={<SearchIcon />} />
          <BottomTabBarItem itemKey="profile" label="Profile" icon={<PersonIcon />} />
        </BottomTabBar>
      ))}
    </Column>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Apply a design system color to the active indicator.',
        code: `import { useState } from 'react'
import { BottomTabBar, BottomTabBarItem } from '@xaui/native/bottom-tab-bar'
import { Column } from '@xaui/native/view'
import { HomeIcon } from '@xaui/icons/home'
import { SearchIcon } from '@xaui/icons/search'
import { PersonIcon } from '@xaui/icons/person'

export function ThemeColorsExample() {
  const [selected, setSelected] = useState('home')

  return (
    <Column gap={16}>
      {(['primary', 'secondary', 'success', 'danger'] as const).map(color => (
        <BottomTabBar
          key={color}
          themeColor={color}
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <BottomTabBarItem itemKey="home" label="Home" icon={<HomeIcon />} />
          <BottomTabBarItem itemKey="search" label="Search" icon={<SearchIcon />} />
          <BottomTabBarItem itemKey="profile" label="Profile" icon={<PersonIcon />} />
        </BottomTabBar>
      ))}
    </Column>
  )
}`,
      },
      {
        title: 'Badge on Item',
        description: 'Attach a Badge component to any tab item.',
        code: `import { useState } from 'react'
import { BottomTabBar, BottomTabBarItem } from '@xaui/native/bottom-tab-bar'
import { Badge } from '@xaui/native/badge'
import { HomeIcon } from '@xaui/icons/home'
import { NotificationsIcon } from '@xaui/icons/notifications'
import { PersonIcon } from '@xaui/icons/person'

export function BadgeExample() {
  const [selected, setSelected] = useState('home')

  return (
    <BottomTabBar selectedKey={selected} onSelectionChange={setSelected}>
      <BottomTabBarItem itemKey="home" label="Home" icon={<HomeIcon />} />
      <BottomTabBarItem
        itemKey="notifications"
        label="Alerts"
        icon={<NotificationsIcon />}
        badge={<Badge content={5} size="sm" />}
      />
      <BottomTabBarItem itemKey="profile" label="Profile" icon={<PersonIcon />} />
    </BottomTabBar>
  )
}`,
      },
      {
        title: 'Active Icon',
        description: 'Swap to a filled icon variant when a tab is selected.',
        code: `import { useState } from 'react'
import { BottomTabBar, BottomTabBarItem } from '@xaui/native/bottom-tab-bar'
import { HomeIcon } from '@xaui/icons/home'
import { HomeFilledIcon } from '@xaui/icons/home-filled'
import { SearchIcon } from '@xaui/icons/search'
import { PersonIcon } from '@xaui/icons/person'
import { PersonFilledIcon } from '@xaui/icons/person-filled'

export function ActiveIconExample() {
  const [selected, setSelected] = useState('home')

  return (
    <BottomTabBar selectedKey={selected} onSelectionChange={setSelected}>
      <BottomTabBarItem
        itemKey="home"
        label="Home"
        icon={<HomeIcon />}
        activeIcon={<HomeFilledIcon />}
      />
      <BottomTabBarItem itemKey="search" label="Search" icon={<SearchIcon />} />
      <BottomTabBarItem
        itemKey="profile"
        label="Profile"
        icon={<PersonIcon />}
        activeIcon={<PersonFilledIcon />}
      />
    </BottomTabBar>
  )
}`,
      },
      {
        title: 'Expo Router Integration',
        description: 'Pass expo-router tab props directly to replace the default tab bar.',
        code: `import { Tabs } from 'expo-router'
import { BottomTabBar } from '@xaui/native/bottom-tab-bar'
import { HomeIcon } from '@xaui/icons/home'
import { SearchIcon } from '@xaui/icons/search'
import { PersonIcon } from '@xaui/icons/person'

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <BottomTabBar {...props} themeColor="primary" />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <SearchIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <PersonIcon color={color} size={size} />,
        }}
      />
    </Tabs>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'BottomTabBarItem',
        props: [
          { name: 'itemKey', type: 'string', defaultValue: '-', description: 'Unique identifier used to track selection. Must be unique within the bar' },
          { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Label text or element. Also accepts a render function with (focused, color, position) params' },
          { name: 'icon', type: 'ReactNode | (params: BottomTabBarIconRenderParams) => ReactNode', defaultValue: '-', description: 'Icon element or render function receiving focused, color, and size' },
          { name: 'activeIcon', type: 'ReactNode | (params: BottomTabBarIconRenderParams) => ReactNode', defaultValue: '-', description: 'Alternate icon shown when the item is selected. Falls back to icon if omitted' },
          { name: 'badge', type: 'ReactNode', defaultValue: '-', description: 'Badge element anchored top-right of the icon (use the Badge component)' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this specific item. Renders at 50% opacity and ignores press events' },
          { name: 'isSelected', type: 'boolean', defaultValue: '-', description: 'Force the selected state independent of the parent bar (standalone mode)' },
          { name: 'showLabel', type: 'boolean', defaultValue: '-', description: 'Override the parent bar showLabel for this item only' },
          { name: 'activeColor', type: 'string', defaultValue: '-', description: 'Per-item active icon and label colour override' },
          { name: 'inactiveColor', type: 'string', defaultValue: '-', description: 'Per-item inactive icon and label colour override' },
          { name: 'indicatorColor', type: 'string', defaultValue: '-', description: 'Per-item selection indicator colour override' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles for the item pressable container' },
          { name: 'customAppearance', type: '{ container?: StyleProp<ViewStyle>; indicator?: StyleProp<ViewStyle>; label?: StyleProp<TextStyle> }', defaultValue: '-', description: 'Fine-grained style overrides for container, pill indicator, and label' },
          { name: 'accessibilityLabel', type: 'string', defaultValue: '-', description: 'Accessibility label for screen readers' },
          { name: 'testID', type: 'string', defaultValue: '-', description: 'Test identifier for end-to-end testing' },
        ],
        events: [
          { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when the tab is pressed (not fired when isDisabled is true)' },
          { name: 'onLongPress', type: '(event: GestureResponderEvent) => void', description: 'Called on long press' },
        ],
      },
    ],
  },

  button: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Button label content' },
      { name: 'variant', type: '"solid" | "outlined" | "flat" | "light" | "faded"', defaultValue: '"solid"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Button size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element rendered before the label' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element rendered after the label' },
      { name: 'spinnerPlacement', type: '"start" | "end"', defaultValue: '"start"', description: 'Position of loading spinner' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full container width' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Show loading spinner' },
      { name: 'elevation', type: '0 | 1 | 2 | 3 | 4', defaultValue: '0', description: 'Shadow elevation level' },
      { name: 'customAppearance', type: '{ container?: ViewStyle; button?: ViewStyle; text?: TextStyle }', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when button is pressed' },
      { name: 'onLongPress', type: '(event: GestureResponderEvent) => void', description: 'Called on long press' },
      { name: 'onPressIn', type: '(event: GestureResponderEvent) => void', description: 'Called when press starts' },
      { name: 'onPressOut', type: '(event: GestureResponderEvent) => void', description: 'Called when press ends' },
    ],
    examples: [
      {
        title: 'Variants',
        description: 'All available visual styles.',
        code: `import { Button } from '@xaui/native/button'
import { Column } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Column gap={8}>
      <Button variant="solid">Solid</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="flat">Flat</Button>
      <Button variant="light">Light</Button>
      <Button variant="faded">Faded</Button>
    </Column>
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Control the button size with the size prop.',
        code: `import { Button } from '@xaui/native/button'
import { Row } from '@xaui/native/view'

export function SizesExample() {
  return (
    <Row gap={8} alignItems="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Row>
  )
}`,
      },
      {
        title: 'With Icons',
        description: 'Add content before or after the label using startContent / endContent.',
        code: `import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'

export function WithIconsExample() {
  return (
    <Button startContent={<Typography>⬅</Typography>} endContent={<Typography>➡</Typography>}>
      Navigate
    </Button>
  )
}`,
      },
      {
        title: 'Loading State',
        description: 'Show a spinner while an async action is in progress.',
        code: `import { useState } from 'react'
import { Button } from '@xaui/native/button'

export function LoadingExample() {
  const [isLoading, setIsLoading] = useState(false)

  const handlePress = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <Button isLoading={isLoading} onPress={handlePress}>
      Submit
    </Button>
  )
}`,
      },
      {
        title: 'Disabled State',
        description: 'Prevent interaction with isDisabled.',
        code: `import { Button } from '@xaui/native/button'

export function DisabledExample() {
  return <Button isDisabled>Disabled</Button>
}`,
      },
      {
        title: 'Full Width',
        description: 'Stretch the button to fill its container.',
        code: `import { Button } from '@xaui/native/button'

export function FullWidthExample() {
  return <Button fullWidth>Full Width</Button>
}`,
      },
      {
        title: 'Elevation',
        description: 'Add a shadow to give depth.',
        code: `import { Button } from '@xaui/native/button'
import { Column } from '@xaui/native/view'

export function ElevationExample() {
  return (
    <Column gap={8}>
      <Button elevation={1}>Elevation 1</Button>
      <Button elevation={2}>Elevation 2</Button>
      <Button elevation={3}>Elevation 3</Button>
      <Button elevation={4}>Elevation 4</Button>
    </Column>
  )
}`,
      },
      {
        title: 'Icon Button',
        description: 'A square button that holds only an icon.',
        code: `import { IconButton } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'

export function IconButtonExample() {
  return <IconButton icon={<Typography>🔔</Typography>} onPress={() => {}} />
}`,
      },
    ],
    subComponents: [
      {
        name: 'IconButton',
        props: [
          { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Icon element to display' },
          { name: 'variant', type: '"solid" | "outlined" | "flat" | "light" | "faded"', defaultValue: '"solid"', description: 'Visual style variant' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
          { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Button size' },
          { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
          { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Show loading spinner' },
          { name: 'elevation', type: '0 | 1 | 2 | 3 | 4', defaultValue: '0', description: 'Shadow elevation level' },
          { name: 'customAppearance', type: '{ container?: ViewStyle; button?: ViewStyle }', defaultValue: '-', description: 'Custom style overrides' },
        ],
        events: [
          { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when pressed' },
          { name: 'onLongPress', type: '(event: GestureResponderEvent) => void', description: 'Called on long press' },
          { name: 'onPressIn', type: '(event: GestureResponderEvent) => void', description: 'Called when press starts' },
          { name: 'onPressOut', type: '(event: GestureResponderEvent) => void', description: 'Called when press ends' },
        ],
      },
    ],
  },

  card: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'CardHeader, CardBody, CardFooter, CardTitle, CardDescription' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Color theme' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"lg"', description: 'Border radius' },
      { name: 'padding', type: 'number', defaultValue: '-', description: 'Internal padding override' },
      { name: 'elevation', type: '0 | 1 | 2 | 3 | 4', defaultValue: '0', description: 'Shadow elevation level' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full container width' },
      { name: 'isPressable', type: 'boolean', defaultValue: 'false', description: 'Make card tappable' },
      { name: 'isHoverable', type: 'boolean', defaultValue: 'false', description: 'Apply hover effect' },
      { name: 'isBlurred', type: 'boolean', defaultValue: 'false', description: 'Apply blur background' },
      { name: 'isFooterBlurred', type: 'boolean', defaultValue: 'false', description: 'Apply blur to footer only' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable press animation' },
      { name: 'customAppearance', type: 'CardCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when card is pressed' },
      { name: 'onLongPress', type: '(event: GestureResponderEvent) => void', description: 'Called on long press' },
    ],
    examples: [
      {
        title: 'Full Card Layout',
        description: 'Using CardHeader, CardTitle, CardDescription, CardBody, and CardFooter.',
        code: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from '@xaui/native/card'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'

export function FullCardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification</CardTitle>
        <CardDescription>You have 3 unread messages</CardDescription>
      </CardHeader>
      <CardBody>
        <Typography>Open your inbox to see the latest updates from your team.</Typography>
      </CardBody>
      <CardFooter>
        <Button variant="flat" size="sm">Dismiss</Button>
        <Button size="sm">View inbox</Button>
      </CardFooter>
    </Card>
  )
}`,
      },
      {
        title: 'Header with Title & Description Only',
        description: 'CardTitle and CardDescription inside CardHeader for structured headings.',
        code: `import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '@xaui/native/card'
import { Typography } from '@xaui/native/typography'

export function HeaderExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Last updated 2 hours ago</CardDescription>
      </CardHeader>
      <CardBody>
        <Typography>Progress: 74% complete</Typography>
      </CardBody>
    </Card>
  )
}`,
      },
      {
        title: 'Pressable Card',
        description: 'Make the entire card tappable.',
        code: `import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '@xaui/native/card'
import { Typography } from '@xaui/native/typography'

export function PressableCardExample() {
  return (
    <Card isPressable onPress={() => {}}>
      <CardHeader>
        <CardTitle>Open details</CardTitle>
        <CardDescription>Tap anywhere on the card</CardDescription>
      </CardHeader>
      <CardBody>
        <Typography>More information about this item.</Typography>
      </CardBody>
    </Card>
  )
}`,
      },
      {
        title: 'Elevated Card',
        description: 'Add a shadow with the elevation prop.',
        code: `import { Card, CardHeader, CardTitle, CardBody } from '@xaui/native/card'
import { Typography } from '@xaui/native/typography'

export function ElevatedCardExample() {
  return (
    <Card elevation={3}>
      <CardHeader>
        <CardTitle>Elevated</CardTitle>
      </CardHeader>
      <CardBody>
        <Typography>This card casts a shadow.</Typography>
      </CardBody>
    </Card>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'CardHeader',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Header content' },
          { name: 'customAppearance', type: '{ container?: ViewStyle }', defaultValue: '-', description: 'Custom styles' },
        ],
      },
      {
        name: 'CardBody',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Body content' },
          { name: 'customAppearance', type: '{ container?: ViewStyle }', defaultValue: '-', description: 'Custom styles' },
        ],
      },
      {
        name: 'CardFooter',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Footer content' },
          { name: 'customAppearance', type: '{ container?: ViewStyle }', defaultValue: '-', description: 'Custom styles' },
        ],
      },
      {
        name: 'CardTitle',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Title text content' },
          { name: 'style', type: 'TextStyle', defaultValue: '-', description: 'Additional text styles' },
        ],
      },
      {
        name: 'CardDescription',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Description text content' },
          { name: 'style', type: 'TextStyle', defaultValue: '-', description: 'Additional text styles' },
        ],
      },
    ],
  },

  carousel: {
    props: [
      { name: 'data', type: 'T[]', defaultValue: '-', description: 'Array of items to display' },
      { name: 'renderItem', type: '(info: { item: T; index: number }) => ReactNode', defaultValue: '-', description: 'Renderer for each carousel item' },
      { name: 'keyExtractor', type: '(item: T, index: number) => string', defaultValue: '-', description: 'Unique key extractor' },
      { name: 'layout', type: '"multi-browse" | "uncontained" | "hero" | "full-screen"', defaultValue: '"multi-browse"', description: 'Carousel layout variant' },
      { name: 'itemWidth', type: 'number', defaultValue: '-', description: 'Width of each item' },
      { name: 'itemHeight', type: 'number', defaultValue: '-', description: 'Height of each item' },
      { name: 'itemSpacing', type: 'number', defaultValue: '8', description: 'Spacing between items' },
      { name: 'contentPadding', type: 'number', defaultValue: '-', description: 'Padding around the carousel' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Item border radius' },
      { name: 'showIndicator', type: 'boolean', defaultValue: 'true', description: 'Show page indicator dots' },
      { name: 'autoPlay', type: 'boolean', defaultValue: 'false', description: 'Enable auto scrolling' },
      { name: 'autoPlayInterval', type: 'number', defaultValue: '3000', description: 'Auto play interval in ms' },
      { name: 'initialIndex', type: 'number', defaultValue: '0', description: 'Initial active item index' },
      { name: 'customAppearance', type: 'CarouselCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onActiveItemChange', type: '(index: number) => void', description: 'Called when the active item changes' },
    ],
    examples: [
      {
        title: 'Basic Carousel',
        description: 'Display a list of items with data, renderItem, and keyExtractor.',
        code: `import { Carousel } from '@xaui/native/carousel'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

const slides = [
  { id: '1', label: 'Slide 1', color: '#4f46e5' },
  { id: '2', label: 'Slide 2', color: '#0891b2' },
  { id: '3', label: 'Slide 3', color: '#059669' },
]

export function BasicCarouselExample() {
  return (
    <Carousel
      data={slides}
      keyExtractor={item => item.id}
      itemWidth={300}
      itemHeight={180}
      renderItem={({ item }) => (
        <View style={{ flex: 1, backgroundColor: item.color, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
          <Typography style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{item.label}</Typography>
        </View>
      )}
    />
  )
}`,
      },
      {
        title: 'Auto Play',
        description: 'Auto-scroll slides at a fixed interval.',
        code: `import { Carousel } from '@xaui/native/carousel'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

const banners = [
  { id: '1', title: 'Welcome' },
  { id: '2', title: 'Explore' },
  { id: '3', title: 'Get started' },
]

export function AutoPlayExample() {
  return (
    <Carousel
      data={banners}
      keyExtractor={item => item.id}
      itemWidth={320}
      itemHeight={160}
      autoPlay
      autoPlayInterval={2500}
      renderItem={({ item }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 12 }}>
          <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Typography>
        </View>
      )}
    />
  )
}`,
      },
      {
        title: 'Hero Layout',
        description: 'Full-width hero carousel with a large focal item.',
        code: `import { Carousel } from '@xaui/native/carousel'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

const items = [
  { id: '1', label: 'Feature A' },
  { id: '2', label: 'Feature B' },
  { id: '3', label: 'Feature C' },
]

export function HeroCarouselExample() {
  return (
    <Carousel
      data={items}
      keyExtractor={item => item.id}
      layout="hero"
      itemWidth={280}
      itemHeight={200}
      renderItem={({ item }) => (
        <View style={{ flex: 1, backgroundColor: '#1e293b', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
          <Typography style={{ color: '#fff', fontSize: 22 }}>{item.label}</Typography>
        </View>
      )}
      onActiveItemChange={index => console.log('active:', index)}
    />
  )
}`,
      },
    ],
  },

  chart: {
    props: [
      { name: 'title', type: 'string', defaultValue: '-', description: 'Chart card title rendered in the header' },
      { name: 'data', type: 'varies per chart', defaultValue: '-', description: 'Data array — shape depends on which chart component is used (see sub-components below)' },
      { name: 'elevation', type: 'number', defaultValue: '0', description: 'Shadow elevation level' },
      { name: 'backgroundColor', type: 'string', defaultValue: '"#6a6a6a30"', description: 'Card background color' },
      { name: 'textColor', type: 'string', defaultValue: '"#ffffff"', description: 'Text color for labels, title, and axis values' },
      { name: 'size', type: 'number', defaultValue: 'varies', description: 'Chart size in pixels. Acts as diameter for circular charts and height proxy for line/bar charts' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional styles for the card container' },
    ],
    examples: [
      {
        title: 'Donut Chart',
        description: 'Ring chart with a centre label, legend, and configurable stroke width.',
        code: `import { DonutChartCard } from '@xaui/native/chart'

export function DonutExample() {
  return (
    <DonutChartCard
      title="Revenue"
      total="$12 400"
      data={[
        { label: 'Product A', value: 42, color: '#6366F1' },
        { label: 'Product B', value: 28, color: '#22D3EE' },
        { label: 'Product C', value: 18, color: '#F59E0B' },
        { label: 'Product D', value: 12, color: '#10B981' },
      ]}
      legendPosition="bottom"
    />
  )
}`,
      },
      {
        title: 'Pie Chart',
        description: 'Filled pie chart with optional legend.',
        code: `import { PieChartCard } from '@xaui/native/chart'

export function PieExample() {
  return (
    <PieChartCard
      title="Market Share"
      data={[
        { label: 'iOS', value: 57, color: '#6366F1' },
        { label: 'Android', value: 38, color: '#22D3EE' },
        { label: 'Other', value: 5, color: '#F59E0B' },
      ]}
      legendPosition="right"
      size={200}
    />
  )
}`,
      },
      {
        title: 'Line Chart',
        description: 'Smooth or direct line chart with optional area fill and data point markers.',
        code: `import { LineChartCard } from '@xaui/native/chart'

export function LineExample() {
  return (
    <LineChartCard
      title="Monthly Sales"
      lineMode="smooth"
      showPoints
      showAxes
      data={[
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 55 },
        { label: 'Mar', value: 42 },
        { label: 'Apr', value: 70 },
        { label: 'May', value: 61 },
        { label: 'Jun', value: 88 },
      ]}
    />
  )
}`,
      },
      {
        title: 'Vertical Bar Chart',
        description: 'Bar chart with per-bar colour, axis labels, and optional full legend.',
        code: `import { VerticalBarChartCard } from '@xaui/native/chart'

export function BarExample() {
  return (
    <VerticalBarChartCard
      title="Weekly Activity"
      showAxes
      data={[
        { label: 'Mon', value: 12, color: '#6366F1' },
        { label: 'Tue', value: 28, color: '#22D3EE' },
        { label: 'Wed', value: 19, color: '#F59E0B' },
        { label: 'Thu', value: 35, color: '#10B981' },
        { label: 'Fri', value: 42, color: '#EF4444' },
        { label: 'Sat', value: 8,  color: '#8B5CF6' },
        { label: 'Sun', value: 5,  color: '#EC4899' },
      ]}
    />
  )
}`,
      },
      {
        title: 'Heatmap Chart',
        description: 'Grid heatmap interpolating between two colours based on cell intensity.',
        code: `import { HeatmapChartCard } from '@xaui/native/chart'

export function HeatmapExample() {
  return (
    <HeatmapChartCard
      title="Commit Activity"
      xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
      yLabels={['W1', 'W2', 'W3', 'W4']}
      showValues
      startColor="#3B82F6"
      endColor="#EF4444"
      data={[
        [3, 8, 2, 14, 6],
        [1, 5, 9, 3, 12],
        [7, 2, 15, 1, 4],
        [10, 6, 3, 8, 2],
      ]}
    />
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'DonutChartCard',
        props: [
          { name: 'data', type: 'DonutChartDataItem[]', defaultValue: '-', description: 'Segments: { label, value, color, labelColor? }' },
          { name: 'title', type: 'string', defaultValue: '-', description: 'Text shown in the centre of the donut' },
          { name: 'total', type: 'string | number', defaultValue: '-', description: 'Value shown in the centre below the title' },
          { name: 'showLegend', type: 'boolean', defaultValue: 'true', description: 'Show colour legend' },
          { name: 'legendPosition', type: '"top" | "left" | "right" | "bottom"', defaultValue: '"top"', description: 'Legend placement' },
          { name: 'size', type: 'number', defaultValue: '250', description: 'Outer diameter in px' },
          { name: 'strokeWidth', type: 'number', defaultValue: 'auto', description: 'Ring thickness in px. Auto-calculated from size if omitted (6–22px)' },
          { name: 'elevation', type: 'number', defaultValue: '0', description: 'Shadow elevation' },
          { name: 'backgroundColor', type: 'string', defaultValue: '"#6a6a6a30"', description: 'Card background' },
          { name: 'textColor', type: 'string', defaultValue: '"#ffffff"', description: 'Text color' },
          { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Container styles' },
        ],
      },
      {
        name: 'PieChartCard',
        props: [
          { name: 'data', type: 'PieChartDataItem[]', defaultValue: '-', description: 'Slices: { label, value, color, labelColor? }' },
          { name: 'title', type: 'string', defaultValue: '-', description: 'Card title' },
          { name: 'total', type: 'string | number', defaultValue: '-', description: 'Total value shown in header' },
          { name: 'showLegend', type: 'boolean', defaultValue: 'true', description: 'Show colour legend' },
          { name: 'legendPosition', type: '"top" | "left" | "right" | "bottom"', defaultValue: '"bottom"', description: 'Legend placement' },
          { name: 'size', type: 'number', defaultValue: '220', description: 'Diameter in px (min 120)' },
          { name: 'elevation', type: 'number', defaultValue: '0', description: 'Shadow elevation' },
          { name: 'backgroundColor', type: 'string', defaultValue: '"#6a6a6a30"', description: 'Card background' },
          { name: 'textColor', type: 'string', defaultValue: '"#ffffff"', description: 'Text color' },
          { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Container styles' },
        ],
      },
      {
        name: 'LineChartCard',
        props: [
          { name: 'data', type: 'LineChartDataItem[]', defaultValue: '-', description: 'Points: { label, value }' },
          { name: 'title', type: 'string', defaultValue: '-', description: 'Card title' },
          { name: 'lineMode', type: '"smooth" | "direct"', defaultValue: '"smooth"', description: 'Smooth uses cubic Bezier curves; direct draws straight segments' },
          { name: 'lineColor', type: 'string', defaultValue: '"#57C9ED"', description: 'Line stroke color' },
          { name: 'areaColor', type: 'string', defaultValue: '"rgba(87,201,237,0.16)"', description: 'Fill color under the line' },
          { name: 'showPoints', type: 'boolean', defaultValue: 'false', description: 'Render a circle at each data point' },
          { name: 'showAxes', type: 'boolean', defaultValue: 'false', description: 'Render X/Y axis grid lines and value labels' },
          { name: 'abbreviateXAxisLabels', type: 'boolean', defaultValue: 'false', description: 'Truncate long X-axis labels' },
          { name: 'xAxisAbbreviationLength', type: 'number', defaultValue: '3', description: 'Max characters for X-axis labels when abbreviation is on' },
          { name: 'size', type: 'number', defaultValue: '280', description: 'Chart height proxy in px' },
          { name: 'elevation', type: 'number', defaultValue: '0', description: 'Shadow elevation' },
          { name: 'backgroundColor', type: 'string', defaultValue: '"#6a6a6a30"', description: 'Card background' },
          { name: 'textColor', type: 'string', defaultValue: '"#ffffff"', description: 'Text color' },
          { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Container styles' },
        ],
      },
      {
        name: 'VerticalBarChartCard',
        props: [
          { name: 'data', type: 'VerticalBarChartDataItem[]', defaultValue: '-', description: 'Bars: { label, value, color? }' },
          { name: 'title', type: 'string', defaultValue: '-', description: 'Card title' },
          { name: 'showAxes', type: 'boolean', defaultValue: 'false', description: 'Render Y-axis grid lines and value labels' },
          { name: 'showFullLegendBelow', type: 'boolean', defaultValue: 'false', description: 'Render a full label+value legend below the chart' },
          { name: 'justifyBars', type: 'boolean', defaultValue: 'false', description: 'Evenly distribute bars across the full chart width' },
          { name: 'abbreviateXAxisLabels', type: 'boolean', defaultValue: 'false', description: 'Truncate long X-axis labels' },
          { name: 'xAxisAbbreviationLength', type: 'number', defaultValue: '3', description: 'Max characters for X-axis labels' },
          { name: 'size', type: 'number', defaultValue: '260', description: 'Chart height proxy in px' },
          { name: 'elevation', type: 'number', defaultValue: '0', description: 'Shadow elevation' },
          { name: 'backgroundColor', type: 'string', defaultValue: '"#6a6a6a30"', description: 'Card background' },
          { name: 'textColor', type: 'string', defaultValue: '"#ffffff"', description: 'Text color' },
          { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Container styles' },
        ],
      },
      {
        name: 'HeatmapChartCard',
        props: [
          { name: 'data', type: 'number[][]', defaultValue: '-', description: '2D row-major array of numeric values' },
          { name: 'title', type: 'string', defaultValue: '-', description: 'Card title' },
          { name: 'xLabels', type: 'string[]', defaultValue: '-', description: 'Column labels (truncated to 3 chars)' },
          { name: 'yLabels', type: 'string[]', defaultValue: '-', description: 'Row labels (truncated to 5 chars)' },
          { name: 'showValues', type: 'boolean', defaultValue: 'false', description: 'Render the numeric value inside each cell' },
          { name: 'showLegend', type: 'boolean', defaultValue: 'true', description: 'Show a 5-stop colour gradient legend' },
          { name: 'startColor', type: 'string', defaultValue: '"#3B82F6"', description: 'Color for the lowest value' },
          { name: 'endColor', type: 'string', defaultValue: '"#EF4444"', description: 'Color for the highest value' },
          { name: 'cellSize', type: 'number', defaultValue: '32', description: 'Cell width and height in px' },
          { name: 'cellGap', type: 'number', defaultValue: '4', description: 'Gap between cells in px' },
          { name: 'elevation', type: 'number', defaultValue: '0', description: 'Shadow elevation' },
          { name: 'backgroundColor', type: 'string', defaultValue: '"#6a6a6a30"', description: 'Card background' },
          { name: 'textColor', type: 'string', defaultValue: '"#ffffff"', description: 'Text color' },
          { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Container styles' },
        ],
      },
    ],
  },

  checkbox: {
    props: [
      { name: 'label', type: 'string', defaultValue: '-', description: 'Label text displayed next to the checkbox' },
      { name: 'isChecked', type: 'boolean', defaultValue: 'false', description: 'Controlled checked state' },
      { name: 'isIndeterminate', type: 'boolean', defaultValue: 'false', description: 'Shows a dash instead of a checkmark — use for a "select all" that is partially checked' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction and reduce opacity' },
      { name: 'variant', type: '"filled" | "light"', defaultValue: '"filled"', description: 'filled: solid background when checked. light: transparent with coloured border and animated checkmark' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg"', defaultValue: '"md"', description: 'Checkbox size (xs: 14px, sm: 18px, md: 22px, lg: 26px)' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"sm"', description: 'Border radius of the checkbox box' },
      { name: 'labelAlignment', type: '"left" | "right" | "justify-left" | "justify-right"', defaultValue: '"right"', description: 'Label side. justify-* variants push the checkbox and label to opposite ends (requires fullWidth)' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to fill the container width' },
      { name: 'labelStyle', type: 'TextStyle', defaultValue: '-', description: 'Custom styles for the label text' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
    ],
    events: [
      { name: 'onValueChange', type: '(isChecked: boolean) => void', description: 'Called with the new boolean state when the user toggles the checkbox' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'A simple labeled checkbox.',
        code: `import { Checkbox } from '@xaui/native/checkbox'

export function BasicExample() {
  return <Checkbox label="Accept terms and conditions" />
}`,
      },
      {
        title: 'Variants',
        description: 'Filled has a solid background; light keeps a transparent background with a coloured border.',
        code: `import { Checkbox } from '@xaui/native/checkbox'
import { Column } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Column gap={12}>
      <Checkbox label="Filled (default)" variant="filled" isChecked />
      <Checkbox label="Light" variant="light" isChecked />
    </Column>
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Four sizes from extra-small to large.',
        code: `import { Checkbox } from '@xaui/native/checkbox'
import { Column } from '@xaui/native/view'

export function SizesExample() {
  return (
    <Column gap={12}>
      <Checkbox label="Extra small" size="xs" isChecked />
      <Checkbox label="Small" size="sm" isChecked />
      <Checkbox label="Medium" size="md" isChecked />
      <Checkbox label="Large" size="lg" isChecked />
    </Column>
  )
}`,
      },
      {
        title: 'Controlled',
        description: 'Drive the checked state from React.',
        code: `import { useState } from 'react'
import { Checkbox } from '@xaui/native/checkbox'

export function ControlledExample() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      label="Subscribe to newsletter"
      isChecked={checked}
      onValueChange={setChecked}
    />
  )
}`,
      },
      {
        title: 'Select All with Indeterminate',
        description: 'Drive a parent checkbox from a list of children.',
        code: `import { useState } from 'react'
import { Checkbox } from '@xaui/native/checkbox'
import { Column } from '@xaui/native/view'

const items = ['Option A', 'Option B', 'Option C']

export function IndeterminateExample() {
  const [checked, setChecked] = useState<string[]>([])

  const allChecked = checked.length === items.length
  const someChecked = checked.length > 0 && !allChecked

  const toggleAll = () => setChecked(allChecked ? [] : items)
  const toggle = (item: string) =>
    setChecked(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )

  return (
    <Column gap={8}>
      <Checkbox
        label="Select all"
        isChecked={allChecked}
        isIndeterminate={someChecked}
        onValueChange={toggleAll}
      />
      {items.map(item => (
        <Checkbox
          key={item}
          label={item}
          isChecked={checked.includes(item)}
          onValueChange={() => toggle(item)}
          style={{ marginLeft: 24 }}
        />
      ))}
    </Column>
  )
}`,
      },
      {
        title: 'Label Alignment',
        description: 'Place the label on either side or use justify variants to push them apart.',
        code: `import { Checkbox } from '@xaui/native/checkbox'
import { Column } from '@xaui/native/view'

export function LabelAlignmentExample() {
  return (
    <Column gap={12}>
      <Checkbox label="Right (default)" labelAlignment="right" isChecked />
      <Checkbox label="Left" labelAlignment="left" isChecked />
      <Checkbox label="Justify right" labelAlignment="justify-right" fullWidth isChecked />
      <Checkbox label="Justify left" labelAlignment="justify-left" fullWidth isChecked />
    </Column>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Apply any design system color.',
        code: `import { Checkbox } from '@xaui/native/checkbox'
import { Column } from '@xaui/native/view'

export function ThemeColorsExample() {
  return (
    <Column gap={12}>
      <Checkbox label="Primary" themeColor="primary" isChecked />
      <Checkbox label="Secondary" themeColor="secondary" isChecked />
      <Checkbox label="Success" themeColor="success" isChecked />
      <Checkbox label="Danger" themeColor="danger" isChecked />
      <Checkbox label="Warning" themeColor="warning" isChecked />
    </Column>
  )
}`,
      },
    ],
  },

  chip: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Chip label content' },
      { name: 'variant', type: '"solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot"', defaultValue: '"solid"', description: '7 visual styles. dot renders a coloured indicator at the start' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Chip size (sm: 32px, md: 40px, lg: 44px height)' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius. full uses height/2 for a pill shape' },
      { name: 'avatar', type: 'ReactNode', defaultValue: '-', description: 'Avatar element displayed at the leading edge' },
      { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Arbitrary element at the leading edge (replaces avatar if both provided)' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Arbitrary element at the trailing edge. Hidden when onClose is provided' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction and reduce opacity to 50%' },
      { name: 'customAppearance', type: '{ container?: ViewStyle; text?: TextStyle; closeButton?: ViewStyle; dot?: ViewStyle }', defaultValue: '-', description: 'Fine-grained style overrides' },
    ],
    events: [
      { name: 'onClose', type: '() => void', description: 'Providing this prop renders a close (✕) button; called when it is pressed. The chip animates out before calling this' },
      { name: 'onPress', type: '() => void', description: 'Called when the chip body is pressed' },
    ],
    examples: [
      {
        title: 'Variants',
        description: 'All seven visual styles.',
        code: `import { Chip } from '@xaui/native/chip'
import { Row } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Row gap={8} flexWrap="wrap">
      <Chip variant="solid" themeColor="primary">Solid</Chip>
      <Chip variant="bordered" themeColor="primary">Bordered</Chip>
      <Chip variant="light" themeColor="primary">Light</Chip>
      <Chip variant="flat" themeColor="primary">Flat</Chip>
      <Chip variant="faded" themeColor="primary">Faded</Chip>
      <Chip variant="shadow" themeColor="primary">Shadow</Chip>
      <Chip variant="dot" themeColor="primary">Dot</Chip>
    </Row>
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Three sizes: sm (32px), md (40px), lg (44px).',
        code: `import { Chip } from '@xaui/native/chip'
import { Row } from '@xaui/native/view'

export function SizesExample() {
  return (
    <Row gap={8} alignItems="center">
      <Chip size="sm" themeColor="primary">Small</Chip>
      <Chip size="md" themeColor="primary">Medium</Chip>
      <Chip size="lg" themeColor="primary">Large</Chip>
    </Row>
  )
}`,
      },
      {
        title: 'Closable',
        description: 'Providing onClose renders a close button; the chip animates out when pressed.',
        code: `import { useState } from 'react'
import { Chip } from '@xaui/native/chip'
import { Row } from '@xaui/native/view'

const TAGS = ['React Native', 'TypeScript', 'Expo', 'Tailwind']

export function ClosableExample() {
  const [tags, setTags] = useState(TAGS)

  return (
    <Row gap={8} flexWrap="wrap">
      {tags.map(tag => (
        <Chip
          key={tag}
          themeColor="primary"
          onClose={() => setTags(prev => prev.filter(t => t !== tag))}
        >
          {tag}
        </Chip>
      ))}
    </Row>
  )
}`,
      },
      {
        title: 'With Avatar',
        description: 'Show an avatar at the leading edge.',
        code: `import { Chip } from '@xaui/native/chip'
import { Avatar } from '@xaui/native/avatar'
import { Row } from '@xaui/native/view'

export function WithAvatarExample() {
  return (
    <Row gap={8}>
      <Chip avatar={<Avatar label="JD" size="sm" />} themeColor="primary">
        Jane Doe
      </Chip>
      <Chip avatar={<Avatar label="JS" size="sm" />} themeColor="secondary">
        John Smith
      </Chip>
    </Row>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Apply any design system color.',
        code: `import { Chip } from '@xaui/native/chip'
import { Row } from '@xaui/native/view'

export function ThemeColorsExample() {
  return (
    <Row gap={8} flexWrap="wrap">
      <Chip themeColor="primary">Primary</Chip>
      <Chip themeColor="secondary">Secondary</Chip>
      <Chip themeColor="success">Success</Chip>
      <Chip themeColor="danger">Danger</Chip>
      <Chip themeColor="warning">Warning</Chip>
    </Row>
  )
}`,
      },
      {
        title: 'Single Selection (ChipGroup)',
        description: 'Use ChipGroup with isSelectable and selectMode="single".',
        code: `import { useState } from 'react'
import { ChipGroup, ChipItem } from '@xaui/native/chip'

export function SingleSelectionExample() {
  const [selected, setSelected] = useState<string[]>(['react-native'])

  return (
    <ChipGroup
      isSelectable
      selectMode="single"
      themeColor="primary"
      selectedValues={selected}
      onSelectionChange={setSelected}
    >
      <ChipItem value="react-native">React Native</ChipItem>
      <ChipItem value="flutter">Flutter</ChipItem>
      <ChipItem value="ionic">Ionic</ChipItem>
      <ChipItem value="xamarin">Xamarin</ChipItem>
    </ChipGroup>
  )
}`,
      },
      {
        title: 'Multiple Selection (ChipGroup)',
        description: 'Allow any number of chips to be selected simultaneously.',
        code: `import { useState } from 'react'
import { ChipGroup, ChipItem } from '@xaui/native/chip'

export function MultipleSelectionExample() {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <ChipGroup
      isSelectable
      selectMode="multiple"
      themeColor="secondary"
      selectedValues={selected}
      onSelectionChange={setSelected}
    >
      <ChipItem value="ts">TypeScript</ChipItem>
      <ChipItem value="js">JavaScript</ChipItem>
      <ChipItem value="python">Python</ChipItem>
      <ChipItem value="go">Go</ChipItem>
      <ChipItem value="rust">Rust</ChipItem>
    </ChipGroup>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'ChipGroup',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'ChipItem children — use ChipItem instead of Chip inside a group' },
          { name: 'isSelectable', type: 'boolean', defaultValue: 'false', description: 'Enable selection. When true, chips toggle between their variant and a dimmed unselected style' },
          { name: 'selectMode', type: '"single" | "multiple"', defaultValue: '"single"', description: 'single allows one selection at a time; multiple allows toggling any number of chips' },
          { name: 'selectedValues', type: 'string[]', defaultValue: '-', description: 'Controlled array of selected ChipItem values' },
          { name: 'defaultSelectedValues', type: 'string[]', defaultValue: '-', description: 'Initial selection for uncontrolled usage' },
          { name: 'variant', type: 'ChipVariant', defaultValue: '"solid"', description: 'Default variant applied to all ChipItems' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Default color applied to all ChipItems' },
          { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Size applied to all ChipItems' },
          { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius applied to all ChipItems' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable all chips in the group' },
          { name: 'spacing', type: 'number', defaultValue: '8', description: 'Gap between chips in px' },
        ],
        events: [
          { name: 'onSelectionChange', type: '(values: string[]) => void', description: 'Called with the full array of currently selected values on each toggle' },
        ],
      },
      {
        name: 'ChipItem',
        props: [
          { name: 'value', type: 'string', defaultValue: '-', description: 'Unique key within the group used to track selection' },
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Chip label content' },
          { name: 'variant', type: 'ChipVariant', defaultValue: '-', description: 'Per-item variant override (inherits from ChipGroup)' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '-', description: 'Per-item color override (inherits from ChipGroup)' },
          { name: 'avatar', type: 'ReactNode', defaultValue: '-', description: 'Avatar at leading edge' },
          { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Custom leading content' },
          { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Custom trailing content' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Per-item disabled override' },
          { name: 'customAppearance', type: 'ChipCustomAppearance', defaultValue: '-', description: 'Fine-grained style overrides' },
        ],
      },
    ],
  },

  datepicker: {
    props: [
      { name: 'value', type: 'Date | null', defaultValue: '-', description: 'Controlled selected date' },
      { name: 'defaultValue', type: 'Date', defaultValue: '-', description: 'Default date (uncontrolled)' },
      { name: 'variant', type: '"outlined" | "flat" | "light" | "faded" | "underlined"', defaultValue: '"outlined"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Component size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label' },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: 'Placeholder text' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Helper text' },
      { name: 'errorMessage', type: 'ReactNode', defaultValue: '-', description: 'Error message when invalid' },
      { name: 'labelPlacement', type: '"inside" | "outside" | "outside-left" | "outside-top"', defaultValue: '"inside"', description: 'Label position' },
      { name: 'locale', type: 'string', defaultValue: '"en-US"', description: 'Locale for date formatting' },
      { name: 'minDate', type: 'Date', defaultValue: '-', description: 'Minimum selectable date' },
      { name: 'maxDate', type: 'Date', defaultValue: '-', description: 'Maximum selectable date' },
      { name: 'firstDayOfWeek', type: '0 | 1', defaultValue: '0', description: 'First day of week (0=Sun, 1=Mon)' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full container width' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Mark as invalid' },
      { name: 'isClearable', type: 'boolean', defaultValue: 'false', description: 'Show clear button' },
      { name: 'calendarIcon', type: 'ReactNode', defaultValue: '-', description: 'Custom calendar icon' },
      { name: 'customAppearance', type: 'DatePickerCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onChange', type: '(date: Date | null) => void', description: 'Called when a date is selected' },
      { name: 'onOpen', type: '() => void', description: 'Called when calendar opens' },
      { name: 'onClose', type: '() => void', description: 'Called when calendar closes' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', description: 'Called when open state changes' },
    ],
  },

  divider: {
    props: [
      { name: 'orientation', type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: 'Divider orientation' },
      { name: 'size', type: 'number', defaultValue: '1', description: 'Thickness of the divider' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '-', description: 'Color theme' },
      { name: 'color', type: 'string', defaultValue: '-', description: 'Custom color override' },
    ],
  },

  drawer: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Drawer content' },
      { name: 'isOpen', type: 'boolean', defaultValue: '-', description: 'Controls whether drawer is open' },
      { name: 'position', type: '"top" | "left" | "bottom" | "right"', defaultValue: '"left"', description: 'Slide-in direction' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Color theme for the drawer background' },
      { name: 'width', type: 'number', defaultValue: '280', description: 'Drawer width for left/right positions' },
      { name: 'height', type: 'number', defaultValue: '280', description: 'Drawer height for top/bottom positions' },
      { name: 'showOverlay', type: 'boolean', defaultValue: 'true', description: 'Show semi-transparent backdrop' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Skip slide-in/out animation' },
      { name: 'customStyle', type: 'ViewStyle', defaultValue: '-', description: 'Custom styles applied to the drawer panel' },
    ],
    events: [
      { name: 'onClose', type: '() => void', description: 'Called when the backdrop is tapped or back is pressed' },
    ],
    examples: [
      {
        title: 'Basic Left Drawer',
        description: 'Toggle a left-side navigation drawer with a button.',
        code: `import { useState } from 'react'
import { View } from 'react-native'
import { Drawer } from '@xaui/native/drawer'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'

export function BasicDrawerExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View>
      <Button onPress={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Typography variant="subtitleLarge">Navigation</Typography>
        <Typography>Home</Typography>
        <Typography>Profile</Typography>
        <Typography>Settings</Typography>
      </Drawer>
    </View>
  )
}`,
      },
      {
        title: 'Positions',
        description: 'Drawer can slide in from any edge using the position prop.',
        code: `import { useState } from 'react'
import { View } from 'react-native'
import { Drawer } from '@xaui/native/drawer'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'

type Position = 'left' | 'right' | 'top' | 'bottom'

export function DrawerPositionsExample() {
  const [position, setPosition] = useState<Position>('left')
  const [isOpen, setIsOpen] = useState(false)

  const open = (pos: Position) => {
    setPosition(pos)
    setIsOpen(true)
  }

  return (
    <View style={{ gap: 12 }}>
      <Button onPress={() => open('left')}>Left</Button>
      <Button onPress={() => open('right')}>Right</Button>
      <Button onPress={() => open('top')}>Top</Button>
      <Button onPress={() => open('bottom')}>Bottom</Button>
      <Drawer isOpen={isOpen} position={position} onClose={() => setIsOpen(false)}>
        <Typography variant="subtitleMedium">{position} drawer</Typography>
      </Drawer>
    </View>
  )
}`,
      },
      {
        title: 'Custom Size & No Overlay',
        description: 'Set a custom width and hide the backdrop.',
        code: `import { useState } from 'react'
import { View } from 'react-native'
import { Drawer } from '@xaui/native/drawer'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'

export function DrawerCustomSizeExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View>
      <Button onPress={() => setIsOpen(true)}>Open Wide Drawer</Button>
      <Drawer
        isOpen={isOpen}
        width={360}
        showOverlay={false}
        onClose={() => setIsOpen(false)}
      >
        <Typography variant="subtitleLarge">Wide Drawer</Typography>
        <Typography>No overlay backdrop is shown.</Typography>
        <Button onPress={() => setIsOpen(false)}>Close</Button>
      </Drawer>
    </View>
  )
}`,
      },
    ],
  },

  fab: {
    props: [
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Icon element for the FAB' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Optional text label beside the icon' },
      { name: 'variant', type: '"solid" | "flat" | "outlined"', defaultValue: '"solid"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'FAB size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Show loading spinner' },
      { name: 'elevation', type: '0 | 1 | 2 | 3 | 4', defaultValue: '2', description: 'Shadow elevation level' },
      { name: 'customAppearance', type: '{ container?: ViewStyle; fab?: ViewStyle }', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when FAB is pressed' },
      { name: 'onLongPress', type: '(event: GestureResponderEvent) => void', description: 'Called on long press' },
    ],
  },

  'fab-menu': {
    props: [
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Toggle icon when collapsed' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Optional extended-FAB label on the toggle' },
      { name: 'expandedIcon', type: 'ReactNode', defaultValue: '-', description: 'Alternate toggle icon when expanded' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'FabMenuItem children rendered in the expanded list' },
      { name: 'variant', type: '"solid" | "flat" | "outlined"', defaultValue: '"solid"', description: 'Visual style variant of the toggle FAB' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Theme color shared by toggle and item defaults' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Toggle FAB size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '-', description: 'Border radius override for the toggle FAB' },
      { name: 'isExpanded', type: 'boolean', defaultValue: '-', description: 'Controlled expanded state (uncontrolled if omitted)' },
      { name: 'showOverlay', type: 'boolean', defaultValue: 'true', description: 'Show dismissible backdrop while expanded' },
      { name: 'elevation', type: '0 | 1 | 2 | 3 | 4', defaultValue: '0', description: 'Android shadow elevation for the toggle FAB' },
      { name: 'customAppearance', type: 'FabMenuCustomAppearance', defaultValue: '-', description: 'Style overrides for container, overlay, toggle, and item rows' },
    ],
    events: [
      { name: 'onToggle', type: '(expanded: boolean) => void', description: 'Called when the menu opens or closes' },
    ],
    examples: [
      {
        title: 'Basic Menu',
        description: 'Uncontrolled menu with three actions.',
        code: `import { FabMenu, FabMenuItem } from '@xaui/native/fab-menu'
import { AddIcon } from '@xaui/icons/add'
import { CloseIcon } from '@xaui/icons/close'
import { CameraIcon } from '@xaui/icons/camera'
import { ImageIcon } from '@xaui/icons/image'
import { ShareIcon } from '@xaui/icons/share'

export function BasicFabMenuExample() {
  return (
    <FabMenu
      icon={<AddIcon size={24} />}
      expandedIcon={<CloseIcon size={24} />}
      themeColor="primary"
      showOverlay
    >
      <FabMenuItem icon={<CameraIcon size={20} />} label="Take photo" />
      <FabMenuItem icon={<ImageIcon size={20} />} label="Gallery" />
      <FabMenuItem icon={<ShareIcon size={20} />} label="Share" />
    </FabMenu>
  )
}`,
      },
      {
        title: 'Controlled State',
        description: 'Control open/close state with isExpanded and onToggle.',
        code: `import { useState } from 'react'
import { FabMenu, FabMenuItem } from '@xaui/native/fab-menu'
import { AddIcon } from '@xaui/icons/add'
import { CloseIcon } from '@xaui/icons/close'
import { PencilIcon } from '@xaui/icons/pencil'
import { StarIcon } from '@xaui/icons/star'

export function ControlledFabMenuExample() {
  const [expanded, setExpanded] = useState(false)

  return (
    <FabMenu
      icon={<AddIcon size={24} />}
      expandedIcon={<CloseIcon size={24} />}
      isExpanded={expanded}
      onToggle={setExpanded}
      label="Actions"
      themeColor="secondary"
      radius="full"
    >
      <FabMenuItem icon={<PencilIcon size={20} />} label="Edit" />
      <FabMenuItem icon={<StarIcon size={20} />} label="Favorite" />
    </FabMenu>
  )
}`,
      },
      {
        title: 'Custom Appearance',
        description: 'Tune overlay, list spacing, and toggle container styles.',
        code: `import { FabMenu, FabMenuItem } from '@xaui/native/fab-menu'
import { AddIcon } from '@xaui/icons/add'
import { CameraIcon } from '@xaui/icons/camera'
import { ImageIcon } from '@xaui/icons/image'

export function CustomAppearanceFabMenuExample() {
  return (
    <FabMenu
      icon={<AddIcon size={24} />}
      themeColor="tertiary"
      customAppearance={{
        overlay: { backgroundColor: 'rgba(15, 23, 42, 0.45)' },
        menuContainer: { gap: 10 },
        menuItem: { marginBottom: 2 },
        fab: { borderWidth: 1, borderColor: '#00000022' },
      }}
    >
      <FabMenuItem icon={<CameraIcon size={20} />} label="Camera" />
      <FabMenuItem icon={<ImageIcon size={20} />} label="Library" isDisabled />
    </FabMenu>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'FabMenuItem',
        props: [
          { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Item icon content' },
          { name: 'label', type: 'string', defaultValue: '-', description: 'Text label shown in the item row' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Item theme override (inherits parent when omitted)' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this item' },
        ],
        events: [
          { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when item is pressed' },
        ],
      },
    ],
  },

  'feature-discovery': {
    props: [
      { name: 'isVisible', type: 'boolean', defaultValue: '-', description: 'Controls whether the discovery overlay is visible' },
      { name: 'targetRef', type: 'RefObject<MeasurableNode | null>', defaultValue: '-', description: 'Ref to the target element to measure and highlight' },
      { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Primary message shown near the spotlight' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Optional supporting text under the title' },
      { name: 'actionText', type: 'ReactNode', defaultValue: '-', description: 'Optional action label (for example “Got it”)' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Accent color used by spotlight visuals' },
      { name: 'overlayColor', type: 'string', defaultValue: '-', description: 'Custom backdrop color behind the spotlight' },
      { name: 'spotlightPadding', type: 'number', defaultValue: '14', description: 'Extra space around the highlighted target bounds' },
      { name: 'circleScale', type: 'number', defaultValue: '1.65', description: 'Multiplier applied to spotlight circle diameter' },
      { name: 'dismissOnBackdropPress', type: 'boolean', defaultValue: 'true', description: 'Whether tapping outside the message closes the overlay' },
      { name: 'highlightContent', type: 'ReactNode', defaultValue: '-', description: 'Custom content rendered over the highlighted target area' },
      { name: 'customAppearance', type: 'FeatureDiscoveryCustomAppearance', defaultValue: '-', description: 'Style overrides for root, container, title, description, actionText and highlight wrappers' },
    ],
    events: [
      { name: 'onActionPress', type: '() => void', description: 'Called when the action label is pressed' },
      { name: 'onDismiss', type: '() => void', description: 'Called when the overlay requests to close (backdrop/action)' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'Show a spotlight around a referenced element.',
        code: `import { useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FeatureDiscovery } from '@xaui/native/feature-discovery'

export function BasicFeatureDiscoveryExample() {
  const [visible, setVisible] = useState(true)
  const targetRef = useRef<View>(null)

  return (
    <View>
      <View ref={targetRef} collapsable={false}>
        <Pressable>
          <Text>Target Element</Text>
        </Pressable>
      </View>

      <FeatureDiscovery
        isVisible={visible}
        targetRef={targetRef}
        title="Tap here first"
        description="This button starts your workflow."
        actionText="Got it"
        onActionPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}
      />
    </View>
  )
}`,
      },
      {
        title: 'Controlled Trigger',
        description: 'Open the overlay from a dedicated trigger button.',
        code: `import { useRef, useState } from 'react'
import { View } from 'react-native'
import { Button } from '@xaui/native/button'
import { FeatureDiscovery } from '@xaui/native/feature-discovery'

export function TriggeredFeatureDiscoveryExample() {
  const [visible, setVisible] = useState(false)
  const targetRef = useRef<View>(null)

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Show Walkthrough</Button>

      <View ref={targetRef} collapsable={false}>
        <Button themeColor="secondary">Sync Data</Button>
      </View>

      <FeatureDiscovery
        isVisible={visible}
        targetRef={targetRef}
        title="Sync your data"
        description="Use this action to refresh local state from the server."
        actionText="Next"
        onActionPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}
      />
    </View>
  )
}`,
      },
      {
        title: 'Custom Highlight Content',
        description: 'Render custom highlight UI and styling over the target.',
        code: `import { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { FeatureDiscovery } from '@xaui/native/feature-discovery'

export function CustomHighlightFeatureDiscoveryExample() {
  const [visible, setVisible] = useState(true)
  const targetRef = useRef<View>(null)

  return (
    <View>
      <View ref={targetRef} collapsable={false}>
        <Text>Notifications</Text>
      </View>

      <FeatureDiscovery
        isVisible={visible}
        targetRef={targetRef}
        title="Stay informed"
        description="Enable notifications so you never miss updates."
        themeColor="warning"
        spotlightPadding={18}
        circleScale={1.85}
        highlightContent={
          <View style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: '#fff' }}>
            <Text>NEW</Text>
          </View>
        }
        customAppearance={{
          actionText: { textTransform: 'uppercase' },
          messageContainer: { maxWidth: 280 },
        }}
        actionText="Understood"
        onActionPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}
      />
    </View>
  )
}`,
      },
    ],
  },

  indicator: {
    props: [
      { name: 'variant', type: '"linear" | "circular"', defaultValue: '"circular"', description: 'Indicator style' },
      { name: 'size', type: 'number', defaultValue: '4 (linear), 40 (circular)', description: 'Indicator size (height for linear, diameter for circular)' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'color', type: 'string', defaultValue: '-', description: 'Custom color override' },
      { name: 'backgroundColor', type: 'string', defaultValue: '-', description: 'Track background color' },
      { name: 'borderRadius', type: 'number', defaultValue: '-', description: 'Custom border radius for indicator/track' },
      { name: 'showTrack', type: 'boolean', defaultValue: 'false', description: 'Show background track' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable spin animation' },
    ],
    examples: [
      {
        title: 'Variants',
        description: 'Use circular or linear indicators.',
        code: `import { ActivityIndicator } from '@xaui/native/indicator'
import { Column } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Column gap={12}>
      <ActivityIndicator variant="circular" />
      <ActivityIndicator variant="linear" />
    </Column>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Apply semantic theme colors.',
        code: `import { ActivityIndicator } from '@xaui/native/indicator'
import { Row } from '@xaui/native/view'

export function ThemeColorsExample() {
  return (
    <Row spacing={12} crossAxisAlignment="center">
      <ActivityIndicator themeColor="primary" />
      <ActivityIndicator themeColor="secondary" />
      <ActivityIndicator themeColor="success" />
      <ActivityIndicator themeColor="danger" />
    </Row>
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Adjust indicator size per context.',
        code: `import { ActivityIndicator } from '@xaui/native/indicator'
import { Row } from '@xaui/native/view'

export function SizesExample() {
  return (
    <Row spacing={12} crossAxisAlignment="center">
      <ActivityIndicator variant="circular" size={20} />
      <ActivityIndicator variant="circular" size={32} />
      <ActivityIndicator variant="circular" size={48} />
    </Row>
  )
}`,
      },
      {
        title: 'Track and Custom Colors',
        description: 'Show track and override both foreground/background colors.',
        code: `import { ActivityIndicator } from '@xaui/native/indicator'
import { Column } from '@xaui/native/view'

export function TrackAndColorExample() {
  return (
    <Column gap={12}>
      <ActivityIndicator
        variant="linear"
        size={6}
        showTrack
        color="#7c3aed"
        backgroundColor="#ede9fe"
        borderRadius={999}
      />
      <ActivityIndicator
        variant="circular"
        size={42}
        showTrack
        color="#0ea5e9"
        backgroundColor="#e0f2fe"
      />
    </Column>
  )
}`,
      },
      {
        title: 'Disable Animation',
        description: 'Render a static indicator state (useful for previews/tests).',
        code: `import { ActivityIndicator } from '@xaui/native/indicator'
import { Row } from '@xaui/native/view'

export function DisableAnimationExample() {
  return (
    <Row spacing={12}>
      <ActivityIndicator disableAnimation />
      <ActivityIndicator variant="linear" disableAnimation showTrack />
    </Row>
  )
}`,
      },
    ],
  },

  input: {
    props: [
      { name: 'value', type: 'string', defaultValue: '-', description: 'Controlled input value' },
      { name: 'defaultValue', type: 'string', defaultValue: '-', description: 'Default value (uncontrolled)' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label' },
      { name: 'labelPlacement', type: '"outside" | "inside"', defaultValue: '"inside"', description: 'Label position' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Helper text below field' },
      { name: 'errorMessage', type: 'ReactNode', defaultValue: '-', description: 'Error message when invalid' },
      { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start of input' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end of input' },
      { name: 'variant', type: '"flat" | "faded" | "bordered" | "underlined"', defaultValue: '"flat"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Input size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'isSecured', type: 'boolean', defaultValue: 'false', description: 'Mask input (password mode)' },
      { name: 'isClearable', type: 'boolean', defaultValue: 'false', description: 'Show clear button' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'isReadOnly', type: 'boolean', defaultValue: 'false', description: 'Read-only mode' },
      { name: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Mark as invalid' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full container width' },
      { name: 'customAppearance', type: 'TextInputCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the input value changes' },
    ],
    examples: [
      {
        title: 'Basic Input',
        description: 'A simple text input with a label.',
        code: `import { Input } from '@xaui/native/input'

export function BasicExample() {
  return <Input label="Name" placeholder="Enter your name" />
}`,
      },
      {
        title: 'Variants',
        description: 'All available visual styles.',
        code: `import { Input } from '@xaui/native/input'
import { Column } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Column gap={8}>
      <Input variant="flat" label="Flat" />
      <Input variant="faded" label="Faded" />
      <Input variant="bordered" label="Bordered" />
      <Input variant="underlined" label="Underlined" />
    </Column>
  )
}`,
      },
      {
        title: 'Controlled Input',
        description: 'Manage the value with React state.',
        code: `import { useState } from 'react'
import { Input } from '@xaui/native/input'

export function ControlledExample() {
  const [value, setValue] = useState('')

  return (
    <Input
      label="Username"
      value={value}
      onValueChange={setValue}
    />
  )
}`,
      },
      {
        title: 'Password Input',
        description: 'Hide input text with isSecured.',
        code: `import { Input } from '@xaui/native/input'

export function PasswordExample() {
  return <Input label="Password" isSecured placeholder="••••••••" />
}`,
      },
      {
        title: 'With Validation',
        description: 'Show an error message when the field is invalid.',
        code: `import { Input } from '@xaui/native/input'

export function ValidationExample() {
  return (
    <Input
      label="Email"
      isInvalid
      errorMessage="Please enter a valid email address"
      description="We will never share your email"
    />
  )
}`,
      },
      {
        title: 'With Start & End Content',
        description: 'Add icons or labels inside the input.',
        code: `import { Input } from '@xaui/native/input'
import { Typography } from '@xaui/native/typography'

export function WithContentExample() {
  return (
    <Input
      label="Amount"
      startContent={<Typography>$</Typography>}
      endContent={<Typography>USD</Typography>}
      placeholder="0.00"
    />
  )
}`,
      },
      {
        title: 'Clearable Input',
        description: 'Show a clear button to reset the value.',
        code: `import { useState } from 'react'
import { Input } from '@xaui/native/input'

export function ClearableExample() {
  const [value, setValue] = useState('Hello world')

  return (
    <Input
      label="Search"
      value={value}
      onValueChange={setValue}
      isClearable
    />
  )
}`,
      },
      {
        title: 'Label Placement',
        description: 'Switch label rendering between inside and outside.',
        code: `import { Input } from '@xaui/native/input'
import { Column } from '@xaui/native/view'

export function LabelPlacementExample() {
  return (
    <Column gap={10}>
      <Input
        label="Inside Label"
        labelPlacement="inside"
        placeholder="Type here"
      />
      <Input
        label="Outside Label"
        labelPlacement="outside"
        placeholder="Type here"
      />
    </Column>
  )
}`,
      },
      {
        title: 'Sizes and Radius',
        description: 'Tune field density and shape.',
        code: `import { Input } from '@xaui/native/input'
import { Column } from '@xaui/native/view'

export function SizesAndRadiusExample() {
  return (
    <Column gap={10}>
      <Input size="sm" radius="sm" label="Small" placeholder="sm + sm" />
      <Input size="md" radius="md" label="Medium" placeholder="md + md" />
      <Input size="lg" radius="full" label="Large pill" placeholder="lg + full" />
    </Column>
  )
}`,
      },
      {
        title: 'Disabled and Read-Only',
        description: 'Compare non-editable input states.',
        code: `import { Input } from '@xaui/native/input'
import { Column } from '@xaui/native/view'

export function StatesExample() {
  return (
    <Column gap={10}>
      <Input label="Disabled" defaultValue="Cannot edit" isDisabled />
      <Input label="Read-only" value="Visible but locked" isReadOnly />
      <Input label="Full width" placeholder="Stretches to container width" fullWidth />
    </Column>
  )
}`,
      },
      {
        title: 'Custom Appearance',
        description: 'Override field and text style tokens with customAppearance.',
        code: `import { Input } from '@xaui/native/input'

export function CustomAppearanceExample() {
  return (
    <Input
      label="Promo Code"
      placeholder="SUMMER24"
      customAppearance={{
        container: {
          borderWidth: 1,
          borderColor: '#c7d2fe',
          backgroundColor: '#eef2ff',
        },
        input: {
          fontWeight: '600',
          letterSpacing: 0.4,
        },
      }}
    />
  )
}`,
      },
      {
        title: 'Date Input',
        description: 'Date-only input with locale/dateOrder formatting support.',
        code: `import { DateInput } from '@xaui/native/input'

export function DateInputExample() {
  return (
    <DateInput
      label="Birth date"
      placeholder="YYYY-MM-DD"
      dateOrder="YMD"
      separator="-"
      locale="en-US"
    />
  )
}`,
      },
      {
        title: 'Time Input',
        description: 'Time-only input with 12h/24h and granularity control.',
        code: `import { TimeInput } from '@xaui/native/input'
import { Column } from '@xaui/native/view'

export function TimeInputExample() {
  return (
    <Column gap={10}>
      <TimeInput label="Start time" hourCycle={24} granularity="minute" />
      <TimeInput label="Precise time" hourCycle={12} granularity="second" />
    </Column>
  )
}`,
      },
      {
        title: 'Date Time Input',
        description: 'Combined date + time field in one input.',
        code: `import { DateTimeInput } from '@xaui/native/input'

export function DateTimeInputExample() {
  return (
    <DateTimeInput
      label="Reminder"
      dateOrder="DMY"
      separator="/"
      hourCycle={24}
      granularity="minute"
    />
  )
}`,
      },
      {
        title: 'OTP Input',
        description: 'One-time password input for verification codes.',
        code: `import { OTPInput } from '@xaui/native/input'

export function OTPExample() {
  return (
    <OTPInput
      length={6}
      onComplete={code => console.log('Code:', code)}
    />
  )
}`,
      },
      {
        title: 'Number Input',
        description: 'Increment/decrement numeric values with controls.',
        code: `import { useState } from 'react'
import { NumberInput } from '@xaui/native/input'

export function NumberInputExample() {
  const [value, setValue] = useState(0)

  return (
    <NumberInput
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      step={5}
    />
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'TextArea',
        props: [
          { name: 'value', type: 'string', defaultValue: '-', description: 'Controlled value' },
          { name: 'numberOfLines', type: 'number', defaultValue: '4', description: 'Visible line count' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
        ],
        events: [
          { name: 'onValueChange', type: '(value: string) => void', description: 'Called when value changes' },
        ],
      },
      {
        name: 'OTPInput',
        props: [
          { name: 'length', type: 'number', defaultValue: '6', description: 'Number of OTP digits' },
          { name: 'value', type: 'string', defaultValue: '-', description: 'Controlled OTP value' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
        ],
        events: [
          { name: 'onValueChange', type: '(value: string) => void', description: 'Called when OTP changes' },
          { name: 'onComplete', type: '(value: string) => void', description: 'Called when all digits are filled' },
        ],
      },
      {
        name: 'DateInput',
        props: [
          { name: 'separator', type: '"-" | "/" | "."', defaultValue: '"-"', description: 'Separator between date segments' },
          { name: 'dateOrder', type: '"YMD" | "DMY" | "MDY"', defaultValue: '-', description: 'Date segment order (auto-detected if omitted)' },
          { name: 'locale', type: 'string', defaultValue: '"en-US"', description: 'Locale used for auto date-order detection' },
        ],
        events: [
          { name: 'onValueChange', type: '(value: string) => void', description: 'Called when value changes' },
        ],
      },
      {
        name: 'TimeInput',
        props: [
          { name: 'granularity', type: '"minute" | "second"', defaultValue: '"minute"', description: 'Smallest displayed unit' },
          { name: 'hourCycle', type: '12 | 24', defaultValue: '24', description: '12-hour or 24-hour format hint' },
        ],
        events: [
          { name: 'onValueChange', type: '(value: string) => void', description: 'Called when value changes' },
        ],
      },
      {
        name: 'DateTimeInput',
        props: [
          { name: 'separator', type: '"-" | "/" | "."', defaultValue: '"-"', description: 'Separator between date segments' },
          { name: 'dateOrder', type: '"YMD" | "DMY" | "MDY"', defaultValue: '-', description: 'Date segment order (auto-detected if omitted)' },
          { name: 'locale', type: 'string', defaultValue: '"en-US"', description: 'Locale used for auto date-order detection' },
          { name: 'granularity', type: '"minute" | "second"', defaultValue: '"minute"', description: 'Smallest displayed time unit' },
          { name: 'hourCycle', type: '12 | 24', defaultValue: '24', description: '12-hour or 24-hour format hint' },
        ],
        events: [
          { name: 'onValueChange', type: '(value: string) => void', description: 'Called when value changes' },
        ],
      },
      {
        name: 'NumberInput',
        props: [
          { name: 'value', type: 'number', defaultValue: '-', description: 'Controlled numeric value' },
          { name: 'min', type: 'number', defaultValue: '-', description: 'Minimum value' },
          { name: 'max', type: 'number', defaultValue: '-', description: 'Maximum value' },
          { name: 'step', type: 'number', defaultValue: '1', description: 'Increment/decrement step' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
        ],
        events: [
          { name: 'onValueChange', type: '(value: number) => void', description: 'Called when value changes' },
        ],
      },
    ],
  },

  list: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'ListItem children' },
      { name: 'selectionMode', type: '"single" | "multiple" | "none"', defaultValue: '"none"', description: 'Selection behavior' },
      { name: 'selectedKeys', type: 'string[]', defaultValue: '-', description: 'Controlled selected keys' },
      { name: 'defaultSelectedKeys', type: 'string[]', defaultValue: '-', description: 'Default selected keys (uncontrolled)' },
      { name: 'showDivider', type: 'boolean', defaultValue: 'false', description: 'Show dividers between items' },
      { name: 'isPressable', type: 'boolean', defaultValue: 'true', description: 'Make items pressable' },
      { name: 'isSelectable', type: 'boolean', defaultValue: 'false', description: 'Allow items to be selected' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Item size' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(keys: string[]) => void', description: 'Called when selection changes' },
    ],
    examples: [
      {
        title: 'Basic List',
        description: 'Simple composable list using List and ListItem.',
        code: `import { List, ListItem } from '@xaui/native/list'

export function BasicListExample() {
  return (
    <List>
      <ListItem itemKey="profile" title="Profile" description="Manage account settings" />
      <ListItem itemKey="notifications" title="Notifications" description="Push and email preferences" />
      <ListItem itemKey="security" title="Security" description="Password and 2FA" />
    </List>
  )
}`,
      },
      {
        title: 'Single Selection (Controlled)',
        description: 'Drive selected state externally with selectedKeys.',
        code: `import { useState } from 'react'
import { List, ListItem } from '@xaui/native/list'
import { Typography } from '@xaui/native/typography'

export function ControlledSingleSelectionListExample() {
  const [selected, setSelected] = useState<string[]>(['weekly'])

  return (
    <>
      <List
        selectionMode="single"
        isSelectable
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <ListItem itemKey="daily" title="Daily digest" />
        <ListItem itemKey="weekly" title="Weekly summary" />
        <ListItem itemKey="never" title="Never" />
      </List>
      <Typography variant="caption">Selected: {selected[0] ?? 'none'}</Typography>
    </>
  )
}`,
      },
      {
        title: 'Multiple Selection with Dividers',
        description: 'Enable multi-select and separators between rows.',
        code: `import { useState } from 'react'
import { List, ListItem } from '@xaui/native/list'

export function MultiSelectionListExample() {
  const [selected, setSelected] = useState<string[]>(['docs'])

  return (
    <List
      selectionMode="multiple"
      isSelectable
      showDivider
      selectedKeys={selected}
      onSelectionChange={setSelected}
    >
      <ListItem itemKey="docs" title="Docs" />
      <ListItem itemKey="api" title="API" />
      <ListItem itemKey="sdk" title="SDK" />
      <ListItem itemKey="examples" title="Examples" />
    </List>
  )
}`,
      },
      {
        title: 'Disabled Item',
        description: 'Prevent selection and press interaction for specific rows.',
        code: `import { List, ListItem } from '@xaui/native/list'

export function DisabledItemListExample() {
  return (
    <List selectionMode="single" isSelectable>
      <ListItem itemKey="free" title="Free plan" />
      <ListItem itemKey="pro" title="Pro plan" />
      <ListItem itemKey="enterprise" title="Enterprise" isDisabled description="Contact sales" />
    </List>
  )
}`,
      },
      {
        title: 'Custom Item Content',
        description: 'Use startContent, endContent, and customAppearance on rows.',
        code: `import { List, ListItem } from '@xaui/native/list'
import { Typography } from '@xaui/native/typography'
import { Badge } from '@xaui/native/badge'

export function CustomContentListExample() {
  return (
    <List showDivider>
      <ListItem
        itemKey="inbox"
        title="Inbox"
        startContent={<Typography>📥</Typography>}
        endContent={<Badge content={12} size="sm" />}
      />
      <ListItem
        itemKey="sent"
        title="Sent"
        startContent={<Typography>📤</Typography>}
        customAppearance={{ title: { fontWeight: '700' } }}
      />
    </List>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'ListItem',
        props: [
          { name: 'itemKey', type: 'string', defaultValue: '-', description: 'Unique key for this item' },
          { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Item title' },
          { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Item description text' },
          { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start of item' },
          { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end of item' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this item' },
          { name: 'isSelected', type: 'boolean', defaultValue: 'false', description: 'Whether this item is selected' },
          { name: 'customAppearance', type: 'ListItemCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
        ],
        events: [
          { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when item is pressed' },
        ],
      },
    ],
  },

  'list-builder': {
    props: [
      { name: 'data', type: 'T[]', defaultValue: '-', description: 'Array of data items to render' },
      { name: 'keyExtractor', type: '(item: T, index: number) => string', defaultValue: '-', description: 'Function to extract unique key from each item' },
      { name: 'renderItem', type: '(item: T, index: number) => ReactNode', defaultValue: '-', description: 'Function to render each item — receives the typed item and its index' },
      { name: 'selectionMode', type: '"single" | "multiple" | "none"', defaultValue: '"none"', description: 'Selection behavior' },
      { name: 'selectedKeys', type: 'string[]', defaultValue: '-', description: 'Controlled selected keys' },
      { name: 'defaultSelectedKeys', type: 'string[]', defaultValue: '[]', description: 'Default selected keys (uncontrolled)' },
      { name: 'showDivider', type: 'boolean', defaultValue: 'false', description: 'Show dividers between items' },
      { name: 'isPressable', type: 'boolean', defaultValue: 'true', description: 'Make items pressable' },
      { name: 'isSelectable', type: 'boolean', defaultValue: 'false', description: 'Allow items to be selected' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme for selected items' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Item size' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
      { name: 'flatListProps', type: 'Omit<FlatListProps<T>, "data" | "renderItem" | "keyExtractor">', defaultValue: '-', description: 'Extra FlatList props passed through (e.g. refreshing, onEndReached)' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(keys: string[]) => void', description: 'Called when selection changes' },
    ],
    examples: [
      {
        title: 'Basic List',
        description: 'Render a typed array with renderItem and keyExtractor.',
        code: `import { ListBuilder } from '@xaui/native/list'
import { ListItem } from '@xaui/native/list'

type Fruit = { id: string; name: string; emoji: string }

const fruits: Fruit[] = [
  { id: '1', name: 'Apple', emoji: '🍎' },
  { id: '2', name: 'Banana', emoji: '🍌' },
  { id: '3', name: 'Cherry', emoji: '🍒' },
]

export function BasicListBuilderExample() {
  return (
    <ListBuilder
      data={fruits}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <ListItem
          itemKey={item.id}
          title={item.name}
          startContent={item.emoji}
        />
      )}
    />
  )
}`,
      },
      {
        title: 'Single Selection',
        description: 'Enable item selection with selectionMode and isSelectable.',
        code: `import { useState } from 'react'
import { ListBuilder, ListItem } from '@xaui/native/list'
import { Typography } from '@xaui/native/typography'

type Language = { id: string; label: string }

const languages: Language[] = [
  { id: 'ts', label: 'TypeScript' },
  { id: 'py', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'rs', label: 'Rust' },
]

export function SingleSelectionExample() {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <>
      <ListBuilder
        data={languages}
        keyExtractor={(item) => item.id}
        selectionMode="single"
        isSelectable
        themeColor="primary"
        onSelectionChange={setSelected}
        renderItem={(item) => (
          <ListItem itemKey={item.id} title={item.label} />
        )}
      />
      <Typography variant="caption">
        Selected: {selected[0] ?? 'none'}
      </Typography>
    </>
  )
}`,
      },
      {
        title: 'Multiple Selection with Dividers',
        description: 'Allow multi-select and show dividers between items.',
        code: `import { useState } from 'react'
import { ListBuilder, ListItem } from '@xaui/native/list'

type Tag = { id: string; label: string; color: string }

const tags: Tag[] = [
  { id: 'bug', label: 'Bug', color: 'danger' },
  { id: 'feat', label: 'Feature', color: 'success' },
  { id: 'docs', label: 'Docs', color: 'primary' },
  { id: 'refactor', label: 'Refactor', color: 'warning' },
]

export function MultiSelectionExample() {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <ListBuilder
      data={tags}
      keyExtractor={(item) => item.id}
      selectionMode="multiple"
      isSelectable
      showDivider
      defaultSelectedKeys={['bug']}
      onSelectionChange={setSelected}
      renderItem={(item) => (
        <ListItem itemKey={item.id} title={item.label} />
      )}
    />
  )
}`,
      },
      {
        title: 'Controlled Selection',
        description: 'Drive selection state externally with selectedKeys.',
        code: `import { useState } from 'react'
import { View } from 'react-native'
import { ListBuilder, ListItem } from '@xaui/native/list'
import { Button } from '@xaui/native/button'

type Item = { id: string; label: string }

const items: Item[] = [
  { id: 'a', label: 'Item A' },
  { id: 'b', label: 'Item B' },
  { id: 'c', label: 'Item C' },
]

export function ControlledListBuilderExample() {
  const [selected, setSelected] = useState<string[]>(['a'])

  return (
    <View style={{ gap: 12 }}>
      <ListBuilder
        data={items}
        keyExtractor={(item) => item.id}
        selectionMode="multiple"
        isSelectable
        selectedKeys={selected}
        onSelectionChange={setSelected}
        renderItem={(item) => (
          <ListItem itemKey={item.id} title={item.label} />
        )}
      />
      <Button onPress={() => setSelected([])}>Clear Selection</Button>
      <Button onPress={() => setSelected(items.map((i) => i.id))}>
        Select All
      </Button>
    </View>
  )
}`,
      },
    ],
  },

  menu: {
    props: [
      { name: 'visible', type: 'boolean', defaultValue: '-', description: 'Controls menu visibility' },
      { name: 'trigger', type: 'ReactNode', defaultValue: '-', description: 'Element that anchors the menu' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'MenuItem children' },
      { name: 'position', type: '"top" | "bottom"', defaultValue: '"bottom"', description: 'Menu placement relative to trigger' },
      { name: 'maxHeight', type: 'number', defaultValue: '280', description: 'Maximum menu height before scrolling' },
      { name: 'customAppearance', type: 'MenuCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onDismiss', type: '() => void', description: 'Called when menu is dismissed' },
      { name: 'onItemPress', type: '(itemKey: string) => void', description: 'Called when a MenuItem with itemKey is pressed' },
    ],
    examples: [
      {
        title: 'Basic Menu',
        description: 'Controlled open/close state with simple items.',
        code: `import { useState } from 'react'
import { Button } from '@xaui/native/button'
import { Menu, MenuItem } from '@xaui/native/menu'

export function BasicMenuExample() {
  const [visible, setVisible] = useState(false)

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      onItemPress={itemKey => {
        console.log('Pressed menu item:', itemKey)
        setVisible(false)
      }}
      trigger={
        <Button variant="outlined" onPress={() => setVisible(true)}>
          Open menu
        </Button>
      }
    >
      <MenuItem itemKey="profile" title="Profile" />
      <MenuItem itemKey="settings" title="Settings" />
      <MenuItem itemKey="logout" title="Logout" />
    </Menu>
  )
}`,
      },
      {
        title: 'Position and Max Height',
        description: 'Open above trigger and constrain long menus.',
        code: `import { useState } from 'react'
import { Button } from '@xaui/native/button'
import { Menu, MenuItem } from '@xaui/native/menu'

const actions = Array.from({ length: 12 }, (_, i) => \`Action \${i + 1}\`)

export function PositionedMenuExample() {
  const [visible, setVisible] = useState(false)

  return (
    <Menu
      visible={visible}
      position="top"
      maxHeight={220}
      onDismiss={() => setVisible(false)}
      trigger={<Button onPress={() => setVisible(true)}>Open top menu</Button>}
    >
      {actions.map(action => (
        <MenuItem key={action} title={action} onPress={() => setVisible(false)} />
      ))}
    </Menu>
  )
}`,
      },
      {
        title: 'Start/End Content and Disabled Item',
        description: 'Attach icons/shortcuts and disable unavailable actions.',
        code: `import { useState } from 'react'
import { Button } from '@xaui/native/button'
import { Menu, MenuItem } from '@xaui/native/menu'
import { Typography } from '@xaui/native/typography'

export function RichMenuExample() {
  const [visible, setVisible] = useState(false)

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      trigger={<Button onPress={() => setVisible(true)}>More</Button>}
    >
      <MenuItem
        title="New file"
        startContent={<Typography>📄</Typography>}
        endContent={<Typography>⌘N</Typography>}
        onPress={() => setVisible(false)}
      />
      <MenuItem
        title="Rename"
        startContent={<Typography>✏️</Typography>}
        onPress={() => setVisible(false)}
      />
      <MenuItem
        title="Delete"
        startContent={<Typography>🗑️</Typography>}
        isDisabled
      />
    </Menu>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'MenuItem',
        props: [
          { name: 'itemKey', type: 'string', defaultValue: '-', description: 'Optional key emitted via Menu onItemPress' },
          { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Item title' },
          { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start' },
          { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this item' },
        ],
        events: [
          { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when item is pressed' },
        ],
      },
    ],
  },

  menubox: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'MenuBoxItem children' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Item size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"lg"', description: 'Border radius' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Color theme' },
      { name: 'spacing', type: 'number', defaultValue: '0', description: 'Gap between items' },
      { name: 'backgroundColor', type: 'string', defaultValue: '-', description: 'Custom background color' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
    ],
    examples: [
      {
        title: 'Basic Settings MenuBox',
        description: 'Group navigation-like actions in a compact settings card.',
        code: `import { MenuBox, MenuBoxItem } from '@xaui/native/menubox'
import { Typography } from '@xaui/native/typography'

export function BasicMenuBoxExample() {
  return (
    <MenuBox>
      <MenuBoxItem itemKey="account" title="Account" endContent={<Typography>›</Typography>} />
      <MenuBoxItem itemKey="notifications" title="Notifications" endContent={<Typography>›</Typography>} />
      <MenuBoxItem itemKey="privacy" title="Privacy" endContent={<Typography>›</Typography>} />
    </MenuBox>
  )
}`,
      },
      {
        title: 'Descriptions and Disabled Item',
        description: 'Show secondary text and disable unavailable rows.',
        code: `import { MenuBox, MenuBoxItem } from '@xaui/native/menubox'
import { Typography } from '@xaui/native/typography'

export function DescriptiveMenuBoxExample() {
  return (
    <MenuBox spacing={6}>
      <MenuBoxItem
        itemKey="wifi"
        title="Wi-Fi"
        description="Connected to Office-5G"
        endContent={<Typography>On</Typography>}
      />
      <MenuBoxItem
        itemKey="bluetooth"
        title="Bluetooth"
        description="No device connected"
      />
      <MenuBoxItem
        itemKey="cellular"
        title="Cellular"
        description="Unavailable on this device"
        isDisabled
      />
    </MenuBox>
  )
}`,
      },
      {
        title: 'Custom Appearance',
        description: 'Control spacing, radius, and per-item text styling.',
        code: `import { MenuBox, MenuBoxItem } from '@xaui/native/menubox'
import { Typography } from '@xaui/native/typography'

export function CustomAppearanceMenuBoxExample() {
  return (
    <MenuBox
      radius="md"
      spacing={8}
      themeColor="secondary"
      backgroundColor="#f8fafc"
      style={{ padding: 6 }}
    >
      <MenuBoxItem
        itemKey="theme"
        title="Theme"
        description="System default"
        endContent={<Typography>Auto</Typography>}
        customAppearance={{ title: { fontWeight: '700' } }}
      />
      <MenuBoxItem
        itemKey="language"
        title="Language"
        description="English"
        endContent={<Typography>›</Typography>}
      />
    </MenuBox>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'MenuBoxItem',
        props: [
          { name: 'itemKey', type: 'string', defaultValue: '-', description: 'Unique key for this item' },
          { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Item title' },
          { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Item description' },
          { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start' },
          { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this item' },
          { name: 'customAppearance', type: 'MenuBoxItemCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
        ],
        events: [
          { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when item is pressed' },
        ],
      },
    ],
  },

  pager: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'PagerItem children' },
      { name: 'page', type: 'number', defaultValue: '-', description: 'Controlled current page index' },
      { name: 'defaultPage', type: 'number', defaultValue: '0', description: 'Default page index (uncontrolled)' },
      { name: 'swipeEnabled', type: 'boolean', defaultValue: 'true', description: 'Enable swipe to navigate' },
      { name: 'showIndicator', type: 'boolean', defaultValue: 'true', description: 'Show page indicator' },
      { name: 'renderIndicator', type: '(state: PagerIndicatorRenderState) => ReactNode', defaultValue: '-', description: 'Custom indicator renderer' },
      { name: 'isFullscreen', type: 'boolean', defaultValue: 'false', description: 'Expand to fill screen' },
      { name: 'isfullscreen', type: 'boolean', defaultValue: 'false', description: 'Alias of isFullscreen' },
      { name: 'customAppearance', type: 'PagerCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onPageChange', type: '(page: number) => void', description: 'Called when the active page changes' },
    ],
    examples: [
      {
        title: 'Basic Pager',
        description: 'Swipe between simple pages with default indicators.',
        code: `import { Pager, PagerItem } from '@xaui/native/pager'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function BasicPagerExample() {
  return (
    <Pager>
      <PagerItem>
        <View style={{ height: 160, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f2fe', borderRadius: 12 }}>
          <Typography variant="titleMedium">Page 1</Typography>
        </View>
      </PagerItem>
      <PagerItem>
        <View style={{ height: 160, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dcfce7', borderRadius: 12 }}>
          <Typography variant="titleMedium">Page 2</Typography>
        </View>
      </PagerItem>
      <PagerItem>
        <View style={{ height: 160, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fef3c7', borderRadius: 12 }}>
          <Typography variant="titleMedium">Page 3</Typography>
        </View>
      </PagerItem>
    </Pager>
  )
}`,
      },
      {
        title: 'Controlled Page',
        description: 'Drive active page externally and react to page changes.',
        code: `import { useState } from 'react'
import { Button } from '@xaui/native/button'
import { Pager, PagerItem } from '@xaui/native/pager'
import { Column, Row } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function ControlledPagerExample() {
  const [page, setPage] = useState(0)

  return (
    <Column gap={10}>
      <Row spacing={8}>
        <Button size="sm" variant="outlined" onPress={() => setPage(0)}>1</Button>
        <Button size="sm" variant="outlined" onPress={() => setPage(1)}>2</Button>
        <Button size="sm" variant="outlined" onPress={() => setPage(2)}>3</Button>
      </Row>

      <Pager page={page} onPageChange={setPage}>
        <PagerItem><Typography>Overview content</Typography></PagerItem>
        <PagerItem><Typography>Details content</Typography></PagerItem>
        <PagerItem><Typography>Reviews content</Typography></PagerItem>
      </Pager>
    </Column>
  )
}`,
      },
      {
        title: 'Custom Indicator',
        description: 'Replace default dots with a custom renderer.',
        code: `import { Pager, PagerItem } from '@xaui/native/pager'
import type { PagerIndicatorRenderState } from '@xaui/native/pager'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function CustomIndicatorPagerExample() {
  return (
    <Pager
      defaultPage={1}
      renderIndicator={({ index, isActive }: PagerIndicatorRenderState) => (
        <View
          key={\`pill-\${index}\`}
          style={{
            width: isActive ? 24 : 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: isActive ? '#2563eb' : '#cbd5e1',
          }}
        />
      )}
    >
      <PagerItem><Typography>Alpha</Typography></PagerItem>
      <PagerItem><Typography>Beta</Typography></PagerItem>
      <PagerItem><Typography>Gamma</Typography></PagerItem>
    </Pager>
  )
}`,
      },
      {
        title: 'Fullscreen and Swipe Control',
        description: 'Use fullscreen mode and disable swipe for guided flows.',
        code: `import { Pager, PagerItem } from '@xaui/native/pager'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function FullscreenPagerExample() {
  return (
    <View style={{ height: 280, borderRadius: 14, overflow: 'hidden' }}>
      <Pager
        isFullscreen
        swipeEnabled={false}
        customAppearance={{ container: { flex: 1 } }}
      >
        <PagerItem><Typography>Step 1</Typography></PagerItem>
        <PagerItem><Typography>Step 2</Typography></PagerItem>
      </Pager>
    </View>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'PagerItem',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Page content' },
        ],
      },
    ],
  },

  progress: {
    props: [
      { name: 'value', type: 'number', defaultValue: '-', description: 'Progress value (0–1)' },
      { name: 'variant', type: '"linear" | "circular"', defaultValue: '"linear"', description: 'Progress style' },
      { name: 'size', type: 'number', defaultValue: '4 (linear), 40 (circular)', description: 'Track thickness (linear) or diameter (circular)' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'color', type: 'string', defaultValue: '-', description: 'Custom fill color override' },
      { name: 'backgroundColor', type: 'string', defaultValue: '-', description: 'Track background color override' },
      { name: 'borderRadius', type: 'number', defaultValue: '-', description: 'Custom border radius for linear variant' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable fill animation' },
    ],
    examples: [
      {
        title: 'Linear Progress',
        description: 'Default linear progress bar with fractional values.',
        code: `import { Progress } from '@xaui/native/progress'
import { Column } from '@xaui/native/view'

export function LinearProgressExample() {
  return (
    <Column gap={10}>
      <Progress value={0.2} />
      <Progress value={0.55} />
      <Progress value={0.9} />
    </Column>
  )
}`,
      },
      {
        title: 'Circular Progress',
        description: 'Use circular variant for compact progress indicators.',
        code: `import { Progress } from '@xaui/native/progress'
import { Row } from '@xaui/native/view'

export function CircularProgressExample() {
  return (
    <Row spacing={12} crossAxisAlignment="center">
      <Progress variant="circular" value={0.25} />
      <Progress variant="circular" value={0.6} />
      <Progress variant="circular" value={1} />
    </Row>
  )
}`,
      },
      {
        title: 'Theme Colors and Size',
        description: 'Apply semantic colors and adjust thickness/diameter.',
        code: `import { Progress } from '@xaui/native/progress'
import { Column, Row } from '@xaui/native/view'

export function ThemedProgressExample() {
  return (
    <Column gap={12}>
      <Progress value={0.45} themeColor="primary" size={6} />
      <Progress value={0.7} themeColor="success" size={8} />
      <Row spacing={10}>
        <Progress variant="circular" value={0.4} themeColor="secondary" size={28} />
        <Progress variant="circular" value={0.75} themeColor="warning" size={44} />
      </Row>
    </Column>
  )
}`,
      },
      {
        title: 'Custom Colors and Static Mode',
        description: 'Override colors manually and disable animation.',
        code: `import { Progress } from '@xaui/native/progress'
import { Column } from '@xaui/native/view'

export function CustomProgressExample() {
  return (
    <Column gap={10}>
      <Progress
        value={0.66}
        color="#2563eb"
        backgroundColor="#dbeafe"
        borderRadius={999}
      />
      <Progress
        variant="circular"
        value={0.35}
        color="#9333ea"
        backgroundColor="#f3e8ff"
        disableAnimation
      />
    </Column>
  )
}`,
      },
    ],
  },

  radio: {
    props: [
      { name: 'label', type: 'string', defaultValue: '-', description: 'Radio label text' },
      { name: 'value', type: 'string', defaultValue: '-', description: 'Value for group selection' },
      { name: 'isChecked', type: 'boolean', defaultValue: 'false', description: 'Controlled checked state' },
      { name: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Default checked (uncontrolled)' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'variant', type: '"filled" | "light"', defaultValue: '"filled"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Radio size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius' },
      { name: 'labelAlignment', type: '"left" | "right" | "justify-left" | "justify-right"', defaultValue: '"right"', description: 'Label position' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full width' },
    ],
    events: [
      { name: 'onValueChange', type: '(isChecked: boolean) => void', description: 'Called when checked state changes' },
    ],
    examples: [
      {
        title: 'Basic Radio',
        description: 'A standalone radio button.',
        code: `import { Radio } from '@xaui/native/radio'

export function BasicExample() {
  return <Radio label="Option A" />
}`,
      },
      {
        title: 'Radio Group',
        description: 'Group multiple radios with single-selection behavior.',
        code: `import { useState } from 'react'
import { Radio, RadioGroup } from '@xaui/native/radio'

export function GroupExample() {
  const [value, setValue] = useState('monthly')

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Radio label="Monthly" value="monthly" />
      <Radio label="Yearly" value="yearly" />
      <Radio label="Lifetime" value="lifetime" />
    </RadioGroup>
  )
}`,
      },
      {
        title: 'Horizontal Layout',
        description: 'Display radios side by side.',
        code: `import { Radio, RadioGroup } from '@xaui/native/radio'

export function HorizontalExample() {
  return (
    <RadioGroup orientation="horizontal">
      <Radio label="Yes" value="yes" />
      <Radio label="No" value="no" />
    </RadioGroup>
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Use sm, md, and lg radio sizes.',
        code: `import { Radio } from '@xaui/native/radio'
import { Column } from '@xaui/native/view'

export function RadioSizesExample() {
  return (
    <Column gap={10}>
      <Radio size="sm" label="Small" />
      <Radio size="md" label="Medium" defaultChecked />
      <Radio size="lg" label="Large" />
    </Column>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Apply semantic theme colors on radios and groups.',
        code: `import { useState } from 'react'
import { Radio, RadioGroup } from '@xaui/native/radio'
import { Column } from '@xaui/native/view'

export function RadioThemeColorsExample() {
  const [value, setValue] = useState('secondary')

  return (
    <Column gap={12}>
      <RadioGroup value={value} onValueChange={setValue} themeColor="primary">
        <Radio label="Primary group color" value="primary" />
        <Radio label="Secondary group color" value="secondary" />
      </RadioGroup>

      <Radio label="Success single radio" themeColor="success" />
      <Radio label="Danger single radio" themeColor="danger" />
    </Column>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'RadioGroup',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Radio children' },
          { name: 'value', type: 'string', defaultValue: '-', description: 'Controlled selected value' },
          { name: 'defaultValue', type: 'string', defaultValue: '-', description: 'Default selected value (uncontrolled)' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable all radios' },
          { name: 'orientation', type: '"vertical" | "horizontal"', defaultValue: '"vertical"', description: 'Layout direction' },
          { name: 'gap', type: 'number', defaultValue: '8', description: 'Gap between radio items' },
        ],
        events: [
          { name: 'onValueChange', type: '(value: string) => void', description: 'Called when selection changes' },
        ],
      },
    ],
  },

  'segment-button': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'SegmentButtonItem children' },
      { name: 'selected', type: 'string | string[]', defaultValue: '-', description: 'Controlled selected value(s)' },
      { name: 'defaultSelected', type: 'string | string[]', defaultValue: '-', description: 'Default selected (uncontrolled)' },
      { name: 'selectionMode', type: '"single" | "multiple"', defaultValue: '"single"', description: 'Selection behavior' },
      { name: 'variant', type: '"outlined" | "flat" | "light" | "faded"', defaultValue: '"outlined"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg"', defaultValue: '"md"', description: 'Component size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full container width' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable all segments' },
      { name: 'showCheckmark', type: 'boolean', defaultValue: 'true', description: 'Show checkmark on selected item' },
      { name: 'elevation', type: '0 | 1 | 2 | 3 | 4', defaultValue: '0', description: 'Shadow elevation level (flat/faded variants only)' },
      { name: 'customAppearance', type: '{ container?: ViewStyle }', defaultValue: '-', description: 'Custom style overrides for the outer container' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(selected: string | string[]) => void', description: 'Called when selection changes' },
    ],
    examples: [
      {
        title: 'Single Selection (Controlled)',
        description: 'Control the selected segment with string state.',
        code: `import { useState } from 'react'
import { SegmentButton, SegmentButtonItem } from '@xaui/native/segment-button'
import { Typography } from '@xaui/native/typography'

export function SingleControlledSegmentButtonExample() {
  const [value, setValue] = useState('week')

  return (
    <>
      <SegmentButton
        selected={value}
        onSelectionChange={next => setValue(next as string)}
        fullWidth
      >
        <SegmentButtonItem itemKey="day" label="Day" />
        <SegmentButtonItem itemKey="week" label="Week" />
        <SegmentButtonItem itemKey="month" label="Month" />
      </SegmentButton>
      <Typography variant="caption">Selected: {value}</Typography>
    </>
  )
}`,
      },
      {
        title: 'Multiple Selection',
        description: 'Use selectionMode="multiple" with string[] state.',
        code: `import { useState } from 'react'
import { SegmentButton, SegmentButtonItem } from '@xaui/native/segment-button'

export function MultiSelectSegmentButtonExample() {
  const [keys, setKeys] = useState<string[]>(['new', 'popular'])

  return (
    <SegmentButton
      selectionMode="multiple"
      selected={keys}
      onSelectionChange={next => setKeys(next as string[])}
      variant="flat"
      fullWidth
    >
      <SegmentButtonItem itemKey="new" label="New" />
      <SegmentButtonItem itemKey="popular" label="Popular" />
      <SegmentButtonItem itemKey="sale" label="Sale" />
    </SegmentButton>
  )
}`,
      },
      {
        title: 'Variants and Elevation',
        description: 'Compare visual variants and use elevation where supported.',
        code: `import { SegmentButton, SegmentButtonItem } from '@xaui/native/segment-button'
import { Column } from '@xaui/native/view'

export function SegmentButtonVariantsExample() {
  return (
    <Column gap={10}>
      <SegmentButton defaultSelected="a" variant="outlined" fullWidth>
        <SegmentButtonItem itemKey="a" label="One" />
        <SegmentButtonItem itemKey="b" label="Two" />
      </SegmentButton>
      <SegmentButton defaultSelected="a" variant="light" fullWidth>
        <SegmentButtonItem itemKey="a" label="One" />
        <SegmentButtonItem itemKey="b" label="Two" />
      </SegmentButton>
      <SegmentButton defaultSelected="a" variant="flat" elevation={2} fullWidth>
        <SegmentButtonItem itemKey="a" label="One" />
        <SegmentButtonItem itemKey="b" label="Two" />
      </SegmentButton>
      <SegmentButton defaultSelected="a" variant="faded" elevation={1} fullWidth>
        <SegmentButtonItem itemKey="a" label="One" />
        <SegmentButtonItem itemKey="b" label="Two" />
      </SegmentButton>
    </Column>
  )
}`,
      },
      {
        title: 'Size and Theme Color',
        description: 'Tune density and semantic color.',
        code: `import { SegmentButton, SegmentButtonItem } from '@xaui/native/segment-button'
import { Column } from '@xaui/native/view'

export function SegmentButtonSizeThemeExample() {
  return (
    <Column gap={10}>
      <SegmentButton defaultSelected="std" size="xs" themeColor="primary" fullWidth>
        <SegmentButtonItem itemKey="std" label="Standard" />
        <SegmentButtonItem itemKey="exp" label="Express" />
      </SegmentButton>
      <SegmentButton defaultSelected="std" size="md" themeColor="secondary" fullWidth>
        <SegmentButtonItem itemKey="std" label="Standard" />
        <SegmentButtonItem itemKey="exp" label="Express" />
      </SegmentButton>
      <SegmentButton defaultSelected="std" size="lg" themeColor="success" fullWidth>
        <SegmentButtonItem itemKey="std" label="Standard" />
        <SegmentButtonItem itemKey="exp" label="Express" />
      </SegmentButton>
    </Column>
  )
}`,
      },
      {
        title: 'States and Custom Content',
        description: 'Disable segments, hide checkmarks, and attach start/end content.',
        code: `import { SegmentButton, SegmentButtonItem } from '@xaui/native/segment-button'
import { Typography } from '@xaui/native/typography'

export function SegmentButtonStatesExample() {
  return (
    <SegmentButton
      defaultSelected="home"
      showCheckmark={false}
      radius="md"
      fullWidth
    >
      <SegmentButtonItem
        itemKey="home"
        label="Home"
        startContent={<Typography>🏠</Typography>}
      />
      <SegmentButtonItem
        itemKey="search"
        label="Search"
        startContent={<Typography>🔎</Typography>}
      />
      <SegmentButtonItem
        itemKey="profile"
        label="Profile"
        endContent={<Typography>•</Typography>}
        isDisabled
      />
    </SegmentButton>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'SegmentButtonItem',
        props: [
          { name: 'itemKey', type: 'string', defaultValue: '-', description: 'Unique key for this segment item' },
          { name: 'label', type: 'string', defaultValue: '-', description: 'Label text for the segment' },
          { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start of segment' },
          { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end of segment' },
          { name: 'checkIndicator', type: 'ReactNode', defaultValue: '-', description: 'Custom indicator shown when segment is selected' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this segment item' },
          { name: 'customAppearance', type: 'SegmentButtonItemCustomAppearance', defaultValue: '-', description: 'Custom style overrides for this item' },
        ],
      },
    ],
  },

  select: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'SelectItem children' },
      { name: 'selectedKeys', type: 'string[]', defaultValue: '-', description: 'Controlled selected keys' },
      { name: 'defaultSelectedKeys', type: 'string[]', defaultValue: '-', description: 'Default selected keys (uncontrolled)' },
      { name: 'disabledKeys', type: 'string[]', defaultValue: '-', description: 'Keys of disabled items' },
      { name: 'selectionMode', type: '"single" | "multiple"', defaultValue: '"single"', description: 'Selection behavior' },
      { name: 'variant', type: '"outlined" | "flat" | "light" | "faded" | "underlined"', defaultValue: '"outlined"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Component size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: 'Placeholder text' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label' },
      { name: 'labelPlacement', type: '"inside" | "outside" | "outside-left" | "outside-top"', defaultValue: '"inside"', description: 'Label position' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helper text below field' },
      { name: 'errorMessage', type: 'ReactNode', defaultValue: '-', description: 'Error message when invalid' },
      { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start of trigger' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end of trigger' },
      { name: 'maxListboxHeight', type: 'number', defaultValue: '-', description: 'Maximum dropdown height' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full container width' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Mark as invalid' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(keys: string[]) => void', description: 'Called when selection changes' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', description: 'Called when dropdown opens or closes' },
      { name: 'onClear', type: '() => void', description: 'Called when selection is cleared' },
    ],
    examples: [
      {
        title: 'Basic Select',
        description: 'Single-selection dropdown with a list of items.',
        code: `import { Select, SelectItem } from '@xaui/native/select'

export function BasicExample() {
  return (
    <Select label="Animal" placeholder="Select an animal">
      <SelectItem value="cat" label="Cat" />
      <SelectItem value="dog" label="Dog" />
      <SelectItem value="bird" label="Bird" />
    </Select>
  )
}`,
      },
      {
        title: 'Controlled Single Select',
        description: 'Track the selected key in state.',
        code: `import { useState } from 'react'
import { Select, SelectItem } from '@xaui/native/select'

const languages = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
]

export function ControlledExample() {
  const [keys, setKeys] = useState<string[]>([])

  return (
    <Select
      label="Language"
      selectedKeys={keys}
      onSelectionChange={setKeys}
    >
      {languages.map(lang => (
        <SelectItem itemKey={lang.value} value={lang.value} label={lang.label} />
      ))}
    </Select>
  )
}`,
      },
      {
        title: 'Multi Select',
        description: 'Allow selecting multiple items at once.',
        code: `import { Select, SelectItem } from '@xaui/native/select'

export function MultiSelectExample() {
  return (
    <Select label="Toppings" selectionMode="multiple" placeholder="Choose toppings">
      <SelectItem value="cheese" label="Cheese" />
      <SelectItem value="tomato" label="Tomato" />
      <SelectItem value="mushroom" label="Mushroom" />
      <SelectItem value="pepper" label="Pepper" />
    </Select>
  )
}`,
      },
      {
        title: 'Items with Description',
        description: 'Provide secondary text for each option.',
        code: `import { Select, SelectItem } from '@xaui/native/select'

export function ItemDescriptionExample() {
  return (
    <Select label="Plan">
      <SelectItem value="free" label="Free" description="Up to 3 projects" />
      <SelectItem value="pro" label="Pro" description="Unlimited projects" />
      <SelectItem value="enterprise" label="Enterprise" description="Custom limits" isDisabled />
    </Select>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'SelectItem',
        props: [
          { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Item display label' },
          { name: 'value', type: 'string', defaultValue: '-', description: 'Unique item value' },
          { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Secondary description text' },
          { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start' },
          { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this item' },
        ],
        events: [
          { name: 'onSelected', type: '() => void', description: 'Called when item is selected' },
        ],
      },
    ],
  },

  skeleton: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Actual content shown when loaded' },
      { name: 'isLoaded', type: 'boolean', defaultValue: '-', description: 'Whether the content is ready' },
      { name: 'width', type: 'DimensionValue', defaultValue: '-', description: 'Skeleton width' },
      { name: 'height', type: 'DimensionValue', defaultValue: '-', description: 'Skeleton height' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Skeleton border radius' },
      { name: 'skeletonColor', type: 'ColorValue', defaultValue: '-', description: 'Custom shimmer color' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable shimmer animation' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
    ],
    examples: [
      {
        title: 'Text Lines',
        description: 'Use multiple line placeholders for text content.',
        code: `import { Skeleton } from '@xaui/native/skeleton'
import { Column } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function SkeletonTextLinesExample() {
  const isLoaded = false

  return (
    <Column gap={8}>
      <Skeleton isLoaded={isLoaded} width="100%" height={14}>
        <Typography>Account summary</Typography>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} width="82%" height={14}>
        <Typography>Available balance</Typography>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} width="68%" height={14}>
        <Typography>Updated 2 minutes ago</Typography>
      </Skeleton>
    </Column>
  )
}`,
      },
      {
        title: 'Avatar Row',
        description: 'Compose circle + text skeletons for list items.',
        code: `import { Skeleton } from '@xaui/native/skeleton'
import { Row, Column } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function SkeletonAvatarRowExample() {
  const isLoaded = false

  return (
    <Row spacing={12} crossAxisAlignment="center">
      <Skeleton isLoaded={isLoaded} width={48} height={48} radius="full">
        <View style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: '#6366f1' }} />
      </Skeleton>
      <Column gap={8} style={{ flex: 1 }}>
        <Skeleton isLoaded={isLoaded} width="70%" height={14}>
          <Typography>Jamie Park</Typography>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} width="45%" height={14}>
          <Typography>Online now</Typography>
        </Skeleton>
      </Column>
    </Row>
  )
}`,
      },
      {
        title: 'Card Placeholder',
        description: 'Build a full loading card with mixed block shapes.',
        code: `import { Skeleton } from '@xaui/native/skeleton'
import { Column } from '@xaui/native/view'

export function SkeletonCardExample() {
  const isLoaded = false

  return (
    <Column gap={10}>
      <Skeleton isLoaded={isLoaded} width="100%" height={140} radius="lg">
        <></>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} width="60%" height={18} />
      <Skeleton isLoaded={isLoaded} width="90%" height={14} />
      <Skeleton isLoaded={isLoaded} width="75%" height={14} />
    </Column>
  )
}`,
      },
      {
        title: 'Loaded State Toggle',
        description: 'Swap skeleton to real content using isLoaded.',
        code: `import { useState } from 'react'
import { Button } from '@xaui/native/button'
import { Skeleton } from '@xaui/native/skeleton'
import { Column } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function SkeletonLoadedStateExample() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Column gap={10}>
      <Button size="sm" variant="outlined" onPress={() => setIsLoaded(v => !v)}>
        {isLoaded ? 'Show Skeleton' : 'Show Loaded Content'}
      </Button>
      <Skeleton isLoaded={isLoaded} width="100%" height={18}>
        <Typography variant="titleMedium">Revenue this month: $12,430</Typography>
      </Skeleton>
    </Column>
  )
}`,
      },
      {
        title: 'Custom Color and Static',
        description: 'Customize skeleton color and disable animation.',
        code: `import { Skeleton } from '@xaui/native/skeleton'
import { Column } from '@xaui/native/view'

export function SkeletonCustomStyleExample() {
  return (
    <Column gap={10}>
      <Skeleton
        isLoaded={false}
        width="100%"
        height={64}
        radius="lg"
        skeletonColor="#bae6fd"
      >
        <></>
      </Skeleton>
      <Skeleton
        isLoaded={false}
        width="100%"
        height={16}
        radius="full"
        disableAnimation
      >
        <></>
      </Skeleton>
    </Column>
  )
}`,
      },
    ],
  },

  slider: {
    props: [
      { name: 'value', type: 'number', defaultValue: '-', description: 'Controlled slider value' },
      { name: 'defaultValue', type: 'number', defaultValue: '0', description: 'Default value (uncontrolled)' },
      { name: 'minValue', type: 'number', defaultValue: '0', description: 'Minimum value' },
      { name: 'maxValue', type: 'number', defaultValue: '100', description: 'Maximum value' },
      { name: 'step', type: 'number', defaultValue: '1', description: 'Step increment' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Slider label' },
      { name: 'showValueLabel', type: 'boolean', defaultValue: 'true', description: 'Show current value' },
      { name: 'marks', type: 'SliderMark[]', defaultValue: '-', description: 'Custom tick marks' },
      { name: 'showSteps', type: 'boolean', defaultValue: 'false', description: 'Show step marks on track' },
      { name: 'orientation', type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: 'Slider orientation' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Track thickness' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Thumb and track radius' },
      { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start of slider' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end of slider' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'isReadOnly', type: 'boolean', defaultValue: 'false', description: 'Read-only mode' },
      { name: 'trackLength', type: 'number', defaultValue: '-', description: 'Fixed track length in pixels' },
    ],
    events: [
      { name: 'onChange', type: '(value: number) => void', description: 'Called while dragging' },
      { name: 'onChangeEnd', type: '(value: number) => void', description: 'Called when drag ends' },
    ],
    examples: [
      {
        title: 'Basic Slider',
        description: 'A slider with min, max, and a label.',
        code: `import { Slider } from '@xaui/native/slider'

export function BasicExample() {
  return (
    <Slider
      label="Volume"
      minValue={0}
      maxValue={100}
      defaultValue={40}
    />
  )
}`,
      },
      {
        title: 'Controlled Slider',
        description: 'Sync the slider value with external state.',
        code: `import { useState } from 'react'
import { Slider } from '@xaui/native/slider'

export function ControlledExample() {
  const [value, setValue] = useState(50)

  return (
    <Slider
      label={\`Brightness: \${value}%\`}
      value={value}
      onChange={setValue}
      minValue={0}
      maxValue={100}
    />
  )
}`,
      },
      {
        title: 'With Step Marks',
        description: 'Show visual marks for each step.',
        code: `import { Slider } from '@xaui/native/slider'

export function StepMarksExample() {
  return (
    <Slider
      label="Quality"
      minValue={0}
      maxValue={4}
      step={1}
      showSteps
    />
  )
}`,
      },
    ],
  },

  stepper: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'StepperItem children' },
      { name: 'activeKey', type: 'string', defaultValue: '-', description: 'Controlled active step key' },
      { name: 'defaultActiveKey', type: 'string', defaultValue: '-', description: 'Default active key (uncontrolled)' },
      { name: 'direction', type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: 'Layout direction' },
      { name: 'showLines', type: 'boolean', defaultValue: 'true', description: 'Show connector lines between steps' },
      { name: 'lineDisplayMode', type: '"progress" | "all"', defaultValue: '"progress"', description: 'Which lines to highlight' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Step indicator size' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable all steps' },
      { name: 'customAppearance', type: 'StepperCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
    ],
    events: [
      { name: 'onStepChange', type: '(key: string) => void', description: 'Called when active step changes' },
    ],
    examples: [
      {
        title: 'Basic Horizontal',
        description: 'Horizontal stepper with a controlled active step.',
        code: `import { useState } from 'react'
import { Stepper, StepperItem } from '@xaui/native/stepper'
import { Typography } from '@xaui/native/typography'

export function BasicStepperExample() {
  const [activeKey, setActiveKey] = useState('details')

  return (
    <>
      <Stepper activeKey={activeKey} onStepChange={setActiveKey}>
        <StepperItem itemKey="account" title="Account" description="Create profile" />
        <StepperItem itemKey="details" title="Details" description="Personal info" />
        <StepperItem itemKey="payment" title="Payment" description="Card details" />
        <StepperItem itemKey="review" title="Review" description="Confirm" isLocked />
      </Stepper>
      <Typography variant="caption">Active: {activeKey}</Typography>
    </>
  )
}`,
      },
      {
        title: 'Vertical and Line Display',
        description: 'Use vertical direction and control connector visibility.',
        code: `import { Stepper, StepperItem } from '@xaui/native/stepper'
import { Column } from '@xaui/native/view'

export function VerticalStepperExample() {
  return (
    <Column gap={16}>
      <Stepper direction="vertical" lineDisplayMode="progress" defaultActiveKey="ship">
        <StepperItem itemKey="cart" title="Cart" />
        <StepperItem itemKey="ship" title="Shipping" />
        <StepperItem itemKey="pay" title="Payment" />
      </Stepper>

      <Stepper direction="vertical" showLines={false} defaultActiveKey="pay">
        <StepperItem itemKey="cart" title="Cart" />
        <StepperItem itemKey="ship" title="Shipping" />
        <StepperItem itemKey="pay" title="Payment" />
      </Stepper>
    </Column>
  )
}`,
      },
      {
        title: 'Sizes and Theme Colors',
        description: 'Scale step indicators and apply semantic colors.',
        code: `import { Stepper, StepperItem } from '@xaui/native/stepper'
import { Column } from '@xaui/native/view'

export function StepperSizeThemeExample() {
  return (
    <Column gap={14}>
      <Stepper size="sm" themeColor="primary" defaultActiveKey="b">
        <StepperItem itemKey="a" title="A" />
        <StepperItem itemKey="b" title="B" />
        <StepperItem itemKey="c" title="C" />
      </Stepper>

      <Stepper size="lg" themeColor="success" defaultActiveKey="b">
        <StepperItem itemKey="a" title="A" />
        <StepperItem itemKey="b" title="B" />
        <StepperItem itemKey="c" title="C" />
      </Stepper>
    </Column>
  )
}`,
      },
      {
        title: 'Custom Indicator',
        description: 'Render indicator content from item state.',
        code: `import { Stepper, StepperItem } from '@xaui/native/stepper'
import { Typography } from '@xaui/native/typography'

export function CustomIndicatorStepperExample() {
  return (
    <Stepper direction="vertical" defaultActiveKey="sync" themeColor="secondary">
      <StepperItem
        itemKey="queue"
        title="Queued"
        indicator={({ index }) => <Typography variant="caption">{index + 1}</Typography>}
      />
      <StepperItem
        itemKey="sync"
        title="Syncing"
        indicator={({ isActive, isCompleted }) => (
          <Typography variant="caption">
            {isCompleted ? 'DONE' : isActive ? 'NOW' : 'WAIT'}
          </Typography>
        )}
      />
      <StepperItem itemKey="finish" title="Finish" isLocked indicator="L" />
    </Stepper>
  )
}`,
      },
      {
        title: 'Disabled States',
        description: 'Disable the whole stepper or individual items.',
        code: `import { Stepper, StepperItem } from '@xaui/native/stepper'
import { Column } from '@xaui/native/view'

export function DisabledStepperExample() {
  return (
    <Column gap={16}>
      <Stepper isDisabled defaultActiveKey="a">
        <StepperItem itemKey="a" title="Step A" />
        <StepperItem itemKey="b" title="Step B" />
      </Stepper>

      <Stepper defaultActiveKey="a">
        <StepperItem itemKey="a" title="Step A" />
        <StepperItem itemKey="b" title="Step B" isDisabled />
        <StepperItem itemKey="c" title="Step C" isLocked />
      </Stepper>
    </Column>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'StepperItem',
        props: [
          { name: 'itemKey', type: 'string', defaultValue: '-', description: 'Unique key for this step' },
          { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Step title' },
          { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Step description' },
          { name: 'indicator', type: 'ReactNode | ((state: StepperItemIndicatorState) => ReactNode)', defaultValue: '-', description: 'Custom step indicator' },
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content shown below step header' },
          { name: 'isLocked', type: 'boolean', defaultValue: 'false', description: 'Prevent navigating to this step' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this step' },
          { name: 'customAppearance', type: 'StepperItemCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
        ],
        events: [
          { name: 'onPress', type: '(itemKey: string) => void', description: 'Called when step is pressed' },
        ],
      },
    ],
  },

  switch: {
    props: [
      { name: 'label', type: 'string', defaultValue: '-', description: 'Switch label text' },
      { name: 'isSelected', type: 'boolean', defaultValue: 'false', description: 'Controlled on/off state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'variant', type: '"inside" | "overlap"', defaultValue: '"inside"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Switch size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius' },
      { name: 'labelAlignment', type: '"left" | "right" | "justify-left" | "justify-right"', defaultValue: '"right"', description: 'Label position' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full width' },
      { name: 'labelStyle', type: 'TextStyle', defaultValue: '-', description: 'Custom label styles' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
    ],
    events: [
      { name: 'onValueChange', type: '(isSelected: boolean) => void', description: 'Called when toggle state changes' },
    ],
    examples: [
      {
        title: 'Basic Switch',
        description: 'A labeled toggle switch.',
        code: `import { Switch } from '@xaui/native/switch'

export function BasicExample() {
  return <Switch label="Enable notifications" />
}`,
      },
      {
        title: 'Controlled Switch',
        description: 'Manage on/off state with React.',
        code: `import { useState } from 'react'
import { Switch } from '@xaui/native/switch'

export function ControlledExample() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch
      label="Dark mode"
      isSelected={enabled}
      onValueChange={setEnabled}
    />
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Adjust the toggle size.',
        code: `import { Switch } from '@xaui/native/switch'
import { Column } from '@xaui/native/view'

export function SizesExample() {
  return (
    <Column gap={8}>
      <Switch label="Small" size="sm" />
      <Switch label="Medium" size="md" />
      <Switch label="Large" size="lg" />
    </Column>
  )
}`,
      },
      {
        title: 'Variants',
        description: 'Compare inside and overlap visual variants.',
        code: `import { Switch } from '@xaui/native/switch'
import { Column } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Column gap={10}>
      <Switch label="Inside variant" variant="inside" defaultSelected />
      <Switch label="Overlap variant" variant="overlap" defaultSelected />
    </Column>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Apply semantic colors to communicate context.',
        code: `import { Switch } from '@xaui/native/switch'
import { Column } from '@xaui/native/view'

export function ThemeColorsExample() {
  return (
    <Column gap={10}>
      <Switch label="Primary" themeColor="primary" defaultSelected />
      <Switch label="Success" themeColor="success" defaultSelected />
      <Switch label="Warning" themeColor="warning" defaultSelected />
      <Switch label="Danger" themeColor="danger" defaultSelected />
    </Column>
  )
}`,
      },
      {
        title: 'Label Alignment and Full Width',
        description: 'Change label position and stretch rows when needed.',
        code: `import { Switch } from '@xaui/native/switch'
import { Column } from '@xaui/native/view'

export function AlignmentExample() {
  return (
    <Column gap={10}>
      <Switch label="Right label (default)" labelAlignment="right" />
      <Switch label="Left label" labelAlignment="left" />
      <Switch label="Justify right" labelAlignment="justify-right" fullWidth />
      <Switch label="Justify left" labelAlignment="justify-left" fullWidth />
    </Column>
  )
}`,
      },
      {
        title: 'Radius and Disabled State',
        description: 'Control shape and disable interaction.',
        code: `import { Switch } from '@xaui/native/switch'
import { Column } from '@xaui/native/view'

export function RadiusDisabledExample() {
  return (
    <Column gap={10}>
      <Switch label="Square" radius="sm" defaultSelected />
      <Switch label="Rounded" radius="full" defaultSelected />
      <Switch label="Disabled off" isDisabled />
      <Switch label="Disabled on" isDisabled defaultSelected />
    </Column>
  )
}`,
      },
      {
        title: 'Custom Label Style and Container Style',
        description: 'Apply style overrides for text and row container.',
        code: `import { Switch } from '@xaui/native/switch'

export function StyledSwitchExample() {
  return (
    <Switch
      label="Styled switch"
      defaultSelected
      labelStyle={{ fontWeight: '700', letterSpacing: 0.3 }}
      style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}
    />
  )
}`,
      },
    ],
  },

  tabs: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Tab children' },
      { name: 'selectedKey', type: 'string', defaultValue: '-', description: 'Controlled selected tab key' },
      { name: 'defaultSelectedKey', type: 'string', defaultValue: '-', description: 'Default selected key (uncontrolled)' },
      { name: 'disabledKeys', type: 'string[]', defaultValue: '-', description: 'Keys of disabled tabs' },
      { name: 'variant', type: '"solid" | "bordered" | "light" | "underlined"', defaultValue: '"solid"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Tab bar size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand tabs to full width' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable all tabs' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable transition animation' },
      { name: 'content', type: 'ReactNode | ((state: RenderChildrenState) => ReactNode)', defaultValue: '-', description: 'Content area below tabs' },
      { name: 'customAppearance', type: 'TabsCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(key: string) => void', description: 'Called when active tab changes' },
    ],
    examples: [
      {
        title: 'Basic Tabs',
        description: 'Tabs with inline content per panel.',
        code: `import { Tabs, Tab } from '@xaui/native/tabs'
import { Typography } from '@xaui/native/typography'

export function BasicExample() {
  return (
    <Tabs>
      <Tab title="Home">
        <Typography>Home content</Typography>
      </Tab>
      <Tab title="Profile">
        <Typography>Profile content</Typography>
      </Tab>
      <Tab title="Settings">
        <Typography>Settings content</Typography>
      </Tab>
    </Tabs>
  )
}`,
      },
      {
        title: 'Variants',
        description: 'Switch between tab bar visual styles.',
        code: `import { Tabs, Tab } from '@xaui/native/tabs'
import { Column } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function VariantsExample() {
  return (
    <Column gap={24}>
      <Tabs variant="solid">
        <Tab title="One"><Typography>One</Typography></Tab>
        <Tab title="Two"><Typography>Two</Typography></Tab>
      </Tabs>
      <Tabs variant="bordered">
        <Tab title="One"><Typography>One</Typography></Tab>
        <Tab title="Two"><Typography>Two</Typography></Tab>
      </Tabs>
      <Tabs variant="light">
        <Tab title="One"><Typography>One</Typography></Tab>
        <Tab title="Two"><Typography>Two</Typography></Tab>
      </Tabs>
      <Tabs variant="underlined">
        <Tab title="One"><Typography>One</Typography></Tab>
        <Tab title="Two"><Typography>Two</Typography></Tab>
      </Tabs>
    </Column>
  )
}`,
      },
      {
        title: 'Controlled Selection',
        description: 'Drive the active tab from external state.',
        code: `import { useState } from 'react'
import { Tabs, Tab } from '@xaui/native/tabs'
import { Typography } from '@xaui/native/typography'

export function ControlledExample() {
  const [selected, setSelected] = useState('inbox')

  return (
    <Tabs selectedKey={selected} onSelectionChange={setSelected}>
      <Tab title="Inbox">
        <Typography>Inbox items</Typography>
      </Tab>
      <Tab title="Sent">
        <Typography>Sent items</Typography>
      </Tab>
      <Tab title="Drafts">
        <Typography>Draft items</Typography>
      </Tab>
    </Tabs>
  )
}`,
      },
      {
        title: 'Disabled Tabs',
        description: 'Disable specific tabs by passing their keys.',
        code: `import { Tabs, Tab } from '@xaui/native/tabs'
import { Typography } from '@xaui/native/typography'

export function DisabledTabsExample() {
  return (
    <Tabs disabledKeys={['premium']}>
      <Tab title="Free">
        <Typography>Free content</Typography>
      </Tab>
      <Tab title="Premium">
        <Typography>Premium content</Typography>
      </Tab>
    </Tabs>
  )
}`,
      },
      {
        title: 'Full Width',
        description: 'Stretch tabs to fill the available width.',
        code: `import { Tabs, Tab } from '@xaui/native/tabs'
import { Typography } from '@xaui/native/typography'

export function FullWidthExample() {
  return (
    <Tabs fullWidth>
      <Tab title="Overview"><Typography>Overview</Typography></Tab>
      <Tab title="Details"><Typography>Details</Typography></Tab>
      <Tab title="Reviews"><Typography>Reviews</Typography></Tab>
    </Tabs>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'Tab',
        props: [
          { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Tab title' },
          { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start of tab' },
          { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end of tab' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this tab' },
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Tab panel content' },
        ],
      },
    ],
  },

  timepicker: {
    props: [
      { name: 'value', type: 'TimeValue', defaultValue: '-', description: 'Controlled time value { hours, minutes }' },
      { name: 'is24Hour', type: 'boolean', defaultValue: 'false', description: 'Use 24-hour format' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'minTime', type: 'TimeValue', defaultValue: '-', description: 'Minimum selectable time' },
      { name: 'maxTime', type: 'TimeValue', defaultValue: '-', description: 'Maximum selectable time' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
    ],
    events: [
      { name: 'onChange', type: '(time: TimeValue) => void', description: 'Called when time changes' },
    ],
    examples: [
      {
        title: 'Basic Time Picker (12-hour)',
        description: 'Controlled 12-hour picker with AM/PM selection.',
        code: `import { useState } from 'react'
import { TimePicker, type TimeValue } from '@xaui/native/timepicker'
import { Typography } from '@xaui/native/typography'
import { Column } from '@xaui/native/view'

export function BasicTimePickerExample() {
  const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 30 })

  return (
    <Column gap={8}>
      <Typography variant="caption">Selected: {time.hours}:{time.minutes.toString().padStart(2, '0')}</Typography>
      <TimePicker value={time} onChange={setTime} is24Hour={false} />
    </Column>
  )
}`,
      },
      {
        title: '24-hour and Bounds',
        description: 'Use 24-hour mode and clamp selection with min/max.',
        code: `import { useState } from 'react'
import { TimePicker, type TimeValue } from '@xaui/native/timepicker'

export function BoundedTimePickerExample() {
  const [time, setTime] = useState<TimeValue>({ hours: 14, minutes: 0 })

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      is24Hour
      minTime={{ hours: 9, minutes: 0 }}
      maxTime={{ hours: 18, minutes: 30 }}
      themeColor="secondary"
    />
  )
}`,
      },
      {
        title: 'Dialog Picker',
        description: 'Open a modal dialog and confirm/cancel selection.',
        code: `import { useState } from 'react'
import { Button } from '@xaui/native/button'
import { TimePickerDialog, type TimeValue } from '@xaui/native/timepicker'
import { Column } from '@xaui/native/view'

export function TimePickerDialogExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState<TimeValue>({ hours: 10, minutes: 15 })

  return (
    <Column gap={10}>
      <Button onPress={() => setIsOpen(true)}>Open dialog</Button>
      <TimePickerDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={time}
        onChange={setTime}
        title="Select time"
        onConfirm={(next) => {
          setTime(next)
          setIsOpen(false)
        }}
        onCancel={() => setIsOpen(false)}
      />
    </Column>
  )
}`,
      },
      {
        title: 'Trigger + Dialog Pattern',
        description: 'Use TimePickerTrigger as input-like entry point.',
        code: `import { useState } from 'react'
import {
  TimePickerDialog,
  TimePickerTrigger,
  type TimeValue,
} from '@xaui/native/timepicker'

export function TimePickerTriggerExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState<TimeValue | undefined>({ hours: 8, minutes: 45 })

  return (
    <>
      <TimePickerTrigger
        value={time}
        placeholder="Select time"
        onPress={() => setIsOpen(true)}
        onClear={() => setTime(undefined)}
        themeColor="primary"
      />
      <TimePickerDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={time}
        onChange={(next) => setTime(next)}
        onConfirm={(next) => {
          setTime(next)
          setIsOpen(false)
        }}
      />
    </>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'TimePickerDialog',
        props: [
          { name: 'isOpen', type: 'boolean', defaultValue: '-', description: 'Controls dialog visibility' },
          { name: 'value', type: 'TimeValue', defaultValue: '-', description: 'Controlled time value' },
          { name: 'is24Hour', type: 'boolean', defaultValue: 'false', description: 'Use 24-hour format' },
          { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Dialog title' },
          { name: 'confirmText', type: 'string', defaultValue: '"OK"', description: 'Confirm button text' },
          { name: 'cancelText', type: 'string', defaultValue: '"Cancel"', description: 'Cancel button text' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
        ],
        events: [
          { name: 'onClose', type: '() => void', description: 'Called when dialog is closed' },
          { name: 'onChange', type: '(time: TimeValue) => void', description: 'Called when time changes' },
          { name: 'onConfirm', type: '(time: TimeValue) => void', description: 'Called when confirm is pressed' },
          { name: 'onCancel', type: '() => void', description: 'Called when cancel is pressed' },
        ],
      },
      {
        name: 'TimePickerTrigger',
        props: [
          { name: 'value', type: 'TimeValue', defaultValue: '-', description: 'Time to display' },
          { name: 'placeholder', type: 'string', defaultValue: '"Select time"', description: 'Placeholder text' },
          { name: 'is24Hour', type: 'boolean', defaultValue: 'false', description: 'Use 24-hour format' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
          { name: 'isClearable', type: 'boolean', defaultValue: 'true', description: 'Show clear button' },
          { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Custom icon element' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
        ],
        events: [
          { name: 'onPress', type: '() => void', description: 'Called when trigger is pressed' },
          { name: 'onClear', type: '() => void', description: 'Called when clear button is pressed' },
        ],
      },
    ],
  },

  toolbar: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'ToolbarAction children' },
      { name: 'variant', type: '"floating" | "docked" | "vertical"', defaultValue: '"docked"', description: 'Layout variant' },
      { name: 'position', type: '"top" | "bottom" | "left" | "right"', defaultValue: '"top"', description: 'Screen position (left/right only for vertical variant)' },
      { name: 'isVisible', type: 'boolean', defaultValue: 'true', description: 'Controls toolbar visibility' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'showDivider', type: 'boolean', defaultValue: 'false', description: 'Show a divider line on docked layout' },
      { name: 'isElevated', type: 'boolean', defaultValue: '-', description: 'Apply shadow elevation (uses variant default when omitted)' },
      { name: 'customAppearance', type: 'ToolbarCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
    ],
    examples: [
      {
        title: 'Floating Bottom',
        description: 'Rounded floating toolbar positioned at the bottom.',
        code: `import { Toolbar, ToolbarAction } from '@xaui/native/toolbar'
import { ShareIcon } from '@xaui/icons/share'
import { PencilIcon } from '@xaui/icons/pencil'
import { TrashIcon } from '@xaui/icons/trash'

export function FloatingBottomToolbarExample() {
  return (
    <Toolbar variant="floating" position="bottom" themeColor="primary">
      <ToolbarAction icon={({ color, size }) => <ShareIcon size={size} color={color} />} />
      <ToolbarAction icon={({ color, size }) => <PencilIcon size={size} color={color} />} />
      <ToolbarAction icon={({ color, size }) => <TrashIcon size={size} color={color} />} />
    </Toolbar>
  )
}`,
      },
      {
        title: 'Docked Top with Divider',
        description: 'Fixed top toolbar with optional divider.',
        code: `import { Toolbar, ToolbarAction } from '@xaui/native/toolbar'
import { ArrowBackIcon } from '@xaui/icons/arrow-back'
import { SearchIcon } from '@xaui/icons/search'
import { EllipsisVerticalIcon } from '@xaui/icons/ellipsis-vertical'

export function DockedTopToolbarExample() {
  return (
    <Toolbar variant="docked" position="top" showDivider themeColor="secondary">
      <ToolbarAction icon={({ color, size }) => <ArrowBackIcon size={size} color={color} />} />
      <ToolbarAction icon={({ color, size }) => <SearchIcon size={size} color={color} />} />
      <ToolbarAction icon={({ color, size }) => <EllipsisVerticalIcon size={size} color={color} />} />
    </Toolbar>
  )
}`,
      },
      {
        title: 'Vertical Toolbar',
        description: 'Side-mounted vertical toolbar, centered on screen.',
        code: `import { Toolbar, ToolbarAction } from '@xaui/native/toolbar'
import { AddIcon } from '@xaui/icons/add'
import { SearchIcon } from '@xaui/icons/search'
import { StarIcon } from '@xaui/icons/star'

export function VerticalToolbarExample() {
  return (
    <Toolbar variant="vertical" position="right" themeColor="success">
      <ToolbarAction icon={({ color, size }) => <AddIcon size={size} color={color} />} />
      <ToolbarAction icon={({ color, size }) => <SearchIcon size={size} color={color} />} />
      <ToolbarAction icon={({ color, size }) => <StarIcon size={size} color={color} />} />
    </Toolbar>
  )
}`,
      },
      {
        title: 'Visibility and Disabled Action',
        description: 'Control toolbar visibility and disable specific actions.',
        code: `import { useState } from 'react'
import { Button } from '@xaui/native/button'
import { Toolbar, ToolbarAction } from '@xaui/native/toolbar'
import { ShareIcon } from '@xaui/icons/share'
import { DownloadIcon } from '@xaui/icons/download'
import { TrashIcon } from '@xaui/icons/trash'
import { Column } from '@xaui/native/view'

export function ToolbarStateExample() {
  const [visible, setVisible] = useState(true)

  return (
    <Column gap={10}>
      <Button size="sm" variant="outlined" onPress={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'} Toolbar
      </Button>
      <Toolbar isVisible={visible} variant="floating" position="bottom">
        <ToolbarAction icon={({ color, size }) => <ShareIcon size={size} color={color} />} />
        <ToolbarAction icon={({ color, size }) => <DownloadIcon size={size} color={color} />} isDisabled />
        <ToolbarAction icon={({ color, size }) => <TrashIcon size={size} color={color} />} />
      </Toolbar>
    </Column>
  )
}`,
      },
      {
        title: 'Custom Appearance',
        description: 'Override container and action row styles.',
        code: `import { Toolbar, ToolbarAction } from '@xaui/native/toolbar'
import { AddIcon } from '@xaui/icons/add'
import { SearchIcon } from '@xaui/icons/search'
import { StarIcon } from '@xaui/icons/star'

export function ToolbarCustomAppearanceExample() {
  return (
    <Toolbar
      variant="floating"
      position="top"
      customAppearance={{
        container: { marginHorizontal: 12 },
        actionsContainer: { gap: 6 },
      }}
      style={{ borderWidth: 1, borderColor: '#e2e8f0' }}
    >
      <ToolbarAction icon={({ color, size }) => <AddIcon size={size} color={color} />} />
      <ToolbarAction icon={({ color, size }) => <SearchIcon size={size} color={color} />} />
      <ToolbarAction icon={({ color, size }) => <StarIcon size={size} color={color} />} />
    </Toolbar>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'ToolbarAction',
        props: [
          { name: 'icon', type: 'ReactNode | ((params: ToolbarActionRenderParams) => ReactNode)', defaultValue: '-', description: 'Action icon' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this action' },
          { name: 'accessibilityLabel', type: 'string', defaultValue: '-', description: 'Accessibility label' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
        ],
        events: [
          { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when action is pressed' },
          { name: 'onLongPress', type: '(event: GestureResponderEvent) => void', description: 'Called on long press' },
        ],
      },
    ],
  },

  typography: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Text content' },
      { name: 'variant', type: '"displayLarge" | "displayMedium" | "displaySmall" | "headlineLarge" | "headlineMedium" | "headlineSmall" | "subtitleLarge" | "subtitleMedium" | "subtitleSmall" | "bodyLarge" | "bodyMedium" | "bodySmall" | "caption" | string', defaultValue: '"bodyMedium"', description: 'Typographic style variant — also accepts a custom string for theme-extended variants' },
      { name: 'align', type: '"left" | "center" | "right" | "justify"', defaultValue: '-', description: 'Text alignment' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Color theme for the text' },
      { name: 'maxLines', type: 'number', defaultValue: '-', description: 'Maximum number of lines before truncation' },
      { name: 'overflow', type: '"clip" | "ellipsis"', defaultValue: '"clip"', description: 'Overflow handling when maxLines is set' },
      { name: 'style', type: 'StyleProp<TextStyle>', defaultValue: '-', description: 'Additional text styles' },
    ],
    examples: [
      {
        title: 'Variants',
        description: 'Use variant to apply the correct typographic scale.',
        code: `import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function TypographyVariantsExample() {
  return (
    <View>
      <Typography variant="displayLarge">Display Large</Typography>
      <Typography variant="displayMedium">Display Medium</Typography>
      <Typography variant="displaySmall">Display Small</Typography>
      <Typography variant="headlineLarge">Headline Large</Typography>
      <Typography variant="headlineMedium">Headline Medium</Typography>
      <Typography variant="headlineSmall">Headline Small</Typography>
      <Typography variant="subtitleLarge">Subtitle Large</Typography>
      <Typography variant="subtitleMedium">Subtitle Medium</Typography>
      <Typography variant="subtitleSmall">Subtitle Small</Typography>
      <Typography variant="bodyLarge">Body Large</Typography>
      <Typography variant="bodyMedium">Body Medium</Typography>
      <Typography variant="bodySmall">Body Small</Typography>
      <Typography variant="caption">Caption</Typography>
    </View>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Apply a theme color to the text.',
        code: `import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function TypographyColorsExample() {
  return (
    <View>
      <Typography themeColor="primary">Primary color</Typography>
      <Typography themeColor="success">Success color</Typography>
      <Typography themeColor="danger">Danger color</Typography>
      <Typography themeColor="warning">Warning color</Typography>
    </View>
  )
}`,
      },
      {
        title: 'Text Truncation',
        description: 'Limit lines and control overflow behavior.',
        code: `import { Typography } from '@xaui/native/typography'

export function TypographyTruncationExample() {
  return (
    <Typography variant="bodyMedium" maxLines={2} overflow="ellipsis">
      This is a very long text that will be truncated after two lines with an
      ellipsis at the end to indicate that there is more content available.
    </Typography>
  )
}`,
      },
      {
        title: 'Alignment',
        description: 'Control text alignment within the container.',
        code: `import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function TypographyAlignmentExample() {
  return (
    <View>
      <Typography align="left">Left aligned</Typography>
      <Typography align="center">Center aligned</Typography>
      <Typography align="right">Right aligned</Typography>
      <Typography align="justify">Justified text that spans multiple lines to demonstrate justify alignment behavior.</Typography>
    </View>
  )
}`,
      },
    ],
  },

  'text-span': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to render inside the span container' },
      { name: 'color', type: 'TextStyle["color"]', defaultValue: '-', description: 'Inherited text color for nested Typography children' },
      { name: 'fontWeight', type: 'TextStyle["fontWeight"]', defaultValue: '-', description: 'Inherited font weight for nested Typography children' },
      { name: 'fontStyle', type: 'TextStyle["fontStyle"]', defaultValue: '-', description: 'Inherited font style for nested Typography children' },
      { name: 'textTransform', type: 'TextStyle["textTransform"]', defaultValue: '-', description: 'Inherited text transform for nested Typography children' },
      { name: 'spacing', type: 'number', defaultValue: '-', description: 'Gap between direct children' },
      { name: 'align', type: '"left" | "center" | "right" | "justify"', defaultValue: '-', description: 'Text alignment for grouped text' },
      { name: 'backgroundColor', type: 'ViewStyle["backgroundColor"]', defaultValue: '-', description: 'Background color of the text span container' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'Group text nodes and keep consistent spacing/alignment.',
        code: `import { TextSpan, Typography } from '@xaui/native/typography'

export function TextSpanBasicExample() {
  return (
    <TextSpan spacing={8} align="justify">
      <Typography>Order total:</Typography>
      <Typography variant="titleSmall">$24.99</Typography>
    </TextSpan>
  )
}`,
      },
      {
        title: 'Inherited Text Styles',
        description: 'Apply shared text styles to nested Typography elements.',
        code: `import { TextSpan, Typography } from '@xaui/native/typography'

export function TextSpanInheritedStyleExample() {
  return (
    <TextSpan color="#1d4ed8" fontWeight="700" textTransform="uppercase" spacing={6}>
      <Typography variant="caption">status</Typography>
      <Typography variant="bodyMedium">active</Typography>
    </TextSpan>
  )
}`,
      },
    ],
  },

  column: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to arrange vertically' },
      { name: 'mainAxisAlignment', type: '"start" | "center" | "end" | "space-between" | "space-around" | "space-evenly"', defaultValue: '"start"', description: 'Vertical alignment of children' },
      { name: 'crossAxisAlignment', type: '"start" | "center" | "end" | "stretch" | "baseline"', defaultValue: '"start"', description: 'Horizontal alignment of children' },
      { name: 'spacing', type: 'number', defaultValue: '0', description: 'Gap between children' },
      { name: 'reverse', type: 'boolean', defaultValue: 'false', description: 'Reverse the order of children' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full available width' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Basic Column',
        description: 'Stack children vertically with a spacing gap.',
        code: `import { Column } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function BasicColumnExample() {
  return (
    <Column spacing={12}>
      <Typography>First</Typography>
      <Typography>Second</Typography>
      <Typography>Third</Typography>
    </Column>
  )
}`,
      },
      {
        title: 'Main Axis Alignment',
        description: 'Control vertical distribution of children.',
        code: `import { Column } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function MainAxisExample() {
  return (
    <Column mainAxisAlignment="space-between" style={{ height: 200 }}>
      <Typography>Top</Typography>
      <Typography>Middle</Typography>
      <Typography>Bottom</Typography>
    </Column>
  )
}`,
      },
      {
        title: 'Cross Axis Alignment',
        description: 'Align children horizontally inside the column.',
        code: `import { Column } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function CrossAxisExample() {
  return (
    <Column crossAxisAlignment="center" fullWidth spacing={8}>
      <Typography>Centered item</Typography>
      <Typography>Another centered item</Typography>
    </Column>
  )
}`,
      },
    ],
  },

  row: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to arrange horizontally' },
      { name: 'mainAxisAlignment', type: '"start" | "center" | "end" | "space-between" | "space-around" | "space-evenly"', defaultValue: '"start"', description: 'Horizontal alignment of children' },
      { name: 'crossAxisAlignment', type: '"start" | "center" | "end" | "stretch" | "baseline"', defaultValue: '"start"', description: 'Vertical alignment of children' },
      { name: 'spacing', type: 'number', defaultValue: '0', description: 'Gap between children' },
      { name: 'reverse', type: 'boolean', defaultValue: 'false', description: 'Reverse the order of children' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full available width' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Basic Row',
        description: 'Align children side by side with a gap.',
        code: `import { Row } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function BasicRowExample() {
  return (
    <Row spacing={16}>
      <Typography>Left</Typography>
      <Typography>Center</Typography>
      <Typography>Right</Typography>
    </Row>
  )
}`,
      },
      {
        title: 'Space Between',
        description: 'Push items to the edges with space-between.',
        code: `import { Row } from '@xaui/native/view'
import { Button } from '@xaui/native/button'

export function SpaceBetweenExample() {
  return (
    <Row mainAxisAlignment="space-between" fullWidth>
      <Button variant="flat">Cancel</Button>
      <Button>Confirm</Button>
    </Row>
  )
}`,
      },
      {
        title: 'Vertically Centered',
        description: 'Center children on the cross (vertical) axis.',
        code: `import { Row } from '@xaui/native/view'
import { Avatar } from '@xaui/native/avatar'
import { Typography } from '@xaui/native/typography'

export function VerticalCenterExample() {
  return (
    <Row crossAxisAlignment="center" spacing={12}>
      <Avatar name="Jane Doe" size="sm" />
      <Typography style={{ fontWeight: 'bold' }}>Jane Doe</Typography>
    </Row>
  )
}`,
      },
    ],
  },

  spacer: {
    props: [
      { name: 'flex', type: 'number', defaultValue: '1', description: 'Flex factor for space distribution' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Push Items Apart',
        description: 'Place a Spacer between items to push them to opposite ends.',
        code: `import { Row, Spacer } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function SpacerExample() {
  return (
    <Row fullWidth>
      <Typography>Left</Typography>
      <Spacer />
      <Typography>Right</Typography>
    </Row>
  )
}`,
      },
      {
        title: 'Weighted Spacing',
        description: 'Use flex to distribute space unevenly.',
        code: `import { Row, Spacer } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function WeightedSpacerExample() {
  return (
    <Row fullWidth>
      <Typography>Start</Typography>
      <Spacer flex={2} />
      <Typography>Middle</Typography>
      <Spacer flex={1} />
      <Typography>End</Typography>
    </Row>
  )
}`,
      },
    ],
  },

  padding: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to wrap with padding' },
      { name: 'all', type: 'number', defaultValue: '-', description: 'Uniform padding on all sides' },
      { name: 'horizontal', type: 'number', defaultValue: '-', description: 'Horizontal padding (left + right)' },
      { name: 'vertical', type: 'number', defaultValue: '-', description: 'Vertical padding (top + bottom)' },
      { name: 'top', type: 'number', defaultValue: '-', description: 'Top padding' },
      { name: 'right', type: 'number', defaultValue: '-', description: 'Right padding' },
      { name: 'bottom', type: 'number', defaultValue: '-', description: 'Bottom padding' },
      { name: 'left', type: 'number', defaultValue: '-', description: 'Left padding' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full available width' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Uniform Padding',
        description: 'Apply the same padding to all sides with all.',
        code: `import { Padding } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function UniformPaddingExample() {
  return (
    <Padding all={16}>
      <Typography>Content with 16px padding on all sides</Typography>
    </Padding>
  )
}`,
      },
      {
        title: 'Directional Padding',
        description: 'Fine-tune padding per side.',
        code: `import { Padding } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function DirectionalPaddingExample() {
  return (
    <Padding top={24} bottom={8} horizontal={16}>
      <Typography>Custom padding per side</Typography>
    </Padding>
  )
}`,
      },
    ],
  },

  margin: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to wrap with margin' },
      { name: 'all', type: 'number', defaultValue: '-', description: 'Uniform margin on all sides' },
      { name: 'horizontal', type: 'number', defaultValue: '-', description: 'Horizontal margin (left + right)' },
      { name: 'vertical', type: 'number', defaultValue: '-', description: 'Vertical margin (top + bottom)' },
      { name: 'top', type: 'number', defaultValue: '-', description: 'Top margin' },
      { name: 'right', type: 'number', defaultValue: '-', description: 'Right margin' },
      { name: 'bottom', type: 'number', defaultValue: '-', description: 'Bottom margin' },
      { name: 'left', type: 'number', defaultValue: '-', description: 'Left margin' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full available width' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Uniform Margin',
        description: 'Add the same margin on all sides.',
        code: `import { Margin } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function UniformMarginExample() {
  return (
    <Margin all={16}>
      <Typography>Content offset by 16px on all sides</Typography>
    </Margin>
  )
}`,
      },
      {
        title: 'Vertical & Horizontal Margin',
        description: 'Combine vertical and horizontal shorthand props.',
        code: `import { Margin } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function DirectionalMarginExample() {
  return (
    <Margin vertical={24} horizontal={16}>
      <Typography>24px top/bottom, 16px left/right</Typography>
    </Margin>
  )
}`,
      },
    ],
  },

  'sized-box': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Optional content' },
      { name: 'width', type: 'number', defaultValue: '-', description: 'Fixed width in pixels' },
      { name: 'height', type: 'number', defaultValue: '-', description: 'Fixed height in pixels' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Fixed Spacer',
        description: 'Use SizedBox as a blank space between items.',
        code: `import { Column, SizedBox } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function SizedBoxSpacerExample() {
  return (
    <Column>
      <Typography>Section A</Typography>
      <SizedBox height={32} />
      <Typography>Section B</Typography>
    </Column>
  )
}`,
      },
      {
        title: 'Fixed-Size Container',
        description: 'Constrain a child to an exact size.',
        code: `import { SizedBox } from '@xaui/native/view'
import { View } from 'react-native'

export function FixedContainerExample() {
  return (
    <SizedBox width={80} height={80}>
      <View style={{ flex: 1, backgroundColor: '#4f46e5', borderRadius: 8 }} />
    </SizedBox>
  )
}`,
      },
    ],
  },

  'positioned-view': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to position absolutely' },
      { name: 'top', type: 'number', defaultValue: '-', description: 'Distance from top' },
      { name: 'right', type: 'number', defaultValue: '-', description: 'Distance from right' },
      { name: 'bottom', type: 'number', defaultValue: '-', description: 'Distance from bottom' },
      { name: 'left', type: 'number', defaultValue: '-', description: 'Distance from left' },
      { name: 'zIndex', type: 'number', defaultValue: '-', description: 'Stack order' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Badge Overlay',
        description: 'Position a badge absolutely over a parent element.',
        code: `import { PositionedView } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function BadgeOverlayExample() {
  return (
    <View style={{ width: 48, height: 48, position: 'relative' }}>
      <View style={{ width: 48, height: 48, backgroundColor: '#e2e8f0', borderRadius: 8 }} />
      <PositionedView top={-4} right={-4} zIndex={1}>
        <View style={{ width: 16, height: 16, backgroundColor: '#ef4444', borderRadius: 8 }} />
      </PositionedView>
    </View>
  )
}`,
      },
      {
        title: 'Bottom Label',
        description: 'Anchor a label to the bottom of a container.',
        code: `import { PositionedView } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function BottomLabelExample() {
  return (
    <View style={{ height: 120, position: 'relative', backgroundColor: '#1e293b', borderRadius: 12 }}>
      <PositionedView bottom={8} left={12} right={12}>
        <Typography style={{ color: '#fff', fontWeight: 'bold' }}>Overlay label</Typography>
      </PositionedView>
    </View>
  )
}`,
      },
    ],
  },

  'blur-view': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content displayed over the blur' },
      { name: 'intensity', type: 'number', defaultValue: '50', description: 'Blur intensity (0–100)' },
      { name: 'unlockable', type: 'boolean', defaultValue: 'false', description: 'Enable unlock/reveal interaction' },
      { name: 'overlayColor', type: 'ColorValue', defaultValue: '-', description: 'Color overlay tint' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Frosted Glass Effect',
        description: 'Blur the background behind the children.',
        code: `import { BlurView } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function FrostedGlassExample() {
  return (
    <BlurView intensity={60} style={{ padding: 16, borderRadius: 12 }}>
      <Typography style={{ fontWeight: 'bold' }}>Frosted content</Typography>
    </BlurView>
  )
}`,
      },
      {
        title: 'Unlockable Blur',
        description: 'Hide premium content behind a blur that the user can reveal.',
        code: `import { BlurView } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function UnlockableBlurExample() {
  return (
    <BlurView intensity={80} unlockable>
      <Typography>This content is hidden until unlocked</Typography>
    </BlurView>
  )
}`,
      },
    ],
  },

  'rounded-view': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to wrap' },
      { name: 'all', type: 'number', defaultValue: '-', description: 'Uniform border radius on all corners' },
      { name: 'top', type: 'number', defaultValue: '-', description: 'Top corners radius' },
      { name: 'bottom', type: 'number', defaultValue: '-', description: 'Bottom corners radius' },
      { name: 'left', type: 'number', defaultValue: '-', description: 'Left corners radius' },
      { name: 'right', type: 'number', defaultValue: '-', description: 'Right corners radius' },
      { name: 'topLeft', type: 'number', defaultValue: '-', description: 'Top-left corner radius' },
      { name: 'topRight', type: 'number', defaultValue: '-', description: 'Top-right corner radius' },
      { name: 'bottomLeft', type: 'number', defaultValue: '-', description: 'Bottom-left corner radius' },
      { name: 'bottomRight', type: 'number', defaultValue: '-', description: 'Bottom-right corner radius' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full available width' },
      { name: 'backgroundColor', type: 'string', defaultValue: '-', description: 'Background color' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: 'Uniform Radius',
        description: 'Round all corners equally.',
        code: `import { RoundedView } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function UniformRadiusExample() {
  return (
    <RoundedView all={16} backgroundColor="#4f46e5">
      <Typography style={{ color: '#fff', padding: 12 }}>Rounded card</Typography>
    </RoundedView>
  )
}`,
      },
      {
        title: 'Asymmetric Radius',
        description: 'Round only specific corners for a custom shape.',
        code: `import { RoundedView } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'

export function AsymmetricRadiusExample() {
  return (
    <RoundedView topLeft={24} topRight={24} bottomLeft={4} bottomRight={4} backgroundColor="#0ea5e9">
      <Typography style={{ color: '#fff', padding: 12 }}>Custom shape</Typography>
    </RoundedView>
  )
}`,
      },
    ],
  },

  'aspect-ratio': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to constrain' },
      { name: 'ratio', type: 'number', defaultValue: '-', description: 'Aspect ratio (width / height), e.g. 16/9' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional styles' },
    ],
    examples: [
      {
        title: '16:9 Video Thumbnail',
        description: 'Keep an image in a 16:9 ratio regardless of screen width.',
        code: `import { AspectRatio } from '@xaui/native/view'
import { Image } from 'react-native'

export function VideoThumbnailExample() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        source={{ uri: 'https://picsum.photos/800/450' }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </AspectRatio>
  )
}`,
      },
      {
        title: 'Square Avatar',
        description: 'Force a 1:1 ratio for a perfect square.',
        code: `import { AspectRatio } from '@xaui/native/view'
import { View } from 'react-native'

export function SquareExample() {
  return (
    <AspectRatio ratio={1} style={{ width: 80 }}>
      <View style={{ flex: 1, backgroundColor: '#f59e0b', borderRadius: 8 }} />
    </AspectRatio>
  )
}`,
      },
    ],
  },

  grid: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'GridItem children' },
      { name: 'columns', type: 'number', defaultValue: '2', description: 'Number of columns' },
      { name: 'spacing', type: 'number', defaultValue: '0', description: 'Gap between items (row and column)' },
      { name: 'rowSpacing', type: 'number', defaultValue: '-', description: 'Vertical gap between rows' },
      { name: 'columnSpacing', type: 'number', defaultValue: '-', description: 'Horizontal gap between columns' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Container styles' },
      { name: 'itemStyle', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Applied to each grid cell' },
    ],
    examples: [
      {
        title: 'Static Grid with GridItem',
        description: 'Lay out a fixed set of cells using GridItem.',
        code: `import { Grid, GridItem } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function StaticGridExample() {
  return (
    <Grid columns={3} spacing={8}>
      <GridItem><View style={{ height: 80, backgroundColor: '#e0e7ff', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Typography>A</Typography></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#dbeafe', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Typography>B</Typography></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#dcfce7', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Typography>C</Typography></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#fef9c3', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Typography>D</Typography></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#ffe4e6', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Typography>E</Typography></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#f3e8ff', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Typography>F</Typography></View></GridItem>
    </Grid>
  )
}`,
      },
      {
        title: 'Dynamic Grid with GridBuilder',
        description: 'Render a data array into a grid using GridBuilder.',
        code: `import { GridBuilder } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

const products = [
  { id: '1', name: 'Item A' },
  { id: '2', name: 'Item B' },
  { id: '3', name: 'Item C' },
  { id: '4', name: 'Item D' },
]

export function DynamicGridExample() {
  return (
    <GridBuilder
      data={products}
      keyExtractor={item => item.id}
      columns={2}
      spacing={12}
      renderItem={item => (
        <View style={{ height: 100, backgroundColor: '#f1f5f9', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Typography>{item.name}</Typography>
        </View>
      )}
    />
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'GridItem',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Cell content' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional cell styles' },
        ],
      },
      {
        name: 'GridBuilder',
        props: [
          { name: 'data', type: 'T[]', defaultValue: '-', description: 'Array of items to render' },
          { name: 'keyExtractor', type: '(item: T, index: number) => string', defaultValue: '-', description: 'Unique key extractor' },
          { name: 'renderItem', type: '(item: T, index: number) => ReactNode', defaultValue: '-', description: 'Item renderer' },
          { name: 'columns', type: 'number', defaultValue: '2', description: 'Number of columns' },
          { name: 'spacing', type: 'number', defaultValue: '0', description: 'Gap between items' },
          { name: 'rowSpacing', type: 'number', defaultValue: '-', description: 'Vertical gap between rows' },
          { name: 'columnSpacing', type: 'number', defaultValue: '-', description: 'Horizontal gap between columns' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Container styles' },
          { name: 'itemStyle', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Applied to each grid cell' },
        ],
      },
    ],
  },

  'masonry-grid': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'MasonryGridItem children' },
      { name: 'columns', type: 'number', defaultValue: '2', description: 'Number of columns' },
      { name: 'spacing', type: 'number', defaultValue: '0', description: 'Gap between items' },
      { name: 'rowSpacing', type: 'number', defaultValue: '-', description: 'Vertical gap' },
      { name: 'columnSpacing', type: 'number', defaultValue: '-', description: 'Horizontal gap' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Container styles' },
      { name: 'columnStyle', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Applied to each column' },
    ],
    examples: [
      {
        title: 'Static Masonry',
        description: 'Items of varying heights placed in masonry columns using MasonryGridItem.',
        code: `import { MasonryGrid, MasonryGridItem } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

export function StaticMasonryExample() {
  return (
    <MasonryGrid columns={2} spacing={8}>
      <MasonryGridItem><View style={{ height: 120, backgroundColor: '#dbeafe', borderRadius: 8 }} /></MasonryGridItem>
      <MasonryGridItem><View style={{ height: 80, backgroundColor: '#dcfce7', borderRadius: 8 }} /></MasonryGridItem>
      <MasonryGridItem><View style={{ height: 160, backgroundColor: '#fef9c3', borderRadius: 8 }} /></MasonryGridItem>
      <MasonryGridItem><View style={{ height: 100, backgroundColor: '#ffe4e6', borderRadius: 8 }} /></MasonryGridItem>
      <MasonryGridItem><View style={{ height: 90, backgroundColor: '#f3e8ff', borderRadius: 8 }} /></MasonryGridItem>
    </MasonryGrid>
  )
}`,
      },
      {
        title: 'Dynamic Masonry with MasonryGridBuilder',
        description: 'Render variable-height items from a data array.',
        code: `import { MasonryGridBuilder } from '@xaui/native/view'
import { Typography } from '@xaui/native/typography'
import { View } from 'react-native'

const photos = [
  { id: '1', height: 130, label: 'Photo A' },
  { id: '2', height: 90, label: 'Photo B' },
  { id: '3', height: 160, label: 'Photo C' },
  { id: '4', height: 110, label: 'Photo D' },
]

export function DynamicMasonryExample() {
  return (
    <MasonryGridBuilder
      data={photos}
      keyExtractor={item => item.id}
      columns={2}
      spacing={8}
      renderItem={item => (
        <View style={{ height: item.height, backgroundColor: '#f1f5f9', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Typography>{item.label}</Typography>
        </View>
      )}
    />
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'MasonryGridItem',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Cell content' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional cell styles' },
        ],
      },
      {
        name: 'MasonryGridBuilder',
        props: [
          { name: 'data', type: 'T[]', defaultValue: '-', description: 'Array of items to render' },
          { name: 'keyExtractor', type: '(item: T, index: number) => string', defaultValue: '-', description: 'Unique key extractor' },
          { name: 'renderItem', type: '(item: T, index: number) => ReactNode', defaultValue: '-', description: 'Item renderer' },
          { name: 'columns', type: 'number', defaultValue: '2', description: 'Number of columns' },
          { name: 'spacing', type: 'number', defaultValue: '0', description: 'Gap between items' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Container styles' },
          { name: 'columnStyle', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Applied to each column' },
        ],
      },
    ],
  },

  snackbar: {
    props: [
      { name: 'message', type: 'ReactNode', defaultValue: '-', description: 'Message content shown inside the snackbar' },
      { name: 'isVisible', type: 'boolean', defaultValue: 'true', description: 'Controls snackbar visibility' },
      { name: 'duration', type: 'number', defaultValue: '4000', description: 'Auto-dismiss delay in ms. Set to 0 to disable' },
      { name: 'position', type: '"top" | "bottom"', defaultValue: '"bottom"', description: 'Position on screen' },
      { name: 'actionLabel', type: 'ReactNode', defaultValue: '-', description: 'Action content displayed at the end' },
      { name: 'closeOnActionPress', type: 'boolean', defaultValue: 'true', description: 'Dismiss when action is pressed' },
      { name: 'showCloseAffordance', type: 'boolean', defaultValue: 'false', description: 'Show a close icon button' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"default"', description: 'Color theme. Default uses Material 3 inverse surface' },
      { name: 'numberOfLines', type: 'number', defaultValue: '2', description: 'Max lines for the message text' },
      { name: 'insetHorizontal', type: 'number', defaultValue: '16', description: 'Horizontal inset from screen edges' },
      { name: 'insetVertical', type: 'number', defaultValue: '16', description: 'Vertical inset from screen edge' },
      { name: 'maxWidth', type: 'number', defaultValue: '640', description: 'Maximum width of the snackbar surface' },
      { name: 'usePortal', type: 'boolean', defaultValue: 'true', description: 'Render in a portal overlay' },
      { name: 'customAppearance', type: '{ container?: ViewStyle; message?: TextStyle; action?: TextStyle; closeButton?: ViewStyle }', defaultValue: '-', description: 'Custom style overrides for snackbar parts' },
    ],
    events: [
      { name: 'onActionPress', type: '() => void', description: 'Called when the action label is pressed' },
      { name: 'onClose', type: '() => void', description: 'Called when the snackbar is dismissed' },
      { name: 'onVisibleChange', type: '(isVisible: boolean) => void', description: 'Called when visibility changes' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'A simple snackbar with a message.',
        code: `import { useState } from 'react'
import { Snackbar } from '@xaui/native/snackbar'
import { Button } from '@xaui/native/button'

export function BasicExample() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onPress={() => setVisible(true)}>Show Snackbar</Button>
      <Snackbar
        message="File saved successfully."
        isVisible={visible}
        onClose={() => setVisible(false)}
      />
    </>
  )
}`,
      },
      {
        title: 'With Action',
        description: 'Snackbar with an action label the user can tap.',
        code: `import { useState } from 'react'
import { Snackbar } from '@xaui/native/snackbar'
import { Button } from '@xaui/native/button'

export function WithActionExample() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onPress={() => setVisible(true)}>Show</Button>
      <Snackbar
        message="Message deleted."
        actionLabel="Undo"
        onActionPress={() => console.log('undo')}
        isVisible={visible}
        onClose={() => setVisible(false)}
      />
    </>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Use themeColor to convey semantic meaning.',
        code: `import { useState } from 'react'
import { Snackbar } from '@xaui/native/snackbar'
import { Button } from '@xaui/native/button'
import { Column } from '@xaui/native/view'

export function ThemeColorsExample() {
  const [color, setColor] = useState<string | null>(null)

  return (
    <Column gap={8}>
      <Button onPress={() => setColor('success')}>Success</Button>
      <Button onPress={() => setColor('danger')}>Danger</Button>
      <Button onPress={() => setColor('warning')}>Warning</Button>
      <Snackbar
        message="Operation completed."
        themeColor={color as 'success' | 'danger' | 'warning'}
        isVisible={color !== null}
        onClose={() => setColor(null)}
      />
    </Column>
  )
}`,
      },
      {
        title: 'Stack',
        description: 'Show multiple snackbars at once with SnackbarStack.',
        code: `import { useState } from 'react'
import { SnackbarStack } from '@xaui/native/snackbar'
import type { SnackbarItem } from '@xaui/native/snackbar'
import { Button } from '@xaui/native/button'

export function StackExample() {
  const [items, setItems] = useState<SnackbarItem[]>([])

  const addItem = () => {
    const id = Date.now().toString()
    setItems(prev => [...prev, { id, message: \`Notification \${prev.length + 1}\` }])
  }

  const dismiss = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <>
      <Button onPress={addItem}>Add notification</Button>
      <SnackbarStack items={items} onDismiss={dismiss} />
    </>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'SnackbarStack',
        props: [
          { name: 'items', type: 'SnackbarItem[]', defaultValue: '-', description: 'Snackbar items to render in a vertical stack' },
          { name: 'position', type: '"top" | "bottom"', defaultValue: '"bottom"', description: 'Position of the stacked snackbars' },
          { name: 'spacing', type: 'number', defaultValue: '8', description: 'Space between stacked snackbars' },
          { name: 'defaultDuration', type: 'number', defaultValue: '4000', description: 'Default auto-dismiss duration for items without duration' },
          { name: 'insetHorizontal', type: 'number', defaultValue: '16', description: 'Horizontal inset from screen edges' },
          { name: 'insetVertical', type: 'number', defaultValue: '16', description: 'Vertical inset from screen edge' },
          { name: 'maxWidth', type: 'number', defaultValue: '640', description: 'Maximum width of each snackbar surface' },
          { name: 'usePortal', type: 'boolean', defaultValue: 'true', description: 'Render stack in a portal overlay' },
          { name: 'customAppearance', type: '{ container?: ViewStyle; content?: ViewStyle }', defaultValue: '-', description: 'Custom style overrides for the stack container' },
        ],
        events: [
          { name: 'onDismiss', type: '(id: string) => void', description: 'Called when an item requests dismissal' },
        ],
      },
    ],
  },
  'conditional-view': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content to conditionally render' },
      { name: 'isVisible', type: 'boolean', defaultValue: '-', description: 'Controls visibility' },
      { name: 'animation', type: '"fade" | "scale"', defaultValue: '"fade"', description: 'Transition animation type' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable transition animation' },
    ],
    examples: [
      {
        title: 'Fade In/Out',
        description: 'Toggle content visibility with a fade animation.',
        code: `import { useState } from 'react'
import { ConditionalView } from '@xaui/native/view'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'

export function FadeExample() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onPress={() => setVisible(v => !v)}>Toggle</Button>
      <ConditionalView isVisible={visible} animation="fade">
        <Typography>This content fades in and out</Typography>
      </ConditionalView>
    </>
  )
}`,
      },
      {
        title: 'Scale Animation',
        description: 'Show/hide with a scale transition.',
        code: `import { useState } from 'react'
import { ConditionalView } from '@xaui/native/view'
import { Button } from '@xaui/native/button'
import { Typography } from '@xaui/native/typography'

export function ScaleExample() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onPress={() => setVisible(v => !v)}>Toggle</Button>
      <ConditionalView isVisible={visible} animation="scale">
        <Typography>This content scales in and out</Typography>
      </ConditionalView>
    </>
  )
}`,
      },
    ],
  },
  'input-trigger': {
    props: [
      { name: 'value', type: 'ReactNode', defaultValue: '-', description: 'Content displayed inside the trigger' },
      { name: 'placeholder', type: 'string', defaultValue: '"Select..."', description: 'Text shown when no value is set' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Label displayed above or inside the trigger' },
      { name: 'labelPlacement', type: '"outside" | "inside"', defaultValue: '"outside"', description: 'Position of the label' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Helper text below the trigger' },
      { name: 'errorMessage', type: 'ReactNode', defaultValue: '-', description: 'Error text when isInvalid is true' },
      { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Content at the start of the trigger' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Content at the end of the trigger' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme for focus/active states' },
      { name: 'variant', type: '"flat" | "faded" | "bordered" | "underlined"', defaultValue: '"flat"', description: 'Visual style variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Size of the trigger' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable the trigger' },
      { name: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Show invalid state styling' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'true', description: 'Take the full available width' },
      { name: 'customAppearance', type: 'InputTriggerCustomAppearance', defaultValue: '-', description: 'Custom style overrides for trigger parts' },
    ],
    events: [
      { name: 'onPress', type: '() => void', description: 'Called when the trigger is pressed' },
    ],
    examples: [
      {
        title: 'Basic',
        description: 'A simple trigger styled like an input.',
        code: `import { InputTrigger } from '@xaui/native/input-trigger'

export function BasicExample() {
  return (
    <InputTrigger
      label="Color"
      placeholder="Pick a value..."
      onPress={() => {}}
    />
  )
}`,
      },
      {
        title: 'Variants',
        code: `import { InputTrigger } from '@xaui/native/input-trigger'
import { Column } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Column gap={12}>
      <InputTrigger label="Flat" variant="flat" value="Selected value" onPress={() => {}} />
      <InputTrigger label="Bordered" variant="bordered" value="Selected value" onPress={() => {}} />
      <InputTrigger label="Faded" variant="faded" value="Selected value" onPress={() => {}} />
      <InputTrigger label="Underlined" variant="underlined" value="Selected value" onPress={() => {}} />
    </Column>
  )
}`,
      },
    ],
  },
  picker: {
    props: [
      { name: 'options', type: 'PickerOption[]', defaultValue: '-', description: 'Array of selectable options' },
      { name: 'value', type: 'string', defaultValue: '-', description: 'Currently selected value (controlled)' },
      { name: 'placeholder', type: 'string', defaultValue: '"Select an option..."', description: 'Placeholder when no value is selected' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Label for the trigger' },
      { name: 'labelPlacement', type: '"outside" | "inside"', defaultValue: '"outside"', description: 'Label position' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Helper text below the trigger' },
      { name: 'errorMessage', type: 'ReactNode', defaultValue: '-', description: 'Error text when isInvalid is true' },
      { name: 'sheetTitle', type: 'string', defaultValue: '-', description: 'Title shown inside the bottom sheet' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'variant', type: '"flat" | "faded" | "bordered" | "underlined"', defaultValue: '"flat"', description: 'Trigger visual variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Trigger size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'isOpened', type: 'boolean', defaultValue: '-', description: 'Controlled open state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable the picker' },
      { name: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Show invalid state' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'true', description: 'Take full available width' },
      { name: 'sheetStyle', type: 'ViewStyle', defaultValue: '-', description: 'Custom style for the bottom sheet' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Custom end content replacing the chevron' },
    ],
    events: [
      { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the selected value changes' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', description: 'Called when the sheet opens or closes' },
      { name: 'onClose', type: '() => void', description: 'Called when the sheet closes' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `import { useState } from 'react'
import { Picker } from '@xaui/native/picker'

export function BasicExample() {
  const [value, setValue] = useState('')

  return (
    <Picker
      label="Country"
      placeholder="Select a country..."
      options={[
        { label: 'France', value: 'fr' },
        { label: 'United States', value: 'us' },
        { label: 'Japan', value: 'jp' },
        { label: 'Brazil', value: 'br' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  )
}`,
      },
      {
        title: 'With sheet title',
        code: `import { useState } from 'react'
import { Picker } from '@xaui/native/picker'

export function SheetTitleExample() {
  const [value, setValue] = useState('')

  return (
    <Picker
      label="Language"
      sheetTitle="Select a language"
      options={[
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'Spanish', value: 'es' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  )
}`,
      },
    ],
  },
  'color-picker': {
    props: [
      { name: 'value', type: 'string', defaultValue: '-', description: 'Currently selected hex color string' },
      { name: 'placeholder', type: 'string', defaultValue: '"Pick a color..."', description: 'Placeholder text when no color is selected' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Label for the trigger' },
      { name: 'labelPlacement', type: '"outside" | "inside"', defaultValue: '"outside"', description: 'Label position' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Helper text below the trigger' },
      { name: 'errorMessage', type: 'ReactNode', defaultValue: '-', description: 'Error text when isInvalid is true' },
      { name: 'colorGroups', type: 'ColorGroup[]', defaultValue: 'defaultColorGroups', description: 'Custom color groups (name + colors array)' },
      { name: 'sheetTitle', type: 'string', defaultValue: '"Pick a color"', description: 'Title shown at the top of the sheet' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme for the trigger and selection highlight' },
      { name: 'variant', type: '"flat" | "faded" | "bordered" | "underlined"', defaultValue: '"flat"', description: 'Trigger visual variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Trigger size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'isOpened', type: 'boolean', defaultValue: '-', description: 'Controlled open state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable the color picker' },
      { name: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Show invalid state' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'true', description: 'Take full available width' },
      { name: 'sheetStyle', type: 'ViewStyle', defaultValue: '-', description: 'Custom style for the bottom sheet' },
      { name: 'swatchSize', type: 'number', defaultValue: '28', description: 'Size in pixels of each color swatch' },
    ],
    events: [
      { name: 'onColorChange', type: '(color: string) => void', description: 'Called when a color is selected' },
      { name: 'onOpenChange', type: '(isOpen: boolean) => void', description: 'Called when the sheet opens or closes' },
      { name: 'onClose', type: '() => void', description: 'Called when the sheet closes' },
    ],
    examples: [
      {
        title: 'Basic',
        code: `import { useState } from 'react'
import { ColorPicker } from '@xaui/native/color-picker'

export function BasicExample() {
  const [color, setColor] = useState('')

  return (
    <ColorPicker
      label="Brand color"
      value={color}
      onColorChange={setColor}
    />
  )
}`,
      },
      {
        title: 'Custom palette',
        code: `import { useState } from 'react'
import { ColorPicker } from '@xaui/native/color-picker'

const brandColors = [
  {
    name: 'Brand',
    colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#22c55e'],
  },
]

export function CustomPaletteExample() {
  const [color, setColor] = useState('')

  return (
    <ColorPicker
      label="Brand color"
      colorGroups={brandColors}
      value={color}
      onColorChange={setColor}
    />
  )
}`,
      },
    ],
  },
}
