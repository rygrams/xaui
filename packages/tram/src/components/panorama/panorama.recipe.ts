import { createRecipe } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { roleType } from '../typography/typography.role'

const SLOTS = [
  'root',
  'backdrop',
  'titleRow',
  'title',
  'track',
  'section',
  'header',
] as const

/**
 * What shows of the next section at the screen's end, in points: enough to say there is
 * more to the side, and the touch target's width.
 */
export const PANORAMA_PEEK = 48

/**
 * How far the title stands in from the screen's start, in points — and from its end once
 * the last section is reached.
 */
export function panoramaTitleInset(theme: XAUITheme): number {
  return theme.spacing(4)
}

/** The room the title is laid out in, in points: one line of `hero`, however long. */
const TITLE_ROOM = 4096

/**
 * One drawing. The Panorama is the page itself: the theme's ground, its title in the
 * giant `hero` role and its sections' headers in the `pivot` one, both Light, in the
 * page's ink. No accent — what is in the sections carries it.
 */
export const panoramaRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: theme.colors.background,
    },
    // Wider than the screen by its own way; the root sets its width once measured.
    backdrop: { position: 'absolute', top: 0, bottom: 0, start: 0 },
    // Far wider than any screen, so the title is laid on one line at its natural width and
    // runs past the screen's end; the root clips it.
    titleRow: {
      flexDirection: 'row',
      width: TITLE_ROOM,
      paddingStart: panoramaTitleInset(theme),
    },
    title: {
      ...roleType('hero', theme),
      color: theme.colors.foreground,
      flexShrink: 0,
    },
    track: { flex: 1, flexDirection: 'row', alignItems: 'stretch' },
    // Laid past the screen's end, never squeezed into it.
    section: {
      flexShrink: 0,
      paddingStart: theme.spacing(6),
      paddingEnd: theme.spacing(2),
    },
    header: {
      ...roleType('pivot', theme),
      color: theme.colors.foreground,
      marginBottom: theme.spacing(3),
    },
  }),
})
