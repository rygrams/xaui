import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Installation - Xaui',
  description: 'Installation guide for Xaui native package',
}

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Detailed installation instructions for the Xaui native package and its
          dependencies.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>React Native 0.72+</li>
            <li>React 18+</li>
            <li>TypeScript 5+ (recommended)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Install Core Packages</h2>
          <pre className="rounded-md bg-muted p-4 overflow-x-auto">
            <code className="text-sm">npm install @xaui/native @xaui/core</code>
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Peer Dependencies</h2>
          <p className="text-muted-foreground">
            Xaui requires the following peer dependencies:
          </p>
          <pre className="rounded-md bg-muted p-4 overflow-x-auto">
            <code className="text-sm">
              npm install react-native-reanimated react-native-gesture-handler
            </code>
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">iOS Setup</h2>
          <p className="text-muted-foreground">After installing pods, run:</p>
          <pre className="rounded-md bg-muted p-4 overflow-x-auto">
            <code className="text-sm">cd ios && pod install</code>
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Android Setup</h2>
          <p className="text-muted-foreground">
            Ensure you have the following in your android/app/build.gradle:
          </p>
          <pre className="rounded-md bg-muted p-4 overflow-x-auto">
            <code className="text-sm">{`project.ext.react = [
    enableHermes: true
]`}</code>
          </pre>
        </section>
      </div>
    </div>
  )
}
