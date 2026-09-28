import { sendGAEvent } from '@next/third-parties/google'
import type { PackageManager } from './install-command'

/** Where on the site an outbound link sits, so a header click reads apart from a page's. */
export type LinkLocation = 'header' | 'component_source'

/** Every GA4 event the docs send, with its parameters. Names follow GA4's snake_case. */
type AnalyticsEvents = {
  copy_install_command: { package_manager: PackageManager; xaui_package: string }
  github_click: { link_location: LinkLocation; link_url: string }
  npm_click: { link_location: LinkLocation; link_url: string }
}

export type AnalyticsEventName = keyof AnalyticsEvents

/**
 * Sends one GA4 event. A no-op without a measurement ID — the same condition that keeps
 * `<GoogleAnalytics>` out of the layout — so local builds send nothing and log nothing.
 */
export function trackEvent<Name extends AnalyticsEventName>(
  name: Name,
  params: AnalyticsEvents[Name]
) {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return

  sendGAEvent('event', name, params)
}
