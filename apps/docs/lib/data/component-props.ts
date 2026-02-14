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
import { Text } from 'react-native'

export function CustomIconExample() {
  return (
    <Alert
      title="Tip"
      description="Long-press any item to see more options."
      themeColor="secondary"
      icon={<Text>💡</Text>}
    />
  )
}`,
      },
    ],
  },

  'app-bar': {
    props: [
      { name: 'variant', type: '"docked" | "floating"', defaultValue: '"docked"', description: 'Layout variant of the app bar' },
      { name: 'elevation', type: 'number', defaultValue: '0', description: 'Shadow elevation level' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'AppBarStartContent, AppBarContent, AppBarEndContent' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
    ],
    examples: [
      {
        title: 'Basic App Bar',
        description: 'Title centered with a back button on the left.',
        code: `import { AppBar, AppBarStartContent, AppBarContent, AppBarEndContent } from '@xaui/native/app-bar'
import { IconButton } from '@xaui/native/button'
import { Text } from 'react-native'

export function BasicExample() {
  return (
    <AppBar>
      <AppBarStartContent>
        <IconButton icon={<Text>←</Text>} onPress={() => {}} />
      </AppBarStartContent>
      <AppBarContent>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Home</Text>
      </AppBarContent>
    </AppBar>
  )
}`,
      },
      {
        title: 'With End Actions',
        description: 'Add action buttons on the right with AppBarEndContent.',
        code: `import { AppBar, AppBarStartContent, AppBarContent, AppBarEndContent } from '@xaui/native/app-bar'
import { IconButton } from '@xaui/native/button'
import { Text } from 'react-native'

export function WithActionsExample() {
  return (
    <AppBar>
      <AppBarStartContent>
        <IconButton icon={<Text>☰</Text>} onPress={() => {}} />
      </AppBarStartContent>
      <AppBarContent>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Dashboard</Text>
      </AppBarContent>
      <AppBarEndContent>
        <IconButton icon={<Text>🔔</Text>} onPress={() => {}} />
        <IconButton icon={<Text>⚙️</Text>} onPress={() => {}} />
      </AppBarEndContent>
    </AppBar>
  )
}`,
      },
      {
        title: 'Floating Variant',
        description: 'Detached app bar that floats above the content.',
        code: `import { AppBar, AppBarContent } from '@xaui/native/app-bar'
import { Text } from 'react-native'

export function FloatingExample() {
  return (
    <AppBar variant="floating" elevation={2}>
      <AppBarContent>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Search</Text>
      </AppBarContent>
    </AppBar>
  )
}`,
      },
      {
        title: 'Theme Colors',
        description: 'Change the app bar color with themeColor.',
        code: `import { AppBar, AppBarContent } from '@xaui/native/app-bar'
import { Text } from 'react-native'
import { Column } from '@xaui/native/view'

export function ThemeColorsExample() {
  return (
    <Column gap={8}>
      <AppBar themeColor="primary">
        <AppBarContent><Text>Primary</Text></AppBarContent>
      </AppBar>
      <AppBar themeColor="secondary">
        <AppBarContent><Text>Secondary</Text></AppBarContent>
      </AppBar>
      <AppBar themeColor="success">
        <AppBarContent><Text>Success</Text></AppBarContent>
      </AppBar>
    </Column>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'AppBarStartContent',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content rendered at the start (left) of the app bar' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
        ],
      },
      {
        name: 'AppBarContent',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Main content area (typically a title)' },
          { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional styles' },
        ],
      },
      {
        name: 'AppBarEndContent',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content rendered at the end (right) of the app bar' },
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
          <Text style={{ fontSize: 10 }}>N/A</Text>
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
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>+{count}</Text>
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
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Element the badge is attached to' },
      { name: 'content', type: 'ReactNode', defaultValue: '-', description: 'Badge label or count' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'variant', type: '"solid" | "flat" | "faded" | "shadow"', defaultValue: '"solid"', description: 'Visual style variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Badge size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius' },
      { name: 'placement', type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', defaultValue: '"top-right"', description: 'Badge position relative to child' },
      { name: 'showOutline', type: 'boolean', defaultValue: 'false', description: 'Show outline ring around badge' },
      { name: 'isInvisible', type: 'boolean', defaultValue: 'false', description: 'Hide the badge' },
      { name: 'isDot', type: 'boolean', defaultValue: 'false', description: 'Render as a small dot indicator' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable scale animation' },
      { name: 'customAppearance', type: '{ container?: ViewStyle; badge?: ViewStyle; text?: TextStyle }', defaultValue: '-', description: 'Custom style overrides' },
    ],
  },

  'bottom-sheet': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Content rendered inside the sheet' },
      { name: 'isOpen', type: 'boolean', defaultValue: '-', description: 'Controls whether the sheet is open' },
      { name: 'snapPoints', type: '[number, ...number[]]', defaultValue: '-', description: 'Snap point heights (0–1 as percentage or pixels)' },
      { name: 'initialSnapIndex', type: 'number', defaultValue: '0', description: 'Index of the initial snap point' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"lg"', description: 'Top corner radius' },
      { name: 'showBackdrop', type: 'boolean', defaultValue: 'true', description: 'Show backdrop overlay' },
      { name: 'closeOnBackdropPress', type: 'boolean', defaultValue: 'true', description: 'Close when backdrop is pressed' },
      { name: 'enableSwipeToDismiss', type: 'boolean', defaultValue: 'true', description: 'Allow swiping down to close' },
      { name: 'showHandle', type: 'boolean', defaultValue: 'true', description: 'Show drag handle at top' },
      { name: 'handleContent', type: 'ReactNode', defaultValue: '-', description: 'Custom handle element' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable slide animation' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
    ],
    events: [
      { name: 'onClose', type: '() => void', description: 'Called when the sheet is dismissed' },
      { name: 'onSnapChange', type: '(index: number) => void', description: 'Called when snap point changes' },
    ],
  },

  'bottom-tab-bar': {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'BottomTabBarItem children' },
      { name: 'selectedKey', type: 'string', defaultValue: '-', description: 'Controlled selected tab key' },
      { name: 'defaultSelectedKey', type: 'string', defaultValue: '-', description: 'Initial selected key (uncontrolled)' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Tab bar size' },
      { name: 'variant', type: '"stacked" | "inline" | "icon-only"', defaultValue: '"stacked"', description: 'Layout variant' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable all tab items' },
      { name: 'showLabel', type: 'boolean', defaultValue: 'true', description: 'Show labels under icons' },
      { name: 'insetBottom', type: 'number', defaultValue: '0', description: 'Bottom inset for safe area' },
      { name: 'activeColor', type: 'string', defaultValue: '-', description: 'Active tab color override' },
      { name: 'inactiveColor', type: 'string', defaultValue: '-', description: 'Inactive tab color override' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(key: string) => void', description: 'Called when a tab is selected' },
    ],
    subComponents: [
      {
        name: 'BottomTabBarItem',
        props: [
          { name: 'itemKey', type: 'string', defaultValue: '-', description: 'Unique key for this tab item' },
          { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Tab label' },
          { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Tab icon' },
          { name: 'activeIcon', type: 'ReactNode', defaultValue: '-', description: 'Icon shown when tab is active' },
          { name: 'badge', type: 'ReactNode', defaultValue: '-', description: 'Badge element on the tab' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable this tab item' },
          { name: 'showLabel', type: 'boolean', defaultValue: 'true', description: 'Show label for this item' },
          { name: 'customAppearance', type: 'BottomTabBarItemCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
        ],
        events: [
          { name: 'onPress', type: '(event: GestureResponderEvent) => void', description: 'Called when the tab is pressed' },
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
import { Text } from 'react-native'

export function WithIconsExample() {
  return (
    <Button startContent={<Text>⬅</Text>} endContent={<Text>➡</Text>}>
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
import { Text } from 'react-native'

export function IconButtonExample() {
  return <IconButton icon={<Text>🔔</Text>} onPress={() => {}} />
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
import { Text } from 'react-native'

export function FullCardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification</CardTitle>
        <CardDescription>You have 3 unread messages</CardDescription>
      </CardHeader>
      <CardBody>
        <Text>Open your inbox to see the latest updates from your team.</Text>
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
import { Text } from 'react-native'

export function HeaderExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Last updated 2 hours ago</CardDescription>
      </CardHeader>
      <CardBody>
        <Text>Progress: 74% complete</Text>
      </CardBody>
    </Card>
  )
}`,
      },
      {
        title: 'Pressable Card',
        description: 'Make the entire card tappable.',
        code: `import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '@xaui/native/card'
import { Text } from 'react-native'

export function PressableCardExample() {
  return (
    <Card isPressable onPress={() => {}}>
      <CardHeader>
        <CardTitle>Open details</CardTitle>
        <CardDescription>Tap anywhere on the card</CardDescription>
      </CardHeader>
      <CardBody>
        <Text>More information about this item.</Text>
      </CardBody>
    </Card>
  )
}`,
      },
      {
        title: 'Elevated Card',
        description: 'Add a shadow with the elevation prop.',
        code: `import { Card, CardHeader, CardTitle, CardBody } from '@xaui/native/card'
import { Text } from 'react-native'

export function ElevatedCardExample() {
  return (
    <Card elevation={3}>
      <CardHeader>
        <CardTitle>Elevated</CardTitle>
      </CardHeader>
      <CardBody>
        <Text>This card casts a shadow.</Text>
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
import { View, Text } from 'react-native'

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
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{item.label}</Text>
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
import { View, Text } from 'react-native'

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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
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
import { View, Text } from 'react-native'

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
          <Text style={{ color: '#fff', fontSize: 22 }}>{item.label}</Text>
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
      { name: 'title', type: 'string', defaultValue: '-', description: 'Chart card title' },
      { name: 'data', type: 'ChartDataItem[]', defaultValue: '-', description: 'Chart data array' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
    ],
    subComponents: [
      {
        name: 'DonutChartCard',
        props: [
          { name: 'title', type: 'string', defaultValue: '-', description: 'Chart title' },
          { name: 'data', type: 'DonutChartItem[]', defaultValue: '-', description: 'Segments data' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
        ],
      },
      {
        name: 'PieChartCard',
        props: [
          { name: 'title', type: 'string', defaultValue: '-', description: 'Chart title' },
          { name: 'data', type: 'PieChartItem[]', defaultValue: '-', description: 'Slices data' },
        ],
      },
      {
        name: 'VerticalBarChartCard',
        props: [
          { name: 'title', type: 'string', defaultValue: '-', description: 'Chart title' },
          { name: 'data', type: 'BarChartItem[]', defaultValue: '-', description: 'Bar data' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
        ],
      },
      {
        name: 'LineChartCard',
        props: [
          { name: 'title', type: 'string', defaultValue: '-', description: 'Chart title' },
          { name: 'data', type: 'LineChartItem[]', defaultValue: '-', description: 'Line data points' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
        ],
      },
      {
        name: 'HeatmapChartCard',
        props: [
          { name: 'title', type: 'string', defaultValue: '-', description: 'Chart title' },
          { name: 'data', type: 'HeatmapItem[][]', defaultValue: '-', description: '2D heatmap data' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
        ],
      },
    ],
  },

  checkbox: {
    props: [
      { name: 'label', type: 'string', defaultValue: '-', description: 'Checkbox label text' },
      { name: 'isChecked', type: 'boolean', defaultValue: 'false', description: 'Controlled checked state' },
      { name: 'isIndeterminate', type: 'boolean', defaultValue: 'false', description: 'Indeterminate state' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'variant', type: '"filled" | "light"', defaultValue: '"filled"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Checkbox size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"sm"', description: 'Border radius' },
      { name: 'labelAlignment', type: '"left" | "right" | "justify-left" | "justify-right"', defaultValue: '"right"', description: 'Label position relative to checkbox' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expand to full container width' },
      { name: 'labelStyle', type: 'TextStyle', defaultValue: '-', description: 'Custom label text styles' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
    ],
    events: [
      { name: 'onValueChange', type: '(isChecked: boolean) => void', description: 'Called when checked state changes' },
    ],
    examples: [
      {
        title: 'Basic Checkbox',
        description: 'A simple labeled checkbox.',
        code: `import { Checkbox } from '@xaui/native/checkbox'

export function BasicExample() {
  return <Checkbox label="Accept terms and conditions" />
}`,
      },
      {
        title: 'Controlled State',
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
        title: 'Indeterminate State',
        description: 'Represent a partially selected group.',
        code: `import { Checkbox } from '@xaui/native/checkbox'

export function IndeterminateExample() {
  return <Checkbox label="Select all" isIndeterminate />
}`,
      },
      {
        title: 'Disabled',
        description: 'Prevent user interaction.',
        code: `import { Checkbox } from '@xaui/native/checkbox'

export function DisabledExample() {
  return <Checkbox label="Disabled option" isDisabled />
}`,
      },
    ],
  },

  chip: {
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Chip label content' },
      { name: 'variant', type: '"solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot"', defaultValue: '"solid"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Chip size' },
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"full"', description: 'Border radius' },
      { name: 'avatar', type: 'ReactNode', defaultValue: '-', description: 'Avatar element at start' },
      { name: 'startContent', type: 'ReactNode', defaultValue: '-', description: 'Element at start of chip' },
      { name: 'endContent', type: 'ReactNode', defaultValue: '-', description: 'Element at end of chip' },
      { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
      { name: 'customAppearance', type: 'ChipCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onClose', type: '() => void', description: 'Called when close button is pressed' },
      { name: 'onPress', type: '() => void', description: 'Called when chip is pressed' },
    ],
    examples: [
      {
        title: 'Variants',
        description: 'All chip visual styles.',
        code: `import { Chip } from '@xaui/native/chip'
import { Row } from '@xaui/native/view'

export function VariantsExample() {
  return (
    <Row gap={8} flexWrap="wrap">
      <Chip variant="solid">Solid</Chip>
      <Chip variant="bordered">Bordered</Chip>
      <Chip variant="light">Light</Chip>
      <Chip variant="flat">Flat</Chip>
      <Chip variant="faded">Faded</Chip>
      <Chip variant="shadow">Shadow</Chip>
      <Chip variant="dot">Dot</Chip>
    </Row>
  )
}`,
      },
      {
        title: 'Closable Chip',
        description: 'Show a close button to remove a chip.',
        code: `import { useState } from 'react'
import { Chip } from '@xaui/native/chip'

export function ClosableExample() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null
  return <Chip onClose={() => setVisible(false)}>React Native</Chip>
}`,
      },
      {
        title: 'With Avatar',
        description: 'Display an avatar at the start of the chip.',
        code: `import { Chip } from '@xaui/native/chip'
import { Avatar } from '@xaui/native/avatar'

export function WithAvatarExample() {
  return (
    <Chip avatar={<Avatar name="Jane Doe" size="sm" />}>
      Jane Doe
    </Chip>
  )
}`,
      },
      {
        title: 'Sizes',
        description: 'Adjust chip size with the size prop.',
        code: `import { Chip } from '@xaui/native/chip'
import { Row } from '@xaui/native/view'

export function SizesExample() {
  return (
    <Row gap={8} alignItems="center">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </Row>
  )
}`,
      },
    ],
    subComponents: [
      {
        name: 'ChipGroup',
        props: [
          { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'ChipItem children' },
          { name: 'isSelectable', type: 'boolean', defaultValue: 'false', description: 'Enable selection mode' },
          { name: 'selectMode', type: '"single" | "multiple"', defaultValue: '"single"', description: 'Selection mode' },
          { name: 'selectedValues', type: 'string[]', defaultValue: '-', description: 'Controlled selected values' },
          { name: 'defaultSelectedValues', type: 'string[]', defaultValue: '-', description: 'Default selected values (uncontrolled)' },
          { name: 'spacing', type: 'number', defaultValue: '8', description: 'Gap between chips' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable all chips' },
        ],
        events: [
          { name: 'onSelectionChange', type: '(values: string[]) => void', description: 'Called when selection changes' },
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
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'width', type: 'number', defaultValue: '300', description: 'Drawer width (for left/right)' },
      { name: 'height', type: 'number', defaultValue: '300', description: 'Drawer height (for top/bottom)' },
      { name: 'showOverlay', type: 'boolean', defaultValue: 'true', description: 'Show backdrop overlay' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable slide animation' },
      { name: 'customStyle', type: 'ViewStyle', defaultValue: '-', description: 'Custom drawer styles' },
    ],
    events: [
      { name: 'onClose', type: '() => void', description: 'Called when drawer is dismissed' },
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
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Trigger icon' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Optional trigger label' },
      { name: 'expandedIcon', type: 'ReactNode', defaultValue: '-', description: 'Icon shown when menu is open' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'FabMenuItem children' },
      { name: 'variant', type: '"solid" | "flat" | "outlined"', defaultValue: '"solid"', description: 'Visual style variant' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'FAB size' },
      { name: 'isExpanded', type: 'boolean', defaultValue: '-', description: 'Controlled expanded state' },
      { name: 'showOverlay', type: 'boolean', defaultValue: 'true', description: 'Show backdrop overlay when open' },
      { name: 'elevation', type: '0 | 1 | 2 | 3 | 4', defaultValue: '2', description: 'Shadow elevation level' },
      { name: 'customAppearance', type: 'FabMenuCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onToggle', type: '(expanded: boolean) => void', description: 'Called when the menu opens or closes' },
    ],
    subComponents: [
      {
        name: 'FabMenuItem',
        props: [
          { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Item icon' },
          { name: 'label', type: 'string', defaultValue: '-', description: 'Item label' },
          { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
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
      { name: 'isVisible', type: 'boolean', defaultValue: '-', description: 'Controls spotlight visibility' },
      { name: 'targetRef', type: 'RefObject<MeasurableNode | null>', defaultValue: '-', description: 'Ref to the element to highlight' },
      { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Spotlight title' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Spotlight description' },
      { name: 'actionText', type: 'ReactNode', defaultValue: '-', description: 'Text for the action button' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'overlayColor', type: 'string', defaultValue: '"rgba(0,0,0,0.7)"', description: 'Overlay background color' },
      { name: 'spotlightPadding', type: 'number', defaultValue: '8', description: 'Padding around the highlighted area' },
      { name: 'circleScale', type: 'number', defaultValue: '1', description: 'Scale factor for spotlight circle' },
      { name: 'dismissOnBackdropPress', type: 'boolean', defaultValue: 'true', description: 'Dismiss when overlay is pressed' },
      { name: 'highlightContent', type: 'ReactNode', defaultValue: '-', description: 'Custom content inside the spotlight' },
      { name: 'customAppearance', type: 'FeatureDiscoveryCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onActionPress', type: '() => void', description: 'Called when the action button is pressed' },
      { name: 'onDismiss', type: '() => void', description: 'Called when the spotlight is dismissed' },
    ],
  },

  indicator: {
    props: [
      { name: 'variant', type: '"linear" | "circular"', defaultValue: '"circular"', description: 'Indicator style' },
      { name: 'size', type: 'number', defaultValue: '24', description: 'Indicator size in pixels' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'color', type: 'string', defaultValue: '-', description: 'Custom color override' },
      { name: 'backgroundColor', type: 'string', defaultValue: '-', description: 'Track background color' },
      { name: 'showTrack', type: 'boolean', defaultValue: 'false', description: 'Show background track' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable spin animation' },
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
import { Text } from 'react-native'

export function WithContentExample() {
  return (
    <Input
      label="Amount"
      startContent={<Text>$</Text>}
      endContent={<Text>USD</Text>}
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
      { name: 'renderItem', type: '(item: T, index: number) => ReactNode', defaultValue: '-', description: 'Function to render each item' },
      { name: 'selectionMode', type: '"single" | "multiple" | "none"', defaultValue: '"none"', description: 'Selection behavior' },
      { name: 'selectedKeys', type: 'string[]', defaultValue: '-', description: 'Controlled selected keys' },
      { name: 'defaultSelectedKeys', type: 'string[]', defaultValue: '[]', description: 'Default selected keys (uncontrolled)' },
      { name: 'showDivider', type: 'boolean', defaultValue: 'false', description: 'Show dividers between items' },
      { name: 'isPressable', type: 'boolean', defaultValue: 'true', description: 'Make items pressable' },
      { name: 'isSelectable', type: 'boolean', defaultValue: 'false', description: 'Allow items to be selected' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme for selected items' },
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Item size' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
      { name: 'flatListProps', type: 'Omit<FlatListProps<T>, "data" | "renderItem" | "keyExtractor">', defaultValue: '-', description: 'Additional FlatList props' },
    ],
    events: [
      { name: 'onSelectionChange', type: '(keys: string[]) => void', description: 'Called when selection changes' },
    ],
  },

  menu: {
    props: [
      { name: 'visible', type: 'boolean', defaultValue: '-', description: 'Controls menu visibility' },
      { name: 'trigger', type: 'ReactNode', defaultValue: '-', description: 'Element that anchors the menu' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'MenuItem children' },
      { name: 'position', type: '"top" | "bottom"', defaultValue: '"bottom"', description: 'Menu placement relative to trigger' },
      { name: 'maxHeight', type: 'number', defaultValue: '-', description: 'Maximum menu height' },
      { name: 'customAppearance', type: 'MenuCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onDismiss', type: '() => void', description: 'Called when menu is dismissed' },
    ],
    subComponents: [
      {
        name: 'MenuItem',
        props: [
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
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: 'Border radius' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'spacing', type: 'number', defaultValue: '0', description: 'Gap between items' },
      { name: 'backgroundColor', type: 'string', defaultValue: '-', description: 'Custom background color' },
      { name: 'style', type: 'ViewStyle', defaultValue: '-', description: 'Additional container styles' },
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
      { name: 'customAppearance', type: 'PagerCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
    ],
    events: [
      { name: 'onPageChange', type: '(page: number) => void', description: 'Called when the active page changes' },
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
      { name: 'value', type: 'number', defaultValue: '-', description: 'Progress value (0–100)' },
      { name: 'variant', type: '"linear" | "circular"', defaultValue: '"linear"', description: 'Progress style' },
      { name: 'size', type: 'number', defaultValue: '8', description: 'Track thickness (linear) or diameter (circular)' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'color', type: 'string', defaultValue: '-', description: 'Custom fill color override' },
      { name: 'backgroundColor', type: 'string', defaultValue: '-', description: 'Track background color override' },
      { name: 'borderRadius', type: 'number', defaultValue: '-', description: 'Custom border radius for linear variant' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable fill animation' },
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
      { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Component size' },
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
      { name: 'radius', type: '"none" | "sm" | "md" | "lg" | "full"', defaultValue: '"sm"', description: 'Skeleton border radius' },
      { name: 'skeletonColor', type: 'ColorValue', defaultValue: '-', description: 'Custom shimmer color' },
      { name: 'disableAnimation', type: 'boolean', defaultValue: 'false', description: 'Disable shimmer animation' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
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
import { Text } from 'react-native'

export function BasicExample() {
  return (
    <Tabs>
      <Tab title="Home">
        <Text>Home content</Text>
      </Tab>
      <Tab title="Profile">
        <Text>Profile content</Text>
      </Tab>
      <Tab title="Settings">
        <Text>Settings content</Text>
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
import { Text } from 'react-native'

export function VariantsExample() {
  return (
    <Column gap={24}>
      <Tabs variant="solid">
        <Tab title="One"><Text>One</Text></Tab>
        <Tab title="Two"><Text>Two</Text></Tab>
      </Tabs>
      <Tabs variant="bordered">
        <Tab title="One"><Text>One</Text></Tab>
        <Tab title="Two"><Text>Two</Text></Tab>
      </Tabs>
      <Tabs variant="light">
        <Tab title="One"><Text>One</Text></Tab>
        <Tab title="Two"><Text>Two</Text></Tab>
      </Tabs>
      <Tabs variant="underlined">
        <Tab title="One"><Text>One</Text></Tab>
        <Tab title="Two"><Text>Two</Text></Tab>
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
import { Text } from 'react-native'

export function ControlledExample() {
  const [selected, setSelected] = useState('inbox')

  return (
    <Tabs selectedKey={selected} onSelectionChange={setSelected}>
      <Tab title="Inbox">
        <Text>Inbox items</Text>
      </Tab>
      <Tab title="Sent">
        <Text>Sent items</Text>
      </Tab>
      <Tab title="Drafts">
        <Text>Draft items</Text>
      </Tab>
    </Tabs>
  )
}`,
      },
      {
        title: 'Disabled Tabs',
        description: 'Disable specific tabs by passing their keys.',
        code: `import { Tabs, Tab } from '@xaui/native/tabs'
import { Text } from 'react-native'

export function DisabledTabsExample() {
  return (
    <Tabs disabledKeys={['premium']}>
      <Tab title="Free">
        <Text>Free content</Text>
      </Tab>
      <Tab title="Premium">
        <Text>Premium content</Text>
      </Tab>
    </Tabs>
  )
}`,
      },
      {
        title: 'Full Width',
        description: 'Stretch tabs to fill the available width.',
        code: `import { Tabs, Tab } from '@xaui/native/tabs'
import { Text } from 'react-native'

export function FullWidthExample() {
  return (
    <Tabs fullWidth>
      <Tab title="Overview"><Text>Overview</Text></Tab>
      <Tab title="Details"><Text>Details</Text></Tab>
      <Tab title="Reviews"><Text>Reviews</Text></Tab>
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
          { name: 'placeholder', type: 'string', defaultValue: '-', description: 'Placeholder text' },
          { name: 'is24Hour', type: 'boolean', defaultValue: 'false', description: 'Use 24-hour format' },
          { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disable interaction' },
          { name: 'isClearable', type: 'boolean', defaultValue: 'false', description: 'Show clear button' },
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
      { name: 'variant', type: '"floating" | "docked" | "vertical"', defaultValue: '"floating"', description: 'Layout variant' },
      { name: 'position', type: '"top" | "bottom" | "left" | "right"', defaultValue: '"bottom"', description: 'Screen position' },
      { name: 'isVisible', type: 'boolean', defaultValue: 'true', description: 'Controls toolbar visibility' },
      { name: 'themeColor', type: 'ThemeColor', defaultValue: '"primary"', description: 'Color theme' },
      { name: 'showDivider', type: 'boolean', defaultValue: 'false', description: 'Show dividers between actions' },
      { name: 'isElevated', type: 'boolean', defaultValue: 'false', description: 'Apply shadow elevation' },
      { name: 'customAppearance', type: 'ToolbarCustomAppearance', defaultValue: '-', description: 'Custom style overrides' },
      { name: 'style', type: 'StyleProp<ViewStyle>', defaultValue: '-', description: 'Additional container styles' },
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
import { Text } from 'react-native'

export function BasicColumnExample() {
  return (
    <Column spacing={12}>
      <Text>First</Text>
      <Text>Second</Text>
      <Text>Third</Text>
    </Column>
  )
}`,
      },
      {
        title: 'Main Axis Alignment',
        description: 'Control vertical distribution of children.',
        code: `import { Column } from '@xaui/native/view'
import { Text } from 'react-native'

export function MainAxisExample() {
  return (
    <Column mainAxisAlignment="space-between" style={{ height: 200 }}>
      <Text>Top</Text>
      <Text>Middle</Text>
      <Text>Bottom</Text>
    </Column>
  )
}`,
      },
      {
        title: 'Cross Axis Alignment',
        description: 'Align children horizontally inside the column.',
        code: `import { Column } from '@xaui/native/view'
import { Text } from 'react-native'

export function CrossAxisExample() {
  return (
    <Column crossAxisAlignment="center" fullWidth spacing={8}>
      <Text>Centered item</Text>
      <Text>Another centered item</Text>
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
import { Text } from 'react-native'

export function BasicRowExample() {
  return (
    <Row spacing={16}>
      <Text>Left</Text>
      <Text>Center</Text>
      <Text>Right</Text>
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
import { Text } from 'react-native'

export function VerticalCenterExample() {
  return (
    <Row crossAxisAlignment="center" spacing={12}>
      <Avatar name="Jane Doe" size="sm" />
      <Text style={{ fontWeight: 'bold' }}>Jane Doe</Text>
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
import { Text } from 'react-native'

export function SpacerExample() {
  return (
    <Row fullWidth>
      <Text>Left</Text>
      <Spacer />
      <Text>Right</Text>
    </Row>
  )
}`,
      },
      {
        title: 'Weighted Spacing',
        description: 'Use flex to distribute space unevenly.',
        code: `import { Row, Spacer } from '@xaui/native/view'
import { Text } from 'react-native'

export function WeightedSpacerExample() {
  return (
    <Row fullWidth>
      <Text>Start</Text>
      <Spacer flex={2} />
      <Text>Middle</Text>
      <Spacer flex={1} />
      <Text>End</Text>
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
import { Text } from 'react-native'

export function UniformPaddingExample() {
  return (
    <Padding all={16}>
      <Text>Content with 16px padding on all sides</Text>
    </Padding>
  )
}`,
      },
      {
        title: 'Directional Padding',
        description: 'Fine-tune padding per side.',
        code: `import { Padding } from '@xaui/native/view'
import { Text } from 'react-native'

export function DirectionalPaddingExample() {
  return (
    <Padding top={24} bottom={8} horizontal={16}>
      <Text>Custom padding per side</Text>
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
import { Text } from 'react-native'

export function UniformMarginExample() {
  return (
    <Margin all={16}>
      <Text>Content offset by 16px on all sides</Text>
    </Margin>
  )
}`,
      },
      {
        title: 'Vertical & Horizontal Margin',
        description: 'Combine vertical and horizontal shorthand props.',
        code: `import { Margin } from '@xaui/native/view'
import { Text } from 'react-native'

export function DirectionalMarginExample() {
  return (
    <Margin vertical={24} horizontal={16}>
      <Text>24px top/bottom, 16px left/right</Text>
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
import { Text } from 'react-native'

export function SizedBoxSpacerExample() {
  return (
    <Column>
      <Text>Section A</Text>
      <SizedBox height={32} />
      <Text>Section B</Text>
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
import { View, Text } from 'react-native'

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
import { View, Text } from 'react-native'

export function BottomLabelExample() {
  return (
    <View style={{ height: 120, position: 'relative', backgroundColor: '#1e293b', borderRadius: 12 }}>
      <PositionedView bottom={8} left={12} right={12}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Overlay label</Text>
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
import { Text } from 'react-native'

export function FrostedGlassExample() {
  return (
    <BlurView intensity={60} style={{ padding: 16, borderRadius: 12 }}>
      <Text style={{ fontWeight: 'bold' }}>Frosted content</Text>
    </BlurView>
  )
}`,
      },
      {
        title: 'Unlockable Blur',
        description: 'Hide premium content behind a blur that the user can reveal.',
        code: `import { BlurView } from '@xaui/native/view'
import { Text } from 'react-native'

export function UnlockableBlurExample() {
  return (
    <BlurView intensity={80} unlockable>
      <Text>This content is hidden until unlocked</Text>
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
import { Text } from 'react-native'

export function UniformRadiusExample() {
  return (
    <RoundedView all={16} backgroundColor="#4f46e5">
      <Text style={{ color: '#fff', padding: 12 }}>Rounded card</Text>
    </RoundedView>
  )
}`,
      },
      {
        title: 'Asymmetric Radius',
        description: 'Round only specific corners for a custom shape.',
        code: `import { RoundedView } from '@xaui/native/view'
import { Text } from 'react-native'

export function AsymmetricRadiusExample() {
  return (
    <RoundedView topLeft={24} topRight={24} bottomLeft={4} bottomRight={4} backgroundColor="#0ea5e9">
      <Text style={{ color: '#fff', padding: 12 }}>Custom shape</Text>
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
import { View, Text } from 'react-native'

export function StaticGridExample() {
  return (
    <Grid columns={3} spacing={8}>
      <GridItem><View style={{ height: 80, backgroundColor: '#e0e7ff', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Text>A</Text></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#dbeafe', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Text>B</Text></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#dcfce7', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Text>C</Text></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#fef9c3', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Text>D</Text></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#ffe4e6', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Text>E</Text></View></GridItem>
      <GridItem><View style={{ height: 80, backgroundColor: '#f3e8ff', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}><Text>F</Text></View></GridItem>
    </Grid>
  )
}`,
      },
      {
        title: 'Dynamic Grid with GridBuilder',
        description: 'Render a data array into a grid using GridBuilder.',
        code: `import { GridBuilder } from '@xaui/native/view'
import { View, Text } from 'react-native'

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
          <Text>{item.name}</Text>
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
import { View, Text } from 'react-native'

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
import { View, Text } from 'react-native'

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
          <Text>{item.label}</Text>
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
import { Text } from 'react-native'

export function FadeExample() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onPress={() => setVisible(v => !v)}>Toggle</Button>
      <ConditionalView isVisible={visible} animation="fade">
        <Text>This content fades in and out</Text>
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
import { Text } from 'react-native'

export function ScaleExample() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onPress={() => setVisible(v => !v)}>Toggle</Button>
      <ConditionalView isVisible={visible} animation="scale">
        <Text>This content scales in and out</Text>
      </ConditionalView>
    </>
  )
}`,
      },
    ],
  },
}
