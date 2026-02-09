import { Metadata } from 'next'
import { ExpansionPanelDemo } from '@/components/preview/expansion-panel-demo'
import { PhonePreview } from '@/components/preview/phone-preview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'ExpansionPanel - Xaui',
  description:
    'A vertically stacked set of interactive headings that each reveal a section of content.',
}

const installationCode = `npm install @xaui/native`

const usageCode = `import { ExpansionPanel, ExpansionPanelItem } from '@xaui/native/expansion-panel'

export function MyComponent() {
  return (
    <ExpansionPanel variant="light" showDivider>
      <ExpansionPanelItem title="Section 1">
        <Text>Content for section 1</Text>
      </ExpansionPanelItem>
      <ExpansionPanelItem title="Section 2">
        <Text>Content for section 2</Text>
      </ExpansionPanelItem>
    </ExpansionPanel>
  )
}`

export default function ExpansionPanelPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight">ExpansionPanel</h1>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
            Stable
          </span>
        </div>
        <p className="text-xl text-muted-foreground">
          A vertically stacked set of interactive headings that each reveal a section
          of content.
        </p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <PhonePreview>
            <ExpansionPanelDemo />
          </PhonePreview>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Installation</h3>
              <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                <code className="text-sm">{installationCode}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Usage</h3>
              <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                <code className="text-sm">{usageCode}</code>
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="props" className="space-y-4">
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
                  <td className="px-4 py-3 font-mono text-xs">onSelectionChange</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    (selectedKeys: string[]) =&gt; void
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">-</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Callback when selection changes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
