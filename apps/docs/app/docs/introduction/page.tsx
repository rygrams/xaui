import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, Palette } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Introduction - Xaui',
  description: 'A modern React Native UI library inspired by Flutter',
}

export default function IntroductionPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Xaui Documentation</h1>
        <p className="text-base text-muted-foreground max-w-2xl md:text-xl">
          A modern React Native UI library inspired by Flutter. Build beautiful,
          consistent, and performant mobile applications with ease.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link href="/docs/getting-started">
          <Button size="lg">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/docs/components">
          <Button variant="outline" size="lg">
            Browse Components
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 pt-8">
        <div className="rounded-lg border p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Component-First</h3>
          <p className="text-sm text-muted-foreground">
            Built with a high-volume component set so teams can ship complete apps
            with minimal external UI libraries.
          </p>
        </div>

        <div className="rounded-lg border p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Performance First</h3>
          <p className="text-sm text-muted-foreground">
            Built with React Native Reanimated for smooth 60fps animations and native
            performance on both iOS and Android.
          </p>
        </div>

        <div className="rounded-lg border p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">Complete Design System</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive color palette with 20+ colors and 11 shades each.
            Tailwind-inspired design tokens.
          </p>
        </div>
      </div>

      <div className="rounded-lg border p-6 space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">Quick Start</h2>
        <p className="text-muted-foreground">
          Install Xaui in your React Native project and start building:
        </p>
        <CodeBlock code="npm install @xaui/native" language="bash" />
        <Link href="/docs/installation">
          <Button variant="outline" className="mt-2">
            View Installation Guide
          </Button>
        </Link>
      </div>
    </div>
  )
}
