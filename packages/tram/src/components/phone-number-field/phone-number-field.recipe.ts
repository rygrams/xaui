import { createRecipe } from '@xaui/native/system'
import { accentInk } from '../../theme/accent-ink'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'

const SLOTS = [
  'country',
  'iso',
  'calling',
  'chevron',
  'list',
  'row',
  'rowIso',
  'rowName',
  'rowCode',
  'rowCurrent',
] as const

/**
 * The share of the window the country list may take before it scrolls. The band is as tall
 * as its content, and a list of two hundred countries would otherwise be that tall.
 */
export const LIST_SHARE = 0.45

/** Spacing steps the ISO code takes, so the names line up whatever the two letters. */
const ISO_WIDTH = 7

/**
 * Two drawings, resolved against two themes.
 *
 * **The country**, in the field: the ISO code in `caption`, then the calling code in the
 * field's own type — the root lays that one over it — then a small chevron. Text, as Metro
 * had no emoji: the code reads on every platform, Android's flagless fonts included.
 *
 * **The list**, on the band: it is read under the band's theme — the other mode, which the
 * band hands what is put on it — so its ink is the band's. Rows of 48: the ISO code, the
 * name in `body`, the calling code in the band's quieter ink; the current country in the
 * accent read as ink on the band (`link`).
 */
export const phoneNumberFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const quiet = accentInk(theme.colors.muted, theme.colors.background)

    return {
      country: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: theme.spacing(2),
      },
      iso: { ...roleType('caption', theme), color: theme.colors.foreground },
      calling: { fontVariant: ['tabular-nums'] },
      chevron: { color: theme.colors.foreground },
      list: { flexGrow: 0 },
      row: {
        minHeight: TRAM_TOUCH_TARGET,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(3),
      },
      rowIso: {
        ...roleType('caption', theme),
        color: theme.colors.foreground,
        width: theme.spacing(ISO_WIDTH),
      },
      rowName: {
        ...roleType('body', theme),
        color: theme.colors.foreground,
        flex: 1,
      },
      rowCode: {
        ...roleType('body', theme),
        color: quiet,
        fontVariant: ['tabular-nums'],
      },
      rowCurrent: { color: theme.colors.link },
    }
  },

  states: {
    /** Grey, not dimmed: the grey is the state. */
    disabled: theme => ({
      iso: { color: theme.colors.muted },
      calling: { color: theme.colors.muted },
      chevron: { color: theme.colors.muted },
    }),
  },
})
