import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/ui/code-block'
import { ExpansionPanelScreenshots } from '@/components/screenshots/expansion-panel-screenshots'

export const metadata: Metadata = {
  title: 'ExpansionPanel - Xaui',
  description:
    'A vertically stacked set of interactive headings that each reveal a section of content.',
}

const installationCode = `npm install @xaui/native`

const usageCode = `import { ExpansionPanel, ExpansionPanelItem } from '@xaui/native/expansion-panel'
import { Typography } from '@xaui/native/typography'

export function MyComponent() {
  return (
    <ExpansionPanel variant="light" showDivider>
      <ExpansionPanelItem title="Section 1">
        <Typography>Content for section 1</Typography>
      </ExpansionPanelItem>
      <ExpansionPanelItem title="Section 2">
        <Typography>Content for section 2</Typography>
      </ExpansionPanelItem>
    </ExpansionPanel>
  )
}`

const variantsCode = `// Light Variant - Clean, minimal appearance
<ExpansionPanel variant="light">
  <ExpansionPanelItem title="Light Item">
    <Typography>Clean and minimal styling</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>

// Bordered Variant - Visible borders around items
<ExpansionPanel variant="bordered">
  <ExpansionPanelItem title="Bordered Item">
    <Typography>Items have visible borders</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>

// Splitted Variant - Separated cards appearance
<ExpansionPanel variant="splitted">
  <ExpansionPanelItem title="Splitted Item">
    <Typography>Items appear as separate cards</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>`

const sizingCode = `// Compact Mode - Reduced padding for dense UIs
<ExpansionPanel isCompact>
  <ExpansionPanelItem title="Compact Item">
    <Typography>Less padding, more items visible</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>

// Full Width Control
<ExpansionPanel fullWidth={false}>
  <ExpansionPanelItem title="Fixed Width">
    <Typography>Does not stretch to fill container</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>`

const selectionModeCode = `// Toggle Mode - Only one item expanded at a time (default)
<ExpansionPanel selectionMode="toggle">
  <ExpansionPanelItem itemKey="a" title="Item A">
    <Typography>Opening this closes Item B</Typography>
  </ExpansionPanelItem>
  <ExpansionPanelItem itemKey="b" title="Item B">
    <Typography>Opening this closes Item A</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>

// Multiple Mode - Multiple items can be expanded
<ExpansionPanel selectionMode="multiple">
  <ExpansionPanelItem itemKey="a" title="Item A">
    <Typography>Can be expanded with Item B</Typography>
  </ExpansionPanelItem>
  <ExpansionPanelItem itemKey="b" title="Item B">
    <Typography>Can be expanded with Item A</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>`

const eventsCode = `import { useState } from 'react'
import { ExpansionPanel, ExpansionPanelItem } from '@xaui/native/expansion-panel'
import { Typography } from '@xaui/native/typography'

export function ControlledExample() {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['item1'])

  const handleSelectionChange = (keys: string[]) => {
    console.log('Expanded items:', keys)
    setExpandedKeys(keys)
  }

  const handleItemSelected = (isSelected: boolean) => {
    console.log('Item selected state:', isSelected)
  }

  return (
    <ExpansionPanel
      expandedKeys={expandedKeys}
      onSelectionChange={handleSelectionChange}
    >
      <ExpansionPanelItem
        itemKey="item1"
        title="Controlled Item"
        onSelected={handleItemSelected}
      >
        <Typography>This item is controlled externally</Typography>
      </ExpansionPanelItem>
    </ExpansionPanel>
  )
}`

const disabledCode = `// Disabled Items
<ExpansionPanel disabledKeys={['disabled-item']}>
  <ExpansionPanelItem itemKey="enabled" title="Enabled Item">
    <Typography>This item can be interacted with</Typography>
  </ExpansionPanelItem>
  <ExpansionPanelItem itemKey="disabled-item" title="Disabled Item">
    <Typography>This item cannot be expanded</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>`

const customizationCode = `// Custom Appearance
<ExpansionPanel
  customAppearance={{
    container: { backgroundColor: '#f5f5f5', borderRadius: 12 },
    item: { marginVertical: 4 }
  }}
>
  <ExpansionPanelItem
    title="Custom Styled Item"
    subtitle="With custom subtitle"
    startContent={<Icon name="settings" />}
    customAppearance={{
      base: { backgroundColor: 'white' },
      title: { fontSize: 18, fontWeight: 'bold' },
      subtitle: { color: '#666' },
      content: { padding: 16 }
    }}
  >
    <Typography>Custom styled content</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>

// Hide Indicator
<ExpansionPanel hideIndicator>
  <ExpansionPanelItem title="No Indicator">
    <Typography>Chevron icon is hidden</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>

// Disable Animation
<ExpansionPanel disableAnimation>
  <ExpansionPanelItem title="No Animation">
    <Typography>Expands/collapses instantly</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>`

const defaultExpandedCode = `// Default Expanded Keys
<ExpansionPanel defaultExpandedKeys={['intro', 'details']}>
  <ExpansionPanelItem itemKey="intro" title="Introduction">
    <Typography>Expanded by default</Typography>
  </ExpansionPanelItem>
  <ExpansionPanelItem itemKey="details" title="Details">
    <Typography>Also expanded by default</Typography>
  </ExpansionPanelItem>
  <ExpansionPanelItem itemKey="extra" title="Extra">
    <Typography>Collapsed by default</Typography>
  </ExpansionPanelItem>
</ExpansionPanel>`

export default function ExpansionPanelPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight">ExpansionPanel</h1>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900 dark:text-amber-300">
            Beta
          </span>
        </div>
        <p className="text-xl text-muted-foreground">
          A vertically stacked set of interactive headings that each reveal a section
          of content.
        </p>
      </div>

      <ExpansionPanelScreenshots />

      <Tabs defaultValue="code" className="w-full">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
        </TabsList>

        <TabsContent value="code">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Installation</h3>
                <CodeBlock code={installationCode} language="bash" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Basic Usage</h3>
                <CodeBlock code={usageCode} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Variants</h3>
              <p className="text-muted-foreground">
                Three visual variants available: light (minimal), bordered (visible
                borders), and splitted (card-like).
              </p>
              <CodeBlock code={variantsCode} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sizing Options</h3>
              <p className="text-muted-foreground">
                Control the density with isCompact and width with fullWidth props.
              </p>
              <CodeBlock code={sizingCode} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selection Modes</h3>
              <p className="text-muted-foreground">
                Toggle mode allows only one expanded item at a time. Multiple mode
                allows multiple items to be expanded simultaneously.
              </p>
              <CodeBlock code={selectionModeCode} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Events & Controlled State</h3>
              <p className="text-muted-foreground">
                Handle selection changes with onSelectionChange and individual item
                selection with onSelected.
              </p>
              <CodeBlock code={eventsCode} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Disabled Items</h3>
              <p className="text-muted-foreground">
                Disable specific items by their keys to prevent interaction.
              </p>
              <CodeBlock code={disabledCode} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Default Expanded State</h3>
              <p className="text-muted-foreground">
                Set items to be expanded by default using defaultExpandedKeys.
              </p>
              <CodeBlock code={defaultExpandedCode} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customization</h3>
              <p className="text-muted-foreground">
                Customize appearance with customAppearance prop, hide indicators, or
                disable animations.
              </p>
              <CodeBlock code={customizationCode} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="props" className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ExpansionPanel Props</h3>
            <div className="rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Prop</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Default</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">children</td>
                    <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      List of ExpansionPanelItem components
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">variant</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      &quot;light&quot; | &quot;splitted&quot; | &quot;bordered&quot;
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      &quot;light&quot;
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Visual style variant
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">selectionMode</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      &quot;toggle&quot; | &quot;multiple&quot;
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      &quot;toggle&quot;
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Selection behavior mode
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">showDivider</td>
                    <td className="px-4 py-3 text-muted-foreground">boolean</td>
                    <td className="px-4 py-3 text-muted-foreground">false</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Show dividers between items
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">hideIndicator</td>
                    <td className="px-4 py-3 text-muted-foreground">boolean</td>
                    <td className="px-4 py-3 text-muted-foreground">false</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Hide the collapse/expand indicator
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">fullWidth</td>
                    <td className="px-4 py-3 text-muted-foreground">boolean</td>
                    <td className="px-4 py-3 text-muted-foreground">true</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Take full width of container
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">expandedKeys</td>
                    <td className="px-4 py-3 text-muted-foreground">string[]</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Controlled expanded keys
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">
                      defaultExpandedKeys
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">string[]</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Default expanded keys for uncontrolled mode
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">disabledKeys</td>
                    <td className="px-4 py-3 text-muted-foreground">string[]</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Keys of disabled items
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">disableAnimation</td>
                    <td className="px-4 py-3 text-muted-foreground">boolean</td>
                    <td className="px-4 py-3 text-muted-foreground">false</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Disable animations
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">isCompact</td>
                    <td className="px-4 py-3 text-muted-foreground">boolean</td>
                    <td className="px-4 py-3 text-muted-foreground">false</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Make items more compact
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">customAppearance</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {`{ container?: ViewStyle; item?: ViewStyle }`}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Custom styles for container and item wrappers
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ExpansionPanel Events</h3>
            <div className="rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Event</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">
                      onSelectionChange
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      (selectedKeys: string[]) =&gt; void
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Callback when selection changes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ExpansionPanelItem Props</h3>
            <div className="rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Prop</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Default</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">itemKey</td>
                    <td className="px-4 py-3 text-muted-foreground">string</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      auto-generated
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Unique key for the expansion item
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">children</td>
                    <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Content shown when item is expanded
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">title</td>
                    <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Header title content
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">subtitle</td>
                    <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Optional subtitle below title
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">startContent</td>
                    <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Content rendered at the start of the header
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">indicator</td>
                    <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      ChevronRight icon
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Custom expanded/collapsed indicator
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">customAppearance</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {`{
  base?: ViewStyle;
  heading?: ViewStyle;
  trigger?: ViewStyle;
  title?: TextStyle;
  subtitle?: TextStyle;
  content?: ViewStyle;
  startContent?: ViewStyle;
  indicator?: ViewStyle;
}`}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Custom styles for item parts
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ExpansionPanelItem Events</h3>
            <div className="rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Event</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">onSelected</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      (isSelected: boolean) =&gt; void
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Callback when this item toggles selected state
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
