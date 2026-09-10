import type { Metadata } from 'next'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'
import { components } from '@/lib/data/components'

export const metadata: Metadata = {
  title: 'FAQ — XAUI Native',
  description:
    'The questions that come up while setting XAUI up: peer dependencies, the Worklets plugin, variant against color, styling, web support and the legacy package.',
}

export default function FaqPage() {
  return (
    <div className="space-y-10 pb-16">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">FAQ</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          What comes up while wiring XAUI into an app.
        </p>
      </header>

      <div className="space-y-3">
        <Question
          id="worklets-plugin"
          question="Do I need the Worklets Babel plugin?"
        >
          <p>
            Yes. Add <code>react-native-worklets/plugin</code> last in the Babel
            plugin list and clear the Metro cache. Without it the animated callbacks
            never reach the UI runtime and Reanimated aborts. Recent Expo SDKs set it
            up for you.
          </p>
        </Question>

        <Question id="peers" question="Which peer dependencies are required?">
          <p>
            <code>react</code>, <code>react-native</code>,{' '}
            <code>react-native-reanimated</code> 4 and{' '}
            <code>react-native-worklets</code>. The rest are optional and only pulled
            in by what you use:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <code>react-native-gesture-handler</code> — Slider, calendars,
              BottomSheet, TimePicker
            </li>
            <li>
              <code>react-native-svg</code> — icons, progress, charts
            </li>
            <li>
              <code>react-native-safe-area-context</code> — chrome and full-screen
              surfaces
            </li>
            <li>
              <code>libphonenumber-js</code> — PhoneNumberField
            </li>
          </ul>
        </Question>

        <Question id="expo" question="Expo or bare React Native?">
          <p>
            Both. Expo installs the compatible native versions for you; on the
            Community CLI you add the peers yourself and run <code>pod install</code>
            . Either way, run the New Architecture — see the{' '}
            <Link className="underline" href="/docs/installation">
              installation guide
            </Link>
            .
          </p>
        </Question>

        <Question id="alpha-tag" question="Why install from the alpha tag?">
          <p>
            The current package publishes on the <code>alpha</code> dist-tag, so{' '}
            <code>pnpm add @xaui/native@alpha</code> is what gets you the{' '}
            {components.length} components documented here. Plain <code>latest</code>{' '}
            still points at the previous line.
          </p>
        </Question>

        <Question
          id="variant-color"
          question="What is the difference between variant and color?"
        >
          <p>
            <code>variant</code> picks a semantic appearance out of the theme — a
            Button takes <code>primary</code>, <code>secondary</code>,{' '}
            <code>default</code>, <code>tertiary</code>, <code>ghost</code>,{' '}
            <code>danger</code> and <code>danger-soft</code>. <code>color</code>{' '}
            takes one raw hue and the component derives its own pressed, soft and
            contrasting values from it. Each component&apos;s values are in the
            generated props table on its page.
          </p>
        </Question>

        <Question id="restyle" question="How do I restyle one part of a component?">
          <p>
            Put <code>style</code> on the slot that draws it, or one of its{' '}
            <Link className="underline" href="/docs/style-props">
              style props
            </Link>{' '}
            for the common case. A component resolves its own styles first, then your
            style props, then your <code>style</code> — so <code>style</code> is
            where transforms, shadows and computed values go.
          </p>
          <CodeBlock
            code={`<Button variant="primary" paddingHorizontal={20}>
  <Button.Icon as={SaveIcon} />
  <Button.Label style={{ letterSpacing: 0.4 }}>Save</Button.Label>
</Button>`}
          />
          <p>
            When you need your own element in that position instead, pass{' '}
            <code>asChild</code> and the slot merges its behaviour into your child.
          </p>
        </Question>

        <Question id="imports" question="Should I import from the package root?">
          <p>
            Import from the component&apos;s own subpath —{' '}
            <code>@xaui/native/button</code>, <code>@xaui/native/select</code>. Each
            component is an entry point, so a screen only pulls in what it renders.
          </p>
        </Question>

        <Question id="web" question="Does it run on the web?">
          <p>
            Every preview on this site is the real component under{' '}
            <code>react-native-web</code>, so the answer is yes for the render path
            documented here. <code>@xaui/hybrid</code> is the separate renderer for
            mobile webviews.
          </p>
        </Question>

        <Question id="dark-mode" question="How do I ship dark mode?">
          <p>
            Give <code>XAUIProvider</code> a <code>colorMode</code> of{' '}
            <code>light</code>, <code>dark</code> or <code>system</code>.{' '}
            <code>createTheme</code> resolves both palettes once, in OKLab, so you
            declare the source colours and get the derived ones. XAUI does not
            persist the user&apos;s choice — that stays your storage.
          </p>
        </Question>

        <Question
          id="other-styling"
          question="Can I keep StyleSheet or another styling library?"
        >
          <p>
            Yes. Style props are the React Native names and values with no implicit
            scale, and <code>style</code> takes precedence over them, so an external
            stylesheet composes with a component rather than fighting it.
          </p>
        </Question>

        <Question id="prop-tables" question="Are the props tables hand-written?">
          <p>
            No. They are generated from the TypeScript types at build time, which is
            what keeps them from drifting: a prop that lands in the source shows up
            in the table with no edit here.
          </p>
        </Question>

        <Question id="legacy" question="What happens to my existing XAUI screens?">
          <p>
            They keep working. <code>@xaui/native-legacy</code> is frozen and reads
            the same provider and tokens, so both trees live in one app while you
            move screen by screen — the{' '}
            <Link className="underline" href="/docs/migration">
              migration guide
            </Link>{' '}
            has the prop mapping.
          </p>
        </Question>
      </div>
    </div>
  )
}

function Question({
  id,
  question,
  children,
}: {
  id: string
  question: string
  children: React.ReactNode
}) {
  return (
    <details
      className="group scroll-mt-8 rounded-xl border bg-card px-5 py-4 open:pb-5"
      id={id}
    >
      <summary className="cursor-pointer list-none font-semibold marker:content-none">
        <span className="flex items-start justify-between gap-4">
          {question}
          <span
            aria-hidden="true"
            className="mt-1 text-muted-foreground transition-transform group-open:rotate-45"
          >
            +
          </span>
        </span>
      </summary>
      <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </details>
  )
}
