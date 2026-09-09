import type { Metadata } from 'next'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'
import styleProps from '@/lib/data/native-style-props.generated.json'

export const metadata: Metadata = {
  title: 'Style props — XAUI Native',
  description:
    'Every React Native style key of a node, exposed as a prop: padding, margin, width, colours, text and image keys, and how they order against style.',
}

const keyCount = styleProps.groups.reduce(
  (total, group) => total + group.keys.length,
  0
)

export default function StylePropsPage() {
  return (
    <div className="space-y-10 pb-16">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Style props</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Every style key a node understands is also a prop on it — {keyCount} of
          them, with the React Native names and the React Native values. No scale
          steps, no shorthand of our own: <code>padding={'{16}'}</code> is sixteen
          density-independent pixels.
        </p>
      </header>

      <DocSection title="On the node that draws it">
        <p className="text-muted-foreground">
          A root takes the view keys; a text slot takes the text keys; an image slot
          takes the image keys. The prop goes on the part it paints, so you never
          reach a nested element through a configuration object.
        </p>
        <CodeBlock
          code={`<Button variant="primary" paddingHorizontal={20} borderRadius={12}>
  <Button.Icon as={SaveIcon} />
  <Button.Label fontSize={15} letterSpacing={0.4}>
    Save
  </Button.Label>
</Button>`}
        />
      </DocSection>

      <DocSection title="Order against style">
        <p className="text-muted-foreground">
          A component resolves its own styles first, then its tint, then your style
          props, then your <code>style</code>. So a style prop overrides the
          variant&apos;s value and <code>style</code> overrides everything —{' '}
          <code>style</code> is where transforms, shadows and computed values belong.
        </p>
        <CodeBlock
          code={`// borderRadius wins over the recipe, and style wins over borderRadius
<Card borderRadius={20} style={{ transform: [{ rotate: '2deg' }] }} />`}
        />
        <p className="text-sm text-muted-foreground">
          Values are kept, not transformed: a key written as <code>undefined</code>{' '}
          still counts as written, and <code>undefined</code> in a style is already a
          no-op.
        </p>
      </DocSection>

      <DocSection title="Reach for the theme when you want the scale">
        <p className="text-muted-foreground">
          Style props take raw values on purpose — a number here is never a hidden
          step. When you do want the theme&apos;s rhythm, ask it for the number.
        </p>
        <CodeBlock
          code={`const theme = useXAUITheme()

<Card padding={theme.spacing(4)} borderRadius={theme.radius.lg} />`}
        />
        <p className="text-sm text-muted-foreground">
          The{' '}
          <Link className="underline" href="/docs/theme">
            theme guide
          </Link>{' '}
          lists the scales.
        </p>
      </DocSection>

      <DocSection title="What is not a style prop">
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <strong>The Left and Right keys.</strong> React Native mirrors a layout
            under RTL through Start and End only, so those are the ones exposed:{' '}
            <code>paddingStart</code>, not <code>paddingLeft</code>.
          </li>
          <li>
            <strong>
              <code>pointerEvents</code>
            </strong>{' '}
            — a style key and a View prop both. It stays the prop it always was.
          </li>
          <li>
            <strong>Names the component owns.</strong> <code>variant</code>,{' '}
            <code>size</code> and <code>color</code> on a root are the
            component&apos;s vocabulary — <code>size</code> is the control&apos;s
            scale, <code>color</code> its tint. On a text slot, <code>color</code> is
            the text colour it has always been.
          </li>
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {styleProps.withheld.map(key => (
            <code
              className="rounded-md border border-dashed px-2 py-1 text-xs text-muted-foreground line-through"
              key={key}
            >
              {key}
            </code>
          ))}
        </div>
      </DocSection>

      <DocSection title="The whole set">
        <p className="text-muted-foreground">
          Read out of the source at build time, so a React Native upgrade that adds a
          key shows up here on its own.
        </p>
        <div className="space-y-6">
          {styleProps.groups.map(group => (
            <section className="space-y-2" key={group.title}>
              <h3 className="text-sm font-semibold">
                {group.title}{' '}
                <span className="font-normal text-muted-foreground">
                  ({group.keys.length})
                </span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.keys.map(key => (
                  <code
                    className="rounded-md border bg-muted/40 px-2 py-1 text-xs"
                    key={key}
                  >
                    {key}
                  </code>
                ))}
              </div>
            </section>
          ))}
        </div>
      </DocSection>
    </div>
  )
}

function DocSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}
