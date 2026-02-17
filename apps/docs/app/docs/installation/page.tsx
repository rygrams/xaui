import { Metadata } from 'next'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Installation - Xaui',
  description: 'Installation guide for Xaui native package',
}

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Installation</h1>
        <p className="text-base text-muted-foreground md:text-xl">
          Detailed installation instructions for the Xaui native package and its
          dependencies.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>React Native 0.72+</li>
            <li>React 18+</li>
            <li>TypeScript 5+ (recommended)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Expo Installation (Recommended)</h2>
          <p className="text-muted-foreground">
            Xaui works seamlessly with Expo. We recommend using Expo for the best
            development experience:
          </p>
          <CodeBlock code="npx create-expo-app@latest my-app" language="bash" />
          <p className="text-muted-foreground">Then install Xaui packages:</p>
          <CodeBlock code="npx expo install @xaui/native" language="bash" />
          <p className="text-sm text-muted-foreground">
            Expo handles the native configuration automatically. No additional iOS or
            Android setup required.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">React Native CLI Installation</h2>
          <p className="text-muted-foreground">
            For React Native CLI projects, install the core packages:
          </p>
          <CodeBlock code="npm install @xaui/native @xaui/core" language="bash" />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Peer Dependencies</h2>
          <p className="text-muted-foreground">
            Xaui requires the following peer dependencies:
          </p>
          <CodeBlock
            code="npm install react-native-reanimated react-native-gesture-handler"
            language="bash"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">iOS Setup</h2>
          <p className="text-muted-foreground">After installing pods, run:</p>
          <CodeBlock code="cd ios && pod install" language="bash" />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Android Setup</h2>
          <p className="text-muted-foreground">
            Ensure you have the following in your android/app/build.gradle:
          </p>
          <CodeBlock
            code={`project.ext.react = [
    enableHermes: true
]`}
          />
        </section>
      </div>
    </div>
  )
}
