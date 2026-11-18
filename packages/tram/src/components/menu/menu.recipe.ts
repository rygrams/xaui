import { createRecipe } from '@xaui/native/system'
import { accentInk } from '../../theme/accent-ink'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'

const SLOTS = [
  'trigger',
  'triggerLabel',
  'overlay',
  'content',
  'label',
  'separator',
  'group',
  'item',
  'itemTitle',
  'itemDescription',
  'itemIndicator',
] as const

/** The box at either end of a row, in points: a glyph of the row's size, and no shift. */
export const MENU_INDICATOR = 24

/**
 * The Metro context menu: a band the width of the screen in the theme's `overlay`, and
 * rows of big text — `title`, SemiLight — padded in from the page's own margin. No line,
 * no shadow, no corner. A separator is a gap, not a rule.
 *
 * What is quieter than a title — a heading, a second line — is `muted` as an ink on the
 * band: on the light band `muted` alone stays under 4.5:1.
 */
export const menuRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const band = theme.colors.overlay
    const quiet = accentInk(theme.colors.muted, band)

    return {
      // A trigger left as plain text is still pressed like a control of 48.
      trigger: {
        minHeight: TRAM_TOUCH_TARGET,
        justifyContent: 'center',
        alignSelf: 'flex-start',
      },
      triggerLabel: { ...roleType('body', theme), color: theme.colors.foreground },
      // The page's ground, dimmed: flat black at the theme's own strength. No blur.
      overlay: { position: 'absolute', backgroundColor: theme.colors.backdrop },
      content: {
        position: 'absolute',
        start: 0,
        end: 0,
        backgroundColor: band,
        paddingVertical: theme.spacing(3),
        backfaceVisibility: 'hidden',
      },
      label: {
        ...roleType('caption', theme),
        color: quiet,
        paddingHorizontal: theme.spacing(6),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
      },
      separator: { height: theme.spacing(3) },
      group: { flexDirection: 'column' },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: TRAM_TOUCH_TARGET,
        paddingHorizontal: theme.spacing(6),
        paddingVertical: theme.spacing(2),
        gap: theme.spacing(3),
      },
      // Grows into the row from its content size, so an indicator stays at the end.
      itemTitle: {
        ...roleType('title', theme),
        color: theme.colors.overlayForeground,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
      },
      itemDescription: { ...roleType('body', theme), color: quiet },
      itemIndicator: {
        width: MENU_INDICATOR,
        height: MENU_INDICATOR,
        alignItems: 'center',
        justifyContent: 'center',
      },
    }
  },

  variants: {
    tone: {
      default: () => ({}),
      // The danger red as an ink on the band: read, not filled.
      danger: theme => ({
        itemTitle: { color: accentInk(theme.colors.danger, theme.colors.overlay) },
      }),
    },
  },

  states: {
    /** Grey. Not dimmed: the grey is the state. */
    disabled: theme => ({
      triggerLabel: { color: theme.colors.muted },
      itemTitle: { color: theme.colors.muted },
    }),
  },
})
