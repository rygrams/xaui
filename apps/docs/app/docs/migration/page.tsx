import type { Metadata } from 'next'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Migration — XAUI Native',
  description:
    'Move from @xaui/native-legacy to @xaui/native, one screen at a time.',
}

const mappings = [
  ['solid + primary', 'variant="primary"'],
  ['flat + primary', 'variant="secondary"'],
  ['bordered + primary', 'variant="tertiary"'],
  ['light + primary', 'variant="ghost"'],
  ['faded + primary', 'variant="secondary" + border via style'],
  ['solid + danger', 'variant="danger"'],
  ['flat + danger', 'variant="danger-soft"'],
  ['themeColor="default"', 'variant="secondary"'],
  [
    'themeColor="secondary" | "tertiary"',
    'dropped — those were levels, not colours',
  ],
]

export default function MigrationPage() {
  return (
    <div className="space-y-10 pb-16">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Migration</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Migrate screen by screen. The legacy package is frozen, but it reads the
          same provider and the same tokens, so both trees can live in one app
          without a break in the theme.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Install the legacy bridge
        </h2>
        <CodeBlock
          language="bash"
          code="pnpm add @xaui/native@alpha --save-exact @xaui/native-legacy@0.2.11"
        />
        <p className="text-muted-foreground">
          Pin <code>@xaui/native-legacy</code> to an exact version. It is frozen and
          it depends on the <code>@xaui/native</code> provider — never mount a second
          one.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Move the imports</h2>
        <CodeBlock
          code={`// Before: keep the old component for now
import { Button } from '@xaui/native-legacy/button'

// After: adopt the current one
import { Button } from '@xaui/native/button'`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Variants and colours
        </h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="border-b bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3">Legacy</th>
                <th className="px-4 py-3">@xaui/native</th>
              </tr>
            </thead>
            <tbody>
              {mappings.map(([legacy, current]) => (
                <tr className="border-b last:border-0" key={legacy}>
                  <td className="px-4 py-3 font-mono text-xs">{legacy}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {current}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground">
          The same conversion applies to the <code>success</code>,{' '}
          <code>warning</code> and <code>danger</code> families wherever a component
          exposes them. A free hue becomes <code>color=&quot;#…&quot;</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Configuration becomes composition
        </h2>
        <CodeBlock
          code={`// Legacy
<Button
  startContent={<SaveIcon />}
  customAppearance={{ container: containerStyle, text: labelStyle }}
>
  Save
</Button>

// Current
<Button style={containerStyle}>
  <Button.Icon as={SaveIcon} />
  <Button.Label style={labelStyle}>Save</Button.Label>
</Button>`}
        />
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <code>startContent</code> and <code>endContent</code> become slots,
            placed in JSX order.
          </li>
          <li>
            <code>customAppearance.container</code> becomes <code>style</code> on the
            root.
          </li>
          <li>
            Every other key becomes <code>style</code> on its slot.
          </li>
          <li>
            <code>fullWidth</code> becomes the explicit style prop{' '}
            <code>width=&quot;100%&quot;</code>.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Suggested order</h2>
        <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>
            Mount one <code>XAUIProvider</code> at the root.
          </li>
          <li>Point the old imports at the frozen package.</li>
          <li>Migrate a screen and its components together.</li>
          <li>Check light, dark, VoiceOver/TalkBack and the gestures.</li>
          <li>Drop the legacy package once no import is left.</li>
        </ol>
      </section>
    </div>
  )
}
