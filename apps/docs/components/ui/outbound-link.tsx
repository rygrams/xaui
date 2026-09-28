'use client'

import type { ComponentProps } from 'react'
import { trackEvent, type LinkLocation } from '@/lib/analytics'

type OutboundLinkProps = Omit<ComponentProps<'a'>, 'href' | 'rel' | 'target'> & {
  href: string
  event: 'github_click' | 'npm_click' | 'linkedin_click'
  location: LinkLocation
}

/** A link that leaves the site in a new tab and reports the click to GA4 on its way out. */
export function OutboundLink({
  event,
  href,
  location,
  onClick,
  ...props
}: OutboundLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={clickEvent => {
        trackEvent(event, { link_location: location, link_url: href })
        onClick?.(clickEvent)
      }}
      rel="noopener noreferrer"
      target="_blank"
    />
  )
}
